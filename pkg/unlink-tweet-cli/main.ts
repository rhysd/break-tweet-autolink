#!/usr/bin/env node
import clipboardy from 'clipboardy';
import parseArgs = require('minimist');
import camelize = require('camelize');
import { TweetAutoLinkBreaker, TweetAutoLinkBreakerConfig } from 'break-tweet-autolink';

if (process.argv.length === 3 && (process.argv[2] === '--help' || process.argv[2] === '-h')) {
    console.log(`Usage: break-tweet-autolink [OPTS... --] <ARGS>

This is a CLI utility to break auto links in Twitter text. <ARGS> are text you
want to convert. If multiple arguments are given, they are concatenated with
' '. If no argument is given, text is retrieved from STDIN.

It outputs unlinked text to STDOUT. By default, only URLs with no scheme and
cashtags are unlinked.

If you want to add some options, '--' argument must be followed after the last
option even if no argument is specified.

OPTS:

--url-no-scheme,  --no-url-no-scheme
	URL with no scheme such as foo.com (default: true)

--url-with-scheme,  --no-url-with-scheme
	URL with scheme such as https://foo.com (default: false)

--mention,  --no-mention
	Screen name such as @foo (default: false)

--list,  --no-list
	List mention such as @foo/bar (default: false)

--hashtag,  --no-hashtag
	Hashtags such as #foo (default: false)

--cashtag,  --no-cashtag
	Cashtags such as $FOO (default: true)

--escape {string}
	Escape character for breaking auto links (default: \\u200B)

-c, --clipboard
	Read text from STDIN instead of clipboard ignoring <ARGS>.
	Note: You need to put -- at last to specify options. It would look like
	\`unlink-tweet --clipboard --\`.
`);
    process.exit(0);
}

interface IO {
    clipboardIn: boolean;
}

function getOptsAndArgs() {
    // First one is path to node, second one is path to script
    const args = process.argv.slice(2);
    const optsSepIndex = args.indexOf('--');
    if (optsSepIndex === -1) {
        return [[], args];
    } else {
        return [args.slice(0, optsSepIndex), args.slice(optsSepIndex + 1)];
    }
}

async function getText(args: string[], io: IO) {
    if (io.clipboardIn) {
        return await clipboardy.read();
    }

    if (args.length > 0) {
        return args.join(' ');
    }

    let text = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
        text += chunk;
    });
    return await new Promise<string>((resolve) => {
        process.stdin.on('end', () => resolve(text));
    });
}

function getConfig(opts: string[]): [TweetAutoLinkBreakerConfig | null, IO] {
    if (opts.length === 0) {
        return [null, { clipboardIn: false }];
    }

    const parsed: any = camelize(parseArgs(opts));
    if (parsed.escape !== undefined) {
        parsed.char = parsed.escape;
        delete parsed.escape;
    }

    let clipboardIn = false;
    if (parsed.c !== undefined || parsed.clipboard !== undefined) {
        clipboardIn = !!(parsed.c || parsed.clipboard);
        delete parsed.c;
        delete parsed.clipboard;
    }

    // parseArgs leaves args not parsed in '_' key. And camelize() converts the key to ''.
    delete parsed[''];

    return [parsed, { clipboardIn }];
}

async function main() {
    const [opts, args] = getOptsAndArgs();
    const [cfg, io] = getConfig(opts);
    const input = await getText(args, io);
    const breaker = new TweetAutoLinkBreaker(cfg);
    const output = breaker.breakAutoLinks(input);
    process.stdout.write(output);
}

main().catch(console.error);
