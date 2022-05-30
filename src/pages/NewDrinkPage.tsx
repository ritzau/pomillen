import React, { useContext, useState } from "react"

import {
    useNavigate,
} from "react-router-dom"

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import { Drink } from "../pomillen/Drink"
import { PomillenContext } from "../pomillen/contexts"
import useStyles from "../theme/styles"


const NewDrinkPage: React.FC = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    const pomillenDrinks = useContext(PomillenContext)

    const [volumeString, setVolume] = useState("")
    const [percentageString, setPercentage] = useState("")

    const volume = Number.parseFloat(volumeString)
    const percentage = Number.parseFloat(percentageString)
    const disabled = isNaN(volume) || isNaN(percentage)

    function add() {
        pomillenDrinks.addDrink(new Drink(Date.now(), volume, percentage))
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
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Hur mycket"
                                placeholder="Hur mycket tänker du bälja i dig?"
                                aria-label="Dryckens volym i centiliter"
                                type="number"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            cl
                                        </InputAdornment>
                                    ),
                                    // XXX min: "0",
                                }}
                                value={volumeString}
                                onChange={e => setVolume(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Hur stark"
                                placeholder="Hur stark är drycken?"
                                aria-label="Dryckens alkolholhalt i procent"
                                type="number"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            %
                                        </InputAdornment>
                                    ),
                                    // XXX min: "0",
                                }}
                                value={percentageString}
                                onChange={e => setPercentage(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button 
                                variant="contained" 
                                fullWidth 
                                disabled={disabled} 
                                onClick={add} 
                                >
                                Lägg till
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    )
}

export default NewDrinkPage
