import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    background: `#f2f2f2`,
                },
                p: {
                  fontSize: 16,
                },
                a: {
                    backgroundColor: `transparent`,
                    textDecoration: `none`
                },
                li: {
                    margin: 0,
                    padding: 0,
                    boxSizing: `border-box`
                }
            },
        },
    },
    typography: {
        fontFamily: [
            'Montserrat',
            'sans-serif'
        ].join(','),
    },
    palette: {
        primary: {
            main: '#556cd6',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;