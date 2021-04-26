import {
    clamp,
    minutesFromMillis,
    sum,
} from './utils'

export class Drink {
    constructor(
        public readonly timestamp: number,
        public readonly volumeCl: number,
        public readonly alcoholPercent: number,
    ) {
        if (timestamp < 0) {
            throw new RangeError("Negative timestamp")
        }

        if (volumeCl < 0) {
            throw new RangeError("Negative volume of drink")
        }

        if (alcoholPercent < 0) {
            throw new RangeError("Negative percent of alcohol")
        }
    }

    public gramsOfAlcohol(): number {
        return gramsOfAlcohol(this.volumeCl, this.alcoholPercent)
    }

    public rampedGramsOfAlcohol(now: number, absorptionMinutes: number): number {
        return rampedGramsOfAlcohol({
            gramsOfAlcohol: this.gramsOfAlcohol(),
            minutesPassed: minutesFromMillis(now - this.timestamp),
            absorptionMinutes,
        })
    }

    public toString(): string {
        return `${this.volumeCl} cl/${this.alcoholPercent} %`
    }
}

export function gramsOfAlcohol(volumeCl: number, alcoholPercent: number) {
    if (volumeCl < 0) {
        throw new RangeError("Negative volume of drink")
    }

    if (alcoholPercent < 0) {
        throw new RangeError("Negative percent of alcohol")
    }

    const ALCOHOL_GRAM_PER_CL = 7.8945
    return ALCOHOL_GRAM_PER_CL * volumeCl * alcoholPercent / 100.0
}

export function rampedGramsOfAlcohol(
    { gramsOfAlcohol, minutesPassed, absorptionMinutes }
        : { gramsOfAlcohol: number, minutesPassed: number, absorptionMinutes: number }
): number {
    if (gramsOfAlcohol < 0) {
        throw new RangeError("Negative amount of alcohol")
    }

    if (absorptionMinutes < 0) {
        throw new RangeError("Negative absorption time")
    }

    if (absorptionMinutes === 0) {
        return minutesPassed >= 0 ? gramsOfAlcohol : 0
    }

    const factor = clamp(minutesPassed / absorptionMinutes, 0, 1)
    return factor * gramsOfAlcohol
}

export function totalRampedGramsOfAlcohol(
    { millisSinceEpoch, absorptionMinutes, drinks }
        : { millisSinceEpoch: number; absorptionMinutes: number; drinks: Drink[] }
) {
    return sum(drinks.map(d => d.rampedGramsOfAlcohol(millisSinceEpoch, absorptionMinutes)))
}

export function totalGramsOfAlcohol(drinks: Drink[]) {
    return sum(drinks.map(d => d.gramsOfAlcohol()))
}
