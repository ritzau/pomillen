import { gramsOfAlcohol } from "./Drink"
import EbacProfile, { calculateEbac } from "./ebac"

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

    expect(calculateEbac({
        bodyWaterRatio: 0.58,
        bodyWeight: 93,
        waterToBloodRatio: 0.806,
        alcoholGrams: gramsOfAlcohol(4, 40),
        burnRatePerHour: 0.015,
        hoursPassed: 2,
    })).toBeCloseTo(0.04, 2)

    expect(gramsOfAlcohol(4, 40)).toBeCloseTo(12.6, 1)
})

it("handles profiles", () => {
    expect(EbacProfile.CreateProfile(58).ebac(120, 1)).toBeCloseTo(2.96)
})
