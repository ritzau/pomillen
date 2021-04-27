import {
    gramsOfAlcohol,
    rampedGramsOfAlcohol,
    totalRampedGramsOfAlcohol,
    totalGramsOfAlcohol,
    Drink,
    ebacPeak,
} from './Drink'

import { millisFromMinutes } from './utils'

import { toMatchCloseTo } from 'jest-matcher-deep-close-to'

expect.extend({ toMatchCloseTo })


it('alcohol conversion', () => {
    expect(gramsOfAlcohol(0, 0)).toBe(0)
    expect(gramsOfAlcohol(1, 0)).toBe(0)
    expect(gramsOfAlcohol(0, 1)).toBe(0)

    expect(gramsOfAlcohol(1, 100)).toBeCloseTo(7.89)
    expect(gramsOfAlcohol(2, 50)).toBeCloseTo(7.89)
})

it('computes ramped alcohol', () => {
    const before = -10
    const s = 0
    const qh = 15
    const hh = 30
    const fh = 60

    const hhMin = 30

    expect(rampedGramsOfAlcohol({ gramsOfAlcohol: 0, minutesPassed: before, absorptionMinutes: hhMin })).toBe(0)
    expect(rampedGramsOfAlcohol({ gramsOfAlcohol: 0, minutesPassed: s, absorptionMinutes: hhMin })).toBe(0)
    expect(rampedGramsOfAlcohol({ gramsOfAlcohol: 0, minutesPassed: qh, absorptionMinutes: hhMin })).toBe(0)
    expect(rampedGramsOfAlcohol({ gramsOfAlcohol: 0, minutesPassed: hh, absorptionMinutes: hhMin })).toBe(0)
    expect(rampedGramsOfAlcohol({ gramsOfAlcohol: 0, minutesPassed: fh, absorptionMinutes: hhMin })).toBe(0)

    const vol = 12
    const pct = 40
    const g = gramsOfAlcohol(vol, pct)

    expect(rampedGramsOfAlcohol({ gramsOfAlcohol: g, minutesPassed: before, absorptionMinutes: hhMin })).toBe(0)
    expect(rampedGramsOfAlcohol({ gramsOfAlcohol: g, minutesPassed: s, absorptionMinutes: hhMin })).toBe(0)
    expect(rampedGramsOfAlcohol({ gramsOfAlcohol: g, minutesPassed: qh, absorptionMinutes: hhMin })).toBeCloseTo(g / 2)
    expect(rampedGramsOfAlcohol({ gramsOfAlcohol: g, minutesPassed: hh, absorptionMinutes: hhMin })).toBeCloseTo(g)
    expect(rampedGramsOfAlcohol({ gramsOfAlcohol: g, minutesPassed: fh, absorptionMinutes: hhMin })).toBeCloseTo(g)

    expect(rampedGramsOfAlcohol({ gramsOfAlcohol: g, minutesPassed: before, absorptionMinutes: 0 })).toBe(0)
    expect(rampedGramsOfAlcohol({ gramsOfAlcohol: g, minutesPassed: s, absorptionMinutes: 0 })).toBe(g)
    expect(rampedGramsOfAlcohol({ gramsOfAlcohol: g, minutesPassed: qh, absorptionMinutes: 0 })).toBe(g)
})

it('throws on bad input', () => {
    expect(() => gramsOfAlcohol(-1, 1)).toThrowError(RangeError)
    expect(() => gramsOfAlcohol(1, -1)).toThrowError(RangeError)

    expect(() => rampedGramsOfAlcohol({ gramsOfAlcohol: -1, minutesPassed: 1, absorptionMinutes: 1 })).toThrowError(RangeError)
    expect(() => rampedGramsOfAlcohol({ gramsOfAlcohol: 1, minutesPassed: 1, absorptionMinutes: -1 })).toThrowError(RangeError)
})

it('handles the drinks', () => {
    const s = 1_000_000_000
    const before = s - 600_000
    const qh = s + 900_000
    const hh = s + 1_800_000
    const fh = s + 3_600_000

    const hhMin = 30

    const vol = 12
    const pct = 40
    const g = gramsOfAlcohol(vol, pct)

    expect(new Drink(s, vol, pct).gramsOfAlcohol()).toBeCloseTo(g)
    expect(new Drink(s, vol, pct).rampedGramsOfAlcohol(before, hhMin)).toBe(0)
    expect(new Drink(s, vol, pct).rampedGramsOfAlcohol(s, hhMin)).toBe(0)
    expect(new Drink(s, vol, pct).rampedGramsOfAlcohol(qh, hhMin)).toBeCloseTo(g / 2)
    expect(new Drink(s, vol, pct).rampedGramsOfAlcohol(hh, hhMin)).toBeCloseTo(g)
    expect(new Drink(s, vol, pct).rampedGramsOfAlcohol(fh, hhMin)).toBeCloseTo(g)
})

it('handles lists of drinks', () => {
    expect(totalGramsOfAlcohol([])).toBe(0)

    const vol = 4
    const pct = 40
    const g = gramsOfAlcohol(vol, pct)
    const d = new Drink(0, vol, pct)
    const threeDrinks = [d, d, d]

    expect(totalGramsOfAlcohol(threeDrinks)).toBeCloseTo(3 * g)

    expect(totalRampedGramsOfAlcohol({
        millisSinceEpoch: 0,
        absorptionMinutes: 0,
        drinks: []
    })).toBe(0)

    expect(totalRampedGramsOfAlcohol({
        millisSinceEpoch: millisFromMinutes(1),
        absorptionMinutes: 1,
        drinks: threeDrinks
    })).toBeCloseTo(3 * g)

    expect(totalRampedGramsOfAlcohol({
        millisSinceEpoch: millisFromMinutes(1),
        absorptionMinutes: 2,
        drinks: threeDrinks
    })).toBeCloseTo(3 * g / 2)
})

it('computes peak', () => {
    const vol = 4
    const pct = 40
    const g = gramsOfAlcohol(vol, pct)
    const d = new Drink(0, vol, pct)
    const drinks = [d, d, d]
    const absorptionMinutes = 20
    const millisSinceEpoch = 0

    expect(ebacPeak({
        drinks,
        absorptionMinutes,
        millisSinceEpoch,
    })).toMatchCloseTo({peakTimeSinceEpoch: millisFromMinutes(absorptionMinutes), peakGrams: 3 * g})
})

it('computes peak that peaked already', () => {
    const vol = 4
    const pct = 40
    const g = gramsOfAlcohol(vol, pct)
    const d = new Drink(0, vol, pct)
    const drinks = [d, d, d]
    const absorptionMinutes = 20
    const millisSinceEpoch = 0

    expect(ebacPeak({
        drinks,
        absorptionMinutes,
        millisSinceEpoch: 2 * millisFromMinutes(absorptionMinutes),
    })).toMatchCloseTo({peakTimeSinceEpoch: 2 * millisFromMinutes(absorptionMinutes), peakGrams: 3 * g})
})