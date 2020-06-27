import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

import Checkbox from "@material-ui/core/Checkbox";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SplitButton() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const classes = useStyles();

    const [ingrideents, setIngrideents] = React.useState([
        {
            id: 1,
            nameI: "Ананас",
            priceI: 39,
            title: "ananas",
            ananas : false
        },
        {
            id: 2,
            nameI: "Зелень",
            priceI: 29,
            title: "zelen",
            zelen : false
        },
        {
            id: 3,
            nameI: "Ветчина",
            priceI: 49,
            title: "vetchina",
            // check: {vetchina : true}
            vetchina : false
        }
    ]);

    const handleChange = (event) => {
        // setIngrideents([event.target.name]: event.target.checked)
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    // const handleClose = (event) => {
    //     if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //         return;
    //     }
    //
    //     setOpen(false);
    // };

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
                <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                    <Button onClick={handleToggle}>Ингридеенты</Button>
                    <Button
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
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',}}>
                            <Paper>
                            <FormGroup>
                                {ingrideents.map(({id, nameI, priceI, check, title}) => {
                                    console.log(check)
                                    return (
                                    <FormControlLabel key={id} control={
                                            <Checkbox
                                                checked={{[title]: true}}
                                                onChange={handleChange}
                                                name={title}
                                                color="primary"/>}
                                                label="Primary"/>
                                )})}
                            </FormGroup>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>
        </Grid>
    );
}
