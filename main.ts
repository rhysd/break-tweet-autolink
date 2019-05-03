#!/usr/bin/env node
import * as clipboardy from 'clipboardy';
import parseArgs = require('minimist');
import camelize = require('camelize');
import { TweetAutoLinkBreaker, TweetAutoLinkBreakerConfig } from './index';

if (process.argv.length === 3 && (process.argv[2] === '--help' || process.argv[2] === '-h')) {
    console.log(`Usage: break-tweet-autolink [OPTS... --] <ARGS>

This is a CLI utility to break auto links in Twitter text. <ARGS> are text you
want to convert. If multiple arguments are given, they are concatenated with
' '. If no argument is given, text is retrieved from your system clipboard.

By default, only URLs with no scheme and cashtags are unlinked.

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
`);
    process.exit(0);
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

async function getText(args: string[]) {
    if (args.length > 0) {
        return args.join(' ');
    } else {
        return await clipboardy.read();
    }
}

function getConfig(opts: string[]): TweetAutoLinkBreakerConfig | null {
    if (opts.length === 0) {
        return null;
    }
    return camelize(parseArgs(opts));
}

async function main() {
    const [opts, args] = getOptsAndArgs();
    const input = await getText(args);
    const breaker = new TweetAutoLinkBreaker(getConfig(opts));
    const output = breaker.breakAutoLinks(input);
    process.stdout.write(output);
}

main().catch(console.error);
