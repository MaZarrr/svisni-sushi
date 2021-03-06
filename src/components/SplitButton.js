import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Grow from '@material-ui/core/Grow';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
// import clsx from "clsx";
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
        fontSize: 9,
        fontWeight: 500,
        zIndex: 99,
        padding: `0px`,
    },
    buttonT: {
        background: `orange`,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .2)',
        textTransform: `uppercase`,
        fontWeight: 600,
        fontSize: 9,
        zIndex: 99,
        padding: `0px`
    },
}));

// dir = "center"
const SplitButton = React.memo(({id, pizzaIng, ingrideents, path, sostav, addedIngrideents, ingrideentButtonStyle, height = 210}) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    // const classes = useStyles();

    const handleChange = (event) =>  {
        addedIngrideents({id, sostav, name: event.target.name, ingrideents, check: event.target.checked, pizzaIng, path})
    };

    const handleToggle = () => setOpen((prevOpen) => !prevOpen);
    // const addedIngrideent = ({sostav, pizzaIng, id}) => handleToggle();

    return (
        <Grid container direction="column">
            <Grid item xs={12} style={{zIndex: 100}}>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    {/*<Button className={clsx(classes.buttonD, {*/}
                    {/*    [classes.buttonT]: ingrideentButtonStyle})} onClick={handleToggle}>Ингридеенты</Button>*/}
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
                            <FormGroup style={{width: 200}}>
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
                                                label={<Typography style={{fontSize: 13}}>{el.nameI}</Typography>}/>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography style={{textAlign: `center`,fontSize: 13}} variant={"h6"}>
                                                {`${el.value}₽`}</Typography>
                                        </Grid>
                                        </Grid>
                                    <Divider/>
                                </div>)})}
                            </FormGroup>
                            </Paper>
                            <Button size={"small"} style={{width: `100%`, fontSize: 12}} variant={"contained"}
                                    onClick={() => addedIngrideent({sostav, pizzaIng, id})}>Применить</Button>
                            </div>
                        </Grow>
                        )}
                </Popper>
            </Grid>
        </Grid>
    );
});

const mapDispatchToProps = {
    addedIngrideents: addedIngrideent
};
export default connect(null, mapDispatchToProps)(SplitButton)
