import { useEffect, useRef, useState } from "react"

import { debounce } from "../pomillen/utils"
import EbacProfile from "../pomillen/ebac"
import PomillenStore from "../store/PomillenStore"


export function usePomillenPreferences(backingStore: PomillenStore) {
    const [ebacProfile, setEbacProfile] = useState(backingStore.loadProfile())

    const isFirstUpdate = useRef(true)


    useEffect(() => {
            if (isFirstUpdate.current) {
                isFirstUpdate.current = false
                return
            }

            debouncedPersist(backingStore, ebacProfile)
        },
        [backingStore, ebacProfile])
        
    return new PomillenPreferencesImpl(ebacProfile, setEbacProfile)
}

function persist(backingStore: PomillenStore, ebacProfile: EbacProfile) {
    console.log("persist", ebacProfile)
    backingStore.storeProfile(ebacProfile)
}

const debouncedPersist = debounce(persist, 1000)

export interface PomillenPreferences {
    readonly ebac: EbacProfile

    updateEbacProfile(patch: any): void
}

export class PomillenPreferencesNoop implements PomillenPreferences {
    readonly ebac = EbacProfile.CreateProfile()
    readonly setEbacProfile = (p : EbacProfile) => {}

    updateEbacProfile(_patch: any) {}
}

class PomillenPreferencesImpl implements PomillenPreferences {
    constructor(
        readonly ebac: EbacProfile,
        readonly setEbacProfile: (p : EbacProfile) => void
    ) {}

    updateEbacProfile(patch: any) {
        // XXX: How to handle multiple invokations? Now we overwrite.
        this.setEbacProfile(EbacProfile.CreateFrom(this.ebac, patch))
    }
}
