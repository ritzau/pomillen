import { Drink } from "../pomillen/Drink"
import EbacProfile from "../pomillen/ebac"
import PomillenStore from "./PomillenStore"

export default class InMemoryPomillenStore implements PomillenStore {
    loadDrinks() {
        return []
    }

    loadShortcuts() {
        return []
    }

    loadProfile() {
        return EbacProfile.CreateOtherProfile()
    }

    storeDrinks(drinks: Drink[]) {}
    storeShortcuts(shortcuts: number[][]) {}
    storeProfile(profile: EbacProfile) {}

    clear() {}
}