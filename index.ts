import * as tw from 'twitter-text';

interface ConfigAll {
    hashtag: boolean;
    urlNoScheme: boolean;
    urlWithScheme: boolean;
    cashtag: boolean;
    mention: boolean;
    list: boolean;
}

export type TweetAutoLinkBreakerConfig = { [K in keyof ConfigAll]?: ConfigAll[K] };

export const DEFAULT_CONFIG: ConfigAll = {
    hashtag: false,
    urlNoScheme: true,
    urlWithScheme: false,
    cashtag: true,
    mention: false,
    list: false,
};
const RE_DOT = /\./g;

export class TweetAutoLinkBreaker {
    private readonly config: ConfigAll;

    constructor(cfg?: TweetAutoLinkBreakerConfig | null) {
        this.config = { ...DEFAULT_CONFIG, ...(cfg || {}) };
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
                replaced = '#\u200B' + entity.hashtag;
            } else if (
                this.config.urlWithScheme &&
                'url' in entity &&
                (entity.url.startsWith('https://') || entity.url.startsWith('http://'))
            ) {
                // URL with scheme
                replaced = entity.url.replace(RE_DOT, '.\u200B');
            } else if (
                this.config.urlNoScheme &&
                'url' in entity &&
                (!entity.url.startsWith('https://') && !entity.url.startsWith('http://'))
            ) {
                // URL without scheme
                replaced = entity.url.replace(RE_DOT, '.\u200B');
            } else if (this.config.cashtag && 'cashtag' in entity) {
                // Cashtag
                replaced = '$\u200B' + entity.cashtag;
            } else if (this.config.list && 'listSlug' in entity && entity.listSlug.length > 0) {
                // Mention with list
                replaced = `@\u200B${entity.screenName}${entity.listSlug}`;
            } else if (this.config.mention && 'screenName' in entity) {
                // Mention
                replaced = '@\u200B' + entity.screenName;
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
