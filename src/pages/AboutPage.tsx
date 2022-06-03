import React from "react"

import { useNavigate } from "react-router-dom"

import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

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
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">Om Pomillen</Typography>
                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h4" paragraph={true}>
                                Lagring av data
                            </Typography>

                            <Typography paragraph={true}>
                                Data lagras endast lokalt i webbläsaren.
                            </Typography>

                            <Typography variant="h4" paragraph={true}>
                                Tack
                            </Typography>

                            <Typography paragraph={true}>
                                Beräkningar och värden som används här är baserade på rapporten
                                "Computing a BAC Estimate", utgiven av U.S. Department of Transportation
                                &mdash; National Highway Traffic Safety Administration i oktober 1994.
                                De i sin tur baserar sin rapport på svenske professor Erik Widmarks
                                arbete på 1920 &ndash; 1930-talet. Killen har ett pris uppkallat efter sig 😎.
                            </Typography>

                            <Typography variant="h5" paragraph={true}>
                                Byggd med öppen källkod
                            </Typography>

                            <ul>
                                <li><a href="https://create-react-app.dev/">Create react app</a></li>
                                <li><a href="https://www.highcharts.com/">Highcharts</a></li>
                                <li><a href="https://mui.com/">Material UI</a></li>
                                <li><a href="https://nodejs.org/">Node.js</a></li>
                                <li><a href="https://www.npmjs.com/">npm</a></li>
                                <li><a href="https://reactjs.org/">React JS</a></li>
                                <li><a href="https://reactrouter.com/">React Router</a></li>
                                <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
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

                            <Typography paragraph={true}>
                                Copyright Tobias Ritzau
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    )
}

export default AboutPage
