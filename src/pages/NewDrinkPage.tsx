import React, { useState } from "react";

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
} from '@material-ui/core'

import {
    useHistory,
} from "react-router-dom"

import ArrowBackIcon from '@material-ui/icons/ArrowBackIos'

import useStyles from "../theme/styles";

interface NewDrinkProps {
    addDrink: (volumeCl: number, alcoholPercentage: number) => void
    ebac: number
    calculateEbac: (volume: number, alcoholPercentage: number) => number
}

const NewDrinkPage: React.FC<NewDrinkProps> = (props) => {
    const classes = useStyles()
    const history = useHistory()

    const [volumeString, setVolume] = useState('');
    const [percentageString, setPercentage] = useState('');

    const volume = Number.parseFloat(volumeString);
    const percentage = Number.parseFloat(percentageString);
    const disabled = isNaN(volume) || isNaN(percentage);

    function add() {
        props.addDrink(volume, percentage)
        history.goBack()
    }

    return (
        <>
            <AppBar position='static'>
            <Toolbar variant='dense'>
                    <IconButton 
                        edge='start' 
                        color='inherit' 
                        onClick={history.goBack}
                        className={classes.menuButton} 
                        >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant='h6' color='inherit'>Lägg till dricka</Typography>
                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Hur mycket'
                                placeholder='Hur mycket tänker du bälja i dig?'
                                aria-label="Dryckens volym i centiliter"
                                type='number'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            cl
                                        </InputAdornment>
                                    ),
                                    // XXX min: '0',
                                }}
                                value={volumeString}
                                onChange={e => setVolume(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Hur stark'
                                placeholder='Hur stark är drycken?'
                                aria-label="Dryckens alkolholhalt i procent"
                                type='number'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            %
                                        </InputAdornment>
                                    ),
                                    // XXX min: '0',
                                }}
                                value={percentageString}
                                onChange={e => setPercentage(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button 
                                color='default'
                                variant='contained' 
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
    );
}

export default NewDrinkPage

