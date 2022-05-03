import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            light: '#4c8c4a',
            main: '#1b5e20',
            dark: '#003300',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ffffff',
            main: '#ffffff',
            dark: '#ffffff',
            contrastText: '#000',
        },
    },
});

export default theme;