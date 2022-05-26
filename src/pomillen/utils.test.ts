import {
    clamp,
    hoursFromMillis,
    millisFromHours,
    millisFromMinutes,
    millisFromSeconds,
    minutesFromMillis,
    secondsFromMillis,
    sum,
} from "./utils"

it("clamps numbers", () => {
    expect(clamp(1, 0, 2)).toEqual(1)
    expect(clamp(0, 0, 2)).toEqual(0)
    expect(clamp(2, 0, 2)).toEqual(2)
    expect(clamp(-1, 0, 2)).toEqual(0)
    expect(clamp(3, 0, 2)).toEqual(2)
})

it("converts time", () => {
    expect(secondsFromMillis(0)).toEqual(0)
    expect(secondsFromMillis(10_000)).toEqual(10)
    expect(secondsFromMillis(120_000)).toEqual(120)
    expect(secondsFromMillis(500)).toBeCloseTo(0.5)

    expect(minutesFromMillis(0)).toEqual(0)
    expect(minutesFromMillis(60_000)).toEqual(1)
    expect(minutesFromMillis(90_000)).toBeCloseTo(1.5)

    expect(hoursFromMillis(0)).toEqual(0)
    expect(hoursFromMillis(3_600_000)).toEqual(1)
    expect(hoursFromMillis(86_400_000)).toEqual(24)
    expect(hoursFromMillis(1_800_000)).toBeCloseTo(0.5)

    expect(millisFromSeconds(0)).toBe(0)
    expect(millisFromSeconds(10)).toBe(10_000)
    expect(millisFromSeconds(120)).toBe(120_000)
    expect(millisFromSeconds(0.5)).toBeCloseTo(500)

    expect(millisFromMinutes(0)).toBe(0)
    expect(millisFromMinutes(1)).toBe(60_000)
    expect(millisFromMinutes(1.5)).toBeCloseTo(90_000)

    expect(millisFromHours(0)).toBe(0)
    expect(millisFromHours(1)).toBe(3_600_000)
    expect(millisFromHours(24)).toBe(86_400_000)
    expect(millisFromHours(0.5)).toBeCloseTo(1_800_000)
})

it("sums numbers", () => {
    expect(sum([])).toEqual(0)
    expect(sum([1, 2])).toEqual(3)
    expect(sum([2, 2])).toEqual(4)
})
