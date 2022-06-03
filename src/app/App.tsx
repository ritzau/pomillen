import React, { useContext } from "react"

import {
    HashRouter as Router,
    Navigate,
    Route,
    Routes,
} from "react-router-dom"

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline"

import { PomillenContext, ProfileContext, StoreContext } from "../pomillen/contexts"
import { useDrinks } from "../model/Pomillen"
import { usePomillenPreferences } from "../model/Preferences"
import AboutPage from "../pages/AboutPage"
import EbacHome from "../pages/EbacHome"
import EditDrinkPage from "../pages/EditDrinkPage"
import NewDrinkPage from "../pages/NewDrinkPage"
import SettingsPage from "../pages/SettingsPage"
import useStyles from "../theme/styles"
import createPomillenTheme from "../theme/theme";

const theme = createPomillenTheme()

const App: React.FC = () => {
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
                            <Routes>
                                <Route path="/" element={<Navigate to="/home" replace />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/add" element={<NewDrinkPage />} />
                                <Route path="/edit/:id" element={<EditDrinkPage />} />
                                <Route path="/config" element={<SettingsPage />} />
                                <Route path="/home" element={<EbacHome />} />
                            </Routes>
                        </Router>
                    </div>
                </PomillenContext.Provider>
            </ProfileContext.Provider>
        </ThemeProvider>
    )
}

export default App
