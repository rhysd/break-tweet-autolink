import { TweetAutoLinkBreaker } from 'break-tweet-autolink';

function unlink(text: string): string {
    // TODO: TweetAutoLinkBreakerConfig should be configurable
    const b = new TweetAutoLinkBreaker({
        hashtag: true,
        urlNoScheme: true,
        urlWithScheme: false,
        cashtag: true,
        mention: true,
        list: true,
    });
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
    document.execCommand('paste', false);
    await navigator.clipboard.writeText(clipboard);

    return true;
}

function getEditorElements(): HTMLElement[] {
    const newEditors: HTMLElement[] = Array.from(document.querySelectorAll('.DraftEditor-root'));
    if (newEditors.length > 0) {
        return newEditors;
    }

    /* TODO: query for rich editors
    const oldEditors: HTMLElement[] = Array.from(document.querySelectorAll('TODO: query for rich editors'));
    if (oldEditors.length > 0) {
        return oldEditors;
    }
    */

    /* TODO: query for intent editor
    const intentEditor: HTMLElement | null = document.querySelector('TODO: query for intent editor');
    if (intentEditor !== null) {
        return [intentEditor];
    }
    */

    return [];
}

function command(name: string, arg: string | undefined = undefined) {
    if (!document.execCommand(name, false, arg)) {
        throw Error(`Command '${name}' failed with argument ${arg}`);
    }
}

function sendMessage(msg: MessageFromContent) {
    return new Promise<Message>(resolve => {
        chrome.runtime.sendMessage(msg, resolve);
    });
}

async function unlinkTweetEditorText() {
    const editors = getEditorElements();
    if (editors.length === 0) {
        console.error('No editor element found. Cannot unlink tweet text');
        return;
    }

    for (const editor of editors) {
        editor.click();

        const active = document.activeElement;
        if (!editor.contains(active)) {
            console.error('Element', editor, 'does not contain', active, 'after click()');
            continue;
        }

        command('selectAll');

        const sel = window.getSelection();
        if (sel === null) {
            console.error('Cannot get selection of page');
            continue;
        }

        const text = sel.toString();
        if (text === '') {
            continue;
        }

        const unlinked = unlink(text);
        if (unlinked === text) {
            sel.removeAllRanges();
            continue;
        }

        command('delete');

        await sendMessage({
            type: 'requestCopy',
            text: unlinked,
        });
        command('paste');
    }
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
            unlinkTweetEditorText().catch(handleError);
            break;
        default:
            console.error('FATAL: Unexpected msg:', msg);
    }
});
