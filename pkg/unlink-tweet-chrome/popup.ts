import { MessageFromPopup } from './message';
import { setConfigToElems, ConfigName, getConfigFromElems, loadConfig } from './config.js';

function getId(name: ConfigName) {
    return `cfg-${name}`;
}

document.getElementById('unlink-btn')!.addEventListener('click', () => {
    const msg: MessageFromPopup = {
        type: 'unlinkTweet',
        config: getConfigFromElems(getId),
    };

    // Note: Background script immediately returns a response after receiving this message.
    chrome.runtime.sendMessage(msg, () => window.close());
});

document.addEventListener('DOMContentLoaded', () => {
    loadConfig().then(c => setConfigToElems(c, getId));
});
