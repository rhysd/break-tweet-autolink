import * as tw from 'twitter-text';

interface ConfigAll {
    hashtag: boolean;
    urlNoScheme: boolean;
    urlWithScheme: boolean;
    cashtag: boolean;
    mention: boolean;
    list: boolean;
    char?: string;
}
export type TweetAutoLinkBreakerConfigAll = ConfigAll;

export type TweetAutoLinkBreakerConfig = { [K in keyof ConfigAll]?: ConfigAll[K] };

export const DEFAULT_CONFIG: ConfigAll = {
    hashtag: false,
    urlNoScheme: true,
    urlWithScheme: false,
    cashtag: true,
    mention: false,
    list: false,
};
export const UNLINK_ALL_CONFIG: ConfigAll = {
    hashtag: true,
    urlNoScheme: true,
    urlWithScheme: true,
    cashtag: true,
    mention: true,
    list: true,
};
export const DEFAULT_ESCAPE_CHAR = '\u200B';
const RE_DOT = /\./g;

export class TweetAutoLinkBreaker {
    private readonly config: ConfigAll;
    private readonly char: string;

    constructor(cfg?: TweetAutoLinkBreakerConfig | null) {
        this.config = { ...DEFAULT_CONFIG, ...(cfg || {}) };
        this.char = this.config.char || DEFAULT_ESCAPE_CHAR;
    }

    breakAutoLinks(text: string): string {
        const entities = tw.extractEntitiesWithIndices(text);
        if (entities.length === 0) {
            return text;
        }

        const tokens = [];
        for (const entity of entities.reverse()) {
            let replaced: string;

            if (this.config.hashtag && 'hashtag' in entity) {
                // Hashtag
                replaced = '#' + this.char + entity.hashtag;
            } else if (
                this.config.urlWithScheme &&
                'url' in entity &&
                (entity.url.startsWith('https://') || entity.url.startsWith('http://'))
            ) {
                // URL with scheme
                replaced = entity.url.replace(RE_DOT, this.char + '.');
            } else if (
                this.config.urlNoScheme &&
                'url' in entity &&
                (!entity.url.startsWith('https://') && !entity.url.startsWith('http://'))
            ) {
                // URL without scheme
                replaced = entity.url.replace(RE_DOT, this.char + '.');
            } else if (this.config.cashtag && 'cashtag' in entity) {
                // Cashtag
                replaced = '$' + this.char + entity.cashtag;
            } else if (this.config.list && 'listSlug' in entity && entity.listSlug.length > 0) {
                // Mention with list
                replaced = `@${this.char}${entity.screenName}${entity.listSlug}`;
            } else if (this.config.mention && 'screenName' in entity) {
                // Mention
                replaced = '@' + this.char + entity.screenName;
            } else {
                // Ignore
                const idx = entity.indices[0];
                tokens.push(text.slice(idx));
                text = text.slice(0, idx);
                continue;
            }

            tokens.push(text.slice(entity.indices[1]));
            tokens.push(replaced);
            text = text.slice(0, entity.indices[0]);
        }

        // Text before any entity
        tokens.push(text);

        return tokens.reverse().join('');
    }
}
