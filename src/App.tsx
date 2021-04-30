import React, { useState, useEffect } from 'react'

import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import {
    Drink,
    ebacPeak,
    gramsOfAlcohol,
    totalGramsOfAlcohol,
    totalRampedGramsOfAlcohol,
} from "./Drink"

import EbacHome from './pages/EbacHome';
import EbacProfile from './ebac'
import SettingsPage from './pages/SettingsPage'
import NewDrinkPage from './pages/NewDrinkPage'
import { ProfileContext } from './contexts'
import { hoursFromMillis, millisFromHours } from './utils';

// import './App.css'

const DEFAULT_ABSORPTION_MINUTES = 30

function loadStartTime(): number {
    let item = localStorage.getItem('startTime')
    if (item === null) {
        let now = Date.now()
        localStorage.setItem('startTime', now.toString())
        return now
    }

    return Number.parseInt(item)
}

function loadDrinks(): Drink[] {
    let item = localStorage.getItem('drinks')
    if (item === null) {
        return []
    }

    return JSON.parse(item as string)
        .map((d: any) => new Drink(d.timestamp, d.volumeCl, d.alcoholPercent))
}

function loadShortCuts() {
    let item = localStorage.getItem('shortcuts')
    if (item === null) {
        return []
    }

    return JSON.parse(item as string)
}

const App: React.FC = () => {
    const [profile, setProfile] = useState(
        EbacProfile.CreateFrom(
            EbacProfile.CreateOtherProfile(72),
            JSON.parse(localStorage.getItem('profile') || "{}")
        ))

    const [drinks, setDrinksState] = useState(loadDrinks())
    const [shortcuts, setShortcuts] = useState(loadShortCuts())

    const [foo, setFoo] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => setFoo(foo + 1), 100)
        return () => clearInterval(timer)
    })

    const startTime = drinks.length === 0 ? Date.now() : drinks[0].timestamp

    const hoursPassed = hoursFromMillis(Date.now() - startTime)
    const alcoholGrams = totalGramsOfAlcohol(drinks)
    const ebac = profile.ebac(alcoholGrams, hoursPassed)
    const { peakTimeSinceEpoch, peakGrams } = ebacPeak({
        millisSinceEpoch: Date.now(),
        absorptionMinutes: profile.absorptionMinutes,
        drinks,
    })
    const peakEbac = profile.ebac(peakGrams, hoursFromMillis(peakTimeSinceEpoch - startTime))

    const rampedAlcoholGrams = totalRampedGramsOfAlcohol({
        millisSinceEpoch: Date.now(),
        absorptionMinutes: profile.absorptionMinutes,
        drinks,
    })
    const rampedEbac = profile.ebac(rampedAlcoholGrams, hoursPassed)

    function addDrink(volumeCl: number, alcoholPercent: number) {
        setDrinks([...drinks, new Drink(Date.now(), volumeCl, alcoholPercent)])

        const filteredList = shortcuts.filter((shortcut: number[]) => {
            const [cl, pct] = shortcut
            return !(cl === volumeCl && pct === alcoholPercent)
        })
        let newList = [[volumeCl, alcoholPercent], ...filteredList].slice(0, 11)
        setShortcuts(newList)
        localStorage.setItem('shortcuts', JSON.stringify(newList))
    }

    function deleteDrink(index: number) {
        setDrinks(drinks.filter((_, i) => i !== index))
    }

    function setDrinks(drinks: Drink[]) {
        setDrinksState(drinks)
        localStorage.setItem('drinks', JSON.stringify(drinks))
    }

    function calculateEbacX(volume: number, alcoholPercent: number) {
        return profile.ebac(alcoholGrams + gramsOfAlcohol(volume, alcoholPercent), hoursPassed)
    }

    function updateProfile(props: {}) {
        const p = EbacProfile.CreateFrom(profile, props)
        setProfile(p)
        localStorage.setItem('profile', JSON.stringify(p))
    }

    return (
        <ProfileContext.Provider value={{value: profile, set: updateProfile}}>
            <IonApp>
                <IonReactHashRouter>
                    <IonRouterOutlet>
                        <Route exact path="/home">
                            <EbacHome 
                                ebac={ebac}
                                peakEbac={peakEbac}
                                rampedEbac={rampedEbac}
                                minutesToGreen={profile.minutesToGreen(ebac)}
                                shortcuts={shortcuts}
                                drinks={drinks}
                                addDrink={addDrink}
                                deleteDrink={deleteDrink}
                                calculateEbac={calculateEbacX}
                                />
                        </Route>
                        <Route exact path="/add">
                            <NewDrinkPage 
                                addDrink={addDrink} 
                                ebac={rampedEbac} 
                                calculateEbac={calculateEbacX} 
                                />
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/home" />
                        </Route>
                        <Route exact path="/config">
                            <SettingsPage />
                        </Route>
                    </IonRouterOutlet>
                </IonReactHashRouter>
            </IonApp>
        </ProfileContext.Provider>
    )
}

export default App;
