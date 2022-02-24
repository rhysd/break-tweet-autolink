export function getButtonById(id: string): HTMLButtonElement {
    const e = document.getElementById(id);
    if (e === null) {
        throw new Error(`No button element is found for ID '${id}'`);
    }
    return e as HTMLButtonElement;
}
