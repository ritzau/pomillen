import React, { useContext } from "react"

import { useNavigate } from "react-router-dom"

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import clsx from "clsx"

import { PomillenContext, ProfileContext, StoreContext } from "../pomillen/contexts"
import useStyles from "../theme/styles"


const SettingsPage: React.FC = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const preferences = useContext(ProfileContext)
    const pomillenDrinks = useContext(PomillenContext)
    const pomillenStore = useContext(StoreContext)

    const [open, setOpen] = React.useState(false);

    const profile = preferences.ebac

    function reset() {
        preferences.clear()
        pomillenDrinks.clear()
        pomillenStore.clear()
        navigate('/home')
    }

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

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
                    <Typography variant="h6" color="inherit">Inställningar</Typography>
                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <Container sx={{mb: 3}}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Vad väger du?
                            </Typography>

                            <Typography color="textSecondary" gutterBottom>
                                Lika bra att riva av denna på en gång. Var nu ärlig. Ingen tittar.
                            </Typography>

                            <Slider
                                className={classes.formSlider}
                                min={50}
                                max={150}
                                value={profile.bodyWeight}
                                marks={true}
                                valueLabelDisplay="on"
                                onChange={(_, v) => preferences.updateEbacProfile({ bodyWeight: v })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Hur är det med förbränningen?
                            </Typography>

                            <Typography color="textSecondary" gutterBottom>
                                Töser ligger normalt mellan 0,14 &ndash; 0,21 med ett snitt på 0,17,
                                och pågar ligger normalt mellan 0,13 &ndash; 0,17 med ett snitt på
                                0,15.
                            </Typography>

                            <Slider
                                className={classes.formSlider}
                                min={0.10}
                                max={0.25}
                                step={0.01}
                                value={10 * profile.burnRatePerHour}
                                marks={true}
                                valueLabelDisplay="on"
                                onChange={(_, v) =>
                                    preferences.updateEbacProfile({ burnRatePerHour: (v as number) / 10 })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Hur är det med vätskebalansen?
                            </Typography>

                            <Typography color="textSecondary" gutterBottom>
                                Töser snittar på 49&nbsp;% och pågar på 58&nbsp;%.
                            </Typography>

                            <Slider
                                className={classes.formSlider}
                                min={40}
                                max={70}
                                value={100 * profile.bodyWaterRatio}
                                marks={true}
                                valueLabelDisplay="on"
                                valueLabelFormat={v => v.toFixed(0)}
                                onChange={(_, v) =>
                                    preferences.updateEbacProfile({ bodyWaterRatio: v as number / 100 })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Hur snabbt slår det på?
                            </Typography>

                            <Typography color="textSecondary" gutterBottom>
                                Svårt det där. 20 min verkar rimligt.
                            </Typography>

                            <Slider
                                className={classes.formSlider}
                                min={0}
                                max={60}
                                value={profile.absorptionMinutes}
                                marks={true}
                                valueLabelDisplay="on"
                                onChange={(_, v) => preferences.updateEbacProfile({ absorptionMinutes: v })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Radera all data
                            </Typography>

                            <Button
                                className={clsx(classes.formButton)}
                                color="error"
                                variant="contained"
                                onClick={handleClickOpen}
                            >
                                Återställ
                            </Button>

                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Vill du radera all data?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Detta kan du inte ångra.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Avbryt</Button>
                                    <Button onClick={reset} autoFocus>OK</Button>
                                </DialogActions>
                            </Dialog>

                            <Typography color="textSecondary">
                                Allt försvinner&hellip;
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    )
}

export default SettingsPage
