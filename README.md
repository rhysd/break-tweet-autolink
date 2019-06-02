Break Auto Links in Tweet
=========================

This repository provides a library and tools to remove auto links in tweet text.

- Library: [break-tweet-autolink][lib-npm]
- Tools:
  - GitHub pages: https://rhysd.github.io/unlink-tweet
  - Chrome Extension: [Unlink Tweet][chrome]
  - CLI: [unlink-tweet-cli][cli-npm]

Tweet form in https://twitter.com or https://mobile.twitter.com automatically links many things
such as screen names, hashtags, URLs. The library and tools provide the capability to remove these
links programmatically by inserting zero-width space (`\u200B`).

## Why?

Did you experience various stuffs are linked unintentionally? For example,

- method call such as `receiver.foo()`
- markdown file name such as `README.md`
- C's preprocessor macros such as `#include`
- Ruby's instance variable `@foo` and/or global variables `$bar`

If you experienced and felt it annoying, tools or library provided by this repository would help
you.

## Usage

### Web

As the easiest way to access the feature provided by this repository, small web app is hosted on
[GitHub pages][web].

![Screenshot for website](https://github.com/rhysd/ss/blob/master/break-tweet-autolink/web.gif)

1. Cut your tweet to clipboard at twitter.com or mobile.twitter.com
2. Visit https://rhysd.github.io/unlink-tweet
3. Click button
4. Back to Twitter and paste clipboard text

This site utilizes [`navigator.clipboard`](https://developer.mozilla.org/ja/docs/Web/API/Navigator/clipboard)
for accessing clipboard. When you click the button at first time, your browser will ask your permission.

If your browser does not support `navigator.clipboard`, it falls back to `<textarea>`. Please paste
your tweet text to the text area and click the button, then cut the text in text area.

This site is implemented [here](./pkg/web).

### Chrome Extension

If you use the feature frequently, this repository offers [a Chrome Extension][chrome].

![Screenshot for Chrome extension](https://github.com/rhysd/ss/blob/master/break-tweet-autolink/chrome.gif?raw=true)

You can easily remove auto links in selected text at twitter.com or mobile.twitter.com. The easiest
way is using a context menu item.

1. Select your tweet text in a tweet form at twitter.com or mobile.twitter.com.
2. Right click
3. Choose 'Unlink Tweet Text' item

It automatically update selected text with unlinked text.

The extension is implemented [here](./pkg/unlink-tweet-chrome). Please read its README.md for more
details.

### CLI

If you're terminal junky and post tweets from command line, this repository even offers a command
line tool to remove auto links in tweet text. [Node.js](https://nodejs.org/en/) is necessary.

To use the tool, install it via [npm](https://www.npmjs.com/)

```
$ npm install -g unlink-tweet-cli
$ unlink-tweet --help
```

Or running the command without installing the npm package thanks to [`npx`][npx] is also supported.

```
$ npx unlink-tweet-cli --help
```

Interface of the CLI is

```
unlink-tweet {text}
```

or

```
unlink-tweet [options] -- {text}
```

`{text}` can be multiple arguments. In the case, all arguments are joined with one white space.
And it outputs unlinked text to STDOUT.

The CLI tool is implemented [here](./pkg/unlink-tweet-cli). Please read its README.md for more
details.

### Library

[npm package][lib-npm] is available. It can be used programmatically from JavaScript.

```
npm install --save break-tweet-autolink
```

Please import `TweetAutoLinkBreaker` class and construct instance with configuration.

```javascript
const { TweetAutoLinkBreaker } = require('break-tweet-autolink');

const b = new TweetAutoLinkBreaker({
    hashtag: true,       // Break hashtag links such as #hashtag
    urlNoScheme: true,   // Break URLs with no scheme such as example.com
    urlWithScheme: true, // Break URLs with scheme such as https://example.com
    cashtag: true,       // Break cashtag links such as $TWTR
    mention: true,       // Break mentions such as @foo
    list: true,          // Break list mentions such as @foo/bar
});

const text = 'This #text has $MANY @autolinks please remove it.com';
const unlinked = b.breakAutoLinks(text);

console.log('Unlinked:', text);
```

The package also contains [TypeScript][ts] type definitions. Please see `index.d.ts` in the
installed package to know APIs.

## License

Library and all tools are distributed under [the MIT License](./LICENSE.txt).

[lib-npm]: https://www.npmjs.com/package/break-tweet-autolink
[cli-npm]: https://www.npmjs.com/package/unlink-tweet-cli
[chrome]: https://chrome.google.com/webstore/detail/unlink-tweet/fedknfiiihfjmacchidafeljjdhgjfce?hl=ja
[web]: https://rhysd.github.io/unlink-tweet
[npx]: https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner
[ts]: https://www.typescriptlang.org/
