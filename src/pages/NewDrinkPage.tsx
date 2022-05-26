import React, { useContext, useState } from "react"

import {
    useNavigate,
} from "react-router-dom"

import {
    AppBar,
    IconButton,
    Grid,
    Toolbar,
    Typography,
    TextField,
    Container,
    InputAdornment,
    Button,
} from "@material-ui/core"

import ArrowBackIcon from "@material-ui/icons/ArrowBackIos"

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
                        <ArrowBackIcon />
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
                                color="default"
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
