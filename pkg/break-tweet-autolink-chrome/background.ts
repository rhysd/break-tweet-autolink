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
