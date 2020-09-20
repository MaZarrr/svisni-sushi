import {makeStyles, withStyles} from '@material-ui/core/styles';
import styled from 'styled-components';
import Switch from "@material-ui/core/Switch";
import React from "react";

export const useStyleH1 = makeStyles(theme => ({
    title: {
        fontFamily: `Oswald, cursive`,
        fontWeight: 800,
        paddingTop: 80,
        textTransform: `uppercase`,
        paddingLeft: 35,
        fontSize: 34,
        display: `flex`,
        [theme.breakpoints.down('600')]: {
            paddingTop: 45,
        },
        [theme.breakpoints.down('475')]: {
            fontSize: 26,
            paddingTop: 45,
            paddingBottom: 10,
            paddingLeft: `10vw`
        }
    }
}));

export const useStylesCart = makeStyles(theme => ({
    titleH1: {
        fontFamily: `Oswald, cursive`,
        fontWeight: 800,
        paddingTop: 80,
        textTransform: `uppercase`,
        paddingLeft: 35,
        fontSize: 34,
        display: `flex`,
        [theme.breakpoints.down('600')]: {
            paddingTop: 45,
        },
        [theme.breakpoints.down('475')]: {
            fontSize: 26,
            paddingTop: 45,
            paddingBottom: 10,
            paddingLeft: `10vw`
        }
    },
    deckriptSmall: {
        fontWeight: 400,
        height: 65,
        overflowY: `auto`,
        textAlign: 'center',
        padding: 14,
        [theme.breakpoints.down('500')]: {
            minHeight: `20px`,
            padding: 10,
        },
        [theme.breakpoints.down('425')]: {
            margin: `auto 0`,
            padding: 6,
            height: `auto`,
        },
    },
    deckript: {
        fontWeight: 400,
        height: 100,
        overflowY: `auto`,
        textAlign: 'center',
        padding: 14,
        [theme.breakpoints.down('500')]: {
            height: `60px`,
            padding: 10,
        },
        [theme.breakpoints.down('425')]: {
            height: `auto`,
            margin: `auto 0`,
            padding: 6
        },
    },
    buttonD: {
        width: 105,
    },
    buttonT: {
        width: 105,
        backgroundColor: 'orange'
    },
    card: {
        maxWidth: `290px`,
        margin: `20px auto 10px auto`,
        [theme.breakpoints.down('600')]: {
            margin: `10px auto 30px auto`
        },
        [theme.breakpoints.up('960')]: {
            margin: `10px 5% 30px 5%`,
            // maxWidth: `260px`,
        },
        [theme.breakpoints.down('959')]: {
            margin: `10px auto 30px auto`,
            // maxWidth: `290px`,
        },
        [theme.breakpoints.up('1100')]: {
            margin: `10px auto 30px auto`
        }
    },
    media: {
        width: `99%`,
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
    button: {
        margin: theme.spacing(1),
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
    },
    overline: {
        minHeight: 55,
        display: `flex`,
        justifyContent: 'space-between',
        [theme.breakpoints.down('425')]: {
            minHeight: 0
        },
    },
    overlinePizza: {
        paddingTop: 10,
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
        marginTop: 10,
        width: `90%`,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        paddingTop: 80,
    },
    infoGrid: {
        display: `flex`,
        justifyContent: `center`,
        width: `99%`
    },
    conatiner_info: {
        // margin: `15px auto 15px 0`,
        border: `2px solid blue`,
        padding: 5,
        borderRadius: 10,
        width: `150px`,
    },
    conatiner_info_delivery: {
        margin: `15px auto 15px 0`,
        width: `100%`
    },
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
    }
}));

export const IOSSwitch = withStyles(theme => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        // margin: theme.spacing(1),
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
        paddingTop: 80,
        textAlign: 'center',
        [theme.breakpoints.down('425')]: {
            marginBottom: 10,
        },
        zIndex: 99,
    },
    paperDiv: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    image: {
        width: 128,
        zIndex: 50,
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
        textAlign: "center",
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
    },
    typography: {
        fontSize: 22
    },
    bottomHead: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 60
        }
    },
    buttonD: {
        background: `lightgrey`,
        textTransform: `uppercase`,
        color: `dark`,
        borderRadius: 10,
        fontSize: 12,
        width: 100,
        fontWeight: 700,
        padding: `8px 5px`
    },
    buttonT: {
        background: `#FFAE40`,
        transform: `scale(1.07)`,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .2)',
        textTransform: `uppercase`,
        color: `white`,
        fontWeight: 700,
        borderRadius: 10,
        width: 100,
        fontSize: 12,
        padding: `8px 5px`
    },
}));

export const useStyleCardIndexPage = makeStyles(theme => ({
    root: {
        margin: `0 auto`,
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        borderRadius: `15px`
    },
    titleIndex: {
        textAlign: "center",
        fontSize: '36px',
        width: `100%`,
        padding: `20px 10px`,
        [theme.breakpoints.down('600')]: {
            fontSize: '26px',
            padding: `10px 10px`
        },
    },
    titleIndexVacancy: {
        fontFamily: `Oswald, cursive`,
        fontWeight: 800,
        marginTop: 80,
        textTransform: `uppercase`,
        marginLeft: 35,
        fontSize: 34,
        display: `flex`,
        [theme.breakpoints.down('475')]: {
            fontSize: 26,
            marginTop: 40,
            marginLeft: 35
        }
    },
    cardCombo: {
        maxWidth: 350,
        borderRadius: `10px`,
        [theme.breakpoints.down('500')]: {
            maxHeight: `98%`
        },
    },
    cardComboPc: {
        borderRadius: `10px`,
        width: `100%`,
        margin: `10px auto 0 auto`,
        [theme.breakpoints.up('500')]: {
            maxWidth: `75%`,
        },
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
    }
}));

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
}));

export const StyleH1Layout = styled.h1 `
       font-family: 'Oswald', cursive;
        font-style: normal;
        font-weight: 800;
        text-transform: uppercase;
        font-size: 34px;
     @media screen and (max-width: 475px) { 
        font-size: 26px; 
    }
`;

export const WrappedContentLayout = styled.div `
       margin-top: 80px;
     @media screen and (max-width: 475px) { 
        margin-top: 45px; 
    }
`;

export const StylingInfo = styled.section ` 
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    margin-top: 80px;
     h1 {
        font-family: 'Oswald', cursive;
        font-style: normal;
        font-weight: 800;
        text-transform: uppercase;
        font-size: 34px;
    }
    .info-block {
        margin-top: 20px;
        margin-bottom: 20px;
        border-left: 5px solid lightgrey;
        padding: 7px 5px 7px 14px;
    }
    .map {
        padding-right: 20px; 
        width: 95%;
       height: 400px;
    }
     .mapDelivery {
        border-radius: 15px;
        border: 1px solid lightgrey;
        width: 100%;
        height: 420px;
    }
      .imgSale {
        max-width: 60vw; 
        margin-top: 30px; 
        borderRadius: 12px;
    }
   
    h3 {
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
        width: 89%;
    }
    
    @media screen and (max-width: 475px) {
    margin-top: 45px;
    h1 {
        font-size: 26px;
        text-transform: uppercase;
    }
     .mapDelivery { 
        height: 240px;
    }
    .imgSale {
        max-width: 90vw; 
        margin-top: 30px; 
        borderRadius: 12px;
    }
}
    @media screen and (max-width: 600px) {
    .map {
       padding-right: 20px;
       padding-left: 20px;
       height: 250px;
    } 
}`;
