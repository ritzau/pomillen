import React, { 
    ReactNode, 
    useEffect, 
    useState 
} from "react"

import {
    Button,
    Container,
    Grid,
    Menu,
    Segment,
} from 'semantic-ui-react'

interface ShortcutProps {
    shortcuts: number[][]
    calculateEbac: (cl: number, pct: number) => number
    addDrink: (cl: number, pct: number) => void
}

const Shortcuts: React.FC<ShortcutProps> = (props: ShortcutProps) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

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
        colProps = { mobile: '4' }
    }
    else {
        colProps = {
            style:{marginLeft: '-8px', marginRight: '-8px'}, 
            computer: '2', 
            tablet: '4', 
            mobile: '8'
        }

        if (windowDimensions.width < 576) {
            maxButtons = 8
        }
        else if (windowDimensions.width < 1200) {
            maxButtons = 6
        }
        else {
            maxButtons = 12
        }
    }

    const buttons = props.shortcuts
        .slice(0, maxButtons - 1)
        .map(([cl, pct]: number[]) => (
            <Grid.Column key={`${cl}:${pct}`} {...colProps}>
                <ShortcutButton 
                    onClick={() => props.addDrink(cl, pct)} 
                    sublabel={<>{(props.calculateEbac(cl, pct)).toFixed(2)}&nbsp;&permil;</>}
                    >
                    {cl} cl/{pct}&nbsp;%
                </ShortcutButton>
            </Grid.Column>
        ))

    return (
        <Grid>
            <Grid.Row columns={12}>
            {buttons}
            <Grid.Column {...colProps}>
                <ShortcutButton basic href="#/add">
                    Mer dricka
                </ShortcutButton>
            </Grid.Column>
            </Grid.Row>
        </Grid>)
}

export default Shortcuts

// XXX: How do I get all props of Button?
interface ShortcutButtonProps {
    basic?: boolean
    href?: string
    onClick?: () => void
    children?: ReactNode
    sublabel?: ReactNode
}

const ShortcutButton: React.FC<ShortcutButtonProps> = (props: ShortcutButtonProps) => (
    <>
        <Button {...props} fluid primary compact>
            {props.children}
        </Button>
        <div>
            <small>{props.sublabel ? props.sublabel : <>&nbsp;</>}</small>
        </div>
    </>
)

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window

    return { width, height }
}