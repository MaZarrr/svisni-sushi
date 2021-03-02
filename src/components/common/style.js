import { makeStyles } from '@material-ui/core/styles';

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


