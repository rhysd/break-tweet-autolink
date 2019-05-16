import { TweetAutoLinkBreakerConfigAll as ConfigAll } from 'break-tweet-autolink';
import { DEFAULT_CONFIG, CONFIG_NAMES, setConfigToElems, getConfigFromElems, ConfigName } from './config.js';

const saveButton = document.getElementById('save-btn')! as HTMLButtonElement;
const resetButton = document.getElementById('reset-btn')! as HTMLButtonElement;

function getId(name: ConfigName) {
    return `option-${name}`;
}

function saveConfigToStorage(opts: ConfigAll) {
    return new Promise<void>(resolve => chrome.storage.sync.set(opts, resolve));
}

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(CONFIG_NAMES, (opts: ConfigAll) => {
        setConfigToElems(opts, getId);
    });
});

saveButton.addEventListener('click', () => {
    saveConfigToStorage(getConfigFromElems(getId)).then(() => {
        saveButton.textContent = 'Saved';
    });
});

resetButton.addEventListener('click', () => {
    saveConfigToStorage(DEFAULT_CONFIG).then(() => {
        setConfigToElems(DEFAULT_CONFIG, getId);
        saveButton.textContent = 'Save';
    });
});
