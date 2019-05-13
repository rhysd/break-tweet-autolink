type Message =
    | {
          type: 'contextMenu';
          selected: string;
          clipboard: string;
      }
    | {
          type: 'pageAction';
      };
