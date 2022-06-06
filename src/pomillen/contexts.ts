import React from "react"

import { PomillenDrinks, PomillenDrinksNoop } from "../model/Pomillen"
import { PomillenPreferences, PomillenPreferencesNoop } from "../model/Preferences"
import NoopPomillenStore from "../store/NoopPomillenStore"
import PomillenStore from "../store/PomillenStore"
import PomillenSettings from "./PomillenSettings"

export const StoreContext = React.createContext(new NoopPomillenStore() as PomillenStore)

export const ProfileContext = React.createContext(new PomillenPreferencesNoop() as PomillenPreferences)

export const SettingsContext = React.createContext(new PomillenSettings())

export const PomillenContext = React.createContext(new PomillenDrinksNoop() as PomillenDrinks)
