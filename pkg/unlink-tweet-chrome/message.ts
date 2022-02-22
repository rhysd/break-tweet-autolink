import type { TweetAutoLinkBreakerConfigAll as ConfigAll } from 'break-tweet-autolink';

export type Message =
    | {
          type: 'contextMenu';
          selected: string;
          clipboard: string;
          config: ConfigAll;
      }
    | {
          type: 'pageAction';
          config: ConfigAll;
      }
    | {
          type: 'responseCopy';
      };

export type MessageFromContent = {
    type: 'requestCopy';
    text: string;
};

export type MessageFromPopup = {
    type: 'unlinkTweet';
    config: ConfigAll;
};
