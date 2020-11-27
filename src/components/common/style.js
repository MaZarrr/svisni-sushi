import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyleH1 = makeStyles(theme => ({
    title: {
        fontWeight: 900,
        paddingTop: 50,
        textTransform: `uppercase`,
        paddingLeft: `3vw`,
        fontSize: 34,
        [theme.breakpoints.down('600')]: {
            paddingTop: 15,
        },
        [theme.breakpoints.down('475')]: {
            fontSize: 26,
            margin: `25px 0 0 0`,
        }
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
        flexGrow: 1
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
        padding: theme.spacing(2),
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
        width: `100%`,
        [theme.breakpoints.down('500')]: {
            paddingBottom: 170
        }
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        paddingTop: 80,
        [theme.breakpoints.down('475')]: {
            paddingTop: 40
        },
    },
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
    }
}));

export const StyleH1Layout = styled.h1 `
       font-family: 'Montserrat', sans-serif;
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
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    margin-top: 80px;
     h1 {
        font-family: 'Montserrat', sans-serif;
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
        font-family: 'Montserrat', sans-serif;
        font-style: normal;
        font-weight: 900;
    } 
    h2 {
        font-family: 'Montserrat', sans-serif;
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
