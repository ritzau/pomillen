import { Drink } from "../pomillen/Drink"
import EbacProfile from "../pomillen/ebac"
import PomillenSettings from "../pomillen/PomillenSettings"
import PomillenStore from "./PomillenStore"

export default class InMemoryPomillenStore implements PomillenStore {
    loadDrinks() {
        return []
    }

    loadShortcuts() {
        return []
    }

    loadProfile() {
        return EbacProfile.CreateProfile()
    }

    loadSettings() {
        return new PomillenSettings()
    }

    storeDrinks(drinks: Drink[]) {}
    storeShortcuts(shortcuts: number[][]) {}
    storeProfile(profile: EbacProfile) {}
    storeSettings(settings: PomillenSettings) {}

    clear() {}
}
