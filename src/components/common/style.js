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
        fontFamily: 'Oswald',
        fontWeight: 700,
        paddingLeft: `35px`,
        paddingTop: `25px`,
        fontSize: 46,
        paddingBottom: `20px`,
        borderBottom: `1px solid lightgrey`,
        [theme.breakpoints.down('600')]: {
            margin: 0
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
            margin: `0 auto 30px auto`
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
        padding-bottom: 50px;
    }
   
    @media screen and (max-width: 768px) {
    .container {
        margin: 0 0 0 6vw;
        padding-bottom: 50px;
       
    }
}
`