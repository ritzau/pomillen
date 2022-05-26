import React from "react"

import { PomillenDrinks, PomillenDrinksNoop } from "../model/Pomillen"
import { PomillenPreferences, PomillenPreferencesNoop } from "../model/Preferences"
import NoopPomillenStore from "../store/NoopPomillenStore"
import PomillenStore from "../store/PomillenStore"

export const StoreContext = React.createContext(new NoopPomillenStore() as PomillenStore)

export const ProfileContext = React.createContext(new PomillenPreferencesNoop() as PomillenPreferences)

export const PomillenContext = React.createContext(new PomillenDrinksNoop() as PomillenDrinks)
