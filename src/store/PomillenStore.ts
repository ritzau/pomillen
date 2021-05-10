import { Drink } from "../pomillen/Drink"
import EbacProfile from "../pomillen/ebac"

export default interface PomillenStore {
    loadDrinks: () => Drink[]
    loadShortcuts: () => number[][]
    loadProfile: () => EbacProfile
    
    storeDrinks: (drinks: Drink[]) => void
    storeShortcuts: (shortcuts: number[][]) => void
    storeProfile: (profile: EbacProfile) => void

    clear: () => void    
}
