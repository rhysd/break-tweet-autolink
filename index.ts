import * as tw from 'twitter-text';

console.log(tw.extractEntitiesWithIndices(tw.htmlEscape('this @is #text and foo.bar.com')));
