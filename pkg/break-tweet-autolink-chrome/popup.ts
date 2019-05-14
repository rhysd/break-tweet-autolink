import { TweetAutoLinkBreakerConfig } from 'break-tweet-autolink';
import { MessageFromPopup } from './message';

const mention = document.getElementById('cfg-mention')! as HTMLInputElement;
const list = document.getElementById('cfg-list')! as HTMLInputElement;
const hashtag = document.getElementById('cfg-hashtag')! as HTMLInputElement;
const cashtag = document.getElementById('cfg-cashtag')! as HTMLInputElement;
const urlNoScheme = document.getElementById('cfg-url-no-scheme')! as HTMLInputElement;
const urlWithScheme = document.getElementById('cfg-url-scheme')! as HTMLInputElement;

const unlink = document.getElementById('unlink-btn')! as HTMLAnchorElement;

unlink.addEventListener('click', () => {
    const config: TweetAutoLinkBreakerConfig = {
        mention: mention.checked,
        list: list.checked,
        hashtag: hashtag.checked,
        cashtag: cashtag.checked,
        urlNoScheme: urlNoScheme.checked,
        urlWithScheme: urlWithScheme.checked,
    };
    const msg: MessageFromPopup = {
        type: 'unlinkSelectedText',
        config,
    };
    chrome.runtime.sendMessage(msg, () => window.close());
});
