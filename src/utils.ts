export function hoursFromMillis(millis: number): number {
    return minutesFromMillis(millis) / 60;
}

export function minutesFromMillis(millis: number): number {
    return secondsFromMillis(millis) / 60;
}

export function secondsFromMillis(millis: number): number {
    return millis / 1000;
}

export function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(value, max));
}

export function sum(list: Array<number>): number {
    return list.reduce((a, b) => a + b, 0);
}
