import { DEFAULT_CONFIG, setConfigToElems, getConfigFromElems, ConfigName, loadConfig, saveConfig } from './config.js';

const saveButton = document.getElementById('save-btn')! as HTMLButtonElement;
const resetButton = document.getElementById('reset-btn')! as HTMLButtonElement;

function getId(name: ConfigName) {
    return `option-${name}`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadConfig().then(c => setConfigToElems(c, getId));
});

saveButton.addEventListener('click', () => {
    saveConfig(getConfigFromElems(getId)).then(() => {
        saveButton.textContent = 'Saved';
    });
});

resetButton.addEventListener('click', () => {
    saveConfig(DEFAULT_CONFIG).then(() => {
        setConfigToElems(DEFAULT_CONFIG, getId);
        saveButton.textContent = 'Save';
    });
});
