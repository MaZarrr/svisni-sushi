// import { purple, red } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const lightRed = '#f4511e';
const hardBrown = '#3e2723';
export const hardGrey = '#212121';
const lightBlue = '#03a9f4';
export const hardPink = '#ad1457';
const hardRed = '#e53935';
export const blueDef = '#1976d2';
export const yellowDef = '#ffeb3b';
export const orange = '#ffab00';

// A custom theme for this app
const theme = createTheme(({
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            body {
                color: hsla(0 0% 0% 0.8);
                font-family: Montserrat, sans-serif;
                font-weight: normal;
                word-wrap: break-word;
                font-kerning: normal;
            },
            p {
              font-size: 16px;
            },
            a {
                color: #3e2723 !important;
                text-decoration: none;
            },
            li {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            `
        },
    },
    typography: {
        fontFamily: [
            'Montserrat',
            'sans-serif'
        ].join(','),
        h1: {
            fontSize: "2.5rem",
            fontFamily: "Montserrat",
            fontWeight: 700
        },
        h2: {
            fontSize: "1.7rem",
            fontFamily: "Montserrat",
            fontWeight: 600
        },
        h3: {
            fontSize: "1.4rem",
            fontFamily: "Montserrat",
            fontWeight: 600
        },
        h4: {
            fontSize: "1.5rem",
            fontFamily: "Montserrat",
            fontWeight: 600,
        },
        h5: {
            fontSize: "1rem",
            fontFamily: "Montserrat",
        },
        h6: {
            fontSize: "0.7rem",
            fontFamily: "Montserrat",
        },
        subtitle1: {
            fontSize: "1.2rem",
            fontFamily: "Montserrat",
            fontWeight: 600
        },
        subtitle2: {
            fontSize: "0.9rem",
            fontFamily: "Montserrat",
            fontWeight: 500
        },
        button: {
            fontSize: "1rem",
            fontFamily: "Montserrat",
            fontWeight: 300,
            textTransform: 'uppercase'
        },
        body1: {
            fontSize: "1rem",
            fontFamily: "Montserrat",
            fontWeight: 600
        },
        body2: {
            fontSize: "0.8rem",
            fontFamily: "Montserrat",
            fontWeight: 500,
        },
    },
    palette: {
        primary: {
            main: '#303032',
        },
        secondary: {
            main: '#ffc107',
        },
        inherit: {
            main: '#e91e637',
        },
        error: {
            // main: red.A400,
            main: "#e91e63",
        },
        background: {
            default: '#fff',
        },
        common: {
            lightRed,
            hardBrown,
            hardGrey,
            lightBlue,
            hardPink,
            hardRed,
            blueDef,
            yellowDef
        }
    },
}));

export default responsiveFontSizes(theme);