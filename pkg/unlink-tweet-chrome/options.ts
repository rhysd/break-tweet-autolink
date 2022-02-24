import { DEFAULT_CONFIG, setConfigToElems, getConfigFromElems, ConfigName, loadConfig, saveConfig } from './config.js';
import { getButtonById } from './element.js';

const saveButton = getButtonById('save-btn');
const resetButton = getButtonById('reset-btn');

function getId(name: ConfigName): string {
    return `option-${name}`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadConfig()
        .then(c => {
            setConfigToElems(c, getId);
        })
        .catch(err => {
            console.error('Error on reflecting configurations to elements:', err);
        });
});

saveButton.addEventListener('click', () => {
    saveConfig(getConfigFromElems(getId))
        .then(() => {
            saveButton.textContent = 'Saved';
        })
        .catch(err => {
            console.error('Error on saving configurations from elements', err);
        });
});

resetButton.addEventListener('click', () => {
    saveConfig(DEFAULT_CONFIG)
        .then(() => {
            setConfigToElems(DEFAULT_CONFIG, getId);
            saveButton.textContent = 'Save';
        })
        .catch(err => {
            console.error('Error on configuration reset', err);
        });
});
