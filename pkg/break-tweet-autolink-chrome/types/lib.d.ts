type Message =
    | {
          type: 'unlink';
      }
    | {
          type: 'contextMenu';
          selected: string;
      };
