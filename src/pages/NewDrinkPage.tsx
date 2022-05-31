import React, { useContext } from "react"

import {
    useNavigate,
} from "react-router-dom"

import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import { Drink } from "../pomillen/Drink"
import { PomillenContext } from "../pomillen/contexts"
import useStyles from "../theme/styles"
import EditDrinkForm from "../components/EditDrinkForm"

const NewDrinkPage: React.FC = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    const pomillenDrinks = useContext(PomillenContext)

    function add(drink: Drink) {
        pomillenDrinks.addDrink(drink)
        navigate('/home')
    }

    return (
        <>
            <AppBar position="static">
            <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => navigate('/home')}
                        className={classes.menuButton}
                        >
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">Lägg till dricka</Typography>
                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <Container>
                    <EditDrinkForm timestamp={Date.now()} volume={""} percentage={""} onSave={add} />
                </Container>
            </main>
        </>
    )
}

export default NewDrinkPage
