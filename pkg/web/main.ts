import {
    TweetAutoLinkBreaker,
    TweetAutoLinkBreakerConfigAll as ConfigAll,
    TweetAutoLinkBreakerConfig,
    DEFAULT_CONFIG,
} from 'break-tweet-autolink';

type ConfigName = Exclude<keyof ConfigAll, 'char'>;
const CONFIG_NAMES = Object.keys(DEFAULT_CONFIG) as ConfigName[];
const CLIPBOARD_UNSUPPORTED =
    navigator.clipboard === undefined ||
    navigator.clipboard.readText === undefined ||
    navigator.clipboard.writeText === undefined;

class CheckMark {
    timer: number | null;
    elem: HTMLElement;

    constructor() {
        this.timer = null;
        this.elem = document.querySelector('.unlink-done')! as HTMLElement;
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
            // When fading out animation finishes
            this.elem.style.display = 'none';
        }
    }
}

const checkMark = new CheckMark();
const unlinkButton = document.getElementById('unlink-btn')!;

function readOptions(): ConfigAll {
    const ret: TweetAutoLinkBreakerConfig = {};
    for (const name of CONFIG_NAMES) {
        const e = document.getElementById(`option-${name}`)! as HTMLInputElement;
        ret[name] = e.checked;
    }
    return ret as ConfigAll;
}

if (CLIPBOARD_UNSUPPORTED) {
    const fallbackContainer = document.getElementById('fallback-textarea')!;
    const textarea = document.createElement('textarea');
    textarea.className = 'textarea';
    textarea.placeholder = 'Paste tweet here';
    textarea.style.marginBottom = '12px';
    fallbackContainer.appendChild(textarea);

    unlinkButton.innerText = 'Unlink';

    unlinkButton.addEventListener('click', () => {
        const breaker = new TweetAutoLinkBreaker(readOptions());
        const text = textarea.value;
        const unlinked = breaker.breakAutoLinks(text);
        if (text !== unlinked) {
            textarea.value = unlinked;
        }
        checkMark.bounceIn();
    });
} else {
    unlinkButton.addEventListener('click', () => {
        const breaker = new TweetAutoLinkBreaker(readOptions());

        navigator.clipboard
            .readText()
            .then((text) => {
                const unlinked = breaker.breakAutoLinks(text);
                if (text === unlinked) {
                    return;
                }
                return navigator.clipboard.writeText(unlinked);
            })
            .then(() => {
                checkMark.bounceIn();
            })
            .catch((err) => {
                alert(err.message);
            });
    });
}
