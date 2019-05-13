import * as t from 'break-tweet-autolink';

export type Message =
    | {
          type: 'contextMenu';
          selected: string;
          clipboard: string;
      }
    | {
          type: 'pageAction';
          config: t.TweetAutoLinkBreakerConfig;
      }
    | {
          type: 'responseCopy';
      };

export type MessageFromContent = {
    type: 'requestCopy';
    text: string;
};

export type MessageFromPopup = {
    type: 'unlinkSelectedText';
    config: t.TweetAutoLinkBreakerConfig;
};
