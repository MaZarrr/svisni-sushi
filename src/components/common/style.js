import {makeStyles, withStyles} from '@material-ui/core/styles';
import styled from 'styled-components';
import Switch from "@material-ui/core/Switch";
import React from "react";

export const useStylesCart = makeStyles(theme => ({
    titleH1: {
        fontFamily: 'Oswald',
        fontWeight: 700,
        padding: `35px 10px 15px 35px`,
        fontSize: 40,
        borderBottom: `1px solid lightgrey`,
        display: `flex`,
        [theme.breakpoints.down('600')]: {
            margin: 0,
        },
        [theme.breakpoints.down('475')]: {
            fontSize: 30,
            padding: `25px 10px 15px 35px`
        }
    },
    deckript: {
       // fontFamily: 'Comfortaa',
       fontWeight: 400,
       //  fontDisplay: `fallback`,
        minHeight: 105,
        fontSize: 14,
        [theme.breakpoints.down('500')]: {
            minHeight: `30px`
        }
    },
    card: {
        maxWidth: `260px`,
        margin: `20px auto 10px auto`,
        [theme.breakpoints.down('600')]: {
            margin: `10px auto 30px auto`
        },
        [theme.breakpoints.up('960')]: {
            margin: `10px 6px 30px 6px`,
            maxWidth: `260px`,
        },
        [theme.breakpoints.down('959')]: {
            margin: `10px auto 30px auto`,
            maxWidth: `290px`,
        },
        [theme.breakpoints.up('1100')]: {
            margin: `10px auto 30px auto`
        }
    },
    media: {
        maxWidth: `99%`,
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
    // colorDefault: {
    //     backgroundColor: `red`
    // },
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
        marginTop: 10
    },
    gridContainer: {
        flexGrow: 1,
        paddingLeft: theme.spacing(3),
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
        width: `99%`
    },
    conatiner_info: {
        margin: `15px auto 15px 0`,
        border: `2px solid blue`,
        padding: 10,
        borderRadius: 10,
        maxWidth: `250px`,
    },
    conatiner_info_delivery: {
        margin: `15px auto 15px 0`
    },
    // button: {
    //     background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    //     color: 'white',
    //     marginTop: 10,
    //     textAlign: `start`,
    //     padding: 20,
    //     width: 350,
    //     [theme.breakpoints.down('sm')]: {
    //         maxWidth: '90%',
    //         padding: 50,
    //         marginBottom: 30
    //     }
    // },
    emty: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
    },
    payInfo: {
        margin: `20px 0 20px 0`,
        fontSize: 15,
        background: `#f0ecec`,
        padding: 20,
        boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.5)`,
        maxWidth: '65%',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '97%'
        }
    },
    // label: {
    //     color: `white`,
    //     fontSize: 20
    // }
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
        marginTop: 10
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
    },
    buttonD: {
        background: `lightgrey`
    },
    buttonF: {
        background: `grey`
    },
    buttonT: {
        background: `grey`,
        color: 'white'
    },
}))

export const useStyleCardIndexPage = makeStyles(theme => ({
    root: {
        margin: `0 auto`,
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        borderRadius: `15px`
    },
    title: {
        fontFamily: 'Comfortaa',
        fontWeight: 800,
        fontDisplay: `fallback`
    },
    titleH1: {
        fontFamily: 'Oswald',
        fontWeight: 700,
        padding: `35px 10px 15px 35px`,
        fontSize: 40,
        borderBottom: `1px solid lightgrey`,
        display: `flex`,
        [theme.breakpoints.down('600')]: {
            margin: 0,
        },
        [theme.breakpoints.down('475')]: {
            fontSize: 30,
            padding: `25px 10px 15px 35px`
        }
    },
    card: {
        minWidth: `85%`,
        borderRadius: `10px`,
        marginTop: 30,
        [theme.breakpoints.down('425')]: {
            maxWidth: `85%`,
        },
        [theme.breakpoints.up('768')]: {
            maxWidth: `50%`,
        },
    },
    media: {
        maxWidth: `98%`,
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
        border: `1px solid #000`,
        width: `50px`,
        height: `50px`
    },
    button: {
        margin: theme.spacing(1),
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
    },
    overline: {
        display: `flex`,
        justifyContent: 'space-between',
    },
    img: {
        margin: 0,
        padding: 0
    }
}))

export const useStyleHeader = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: '1000'
    },
    appBar: {
        display: 'flex',
        justifyContent: 'space-around',
        width: `100%`,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "white",
    },
    content_header: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%'
    },
    content_link: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: 'auto 0',
        width: '100%',
        [theme.breakpoints.down('769')]: {
            display: 'none',
        }
    }
}))

export const useStyleLayout = makeStyles(theme => ({
    root: {
        maxWidth: `1440px`,
        backgroundColor: "#fafafa",
        minHeight: `100vh`,
        margin: '75px auto 0 auto'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    }
}))

export const useStyleSearchInput = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: `95%`,
        margin: `0 auto`
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        padding: 0
    },
    divider: {
        height: 28,
        margin: 4,
    },
    iconButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: `white`,
        padding: 10,
        [theme.breakpoints.down('500')]: {
            color: `grey`,
            background: `white`,
            border: `1px solid tomato`,
        }
    }
}))

export const StylingInfo = styled.section `
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    margin-top: 30px;
     .map {
        max-width: 600px;
        margin: 0 auto 0 auto;
        width: 649px;
        height: 493px;
        border-radius: 15px;
        border: 1px solid lightgrey; 
    }
     .mapDelivery {
        border-radius: 15px;
        border: 1px solid lightgrey;
        width: 100%;
        height: 420px;
    }
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
        margin: 20px 0 0 35px;
        padding: 0;
        width: 90%;
    }

    @media screen and (max-width: 475px) {
    .container {
        margin: 0 0 0 6vw;
    }
    h1 {
    font-size: 38px;
    }
    .map {
        max-width: 310px;
        height: 360px; 
    }
     .mapDelivery { 
        height: 240px;
    }
}
`