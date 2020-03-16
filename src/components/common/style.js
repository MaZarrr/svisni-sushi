import {makeStyles, withStyles} from '@material-ui/core/styles';
import styled from 'styled-components';
import lime from '@material-ui/core/colors/lime';
import Switch from "@material-ui/core/Switch";
import React from "react";

export const useStylesCart = makeStyles(theme => ({
    title: {
        fontFamily: 'Comfortaa',
        fontWeight: 800,
        fontDisplay: `fallback`
    },
    titleH1: {
        fontFamily: 'Oswald',
        fontWeight: 700,
        paddingLeft: `35px`,
        paddingTop: `25px`,
        fontSize: 46,
        paddingBottom: `20px`,
        borderBottom: `1px solid lightgrey`,
        display: `flex`,
        [theme.breakpoints.down('600')]: {
            margin: 0,
        },
        [theme.breakpoints.down('475')]: {
            margin: 0,
            fontSize: 30
        }
    },
    deckript: {
        fontFamily: 'Comfortaa',
        fontWeight: 800,
        fontDisplay: `fallback`,
        minHeight: 110,
        [theme.breakpoints.down('500')]: {
            minHeight: `30px`
        }
    },
    card: {
        maxWidth: `260px`,
        margin: `20px auto 10px auto`,
        [theme.breakpoints.down('600')]: {
            margin: `10px auto 30px auto`
        }
    },
    media: {
        maxWidth: `70%`,
        margin: `0 auto`,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: lime[50],
        background: `#fff`,
        border: `1px dotted #000`
    },
    button: {
        margin: theme.spacing(1),
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
    },
     buttonInfo: {
        margin: theme.spacing(1),
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        borderRadius: 3,
    },
    overline: {
        minHeight: 55,
        display: `flex`,
        justifyContent: 'space-between',
    }
}));

export const useStyleOrder = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    gridContainer: {
        flexGrow: 1,
        paddingLeft: theme.spacing(4),
        width: `98%`
    },
    formControl: {
        marginTop: 10,
        width: `220px`,
    },
    paper: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        marginBottom: 20,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    infoGrid: {
        display: `flex`,
        justifyContent: `center`,
        width: `100%`
    },
    conatiner_info: {
        margin: `15px auto 15px 0`,
        border: `2px solid blue`,
        padding: 10,
        borderRadius: 10,
        maxWidth: `300px`,
    },
    conatiner_info_delivery: {
        margin: `15px auto 15px 0`
    },
    button: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        color: 'white',
        marginTop: 8,
        textAlign: `start`,
        width: `300px`,
        [theme.breakpoints.down('sm')]: {
            maxWidth: '90%',
            marginBottom: 60
        }
    },
    emty: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
    },
    payInfo: {
        margin: `20px 0 20px 0`,
        fontSize: 20,
        background: `#f0ecec`,
        padding: 20,
        boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.5)`,
        maxWidth: '65%',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '90%'
        }
    }
}))

export const IOSSwitch = withStyles(theme => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52d869',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: `#00BFFF`,
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

export const useStyleKorzina = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        marginBottom: 20,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    paperDiv: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    containerWrapped: {
        marginBottom: 30
    },
    button: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        color: 'white',
        marginTop: 8,
        textAlign: `start`,
        width: `300px`,
        [theme.breakpoints.down('sm')]: {
            maxWidth: '90%'
        }
    },
    emty: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
    },
    typography: {
        fontSize: 18,
        padding: 5
    },
    bottomHead: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 60
        }
    }
}))

export const StylingInfo = styled.section `
    font-family: 'Comfortaa', cursive;
    font-weight: 500;
    margin-top: 30px;
    h1 {
        font-family: 'Oswald', cursive;
        font-style: normal;
        font-weight: 900;
        font-size: 40px;
    }
    h3 {
        font-family: 'Oswald', cursive;
        font-style: normal;
        font-weight: 900;
    }
      h5 {
        font-family: 'Oswald', cursive;
        font-style: normal;
        font-weight: 900;
    }
    h2 {
        font-family: 'Oswald', cursive;
        font-style: normal;
        font-weight: 900;
    }
    .container {
        margin: 20px 0 0 30px;
        padding: 0;
        width: 90%;
    }
   
    @media screen and (max-width: 475px) {
    .container {
        margin: 0 0 0 6vw;
    }
    h1 {
    font-size: 30px;
    }
}
`