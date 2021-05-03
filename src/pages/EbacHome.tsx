import React from 'react'

import { Link } from "react-router-dom"

import {
    AppBar,
    Container,
    Grid,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import useStyles from '../theme/styles'

import Shortcuts from "../components/Shortcuts"
import DrinksList from "../components/DrinksList"
import EbacInfo from "../components/EbacInfo"
import { Drink } from "../Drink"

interface EbacHomeProps {
    ebac: number
    peakEbac: number
    rampedEbac: number
    minutesToGreen: number

    shortcuts: number[][]
    drinks: Drink[]

    calculateEbac: (volume: number, alcoholPercent: number) => number
    addDrink: (volumeCl: number, alcoholPercent: number) => void
    deleteDrink: (index: number) => void
    deleteAllDrinks: () => void
}

const EbacHome: React.FC<EbacHomeProps> = (props) => {
    const classes = useStyles()

    const showShortcuts = props.shortcuts.length > 0 || props.drinks.length > 0

    return (
        <>
            <AppBar position='static' color='transparent'>
                <Toolbar variant='dense'>
                    <Typography className={classes.title} variant='h6' color='inherit'>
                        Pomillen
                    </Typography>
                    
                    <IconButton component={Link} to='/config' color='inherit' >
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <EbacInfo
                                ebac={props.peakEbac}
                                rampedEbac={props.rampedEbac}
                                minutesToGreen={props.minutesToGreen} />
                        </Grid>

                        {showShortcuts &&
                            <Grid item xs={12}>
                                <Shortcuts
                                    shortcuts={props.shortcuts}
                                    calculateEbac={props.calculateEbac}
                                    addDrink={props.addDrink} />
                            </Grid>
                        }

                        <Grid item xs={12}>
                            <DrinksList
                                drinks={props.drinks}
                                deleteDrink={props.deleteDrink}
                                deleteAllDrinks={props.deleteAllDrinks} />
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    )
}

export default EbacHome
