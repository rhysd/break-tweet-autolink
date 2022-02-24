import type { TweetAutoLinkBreakerConfigAll as ConfigAll, TweetAutoLinkBreakerConfig } from 'break-tweet-autolink';

export type ConfigName = keyof ConfigAll;
export type ElemIdGetFunc = (n: ConfigName) => string;
type EmptyObject = { [k: string]: unknown };

// prettier-ignore
export const DEFAULT_CONFIG = {
    'mention': true,
    'list': true,
    'hashtag': true,
    'cashtag': true,
    'urlNoScheme': true,
    'urlWithScheme': false,
};
export const DEFAULT_CONFIG_NAMES = Object.keys(DEFAULT_CONFIG) as Array<keyof typeof DEFAULT_CONFIG>;

function isEmptyObject(o: object): o is EmptyObject {
    return Object.keys(o).length === 0;
}

function getElemForConfig(id: string): HTMLInputElement {
    const elem = document.getElementById(id);
    if (elem === null) {
        throw new Error(`<input> does not exist for config '${name}'`);
    }
    return elem as HTMLInputElement;
}

export function setConfigToElems(config: ConfigAll | EmptyObject, id: ElemIdGetFunc): void {
    // Note: The loaded object may be empty when the value is not saved yet
    const c: ConfigAll = isEmptyObject(config) ? DEFAULT_CONFIG : config;

    for (const k of Object.keys(config) as Array<keyof ConfigAll>) {
        const v = c[k];
        if (typeof v === 'boolean') {
            getElemForConfig(id(k)).checked = v;
        }
    }
}

export function getConfigFromElems(id: ElemIdGetFunc): ConfigAll {
    // Note: es2019.object.d.ts does not work with string literal types as keys of object.
    // The return type of Object.fromEntries() falls back to {[k: string]: T; [k: number]: T}.
    const ret: TweetAutoLinkBreakerConfig = {};
    for (const name of DEFAULT_CONFIG_NAMES) {
        ret[name] = getElemForConfig(id(name)).checked;
    }
    return ret as ConfigAll;
}

export function loadConfig(): Promise<ConfigAll> {
    return new Promise<ConfigAll>(resolve => {
        chrome.storage.sync.get(DEFAULT_CONFIG_NAMES, (c: ConfigAll | EmptyObject) => {
            if (isEmptyObject(c)) {
                resolve(DEFAULT_CONFIG);
            } else {
                resolve(c);
            }
        });
    });
}

export function saveConfig(c: ConfigAll): Promise<void> {
    return new Promise<void>(resolve => {
        chrome.storage.sync.set(c, resolve);
    });
}
