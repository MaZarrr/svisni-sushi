import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Grow from '@material-ui/core/Grow';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import clsx from "clsx";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {addedIngrideent} from "../reducers/shopping-cart";

export const useStyles = makeStyles(theme => ({
    buttonD: {
        background: `lightgrey`,
        textTransform: `uppercase`,
        color: `dark`,
        fontSize: 12,
        fontWeight: 500,
        zIndex: 99,
        padding: `8px 5px`,
    },
    buttonT: {
        background: `#FFAE40`,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .2)',
        textTransform: `uppercase`,
        color: `white`,
        fontWeight: 700,
        fontSize: 12,
        zIndex: 99,
        padding: `8px 5px`
    },
}));

const SplitButton = ({id, pizzaIng, ingrideents, path, sostav, addedIngrideents, ingrideentButtonStyle, height = 210, dir = "center"}) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const classes = useStyles()

    const handleChange = (event) =>  {
        addedIngrideents({id, sostav, name: event.target.name, ingrideents, check: event.target.checked, pizzaIng, path})
    };
    const handleToggle = () => setOpen((prevOpen) => !prevOpen);
    const addedIngrideent = ({sostav, pizzaIng, id}) => handleToggle();
    return (
        <Grid container direction="column" alignItems={dir}>
            <Grid item xs={12} style={{zIndex: 100}}>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button className={clsx(classes.buttonD, {
                        [classes.buttonT]: ingrideentButtonStyle})} onClick={handleToggle}>Ингридеенты</Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}>
                        <AddCircleOutlineIcon/>
                    </Button>
                </ButtonGroup>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal
                        modifiers={{flip: {enabled: false}}}>
                    {({ TransitionProps, placement }) => (
                        <Grow {...TransitionProps} style={{transformOrigin: 'bottom'}}>
                            <div>
                            <Paper style={{overflowY: `scroll`, height: `${height}px`}}>
                            <FormGroup style={{width: 240}}>
                                {ingrideents.map((el) => {
                                return (
                                <div key={String(el.id)}>
                                    <Grid container alignItems={"center"} justify={"space-between"}>
                                    <Grid item xs={6}>
                                    <FormControlLabel value={el.value} style={{margin: `auto 0`}} control={
                                            <Checkbox
                                                id={String(el.id)}
                                                checked={el[el.title]}
                                                onChange={handleChange}
                                                name={el.title}
                                                color="primary"/>}
                                                label={<Typography style={{fontSize: 14}}>{el.nameI}</Typography>}/>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography style={{textAlign: `center`,fontSize: 15}} variant={"h6"}>
                                                {`${el.value}₽`}</Typography>
                                        </Grid>
                                        </Grid>
                                    <Divider/>
                                </div>)})}
                            </FormGroup>
                            </Paper>
                            <Button style={{width: `100%`}} variant={"contained"}
                                    onClick={() => addedIngrideent({sostav, pizzaIng, id})}>Применить</Button>
                            </div>
                        </Grow>
                        )}
                </Popper>
            </Grid>
        </Grid>
    );
};

const mapDispatchToProps = {
    addedIngrideents: addedIngrideent
}
export default connect(null, mapDispatchToProps)(SplitButton)




// const [sostav, setSostav] = React.useState([]);
// console.log(sostav)
// const handleChange = (event) =>  {
    // addedIngrideents({id, sostav, name: event.target.name, ingrideents, check: event.target.checked, pizzaIng, path})
    // const ingrideent = ingrideents.find((el) => el.title === event.target.name)
    // const ingrideentIndex = sostav.findIndex((el) => el.id === ingrideent.id)
    //
    // if(ingrideentIndex === -1) {
    //
    //     // setSostav([...sostav, ingrideent])
    //     dispatch(ingrideentPlus({id, path, pizzaIng, add: ingrideent.plus, name: event.target.name, check: event.target.checked, uid: event.target.id, ingrideents}))
    // } else {
    //     const ingrideent = remove(ingrideentIndex, 1, sostav)
    //     dispatch(addedIngrideents(ingrideent))
    //     // setSostav(newSostav)
    //     dispatch(ingrideentMinus({id, path, pizzaIng, decrice: ingrideent.plus, name: event.target.name, check: event.target.checked, uid: event.target.id, ingrideents}))
    // }
    // dispatch(checker({name: event.target.name, checked: event.target.checked}))
    // setState({...state, [event.target.name]: event.target.checked})
// };
