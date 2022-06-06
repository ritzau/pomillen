import React from "react"

import { useNavigate } from "react-router-dom"

import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import { version } from '../lib/version'

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
                <Container sx={{ mb: 3 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Lagring av data
                            </Typography>

                            <Typography variant="body2" gutterBottom>
                                Data lagras endast lokalt i webbläsaren.
                            </Typography>

                            <Typography variant="h6" gutterBottom mt={3}>
                                Tack
                            </Typography>

                            <Typography variant="body2" gutterBottom>
                                Beräkningar och värden som används här är baserade på rapporten
                                "Computing a BAC Estimate", utgiven av U.S. Department of Transportation
                                &mdash; National Highway Traffic Safety Administration i oktober 1994.
                                De i sin tur baserar sin rapport på svenske professor Erik Widmarks
                                arbete på 1920 &ndash; 1930-talet. Killen har ett pris uppkallat efter sig 😎.
                            </Typography>

                            <Typography variant="h6" gutterBottom mt={3}>
                                Byggd med öppen källkod
                            </Typography>

                            <Typography variant="body2" gutterBottom>
                                Detta projektet bygger på massor med kod från andra projekt som till
                                exempel:
                                <ul>
                                    <li><Link href="https://create-react-app.dev/">Create react app</Link></li>
                                    <li><Link href="https://www.highcharts.com/">Highcharts</Link></li>
                                    <li><Link href="https://mui.com/">Material UI</Link></li>
                                    <li><Link href="https://nodejs.org/">Node.js</Link></li>
                                    <li><Link href="https://www.npmjs.com/">npm</Link></li>
                                    <li><Link href="https://reactjs.org/">React JS</Link></li>
                                    <li><Link href="https://reactrouter.com/">React Router</Link></li>
                                    <li><Link href="https://www.typescriptlang.org/">Typescript</Link></li>
                                </ul>
                            </Typography>

                            <Typography variant="body2" gutterBottom>
                                Några av ikonerna är gjorda av{" "}
                                <Link href="https://www.freepik.com" title="Freepik">
                                    Freepik
                                </Link> från{" "}
                                <Link href="https://www.flaticon.com/" title="Flaticon">
                                    www.flaticon.com
                                </Link>
                            </Typography>

                            <Typography variant="body2" gutterBottom>
                                Och <Link href={process.env.PUBLIC_URL + '/third-party-licenses.txt'}>här</Link>
                                {" "}hittar du licenserna till de andra projekten som används av Pomillen.
                            </Typography>

                            <Typography variant="h6" gutterBottom mt={3}>
                                Info om Pomillen
                            </Typography>

                            <Typography variant="body2" gutterBottom>
                                Detta är version {version} av Pomillen, och du hittar koden{" "}
                                <Link href="https://github.com/ritzau/pomillen">här</Link>, och med
                                lite tur kan du rapportera buggar och förbättringsforslag där också.
                            </Typography>

                            <Typography variant="body2" gutterBottom>
                                Vill du tacka så letar du upp min adress och skickar ett vykort :)
                            </Typography>

                            <Typography variant="body2" gutterBottom>
                                Copyright (c) 2022 Tobias Ritzau
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    )
}

export default AboutPage
