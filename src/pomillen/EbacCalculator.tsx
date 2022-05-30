import { minutesToMilliseconds } from "date-fns"

import { Drink, totalRampedGramsOfAlcohol } from "./Drink"
import EbacProfile from "./ebac"

class EbacCalculator {
    profile: EbacProfile
    result: number[][] = []
    drinks: Drink[] = []
    peaks: number[] = []

    constructor(profile: EbacProfile) {
        this.profile = profile
    }

    dataPoints(drinks: Drink[], endMillis: number) {
        for (let drink of drinks) {
            this.add(drink.timestamp)
            this.drinks.push(drink)
            this.peaks.push(drink.timestamp + minutesToMilliseconds(this.profile.absorptionMinutes))
        }

        this.add(endMillis)

        return this.result
    }

    add(timestamp: number) {
        while (this.peaks.length > 0 && this.peaks[0] < timestamp) {
            this.addDataPoint(this.peaks.shift()!)
        }

        this.addDataPoint(timestamp)
    }

    addDataPoint(timestamp: number) {
        if (this.drinks.length === 0) {
            this.result.push([timestamp, 0])
        }
        else {
            let ebac = this.ebac(this.drinks[0].timestamp, timestamp)

            if (ebac < 0) {
                this.drinks.length = 0

                let [t0, p0] = this.result[this.result.length - 1]
                let f = p0 / (p0 - ebac)
                let soberTime = t0 + Math.floor((timestamp - t0) * f)

                this.result.push([soberTime, 0])
                this.result.push([timestamp, 0])
            }
            else {
                this.result.push([timestamp, ebac])
            }
        }
    }

    ebac(startTime: number, timestamp: number): number {
        let grams = totalRampedGramsOfAlcohol({
            millisSinceEpoch: timestamp,
            absorptionMinutes: this.profile.absorptionMinutes,
            drinks: this.drinks,
        })

        return this.profile.ebac(grams, (timestamp - startTime) / 3600000)
    }
}

export function ebacDataPoints(profile: EbacProfile, drinks: Drink[], endMillis: number): number[][] {
    return new EbacCalculator(profile).dataPoints(drinks, endMillis)
}
