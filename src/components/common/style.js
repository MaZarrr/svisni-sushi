import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import lime from '@material-ui/core/colors/lime';


export const useStylesCart = makeStyles(theme => ({
    title: {
        fontFamily: 'Comfortaa',
        fontWeight: 800,
        fontDisplay: `fallback`
    },
    titleH1: {
        fontFamily: 'Neucha',
        fontWeight: 800,
        paddingLeft: `35px`,
        paddingTop: `25px`,
        paddingBottom: `20px`,
        borderBottom: `1px solid lightgrey`
    },
    deckript: {
        fontFamily: 'Comfortaa',
        fontWeight: 800,
        fontDisplay: `fallback`,
        minHeight: 130,
        [theme.breakpoints.down('500')]: {
            minHeight: 'auto'
        }
    },
    card: {
        maxWidth: `260px`,
        // minHeight: `680px`,
        margin: `20px auto 10px auto`,
        [theme.breakpoints.down('600')]: {
            maxWidth: `300px`,
        }
    },
    media: {
        maxWidth: `400px`,
        margin: `0 auto`,
        // paddingTop: '56.25%', // 16:9
        // backgroundSize: 'contain',
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
        // margin: `auto, 0, 10px 10px`,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
    },
    overline: {
        minHeight: 55,
        display: `flex`,
        justifyContent: 'space-between',
    }
}));

export const StylingInfo = styled.section `
    font-family: 'Comfortaa', cursive;
    font-weight: 500;
    margin-top: 30px;
    h1 {
        font-family: 'Neucha', cursive;
        font-style: normal;
        font-weight: 900;
    }
    h3 {
        font-family: 'Neucha', cursive;
        font-style: normal;
        font-weight: 900;
    }
      h5 {
        font-family: 'Neucha', cursive;
        font-style: normal;
        font-weight: 900;
    }
    h2 {
        font-family: 'Neucha', cursive;
        font-style: normal;
        font-weight: 900;
    }
    .container {
        margin: 20px 0 0 30px;
        padding: 0;
        width: 90%;
    }
   
    @media screen and (max-width: 768px) {
    .container {
        margin: 0 0 0 6vw;
        padding: 0;
       
    }
      .container h1 {
        font-size: 7vw;
    }
}
`