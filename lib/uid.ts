export function uid() {
    const rand = Math.floor(Math.random() * 1_000_000_000);
    return Date.now().toString() + rand.toString().padStart(9, '0');
}