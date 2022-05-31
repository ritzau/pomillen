import PomillenStore from "./PomillenStore"
import { Drink } from "../pomillen/Drink"
import EbacProfile from "../pomillen/ebac"

const DRINKS_LIST_KEY = "drinks"
const SHORTCUT_LIST_KEY = "shortcuts"
const EBAC_PROFILE_KEY = "profile"

export default class LocalStoragePomillenStore implements PomillenStore {
    loadDrinks() {
        let item = localStorage.getItem(DRINKS_LIST_KEY)
        if (item === null) {
            return []
        }

        return JSON.parse(item as string)
            .map((d: any) => new Drink(d.timestamp, d.volumeCl, d.alcoholPercent))
    }

    loadShortcuts() {
        let item = localStorage.getItem(SHORTCUT_LIST_KEY)
        if (item === null) {
            return []
        }

        return JSON.parse(item as string)
    }

    loadProfile() {
        let item = localStorage.getItem(EBAC_PROFILE_KEY)
        if (item === null) {
            return EbacProfile.CreateProfile()
        }

        return EbacProfile.CreateFromProps(JSON.parse(item as string))
    }

    storeDrinks(drinks: Drink[]) {
        localStorage.setItem(DRINKS_LIST_KEY, JSON.stringify(drinks))
    }

    storeShortcuts(shortcuts: number[][]) {
        localStorage.setItem(SHORTCUT_LIST_KEY, JSON.stringify(shortcuts))
    }

    storeProfile(profile: EbacProfile) {
        localStorage.setItem(EBAC_PROFILE_KEY, JSON.stringify(profile))
    }

    clear() {
        localStorage.clear()
    }
}
