import { createTheme } from '@mui/material/styles';

import { grey, orange } from '@mui/material/colors';

export default function createPomillenTheme() {
    return createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: orange[600],
            },
            secondary: {
                main: grey[800],
                // light: "#777",
                contrastText: "#fff",
            },
        },
        typography: {
            fontFamily: [
                "BlinkMacSystemFont",
                "Lato",
                "Roboto",
                "Helvetica",
                "sans-serif",
            ].join(","),
        }
    })
}
