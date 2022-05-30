import React, { ReactNode } from "react"

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import useStyles from "../theme/styles"

interface MessageProps {
    variant: "info" | "success" | "warning" | "danger"
    children: ReactNode
}

const Message: React.FC<MessageProps> = (props) => {
    const classes = useStyles()

    const className = (() => {
        switch (props.variant) {
            case "info":
                return classes.infoMessage
            case "success":
                return classes.successMessage
            case "warning":
                return classes.warningMessage
            case "danger":
                return classes.dangerMessage
        }
    })()

    return (
        <Paper elevation={0} className={className}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                {props.children}
            </Grid>
        </Paper>
    )
}

export default Message
