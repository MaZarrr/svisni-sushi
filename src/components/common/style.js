import { makeStyles } from '@material-ui/core/styles';

export const useStyleH1 = makeStyles(theme => ({
    title: {
        fontWeight: 900,
        marginBottom: 0,
        textTransform: `uppercase`,
        fontSize: 34,
        [theme.breakpoints.down('600')]: {
            paddingTop: 15,
        },
        [theme.breakpoints.down('475')]: {
            fontSize: 26,
            margin: `25px 0 0 0`,
        }
    },
    wrapped: {
        marginTop: 80,
        padding: 0,
        [theme.breakpoints.down('600')]: {
            marginTop: 0
        },
    }
}));

export const useStylesCart = makeStyles(theme => ({
    deckriptSmall: {
        fontWeight: 600,
        height: 35,
        overflowY: `auto`,
        padding: 14,
        [theme.breakpoints.down('500')]: {
            minHeight: `20px`,
            padding: 14,
        },
        [theme.breakpoints.down('425')]: {
            margin: `auto 0`,
            padding: 14,
            height: `auto`,
        },
    },
    deckriptPizza: {
        fontWeight: 500,
        height: 80,
        overflowY: `auto`,
        padding: `10px 0 10px 20px`,
        [theme.breakpoints.down('500')]: {
            padding: `10px 0 10px 30px`,
            height: `auto`,
        }
    },
    deckript: {
        fontWeight: 600,
        height: 80,
        overflowY: `auto`,
        padding: 14,
        [theme.breakpoints.down('500')]: {
            padding: 10,
        },
        [theme.breakpoints.down('425')]: {
            height: `auto`,
            margin: `auto 0`,
            padding: `6px 6px 6px 14px`
        },
    },
    buttonD: {
        fontSize: 11,
        borderRadius: 8,
        padding: '6px 12px',
        border: '1px solid orange',
        lineHeight: 1.5,
        width: 105,
    },
    buttonT: {
        width: 105,
        borderRadius: 8,
        fontSize: 11,
        padding: '6px 12px',
        border: '1px solid orange',
        lineHeight: 1.5,
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'orange',
        },
        '&:focus': {
            boxShadow: 'none',
            backgroundColor: 'orange',
        },
        backgroundColor: 'orange'
    },
    card: {
        maxWidth: `290px`,
        margin: `20px auto 10px auto`,
        [theme.breakpoints.down('600')]: {
            margin: `10px auto 30px auto`
        },
        [theme.breakpoints.up('960')]: {
            margin: `10px 5% 30px 5%`
        },
        [theme.breakpoints.down('959')]: {
            margin: `10px auto 30px auto`
        },
        [theme.breakpoints.up('1100')]: {
            margin: `10px auto 30px auto`
        }
    },
    media: {
        width: `99%`,
        margin: `0 auto`
    },
    button: {
        margin: theme.spacing(1),
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
    },
}));

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

export const useStyleKorzina = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 10
    },
    wrappedContainer: {
        paddingLeft: 25,
        [theme.breakpoints.down('500')]: {
            paddingBottom: 170
        }
    }
}));

export const useStyleLayout = makeStyles({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0,
    }
});

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


