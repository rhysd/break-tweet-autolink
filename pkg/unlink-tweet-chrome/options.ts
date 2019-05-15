import { TweetAutoLinkBreakerConfigAll as ConfigAll } from 'break-tweet-autolink';

// prettier-ignore
const OPTION_NAMES = [
    'mention',
    'list',
    'hashtag',
    'cashtag',
    'urlNoScheme',
    'urlWithScheme',
] as const;

// Note: Don't use `keyof ConfigAll` to check OPTION_NAMES has proper values
type OptionName = typeof OPTION_NAMES[number];

const saveButton = document.getElementById('save-btn')! as HTMLButtonElement;
const resetButton = document.getElementById('reset-btn')! as HTMLButtonElement;

// prettier-ignore
const DEFAULT_OPTIONS: ConfigAll = {
    'mention': true,
    'list': true,
    'hashtag': true,
    'cashtag': true,
    'urlNoScheme': true,
    'urlWithScheme': false,
};

function optionElement(name: OptionName): HTMLInputElement {
    const elem = document.getElementById(`option-${name}`);
    if (elem === null) {
        throw new Error(`<input> does not exist for option '${name}'`);
    }
    return elem as HTMLInputElement;
}

function readOptionsFromElems(): ConfigAll {
    // Note: es2019.object.d.ts does not work with string literal types as keys of object.
    // The return type of Object.fromEntries() falls back to {[k: string]: T; [k: number]: T}.
    const ret = {} as any;
    for (const name of OPTION_NAMES) {
        ret[name] = optionElement(name).checked;
    }
    return ret;
}

function setOptionsToElems(opts: ConfigAll) {
    for (const k of Object.keys(opts)) {
        optionElement(k as OptionName).checked = opts[k as OptionName];
    }
}

function saveOptionsToStorage(opts: ConfigAll) {
    return new Promise<void>(resolve => chrome.storage.sync.set(opts, resolve));
}

// Note: The loaded object may be empty when the value is not saved yet
function loadOptionsFromStrage() {
    return new Promise<ConfigAll>(resolve => {
        chrome.storage.sync.get(OPTION_NAMES, (opts: ConfigAll) => resolve(opts));
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
