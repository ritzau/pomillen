import React, { useContext } from "react"

import {
    HashRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom"

import {
    CssBaseline,
    ThemeProvider,
} from "@material-ui/core"

import { PomillenContext, ProfileContext, StoreContext } from "../pomillen/contexts"
import { useDrinks } from "../model/Pomillen"
import { usePomillenPreferences } from "../model/Preferences"
import { usePomillenTheme } from "../pomillen/hooks"
import EbacHome from "../pages/EbacHome"
import NewDrinkPage from "../pages/NewDrinkPage"
import SettingsPage from "../pages/SettingsPage"
import useStyles from "../theme/styles"


const App: React.FC = () => {
    const theme = usePomillenTheme()
    const classes = useStyles()
    const store = useContext(StoreContext)
    const pomillenDrinks = useDrinks(store)
    const pomillenPreferences = usePomillenPreferences(store)

    return (
        <ThemeProvider theme={theme}>
            <ProfileContext.Provider value={pomillenPreferences}>
                <PomillenContext.Provider value={pomillenDrinks}>
                    <CssBaseline />
                    <div className={classes.root}>
                        <Router>
                            <Switch>
                                <Route exact path="/home">
                                    <EbacHome />
                                </Route>
                                <Route exact path="/add">
                                    <NewDrinkPage />
                                </Route>
                                <Route exact path="/">
                                    <Redirect to="/home" />
                                </Route>
                                <Route exact path="/config">
                                    <SettingsPage />
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                </PomillenContext.Provider>
            </ProfileContext.Provider>
        </ThemeProvider>
    )
}

export default App
