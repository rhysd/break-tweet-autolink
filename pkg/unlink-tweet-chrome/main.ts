import { TweetAutoLinkBreaker, TweetAutoLinkBreakerConfig } from 'break-tweet-autolink';
import { Message, MessageFromContent } from './message';

function command(name: string, arg: string | undefined = undefined) {
    if (!document.execCommand(name, false, arg)) {
        throw Error(`Command '${name}' failed with argument ${arg}`);
    }
}

function afterMilliseconds(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}

function unlink(text: string, cfg: TweetAutoLinkBreakerConfig): string {
    const b = new TweetAutoLinkBreaker(cfg);
    return b.breakAutoLinks(text);
}

async function unlinkSelectedText(text: string, clipboard: string, cfg: TweetAutoLinkBreakerConfig): Promise<boolean> {
    const unlinked = unlink(text, cfg);
    if (unlinked === '') {
        return false;
    }
    if (unlinked === text) {
        // When modifying nothing
        const s = document.getSelection();
        if (s !== null) {
            s.removeAllRanges();
        }
        return false;
    }

    await navigator.clipboard.writeText(unlinked);
    command('paste');
    await navigator.clipboard.writeText(clipboard);

    return true;
}

function sendMessage(msg: MessageFromContent) {
    return new Promise<Message>(resolve => {
        chrome.runtime.sendMessage(msg, resolve);
    });
}

// Get selection with 100ms interval polling with max 5 retries.
// This is necessary since selection is cleared while popup window is open.
// After the popup closes, the selection is restored when the page gains focus.
//
// The exact sequence of page action is:
//
//   1. User selects tweet text
//   2. User clicks page action (icon in toolbar)
//   3. Popup opens and selection is cleared temporarily
//   4. User clicks 'Unlink' button
//   5. Popup script sends message to background script
//   6. Background script returns response immediately and sends message to content script
//   7. Popup script receives the response and close its window.
//   8. Selection of tweet text is restored since popup closed. This happens asynchronously against
//      background script and content script. So it's not clear when selection is restored
//   9. Content script gets the restored selection by this polling and retries
async function getSelectionWithRetry(): Promise<[Selection | null, string]> {
    for (let i = 0; i < 5; i++) {
        const sel = window.getSelection();
        if (sel !== null) {
            const text = sel.toString();
            if (text !== '') {
                return [sel, text];
            }
        }
        await afterMilliseconds(100);
    }
    return [null, ''];
}

async function unlinkTextInSelection(cfg: TweetAutoLinkBreakerConfig) {
    const [sel, text] = await getSelectionWithRetry();
    if (sel === null || text === '') {
        // No text is selected
        alert('Please select text which you want to convert in Tweet form');
        return;
    }

    const unlinked = unlink(text, cfg);
    if (unlinked === text) {
        sel.removeAllRanges();
        return;
    }

    // Note: navigator.clipboard.writeText() does not work here. It throws 'Element not focused'
    // Exception when this script is called from page action. It works when it is called via
    // contextMenus, though.
    // Instead, using background script hack to save content to clipboard.
    await sendMessage({
        type: 'requestCopy',
        text: unlinked,
    });

    command('paste');
    sel.removeAllRanges();
}

function handleError(err: Error) {
    console.error('Error:', err.message, err);
    // TODO: Use alert for user
}

chrome.runtime.onMessage.addListener((msg: Message) => {
    switch (msg.type) {
        case 'contextMenu':
            unlinkSelectedText(msg.selected, msg.clipboard, msg.config).catch(handleError);
            return;
        case 'pageAction':
            unlinkTextInSelection(msg.config).catch(handleError);
            return;
        default:
            console.error('FATAL: Unexpected msg:', msg);
            return;
    }
});
