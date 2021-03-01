import { makeStyles } from '@material-ui/core/styles';

export const useStyleOrder = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: `100%`
    },
    paperEndOrder: {
        padding: `10px 50px`,
        [theme.breakpoints.down('500')]: {
            padding: `10px 10px`
        }
    },
    gridContainer: {
        flexGrow: 1
    },
    formControl: {
        width: `100%`
    },
    paper: {
        textAlign: 'center',
        paddingTop: 80,
        [theme.breakpoints.down('475')]: {
            paddingTop: 40
        },
    },
}));

export const useStyleSearchInput = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        width: `95%`,
        [theme.breakpoints.down('500')]: {
            border: `1px solid #282828`,
            borderRadius: 20,
            width: `98%`,
            padding: 0,
        }
    },
    input: {
        flex: 1,
        padding: 0
    },
    divider: {
        height: 28,
        margin: 4,
    }
}));


