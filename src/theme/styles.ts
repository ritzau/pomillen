import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/material/styles'

const theme = createTheme();

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    containedTable: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    content: {
        marginTop: theme.spacing(2),
    },
    dangerMessage: {
        color: theme.palette.error.main,
        padding: theme.spacing(2)
    },
    deleteButton: {
        color: `${theme.palette.error.contrastText} !important`,
        backgroundColor: `${theme.palette.error.main} !important`,
    },
    formButton: {
        float: "right",
    },
    formSlider: {
        marginTop: theme.spacing(4),
        color: theme.palette.secondary.dark,
    },
    hidden: {
        visibility: "hidden",
    },
    infoMessage: {
        color: theme.palette.text.primary,
        padding: theme.spacing(2)
    },
    listIconButton: {
        padding: 0,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    message: {
        padding: `${theme.spacing(3)} !important`,
    },
    section: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    signInSecondaryButton: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(2),
    },
    shortcutButton: {
        height: "100%",
    },
    successMessage: {
        color: theme.palette.success.main,
        padding: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
    },
    warningMessage: {
        color: theme.palette.warning.main,
        padding: theme.spacing(2)
    },
})

export default useStyles
