export function millisFromHours(hours: number) {
    return millisFromMinutes(hours * 60)
}

export function millisFromMinutes(minutes: number) {
    return millisFromSeconds(minutes * 60)
}

export function millisFromSeconds(seconds: number) {
    return seconds * 1000
}

export function hoursFromMillis(millis: number): number {
    return minutesFromMillis(millis) / 60
}

export function minutesFromMillis(millis: number): number {
    return secondsFromMillis(millis) / 60
}

export function secondsFromMillis(millis: number): number {
    return millis / 1000
}

export function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(value, max))
}

export function sum(list: Array<number>): number {
    return list.reduce((a, b) => a + b, 0)
}

export const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
}