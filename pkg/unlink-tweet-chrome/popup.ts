import { TweetAutoLinkBreakerConfigAll as ConfigAll } from 'break-tweet-autolink';
import { MessageFromPopup } from './message';

type OptionName = keyof ConfigAll;

// prettier-ignore
const DEFAULT_OPTIONS: ConfigAll = {
    'mention': true,
    'list': true,
    'hashtag': true,
    'cashtag': true,
    'urlNoScheme': true,
    'urlWithScheme': false,
};
const OPTION_NAMES = Object.keys(DEFAULT_OPTIONS) as OptionName[];

const UNLINK_BUTTON = document.getElementById('unlink-btn')! as HTMLAnchorElement;

// TODO: Reflect user options

function elemFor(name: OptionName) {
    const e = document.getElementById(`cfg-${name}`);
    if (e === null) {
        throw new Error(`<input> for '${name}' is not found`);
    }
    return e as HTMLInputElement;
}

function setOptions(options: ConfigAll) {
    for (const key of Object.keys(options)) {
        const e = elemFor(key as OptionName);
        e.checked = !!options[key as OptionName];
    }
}

function getOptions(): ConfigAll {
    const ret: any = {};
    for (const name of OPTION_NAMES) {
        ret[name] = elemFor(name).checked;
    }
    return ret;
}

UNLINK_BUTTON.addEventListener('click', () => {
    const msg: MessageFromPopup = {
        type: 'unlinkSelectedText',
        config: getOptions(),
    };

    // Note: Background script immediately returns a response after receiving this message.
    chrome.runtime.sendMessage(msg, () => window.close());
});

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(OPTION_NAMES, (opts: ConfigAll) => {
        if (Object.keys(opts).length > 0) {
            setOptions(opts);
        } else {
            setOptions(DEFAULT_OPTIONS);
        }
    });
});
