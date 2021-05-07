import React, {
    ReactNode,
    useEffect,
    useState
} from "react"

import { Button, Grid } from '@material-ui/core'
import { Link } from "react-router-dom"

import useStyles from "../theme/styles";

interface ShortcutProps {
    shortcuts: number[][]
    calculateEbac: (cl: number, pct: number) => number
    addDrink: (cl: number, pct: number) => void
}

const Shortcuts: React.FC<ShortcutProps> = (props) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    let maxButtons: number
    let colProps: {}
    if (windowDimensions.width < 375) {
        maxButtons = 6
        colProps = { xs: 4 }
    }
    else {
        colProps = { md: 1, sm: 2, xs: 3 }

        if (windowDimensions.width < 600) {
            maxButtons = 8
        }
        else if (windowDimensions.width < 960) {
            maxButtons = 6
        }
        else {
            maxButtons = 12
        }
    }

    const buttons = props.shortcuts
        .slice(0, maxButtons - 1)
        .map(([cl, pct]: number[]) => (
            <Grid item key={`${cl}:${pct}`} {...colProps}>
                <ShortcutButton
                    variant='contained'
                    onClick={() => props.addDrink(cl, pct)}
                    >
                    {cl} cl<br />{pct}&nbsp;%
                </ShortcutButton>
            </Grid>
        ))

    return (
        <Grid container spacing={1} alignItems='stretch'>
            {buttons}
            <Grid item {...colProps}>
                <ShortcutButton variant='contained' component={Link} to="/add">
                    Mer
                </ShortcutButton>
            </Grid>
        </Grid>
    )
}

export default Shortcuts

// XXX: How do I get all props of Button?
interface ShortcutButtonProps {
    variant?: 'outlined' | 'contained' | 'text'
    onClick?: () => void
    children?: ReactNode
    component?: ReactNode
    to?: string
}

const ShortcutButton: React.FC<ShortcutButtonProps> = (props) => {
    const classes = useStyles()

    return (
        <>
            <Button 
                fullWidth
                size='small' 
                color='primary' 
                {...props} 
                className={classes.shortcutButton}
                >
                {props.children}
            </Button>
        </>
    );
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window

    return { width, height }
}