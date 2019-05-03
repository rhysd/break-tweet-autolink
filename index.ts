import * as tw from 'twitter-text';

interface ConfigAll {
    hashtag: boolean;
    urlNoScheme: boolean;
    urlWithScheme: boolean;
    cashtag: boolean;
    mention: boolean;
    list: boolean;
}

export type Config = { [K in keyof ConfigAll]?: ConfigAll[K] };

export const DEFAULT_CONFIG: ConfigAll = {
    hashtag: false,
    urlNoScheme: true,
    urlWithScheme: false,
    cashtag: true,
    mention: false,
    list: false,
};

export class TweetAutoLinkBreaker {
    private readonly config: ConfigAll;

    constructor(cfg: Config) {
        this.config = { ...DEFAULT_CONFIG, ...cfg };
    }

    breakAutoLink(text: string): string {
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
            } else if (this.config.urlWithScheme && 'url' in entity && entity.url.startsWith('https://')) {
                // URL with HTTPS scheme
                replaced = 'https\u200B' + entity.url.slice(5);
            } else if (this.config.urlWithScheme && 'url' in entity && entity.url.startsWith('http://')) {
                // URL with HTTP scheme
                replaced = 'http\u200B' + entity.url.slice(4);
            } else if ((this.config.urlNoScheme || this.config.urlWithScheme) && 'url' in entity) {
                // URL without scheme
                replaced = entity.url.replace('.', '.\u200B');
            } else if (this.config.cashtag && 'cashtag' in entity) {
                // Cashtag
                replaced = '$\u200B' + entity.cashtag;
            } else if (this.config.list && 'listSlug' in entity && entity.listSlug.length > 0) {
                // Mention with list
                replaced = `@\u200B${entity.screenName}/${entity.listSlug}`;
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
