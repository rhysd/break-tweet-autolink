chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'doTweetUnlink',
        title: 'Unlink Tweet Text',
        contexts: ['selection'],
        documentUrlPatterns: ['https://mobile.twitter.com/*', 'https://twitter.com/*'],
    });
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
