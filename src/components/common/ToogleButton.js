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
        // flexDirection: 'column',
        justifyContent: 'center',
        '& > *': {
            margin: 0,
        },
    },
    buttonD: {
        color: `dark`,
    },
    buttonT: {
        backgroundColor: `orange`,

    },
}));

export const BootstrapButton = withStyles({
    root: {
        marginTop: 10,
        boxShadow: 'none',
        fontSize: 14,
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
    }
})(Button);

const BasicButtonGroup = ({dispatch, id, productWok}) => {
    const [wokVariant, setWokVariant] = React.useState({udon: true}, {soba: false}, {funshoza: false})
    const classes = useStyles();

    const onClickWokVariant = ({name, variant}) => {
        setWokVariant({[name]: true});
        dispatch(checkedWok({id, variant, productWok}));
    };

    return (
        <div className={classes.root}>
            <div>
                <BootstrapButton className={clsx(
                    classes.buttonD, {
                        [classes.buttonT]: wokVariant.udon})}
                                 onClick={() => onClickWokVariant({name: "udon", variant: "Удон"})}
                >Удон</BootstrapButton>
                <Typography style={{fontSize: 11, textAlign: `center`}} variant={"body2"}>пшеничная</Typography>

            </div>

            <div>
                <BootstrapButton className={clsx(
                    classes.buttonD, {
                        [classes.buttonT]: wokVariant.funshoza})}
                                 onClick={() => onClickWokVariant({name: "funshoza", variant: "Фунчоза"})}
                >Фунчоза</BootstrapButton>
                <Typography style={{fontSize: 11, textAlign: `center`}} variant={"body2"}>рисовая</Typography>

            </div>

            <div>
                <BootstrapButton className={clsx(
                    classes.buttonD, {
                    [classes.buttonT]: wokVariant.soba})}
                        onClick={() => onClickWokVariant({name: "soba", variant: "Соба"})}
                >Соба</BootstrapButton>
                <Typography style={{fontSize: 11, textAlign: `center`}} variant={"body2"}>гречневая</Typography>
            </div>

        </div>
    );
}

export default connect(null, null)(BasicButtonGroup)





// const styles = theme =>( {
// });
// const BasicButtonGroup = (props) => {
//     const { dispatch, id, productWok, classes, children, className, ...other
//     } = props;

//     return (
//             <div>
//                 <Button
//                     className={clsx(!wokVariant.udon ? classes.buttonD : classes.buttonT) }
//                     onClick={() => onClickWokVariant({name: "udon", variant: "Удон"})}
//                 >Удон</Button>
//                 <Typography style={{fontSize: 11, textAlign: `center`}} variant={"body2"}>пшеничная</Typography>
//             </div>

// export default connect(null, null)(withStyles(styles)(BasicButtonGroup))