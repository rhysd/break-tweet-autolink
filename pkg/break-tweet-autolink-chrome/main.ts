import { TweetAutoLinkBreaker } from 'break-tweet-autolink';

const b = new TweetAutoLinkBreaker();
console.log(b.breakAutoLinks('Foo.app is good'));
