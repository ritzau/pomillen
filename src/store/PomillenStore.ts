import { Drink } from "../pomillen/Drink"
import EbacProfile from "../pomillen/ebac"
import PomillenSettings from "../pomillen/PomillenSettings"

export default interface PomillenStore {
    loadDrinks: () => Drink[]
    loadShortcuts: () => number[][]
    loadProfile: () => EbacProfile
    loadSettings: () => PomillenSettings

    storeDrinks: (drinks: Drink[]) => void
    storeShortcuts: (shortcuts: number[][]) => void
    storeProfile: (profile: EbacProfile) => void
    storeSettings: (settings: PomillenSettings) => void

    clear: () => void
}
