import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from "gatsby";

const useStyles = makeStyles((theme) => ({
    root: {
        position: `fixed`,
        zIndex: 1200,
        top: theme.spacing(28),
        left: theme.spacing(2.8),
        [theme.breakpoints.down('768')]: {
            top: theme.spacing(25),
            left: theme.spacing(1.8),
        },
    },
    sizeButton: {
        width: 55,
        height: 55,
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
                 to={back}
                 state={{animate: true}}
                 aria-label="ArrowBack"
                 className={classes.sizeButton} >
                <ArrowBackIcon />
            </Fab>
        </div>
    );
}