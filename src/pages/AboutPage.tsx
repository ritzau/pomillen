import React from "react"

import { useNavigate } from "react-router-dom"

import {
    AppBar,
    Container,
    Grid,
    IconButton,
    Toolbar,
    Typography,
} from "@material-ui/core"

import ArrowBackIcon from "@material-ui/icons/ArrowBackIos"

import useStyles from "../theme/styles"


const AboutPage: React.FC = () => {
    const navigate = useNavigate()
    const classes = useStyles()

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
                    <Typography variant="h6" color="inherit">Om Pomillen</Typography>
                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h4" paragraph={true}>
                                Credit
                            </Typography>

                            <Typography paragraph={true}>
                                Beräkningar och värden som används här är baserade på rapporten
                                "Computing a BAC Estimate", utgiven av U.S. Department of Transportation
                                &mdash; National Highway Traffic Safety Administration i oktober 1994.
                                De i sin tur baserar sin rapport på svenske professor Erik Widmarks
                                arbete på 1920 &ndash; 1930-talet. Killen har ett pris uppkallat efter sig 😎.
                            </Typography>

                            <Typography paragraph={true}>
                                Copyright (c) 2021 Tobias Ritzau
                            </Typography>

                            <Typography variant="h5" paragraph={true}>
                                Open Source
                            </Typography>

                            <ul>
                                <li>Create react app</li>
                                <li>Highcharts</li>
                                <li>Material UI</li>
                                <li>Node JS</li>
                                <li>npm</li>
                                <li>React JS</li>
                                <li>React Router</li>
                                <li>Typescript</li>
                            </ul>

                            <Typography paragraph={true}>
                                Icons made by{" "}
                                <a href="https://www.freepik.com" title="Freepik">
                                    Freepik
                                </a> from{" "}
                                <a href="https://www.flaticon.com/" title="Flaticon">
                                    www.flaticon.com
                                </a>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    )
}

export default AboutPage
