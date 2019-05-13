type Message =
    | {
          type: 'contextMenu';
          selected: string;
          clipboard: string;
      }
    | {
          type: 'pageAction';
      }
    | {
          type: 'responseCopy';
      };

type MessageFromContent = {
    type: 'requestCopy';
    text: string;
};
