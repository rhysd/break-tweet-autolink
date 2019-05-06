import { TweetAutoLinkBreaker } from 'break-tweet-autolink';

function unlinkTweetInDraftEditor(breaker: TweetAutoLinkBreaker, editor: HTMLDivElement) {
    const text = editor.textContent;
    if (text === null) {
        console.error('FATAL: Text of editor is null:', editor);
        return;
    }
    const converted = breaker.breakAutoLinks(text);
    if (text === converted) {
        // Do nothing
        return;
    }
    // Workaround for Draft Editor since it does not allow to edit its content via textContent
    const url = new URL(window.location.href);
    const key = url.search.length > 0 ? '&text=' : 'text=';
    url.search += key + converted;
    window.location.href = url.href;
}

function unlinkTweetInRichEditors(breaker: TweetAutoLinkBreaker, editors: NodeListOf<HTMLDivElement>) {
    for (const editor of editors) {
        const text = editor.textContent;
        if (text === null || text.length === 0) {
            continue;
        }
        const converted = breaker.breakAutoLinks(text);
        if (text === converted) {
            continue;
        }
        editor.textContent = converted;
    }
}

function unlinkTweetInTextArea(breaker: TweetAutoLinkBreaker, editor: HTMLTextAreaElement) {
    editor.value = breaker.breakAutoLinks(editor.value);
}

function unlinkTweet() {
    const b = new TweetAutoLinkBreaker();
    const newEditor: HTMLDivElement | null = document.querySelector('.DraftEditor-root');
    if (newEditor !== null) {
        return unlinkTweetInDraftEditor(b, newEditor);
    }
    const oldEditors: NodeListOf<HTMLDivElement> = document.querySelectorAll(
        '.modal-content .tweet-box.rich-editor[name=tweet][contenteditable]',
    );
    if (oldEditors.length > 0) {
        return unlinkTweetInRichEditors(b, oldEditors);
    }
    const intentEditor: HTMLTextAreaElement | null = document.querySelector('textarea#status');
    if (intentEditor !== null) {
        return unlinkTweetInTextArea(b, intentEditor);
    }
    alert('No tweet form found. Please open tweet form and type some text at first.');
}

chrome.runtime.onMessage.addListener((msg: Message) => {
    switch (msg.type) {
        case 'unlink':
            unlinkTweet();
            break;
        default:
            console.error('FATAL: Unexpected msg:', msg);
    }
});
