import { TweetAutoLinkBreaker, TweetAutoLinkBreakerConfigAll as ConfigAll, DEFAULT_CONFIG } from 'break-tweet-autolink';

const CONFIG_NAMES = Object.keys(DEFAULT_CONFIG) as Array<keyof ConfigAll>;

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

function readOptions(): ConfigAll {
    const ret: any = {};
    for (const name of CONFIG_NAMES) {
        const e = document.getElementById(`option-${name}`)! as HTMLInputElement;
        ret[name] = e.checked;
    }
    return ret;
}

document.getElementById('unlink-btn')!.addEventListener('click', () => {
    if (navigator.clipboard === undefined) {
        alert('This browser does not support clipboard API');
        return;
    }

    const breaker = new TweetAutoLinkBreaker(readOptions());

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
