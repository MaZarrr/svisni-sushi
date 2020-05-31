import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from "gatsby";

const useStyles = makeStyles((theme) => ({
    root: {
        // '& > *': {
        //     margin: theme.spacing(1),
        // },
        position: `fixed`,
        zIndex: 1200,
        top: theme.spacing(28),
        left: theme.spacing(2.8),
        [theme.breakpoints.down('768')]: {
            top: theme.spacing(17),
            left: theme.spacing(5.8),
        },
    },
    sizeButton: {
        width: 45,
        height: 45,
        opacity: 0.65,
        [theme.breakpoints.up('768')]: {
            width: 55,
            height: 55,
            opacity: 0.85

        }
    }
}));

export default function ButtonBackSet({back}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Fab component={Link}
                 to={back} color="extended"
                 aria-label="ArrowBack"
                 className={classes.sizeButton} >
                <ArrowBackIcon />
            </Fab>
        </div>
    );
}