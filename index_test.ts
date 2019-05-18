import { strictEqual as eq } from 'assert';
import { TweetAutoLinkBreaker, TweetAutoLinkBreakerConfig } from './index';

// prettier-ignore
const tests: { [what: string]: [string, string, TweetAutoLinkBreakerConfig | null] } = {
    'empty text':
        ['', '', null],
    'nothing':
        ['no entity included', 'no entity included', null],
    'nothing with all enabled':
        [
            'no entity included',
            'no entity included',
            { hashtag: true, urlNoScheme: true, urlWithScheme: true, cashtag: true, mention: true, list: true },
        ],
    'nothing (JP)':
        ['この tweet はエンティティを持っていません', 'この tweet はエンティティを持っていません', null],
    'screen name':
        ['hi @name, how is going?', 'hi @\u200Bname, how is going?', { mention: true }],
    'screen name at start':
        ['@name, how is going?', '@\u200Bname, how is going?', { mention: true }],
    'screen name at last':
        ['hi @name', 'hi @\u200Bname', { mention: true }],
    'screen name only':
        ['@name', '@\u200Bname', { mention: true }],
    'screen name (JP)':
        ['こんにちは@nameさん', 'こんにちは@\u200Bnameさん', { mention: true }],
    'no screen name':
        ['hi @name, how is going?', 'hi @name, how is going?', { mention: false }],
    'hashtag':
        ['on #inuconf, how is going?', 'on #\u200Binuconf, how is going?', { hashtag: true }],
    'hashtag at start':
        ['#inuconf is very fun', '#\u200Binuconf is very fun', { hashtag: true }],
    'hashtag at last':
        ['enjoy #inuconf', 'enjoy #\u200Binuconf', { hashtag: true }],
    'hashtag only':
        ['#inuconf', '#\u200Binuconf', { hashtag: true }],
    'hashtag (JP)':
        ['今 #inuconf にいます', '今 #\u200Binuconf にいます', { hashtag: true }],
    'Japanese hashtag':
        ['今 #犬コンフ にいます', '今 #\u200B犬コンフ にいます', { hashtag: true }],
    'no hashtag':
        ['on #inuconf, how is going?', 'on #inuconf, how is going?', { hashtag: false }],
    'url without scheme':
        ['visit foo.example.com and say hello', 'visit foo\u200B.example\u200B.com and say hello', { urlNoScheme: true }],
    'url without scheme with path':
        ['visit foo.example.com/bar.txt and say hello', 'visit foo\u200B.example\u200B.com/bar\u200B.txt and say hello', { urlNoScheme: true }],
    'url without scheme at top':
        ['foo.example.com and say hello', 'foo\u200B.example\u200B.com and say hello', { urlNoScheme: true }],
    'url without scheme at last':
        ['visit foo.example.com', 'visit foo\u200B.example\u200B.com', { urlNoScheme: true }],
    'only url without scheme':
        ['foo.example.com', 'foo\u200B.example\u200B.com', { urlNoScheme: true }],
    'no url without scheme':
        ['visit foo.example.com and say hello', 'visit foo.example.com and say hello', { urlNoScheme: false }],
    'no url with scheme with url without scheme config enabled':
        ['https://foo.example.com', 'https://foo.example.com', { urlNoScheme: true, urlWithScheme: false }],
    'url with https scheme':
        [
            'visit https://foo.example.com and say hello',
            'visit https://foo\u200B.example\u200B.com and say hello',
            { urlWithScheme: true },
        ],
    'url with http scheme':
        [
            'visit http://foo.example.com and say hello',
            'visit http://foo\u200B.example\u200B.com and say hello',
            { urlWithScheme: true },
        ],
    'url with https scheme at top':
        [
            'https://foo.example.com and say hello',
            'https://foo\u200B.example\u200B.com and say hello',
            { urlWithScheme: true },
        ],
    'url with http scheme at last':
        [
            'visit http://foo.example.com',
            'visit http://foo\u200B.example\u200B.com',
            { urlWithScheme: true },
        ],
    'only url with https scheme':
        ['https://foo.example.com', 'https://foo\u200B.example\u200B.com', { urlWithScheme: true }],
    'no url with scheme':
        ['https://foo.example.com', 'https://foo.example.com', { urlWithScheme: false }],
    'no url without scheme with url with scheme config enabled':
        ['foo.example.com', 'foo.example.com', { urlNoScheme: false, urlWithScheme: true }],
    'cashtag':
        ['At $GOOG, how is going?', 'At $\u200BGOOG, how is going?', { cashtag: true }],
    'cashtag at start':
        ['$GOOG is company', '$\u200BGOOG is company', { cashtag: true }],
    'cashtag at last':
        ['working at $GOOG', 'working at $\u200BGOOG', { cashtag: true }],
    'cashtag only':
        ['$GOOG', '$\u200BGOOG', { cashtag: true }],
    'no cashtag':
        ['At $GOOG, how is going?', 'At $GOOG, how is going?', { cashtag: false }],
    'list mention':
        ['hi @name, how is going?', 'hi @\u200Bname, how is going?', { mention: true }],
    'list mention at start':
        ['@name/list, how is going?', '@\u200Bname/list, how is going?', { list: true }],
    'list mention at last':
        ['hi @name/list', 'hi @\u200Bname/list', { list: true }],
    'list mention only':
        ['@name/list', '@\u200Bname/list', { list: true }],
    'no list mention':
        ['hi @name/list, how is going?', 'hi @name/list, how is going?', { list: false }],
    'all entities':
        [
            'hi @name and list @foo/list, #this URL is awesome example.com https://example.com please see at $GOOG',
            'hi @\u200Bname and list @\u200Bfoo/list, #\u200Bthis URL is awesome example\u200B.com https://example\u200B.com please see at $\u200BGOOG',
            { hashtag: true, urlNoScheme: true, urlWithScheme: true, cashtag: true, mention: true, list: true },
        ],
    'no entity with all are disabled':
        [
            'hi @name and list @foo/list, #this URL is awesome example.com https://example.com please see at $GOOG',
            'hi @name and list @foo/list, #this URL is awesome example.com https://example.com please see at $GOOG',
            { hashtag: false, urlNoScheme: false, urlWithScheme: false, cashtag: false, mention: false, list: false },
        ],
    'all entities with newlines':
        [
            `hi @name and list
             @foo/list
             , #this URL is awesome
             example.com https://example.com
             please see at $GOOG
             `,
            `hi @\u200Bname and list
             @\u200Bfoo/list
             , #\u200Bthis URL is awesome
             example\u200B.com https://example\u200B.com
             please see at $\u200BGOOG
             `,
            { hashtag: true, urlNoScheme: true, urlWithScheme: true, cashtag: true, mention: true, list: true },
        ],
    'all entities with changing escape character':
        [
            'hi @name and list @foo/list, #this URL is awesome example.com https://example.com please see at $GOOG',
            'hi @\\name and list @\\foo/list, #\\this URL is awesome example\\.com https://example\\.com please see at $\\GOOG',
            { hashtag: true, urlNoScheme: true, urlWithScheme: true, cashtag: true, mention: true, list: true, char: '\\' },
        ],
};

const entities: ReadonlyArray<[keyof TweetAutoLinkBreakerConfig, string, string]> = [
    ['mention', '@name', '@\u200Bname'],
    ['list', '@foo/list', '@\u200Bfoo/list'],
    ['hashtag', '#hashtag', '#\u200Bhashtag'],
    ['urlNoScheme', 'foo.bar.com/piyo.txt', 'foo\u200B.bar\u200B.com/piyo\u200B.txt'],
    ['urlWithScheme', 'https://foo.bar.com/piyo.txt', 'https://foo\u200B.bar\u200B.com/piyo\u200B.txt'],
    ['cashtag', '$GOOG', '$\u200BGOOG'],
];

// Add all combinations of entities
for (const [c1, t1, e1] of entities) {
    for (const [c2, t2, e2] of entities) {
        const title = `combination of ${c1} and ${c2}`;
        const cfg = {} as any;
        cfg[c1] = true;
        cfg[c2] = true;
        tests[title] = [`begin ${t1} and ${t2} end`, `begin ${e1} and ${e2} end`, cfg];
    }
}

describe('TweetAutoLinkBreaker', function() {
    for (const [what, [text, expected, config]] of Object.entries(tests)) {
        it('it unlinks ' + what, function() {
            const breaker = new TweetAutoLinkBreaker(config);
            const actual = breaker.breakAutoLinks(text);
            eq(actual, expected, `Input text was '${text}'`);
        });
    }
});
