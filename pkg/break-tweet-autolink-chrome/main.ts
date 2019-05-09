import { TweetAutoLinkBreaker } from 'break-tweet-autolink';

async function pasteUnlinkedTweetText(text: string, clipboard: string) {
    // TODO: TweetAutoLinkBreakerConfig should be configurable
    const b = new TweetAutoLinkBreaker({
        hashtag: true,
        urlNoScheme: true,
        urlWithScheme: false,
        cashtag: true,
        mention: true,
        list: true,
    });

    const unlinked = b.breakAutoLinks(text);
    if (unlinked === '') {
        return;
    }
    if (unlinked === text) {
        // When modifying nothing
        const s = document.getSelection();
        if (s !== null) {
            s.removeAllRanges();
        }
        return;
    }

    await navigator.clipboard.writeText(unlinked);
    document.execCommand('paste', false);
    return navigator.clipboard.writeText(clipboard);
}

chrome.runtime.onMessage.addListener((msg: Message) => {
    switch (msg.type) {
        case 'contextMenu':
            pasteUnlinkedTweetText(msg.selected, msg.clipboard).catch(console.error);
            break;
        default:
            console.error('FATAL: Unexpected msg:', msg);
    }
});
