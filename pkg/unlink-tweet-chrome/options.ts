// prettier-ignore
const OPTION_NAMES = [
    'mention',
    'list',
    'hashtag',
    'cashtag',
    'url-no-scheme',
    'url-with-scheme',
] as const;

type OptionName = typeof OPTION_NAMES[number];
type Options = { [K in OptionName]: boolean };

const saveButton = document.getElementById('save-btn')! as HTMLButtonElement;
const resetButton = document.getElementById('reset-btn')! as HTMLButtonElement;

// prettier-ignore
const DEFAULT_OPTIONS: Options = {
    'mention': true,
    'list': true,
    'hashtag': true,
    'cashtag': true,
    'url-no-scheme': true,
    'url-with-scheme': false,
};

function optionElement(name: OptionName): HTMLInputElement {
    const elem = document.getElementById(`option-${name}`);
    if (elem === null) {
        throw new Error(`<input> does not exist for option '${name}'`);
    }
    return elem as HTMLInputElement;
}

function readOptionsFromElems(): Options {
    // Note: es2019.object.d.ts does not work with string literal types as keys of object.
    // The return type of Object.fromEntries() falls back to {[k: string]: T; [k: number]: T}.
    const ret = {} as any;
    for (const name of OPTION_NAMES) {
        ret[name] = optionElement(name).checked;
    }
    return ret;
}

function setOptionsToElems(opts: Options) {
    for (const k of Object.keys(opts)) {
        optionElement(k as OptionName).checked = opts[k as OptionName];
    }
}

function saveOptionsToStorage(opts: Options) {
    return new Promise<void>(resolve => chrome.storage.sync.set(opts, resolve));
}

// Note: The loaded object may be empty when the value is not saved yet
function loadOptionsFromStrage() {
    return new Promise<Options>(resolve => {
        chrome.storage.sync.get(OPTION_NAMES, (opts: Options) => resolve(opts));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadOptionsFromStrage().then(opts => {
        if (Object.keys(opts).length > 0) {
            setOptionsToElems(opts);
        } else {
            setOptionsToElems(DEFAULT_OPTIONS);
        }
    });
});

saveButton.addEventListener('click', () => {
    saveButton.textContent = 'Saving...';
    saveOptionsToStorage(readOptionsFromElems()).then(() => {
        saveButton.textContent = 'Saved';
    });
});

resetButton.addEventListener('click', () => {
    setOptionsToElems(DEFAULT_OPTIONS);
    saveOptionsToStorage(DEFAULT_OPTIONS);
});
