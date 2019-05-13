import { TweetAutoLinkBreaker, TweetAutoLinkBreakerConfig } from 'break-tweet-autolink';
import { Message, MessageFromContent } from './message';

const DEFAULT_CONFIG = {
    hashtag: true,
    urlNoScheme: true,
    urlWithScheme: false,
    cashtag: true,
    mention: true,
    list: true,
};

function command(name: string, arg: string | undefined = undefined) {
    if (!document.execCommand(name, false, arg)) {
        throw Error(`Command '${name}' failed with argument ${arg}`);
    }
}

function unlink(text: string, cfg: TweetAutoLinkBreakerConfig = DEFAULT_CONFIG): string {
    // TODO: TweetAutoLinkBreakerConfig should be configurable
    const b = new TweetAutoLinkBreaker(cfg);
    return b.breakAutoLinks(text);
}

async function unlinkSelectedText(text: string, clipboard: string): Promise<boolean> {
    const unlinked = unlink(text);
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

async function unlinkTextInSelection(cfg: TweetAutoLinkBreakerConfig) {
    const sel = window.getSelection();
    if (sel === null) {
        return;
    }

    const text = sel.toString();
    if (text === '') {
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
            unlinkSelectedText(msg.selected, msg.clipboard).catch(handleError);
            break;
        case 'pageAction':
            unlinkTextInSelection(msg.config).catch(handleError);
            break;
        default:
            console.error('FATAL: Unexpected msg:', msg);
            break;
    }
});
