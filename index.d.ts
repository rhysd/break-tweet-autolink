interface ConfigAll {
    hashtag: boolean;
    urlNoScheme: boolean;
    urlWithScheme: boolean;
    cashtag: boolean;
    mention: boolean;
    list: boolean;
}
export declare type TweetAutoLinkBreakerConfig = {
    [K in keyof ConfigAll]?: ConfigAll[K];
};
export declare const DEFAULT_CONFIG: ConfigAll;
export declare class TweetAutoLinkBreaker {
    private readonly config;
    constructor(cfg?: TweetAutoLinkBreakerConfig | null);
    breakAutoLinks(text: string): string;
}
export {};
