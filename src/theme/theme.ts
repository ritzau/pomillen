import { createMuiTheme } from "@material-ui/core";

export default function createPomillenTheme(prefersLightMode: boolean) {
    return createMuiTheme({
        palette: {
            type: prefersLightMode ? 'light' : 'dark',
            primary: {
                main: '#444444',
                light: '#666666',
                contrastText: '#ffffff',
            },
            secondary: {
                main: '#4488ff',
            },
        },
        typography: {
            fontFamily: [
                'BlinkMacSystemFont',
                'Lato',
                'Roboto',
                'Helvetica',
                'sans-serif',
            ].join(','),
        }
    })
}