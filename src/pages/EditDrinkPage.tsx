import React, { useContext } from "react"

import {
    useNavigate,
    useParams,
} from "react-router-dom"

import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import { Drink } from "../pomillen/Drink"
import { PomillenContext } from "../pomillen/contexts"

import useStyles from "../theme/styles"
import EditDrinkForm from "../components/EditDrinkForm"


const EditDrinkPage: React.FC = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const params = useParams()

    const pomillenDrinks = useContext(PomillenContext)

    const index = params.id === null? -1 : parseInt(params.id!)
    const drink = index < 0? null : pomillenDrinks.drinks[parseInt(params.id!)]
    const volumeClString = !drink? "" : drink!.volumeCl.toString()
    const alcoholString = !drink? "" : drink!.alcoholPercent.toString()
    const timestamp = !drink? Date.now() : drink!.timestamp

    function edit(drink: Drink) {
        pomillenDrinks.editDrink(index, drink)
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
                    <Typography variant="h6" color="inherit">Ändra dricka</Typography>
                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <Container sx={{mb: 3}}>
                    <EditDrinkForm timestamp={timestamp} volume={volumeClString} percentage={alcoholString} onSave={edit} />
                </Container>
            </main>
        </>
    )
}

export default EditDrinkPage
