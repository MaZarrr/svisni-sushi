import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
<<<<<<< HEAD
        // secondary: {
        //     main: '#19857b',
        // },
=======
        secondary: {
            main: '#19857b',
        },
>>>>>>> develop
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;