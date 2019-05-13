import { Message, MessageFromContent, MessageFromPopup } from './message';

// Workaround since navigator.clipboard.readText() in content script still requires user permission
// with a permission dialog even if 'clipboardRead' permission is set. This may be a bug of Chrome.
async function readClipboardText() {
    return new Promise<string>(resolve => {
        const textarea = document.createElement('textarea');
        textarea.addEventListener('input', () => {
            resolve(textarea.value);
            document.body.removeChild(textarea);
        });
        document.body.appendChild(textarea);
        textarea.focus();
        // TODO: Check result
        document.execCommand('paste');
    });
}

function writeClipboardText(text: string) {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    document.body.appendChild(textarea);
    textarea.select();
    // TODO: Check result
    document.execCommand('copy');
    textarea.blur();
    document.body.removeChild(textarea);
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'doTweetUnlink',
        title: 'Unlink Tweet Text',
        contexts: ['selection'],
        documentUrlPatterns: ['https://mobile.twitter.com/*', 'https://twitter.com/*'],
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostEquals: 'mobile.twitter.com' },
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostEquals: 'twitter.com' },
                    }),
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()],
            },
        ]);
    });
});

// TODO: Send TweetAutoLinkBreakerConfig and use it for unlinking

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId !== 'doTweetUnlink') {
        return;
    }
    if (!tab || tab.id === undefined) {
        console.error('Tab ID is not allocated!', tab);
        return;
    }
    const tabId = tab.id;
    readClipboardText()
        .then(text => {
            const msg: Message = {
                type: 'contextMenu',
                selected: info.selectionText || '',
                clipboard: text,
            };
            chrome.tabs.sendMessage(tabId, msg);
        })
        .catch(console.error);
});

chrome.runtime.onMessage.addListener((msg: MessageFromContent | MessageFromPopup, _, sendResponse) => {
    switch (msg.type) {
        case 'requestCopy': {
            writeClipboardText(msg.text);
            const res: Message = { type: 'responseCopy' };
            sendResponse(res);
            break;
        }
        case 'unlinkSelectedText': {
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                if (tabs.length === 0) {
                    return;
                }
                const tab = tabs[0];
                if (tab.id === undefined) {
                    return;
                }
                const req: Message = {
                    type: 'pageAction',
                    config: msg.config,
                };
                chrome.tabs.sendMessage(tab.id, req);
            });
            break;
        }
        default:
            console.error('FATAL: Unexpected msg:', msg);
            break;
    }
});
