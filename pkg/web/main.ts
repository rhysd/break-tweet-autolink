import { TweetAutoLinkBreaker, TweetAutoLinkBreakerConfigAll as ConfigAll, DEFAULT_CONFIG } from 'break-tweet-autolink';

const CONFIG_NAMES = Object.keys(DEFAULT_CONFIG) as Array<keyof ConfigAll>;

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
        .catch(err => {
            alert(err.message);
        });
});
