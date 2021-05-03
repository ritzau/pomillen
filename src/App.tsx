import React, { useState, useEffect } from 'react'

import {
    HashRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';

import {
    createMuiTheme,
    CssBaseline,
    ThemeProvider,
    useMediaQuery,
} from '@material-ui/core';

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
import { hoursFromMillis } from './utils';
import useStyles from './theme/styles';
import createPomillenTheme from './theme/theme';

const DEFAULT_ABSORPTION_MINUTES = 30

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
    const classes = useStyles()

    const [profile, setProfile] = useState(
        EbacProfile.CreateFrom(
            EbacProfile.CreateOtherProfile(72),
            JSON.parse(localStorage.getItem('profile') || "{}")
        ))

    const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');

    // TODO: add support for user prefs in app
    const theme = React.useMemo(
        () => createPomillenTheme(prefersLightMode),
        [prefersLightMode],
    );

    const [drinks, setDrinksState] = useState(loadDrinks())
    const [shortcuts, setShortcuts] = useState(loadShortCuts())

    const [foo, setFoo] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => setFoo(foo + 1), 1000)
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

    function reset() {
        localStorage.clear()
        setDrinks([])
        setShortcuts([])
    }

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

    function deleteAllDrinks() {
        setDrinks([])
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
        <ThemeProvider theme={theme}>
            <ProfileContext.Provider value={{ value: profile, set: updateProfile }}>
                <CssBaseline />
                <div className={classes.root}>
                    <Router>
                        <Switch>
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
                                    deleteAllDrinks={deleteAllDrinks}
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
                                <SettingsPage reset={reset} />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </ProfileContext.Provider>
        </ThemeProvider>
    )
}

export default App;
