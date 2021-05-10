import React from "react"

import { AuthState } from "@aws-amplify/ui-components"

import { PomillenDrinks, PomillenDrinksNoop } from "../model/Pomillen"
import { PomillenPreferences, PomillenPreferencesNoop } from "../model/Preferences"
import NoopPomillenStore from "../store/NoopPomillenStore"
import PomillenStore from "../store/PomillenStore"


export const AuthContext = React.createContext({
    state: undefined as AuthState | undefined,
    user: undefined as any | undefined, 
    setLogIn: (_: boolean) => {},
})

export const StoreContext = React.createContext(new NoopPomillenStore() as PomillenStore)

export const ProfileContext = React.createContext(new PomillenPreferencesNoop() as PomillenPreferences)

export const PomillenContext = React.createContext(new PomillenDrinksNoop() as PomillenDrinks)
