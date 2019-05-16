import { TweetAutoLinkBreakerConfigAll as ConfigAll } from 'break-tweet-autolink';
import { MessageFromPopup } from './message';
import { setConfigToElems, ConfigName, getConfigFromElems, CONFIG_NAMES } from './config.js';

function getId(name: ConfigName) {
    return `cfg-${name}`;
}

document.getElementById('unlink-btn')!.addEventListener('click', () => {
    const msg: MessageFromPopup = {
        type: 'unlinkSelectedText',
        config: getConfigFromElems(getId),
    };

    // Note: Background script immediately returns a response after receiving this message.
    chrome.runtime.sendMessage(msg, () => window.close());
});

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(CONFIG_NAMES, (opts: ConfigAll) => {
        setConfigToElems(opts, getId);
    });
});
