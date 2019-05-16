import { TweetAutoLinkBreakerConfigAll as ConfigAll } from 'break-tweet-autolink';

export type ConfigName = keyof ConfigAll;
export type ElemIdGetFunc = (n: ConfigName) => string;

// prettier-ignore
export const DEFAULT_CONFIG: ConfigAll = {
    'mention': true,
    'list': true,
    'hashtag': true,
    'cashtag': true,
    'urlNoScheme': true,
    'urlWithScheme': false,
};
export const CONFIG_NAMES = Object.keys(DEFAULT_CONFIG) as ConfigName[];

function isEmptyObject(o: object): o is {} {
    return Object.keys(o).length === 0;
}

function getElemForConfig(name: ConfigName, id: ElemIdGetFunc): HTMLInputElement {
    const elem = document.getElementById(id(name));
    if (elem === null) {
        throw new Error(`<input> does not exist for config '${name}'`);
    }
    return elem as HTMLInputElement;
}

export function setConfigToElems(config: ConfigAll | {}, id: ElemIdGetFunc) {
    // Note: The loaded object may be empty when the value is not saved yet
    const c: ConfigAll = isEmptyObject(config) ? DEFAULT_CONFIG : config;

    for (const k of Object.keys(config)) {
        getElemForConfig(k as ConfigName, id).checked = c[k as ConfigName];
    }
}

export function getConfigFromElems(id: ElemIdGetFunc): ConfigAll {
    // Note: es2019.object.d.ts does not work with string literal types as keys of object.
    // The return type of Object.fromEntries() falls back to {[k: string]: T; [k: number]: T}.
    const ret = {} as any;
    for (const name of CONFIG_NAMES) {
        ret[name] = getElemForConfig(name, id).checked;
    }
    return ret;
}

export function loadConfig() {
    return new Promise<ConfigAll>(resolve => {
        chrome.storage.sync.get(CONFIG_NAMES, (c: ConfigAll | {}) => {
            if (isEmptyObject(c)) {
                resolve(DEFAULT_CONFIG);
            } else {
                resolve(c);
            }
        });
    });
}

export function saveConfig(c: ConfigAll) {
    return new Promise<void>(resolve => chrome.storage.sync.set(c, resolve));
}
