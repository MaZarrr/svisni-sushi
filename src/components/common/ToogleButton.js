import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import {checkedWok} from '../../reducers/shopping-cart';
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: "space-around",
        '& > *': {
            margin: 0,
        },
    },
    buttonD: {
        borderRadius: 5,
        padding: '6px 12px',
        border: '1px solid orange',
        width: `95%`
    },
    buttonT: {
        width: `95%`,
        borderRadius: 5,
        border: '1px solid orange',
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
}));

export const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        border: '1px solid orange',
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'orange',
        },
        '&:focus': {
            boxShadow: 'none',
            backgroundColor: 'orange',
        },
    }
})(Button);

const BasicButtonGroup = ({dispatch, id, productWok}) => {
    const [wokVariant, setWokVariant] = React.useState({udon: true}, {soba: false}, {funshoza: false});
    const classes = useStyles();

    const onClickWokVariant = ({name, variant}) => {
        setWokVariant({[name]: true});
        dispatch(checkedWok({id, variant, productWok}));
    };

    return (
        <div className={classes.root}>
            <div style={{width: `31%`}}>
                <button className={clsx(
                    classes.buttonD, {
                        [classes.buttonT]: wokVariant.udon})}
                                 onClick={() => onClickWokVariant({name: "udon", variant: "Удон"})}
                >Удон</button>
                <Typography style={{fontSize: 11, textAlign: `center`}} variant={"body2"}>пшеничная</Typography>

            </div>

            <div style={{width: `31%`}}>
                <button className={clsx(
                    classes.buttonD, {
                        [classes.buttonT]: wokVariant.funshoza})}
                                 onClick={() => onClickWokVariant({name: "funshoza", variant: "Фунчоза"})}
                >Фунчоза</button>
                <Typography style={{fontSize: 11, textAlign: `center`}} variant={"body2"}>рисовая</Typography>

            </div>

            <div style={{width: `31%`}}>
                <button className={clsx(
                    classes.buttonD, {
                    [classes.buttonT]: wokVariant.soba})}
                        onClick={() => onClickWokVariant({name: "soba", variant: "Соба"})}
                >Соба</button>
                <Typography style={{fontSize: 11, textAlign: `center`}} variant={"body2"}>гречневая</Typography>
            </div>

        </div>
    );
}

export default connect(null, null)(BasicButtonGroup)