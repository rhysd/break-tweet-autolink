"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const break_tweet_autolink_1 = require("break-tweet-autolink");
const CONFIG_NAMES = Object.keys(break_tweet_autolink_1.DEFAULT_CONFIG);
const CLIPBOARD_UNSUPPORTED = navigator.clipboard === undefined ||
    navigator.clipboard.readText === undefined ||
    navigator.clipboard.writeText === undefined;
class CheckMark {
    constructor() {
        this.timer = null;
        this.elem = document.querySelector('.unlink-done');
        this.elem.addEventListener('animationend', this.onAnimationEnd.bind(this));
    }
    bounceIn() {
        this.elem.classList.remove('fade-out');
        if (this.timer !== null) {
            window.clearTimeout(this.timer);
            this.timer = null;
            this.elem.style.display = 'none';
        }
        this.timer = window.setTimeout(this.fadeOut.bind(this), 2000);
        this.elem.classList.add('bounce-in');
        this.elem.style.display = 'block';
    }
    fadeOut() {
        this.elem.classList.remove('bounce-in');
        this.elem.classList.add('fade-out');
        this.timer = null;
    }
    onAnimationEnd() {
        if (this.timer === null) {
            this.elem.style.display = 'none';
        }
    }
}
const checkMark = new CheckMark();
const unlinkButton = document.getElementById('unlink-btn');
function readOptions() {
    const ret = {};
    for (const name of CONFIG_NAMES) {
        const e = document.getElementById(`option-${name}`);
        ret[name] = e.checked;
    }
    return ret;
}
if (CLIPBOARD_UNSUPPORTED) {
    const fallbackContainer = document.getElementById('fallback-textarea');
    const textarea = document.createElement('textarea');
    textarea.className = 'textarea';
    textarea.placeholder = 'Paste tweet here';
    textarea.style.marginBottom = '12px';
    fallbackContainer.appendChild(textarea);
    unlinkButton.innerText = 'Unlink';
    unlinkButton.addEventListener('click', () => {
        const breaker = new break_tweet_autolink_1.TweetAutoLinkBreaker(readOptions());
        const text = textarea.value;
        const unlinked = breaker.breakAutoLinks(text);
        if (text !== unlinked) {
            textarea.value = unlinked;
        }
        checkMark.bounceIn();
    });
}
else {
    unlinkButton.addEventListener('click', () => {
        const breaker = new break_tweet_autolink_1.TweetAutoLinkBreaker(readOptions());
        navigator.clipboard
            .readText()
            .then(text => {
            const unlinked = breaker.breakAutoLinks(text);
            if (text === unlinked) {
                return;
            }
            return navigator.clipboard.writeText(unlinked);
        })
            .then(() => {
            checkMark.bounceIn();
        })
            .catch(err => {
            alert(err.message);
        });
    });
}
//# sourceMappingURL=main.js.map