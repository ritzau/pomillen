import { useEffect, useRef, useState } from "react"

import { debounce } from "../pomillen/utils"
import EbacProfile from "../pomillen/ebac"
import PomillenStore from "../store/PomillenStore"
import PomillenSettings from "../pomillen/PomillenSettings"


export function usePomillenPreferences(backingStore: PomillenStore) {
    const [ebacProfile, setEbacProfile] = useState(backingStore.loadProfile())
    const [settings, setSettings] = useState(backingStore.loadSettings())

    const isFirstUpdate = useRef(true)

    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false
            return
        }

        debouncedPersist(backingStore, ebacProfile, settings)
    },
        [backingStore, ebacProfile, settings])

    return new PomillenPreferencesImpl(
        ebacProfile,
        setEbacProfile,
        settings,
        setSettings,
    )
}

function persist(backingStore: PomillenStore, ebacProfile: EbacProfile, settings: PomillenSettings) {
    backingStore.storeProfile(ebacProfile)
    backingStore.storeSettings(settings)
}

const debouncedPersist = debounce(persist, 1000)

export interface PomillenPreferences {
    readonly ebac: EbacProfile
    readonly settings: PomillenSettings

    clear(): void
    updateEbacProfile(patch: any): void
    updateSettings(patch: any): void
}

export class PomillenPreferencesNoop implements PomillenPreferences {
    readonly ebac = EbacProfile.CreateProfile()
    readonly settings = new PomillenSettings()

    readonly setEbacProfile = (p: EbacProfile) => { }
    readonly setSettings = (s: PomillenSettings) => { }

    clear() { }
    updateEbacProfile(_patch: any) { }
    updateSettings(_patch: any) { }
}

class PomillenPreferencesImpl implements PomillenPreferences {
    constructor(
        readonly ebac: EbacProfile,
        readonly setEbacProfile: (p: EbacProfile) => void,
        readonly settings: PomillenSettings,
        readonly setSettings: (s: PomillenSettings) => void,
    ) { }

    clear() {
        this.setEbacProfile(EbacProfile.CreateProfile())
        this.setSettings(new PomillenSettings())
    }

    updateEbacProfile(patch: any) {
        // XXX: How to handle multiple invokations? Now we overwrite.
        this.setEbacProfile(EbacProfile.CreateFrom(this.ebac, patch))
    }

    updateSettings(patch: any) {
        // XXX: How to handle multiple invokations? Now we overwrite.
        this.setSettings(PomillenSettings.CreateFrom(this.settings, patch))
    }
}
