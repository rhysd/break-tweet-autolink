import { TweetAutoLinkBreaker } from 'break-tweet-autolink';

async function pasteUnlinkedTweetText(text: string) {
    const b = new TweetAutoLinkBreaker();
    const u = b.breakAutoLinks(text);
    if (u === '') {
        return;
    }
    // const prev = await navigator.clipboard.readText();
    await navigator.clipboard.writeText(u);
    document.execCommand('paste', false);
    // Restore previous clipboard content
    // await navigator.clipboard.writeText(prev); TODO: Browser requires permission here
}

chrome.runtime.onMessage.addListener((msg: Message) => {
    switch (msg.type) {
        case 'contextMenu':
            pasteUnlinkedTweetText(msg.selected).catch(console.error);
            break;
        default:
            console.error('FATAL: Unexpected msg:', msg);
    }
});
