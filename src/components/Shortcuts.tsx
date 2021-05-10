import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { Grid } from "@material-ui/core"

import { Drink } from "../pomillen/Drink"
import { PomillenContext } from "../pomillen/contexts"
import { useWindowDimensions } from "../pomillen/hooks"
import ShortcutButton from "./ShortcutButton"


const Shortcuts: React.FC = () => {
    const { width: windowWidth } = useWindowDimensions()
    const pomillenDrinks = useContext(PomillenContext)

    let maxButtons: number
    let colProps: {}

    if (windowWidth < 375) {
        maxButtons = 6
        colProps = { xs: 4 }
    }
    else {
        colProps = { md: 1, sm: 2, xs: 3 }

        if (windowWidth < 600) {
            maxButtons = 8
        }
        else if (windowWidth < 960) {
            maxButtons = 6
        }
        else {
            maxButtons = 12
        }
    }

    const buttons = pomillenDrinks.shortcuts
        .slice(0, maxButtons - 1)
        .map(([cl, pct]: number[]) => (
            <Grid item key={`${cl}:${pct}`} {...colProps}>
                <ShortcutButton
                    variant="contained"
                    onClick={() => pomillenDrinks.addDrink(new Drink(Date.now(), cl, pct))}
                >
                    {cl} cl<br />{pct}&nbsp;%
                </ShortcutButton>
            </Grid>
        ))

    return (
        <Grid container spacing={1} alignItems="stretch">
            {buttons}
            <Grid item {...colProps}>
                <ShortcutButton variant="contained" component={Link} to="/add">
                    Mer
                </ShortcutButton>
            </Grid>
        </Grid>
    )
}

export default Shortcuts
