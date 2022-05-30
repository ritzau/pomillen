import React, { useContext } from "react"

import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import useStyles from "../theme/styles"

import { ebacPeak, totalGramsOfAlcohol, totalRampedGramsOfAlcohol } from "../pomillen/Drink"
import { hoursFromMillis } from "../pomillen/utils"
import { PomillenContext, ProfileContext } from "../pomillen/contexts"
import DrinksList from "../components/DrinksList"
import EbacInfo from "../components/EbacInfo"
import MainMenu from "../components/MainMenu"
import Shortcuts from "../components/Shortcuts"


const EbacHome: React.FC = () => {
    const classes = useStyles()
    const pomillenDrinks = useContext(PomillenContext)
    const pomillenProfile = useContext(ProfileContext)

    const currentTime = Date.now() // FIXME?
    
    const showShortcuts = pomillenDrinks.shortcuts.length > 0 || pomillenDrinks.drinks.length > 0

    const startTime = pomillenDrinks.drinks.length === 0 ? currentTime : pomillenDrinks.drinks[0].timestamp

    const hoursPassed = hoursFromMillis(currentTime - startTime)
    const alcoholGrams = totalGramsOfAlcohol(pomillenDrinks.drinks)
    const ebac = pomillenProfile.ebac.ebac(alcoholGrams, hoursPassed)
    const { peakTimeSinceEpoch, peakGrams } = ebacPeak({
        millisSinceEpoch: currentTime,
        absorptionMinutes: pomillenProfile.ebac.absorptionMinutes,
        drinks: pomillenDrinks.drinks,
    })
    const peakEbac = pomillenProfile.ebac.ebac(peakGrams, hoursFromMillis(peakTimeSinceEpoch - startTime))

    const rampedAlcoholGrams = totalRampedGramsOfAlcohol({
        millisSinceEpoch: currentTime,
        absorptionMinutes: pomillenProfile.ebac.absorptionMinutes,
        drinks: pomillenDrinks.drinks,
    })
    const rampedEbac = pomillenProfile.ebac.ebac(rampedAlcoholGrams, hoursPassed)

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
                                minutesToGreen={pomillenProfile.ebac.minutesToGreen(ebac)} />
                        </Grid>

                        {showShortcuts &&
                            <Grid item xs={12}>
                                <Shortcuts />
                            </Grid>
                        }

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
