import type { MessageFromPopup } from './message';
import { setConfigToElems, ConfigName, getConfigFromElems, loadConfig } from './config.js';
import { getButtonById } from './element.js';

function getId(name: ConfigName): string {
    return `cfg-${name}`;
}

getButtonById('unlink-btn').addEventListener('click', () => {
    const msg: MessageFromPopup = {
        type: 'unlinkTweet',
        config: getConfigFromElems(getId),
    };

    // Note: Background script immediately returns a response after receiving this message.
    chrome.runtime.sendMessage(msg, () => {
        window.close();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    loadConfig()
        .then(c => {
            setConfigToElems(c, getId);
        })
        .catch(err => {
            console.error('Could not load configuration on DOMContentLoaded:', err);
        });
});
