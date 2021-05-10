import { gramsOfAlcohol } from "./Drink"
import EbacProfile, { calculateEbac, minutesToGreen } from "./ebac"

it("calculates ebac", () => {
    // Sample from cited EBAC report
    expect(calculateEbac({
        bodyWaterRatio: 0.58,
        bodyWeight: 128 / 2.2046, // 128 lbs
        waterToBloodRatio: 0.806,
        alcoholGrams: 23.36 * 0.54,
        burnRatePerHour: 0.012,
        hoursPassed: 1,
    })).toBeCloseTo(0.182, 3)

    expect(calculateEbac({
        bodyWaterRatio: 0.58,
        bodyWeight: 93,
        waterToBloodRatio: 0.806,
        alcoholGrams: gramsOfAlcohol(12, 40),
        burnRatePerHour: 0.015,
        hoursPassed: 0,
    })).toBeCloseTo(0.566, 3)

    expect(calculateEbac({
        bodyWaterRatio: 0.58,
        bodyWeight: 93,
        waterToBloodRatio: 0.806,
        alcoholGrams: gramsOfAlcohol(12, 40),
        burnRatePerHour: 0.015,
        hoursPassed: 3,
    })).toBeCloseTo(0.116, 3)
})

it("calculates the minutes to green", () => {
    expect(minutesToGreen({ ebac: 1, burnRate: 0.05, greenLevel: 0 })).toBe(120)
    expect(minutesToGreen({ ebac: 0, burnRate: 0.05, greenLevel: 1 })).toBe(0)
})

it("handles profiles", () => {
    expect(EbacProfile.CreateProfile(58).ebac(120, 1)).toBeCloseTo(2.96)
    expect(EbacProfile.CreateProfile(58).minutesToGreen(1)).toBeCloseTo(112.50, 2)
})
