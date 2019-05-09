chrome.runtime.onInstalled.addListener(() => {
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

    chrome.contextMenus.create({
        id: 'doTweetUnlink',
        title: 'Unlink Tweet Text',
        contexts: ['selection'],
        // TODO: targetUrlPatterns: ...,
    });
});

chrome.pageAction.onClicked.addListener(tab => {
    if (tab.id === undefined) {
        console.error('Tab ID is not allocated!', tab);
        return;
    }
    // TODO: Send TweetAutoLinkBreakerConfig and use it for unlinking
    const msg: Message = { type: 'unlink' };
    chrome.tabs.sendMessage(tab.id, msg);
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId !== 'doTweetUnlink') {
        return;
    }
    if (!tab || tab.id === undefined) {
        console.error('Tab ID is not allocated!', tab);
        return;
    }
    const msg: Message = {
        type: 'contextMenu',
        selected: info.selectionText || '',
    };
    chrome.tabs.sendMessage(tab.id, msg);
});
