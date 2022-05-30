import React, { useContext } from "react"

import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import useStyles from "../theme/styles"

import { PomillenContext, ProfileContext } from "../pomillen/contexts"
import DrinksList from "../components/DrinksList"
import EbacInfo from "../components/EbacInfo"
import MainMenu from "../components/MainMenu"
import Shortcuts from "../components/Shortcuts"
import { useIntervallRefresh } from "../pomillen/hooks"
import { hoursToMilliseconds } from "date-fns"
import { ebacDataPoints } from "../pomillen/EbacCalculator"


const EbacHome: React.FC = () => {
    const classes = useStyles()
    const pomillenDrinks = useContext(PomillenContext)
    const pomillenProfile = useContext(ProfileContext)
    const currentTime = pomillenDrinks.now

    useIntervallRefresh(60 * 1000)

    const showShortcuts = pomillenDrinks.shortcuts.length > 0 || pomillenDrinks.drinks.length > 0

    let rampedEbac = ebacDataPoints(pomillenProfile.ebac, pomillenDrinks.drinks, currentTime).at(-1)![1]

    const endMillis = currentTime + hoursToMilliseconds(4)
    let data = ebacDataPoints(pomillenProfile.ebac, pomillenDrinks.drinks, endMillis)
    let peakEbac = Math.max(...data.filter((p) => p[0] >= currentTime).map((p) => p[1]))

    return (
        <>
            <AppBar position="static" color="transparent">
                <Toolbar variant="dense">
                    <Typography className={classes.title} variant="h6" color="inherit">
                        Pomillen
                    </Typography>

                    <MainMenu />
                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <EbacInfo
                                ebac={peakEbac}
                                rampedEbac={rampedEbac}
                                now={currentTime}
                                data={data} />
                        </Grid>

                        {showShortcuts && <Grid item xs={12}><Shortcuts /></Grid>}

                        <Grid item xs={12}>
                            <DrinksList />
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    )
}

export default EbacHome
