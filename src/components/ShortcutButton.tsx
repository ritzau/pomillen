import React, { ReactNode } from "react"

import Button from '@mui/material/Button'

import useStyles from "../theme/styles"


// XXX: How do I get all props of Button?
interface ShortcutButtonProps {
    variant?: "outlined" | "contained" | "text"
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
                size="small"
                color="primary"
                {...props}
                className={classes.shortcutButton}
            >
                {props.children}
            </Button>
        </>
    )
}

export default ShortcutButton
