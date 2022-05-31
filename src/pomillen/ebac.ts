// Based on:
// Computing a BAC Estimate. National Highway Traffic Safety Administration. October, 1994.

// Younger people have a higher proportion of body water as a fraction of their total weight,
// and older people have less. Overweight individuals have a smaller proportion of their body
// weight as water, and lean people have a larger fraction of their body weight as water. In
// most cases, this variability will produce a small fraction as error in calculating BAC.
//
// Another source of variation is the amount of water in the blood which we have estimated as
// averaging 80.6%, but it varies as a function of several factors including the red blood cell
// concentration measured by the hemocrit. But again, .806 is the average value, and deviations
// typically are small.

const BODY_WATER_RATIO_FEMALE = 0.49
const BODY_WATER_RATIO_MALE = 0.58

// Although the average metabolism rate for moderate drinkers produces a .017 per hour decline
// in BAC level (here termed "Average"), and the average metabolism rate for heavy drinkers (who
// consume 60 drinks or more in one month) produces a .02 per hour decline (here termed "Above
// Average"), the range of metabolism rate in the population can go above .040 and below .010.
// One can either utilize in the calculation the average (.017 per hour decline) metabolism
// rate, or if one wished to use a very conservative figure, (which less than 20 percent of the
// population would exhibit), one could use .012 per hour decline (here termed "Below Average")

const BURN_RATE_FEMALE = 0.017 // 0.014 – 0.021
const BURN_RATE_MALE = 0.015 // 0.013 – 0.017

const WATER_TO_BLOOD_RATIO = 0.806
const DEFAULT_GREEN_LEVEL_PERMILLAGE = 0.7

const DEFAULT_ABSORPTION_MINUTES = 20

export default class EbacProfile {
    public static CreateProfile(bodyWeight: number = 100): EbacProfile {
        return new EbacProfile(
            bodyWeight,
            (BODY_WATER_RATIO_FEMALE + BODY_WATER_RATIO_MALE) / 2,
            WATER_TO_BLOOD_RATIO,
            (BURN_RATE_FEMALE + BURN_RATE_MALE) / 2,
            DEFAULT_GREEN_LEVEL_PERMILLAGE,
            DEFAULT_ABSORPTION_MINUTES)
    }

    public static CreateFromProps(props: any) {
        return new EbacProfile(
            props.bodyWeight,
            props.bodyWaterRatio,
            props.waterToBloodRatio,
            props.burnRatePerHour,
            props.greenLevelPermillage,
            props.absorptionMinutes,
        )
    }

    public static CreateFrom(profile: EbacProfile, props: any) {
        return new EbacProfile(
            props.bodyWeight ?? profile.bodyWeight,
            props.bodyWaterRatio ?? profile.bodyWaterRatio,
            props.waterToBloodRatio ?? profile.waterToBloodRatio,
            props.burnRatePerHour ?? profile.burnRatePerHour,
            props.greenLevelPermillage ?? profile.greenLevelPermillage,
            props.absorptionMinutes ?? profile.absorptionMinutes,
        )
    }

    private constructor(
        readonly bodyWeight: number,
        readonly bodyWaterRatio: number,
        readonly waterToBloodRatio: number,
        readonly burnRatePerHour: number,
        readonly greenLevelPermillage: number,
        readonly absorptionMinutes: number,
    ) { }

    public ebac(alcoholGrams: number, hoursPassed: number): number {
        return calculateEbac({
            bodyWaterRatio: this.bodyWaterRatio,
            bodyWeight: this.bodyWeight,
            waterToBloodRatio: this.waterToBloodRatio,
            alcoholGrams,
            burnRatePerHour: this.burnRatePerHour,
            hoursPassed,
        })
    }

    public minutesToGreen(ebacPermillage: number) {
        return minutesToGreen({
            ebac: ebacPermillage,
            burnRate: this.burnRatePerHour,
            greenLevel: this.greenLevelPermillage
        })
    }
}

export function calculateEbac(
    {
        bodyWaterRatio,
        bodyWeight,
        waterToBloodRatio,
        alcoholGrams,
        burnRatePerHour,
        hoursPassed,
    }: {
        bodyWaterRatio: number,
        bodyWeight: number,
        waterToBloodRatio: number,
        alcoholGrams: number,
        burnRatePerHour: number,
        hoursPassed: number,
    }
) {
    // DL since that is the unit of the stated burn rate
    const waterDl = bodyWaterRatio * bodyWeight * 10.0
    const bloodDl = waterDl / waterToBloodRatio
    const peakGramsAlcoholPerDlBlood = alcoholGrams / bloodDl
    const ebacGramsPerDl = peakGramsAlcoholPerDlBlood - burnRatePerHour * hoursPassed
    const permillage = 10 * ebacGramsPerDl

    return Math.max(0, permillage)
}

export function minutesToGreen(
    { ebac, burnRate, greenLevel }
        : { ebac: number; burnRate: number; greenLevel: number }
) {
    // DL as described above
    const gramsPerDlBloodDiff = (ebac - greenLevel) / 10
    const hoursToGreen = gramsPerDlBloodDiff / burnRate
    return Math.max(0, 60 * hoursToGreen)
}
