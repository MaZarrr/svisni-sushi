import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Grow from '@mui/material/Grow';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
// import clsx from "clsx";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {Typography} from "@mui/material";
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
const SplitButton = React.memo(({id, pizzaIng, ingrideents, path, sostav, addedIngrideents, ingrideentButtonStyle, height = 210, addTodel}) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    // const classes = useStyles();

    const handleChange = (event) =>  {
        addedIngrideents({id, sostav, name: event.target.name, ingrideents, check: event.target.checked, pizzaIng, path, addTodel})
    };

    const handleToggle = () => setOpen((prevOpen) => !prevOpen);
    // const addedIngrideent = ({sostav, pizzaIng, id}) => handleToggle();

    return (
        <Grid container direction="column">
            <Grid item xs={12} style={{ zIndex: 100 }}>
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
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow {...TransitionProps} style={{transformOrigin: 'bottom'}}>
                            <div>
                            <Paper style={{overflowY: `scroll`, height: `${height}px`}}>
                            <FormGroup style={{width: 200}}>
                                {ingrideents.map((el) => {
                                return (
                                <div key={String(el.id)}>
                                    <Grid container alignItems={"center"} justifyContent={"space-between"}>
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
                                    onClick={() => addedIngrideent({sostav, pizzaIng, id, addTodel})}>Применить</Button>
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



// console.log(sostav);
// // console.log(ingrideents);
// // const sost = ['зелень', 'грибы', 'бекон']
// // const ing = ingrideents.filter(item => {
// //     return ingrideents.includes(sost.forEach(el => el.name))
// // })
// const ing = ingrideents.filter(item => { 
//     return sostav.includes(item.nameI)
//     // return ingrideents.includes(sost.forEach(el => item.name))
// })
// console.log("ing", ing);
// return (
//     <Grid container direction="column">
//         <Grid item xs={12} style={{ zIndex: 100 }}>
//             <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
//                 {/*<Button className={clsx(classes.buttonD, {*/}
//                 {/*    [classes.buttonT]: ingrideentButtonStyle})} onClick={handleToggle}>Ингридеенты</Button>*/}
//                 <Button
//                     variant="outlined"
//                     color="primary"
//                     size="small"
//                     aria-controls={open ? 'split-button-menu' : undefined}
//                     aria-expanded={open ? 'true' : undefined}
//                     aria-label="select merge strategy"
//                     aria-haspopup="menu"
//                     onClick={handleToggle}>
//                     {addTodel === "inc" ?  <AddCircleOutlineIcon/> : <RemoveOutlinedIcon/>}
                   
//                 </Button>
//             </ButtonGroup>
//             <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
//                 {({ TransitionProps, placement }) => (
//                     <Grow {...TransitionProps} style={{transformOrigin: 'bottom'}}>
//                         <div>
//                         <Paper style={{overflowY: `scroll`, height: `${height}px`}}>
//                         {addTodel === "inc" ? 
//                             <FormGroup style={{width: 200}}>
//                             { ingrideents.map((el) => {
//                             return (
//                             <div key={String(el.id)}>
//                                 <Grid container alignItems={"center"} justifyContent={"space-between"}>
//                                 <Grid item xs={6}>
//                                 <FormControlLabel value={el.value} style={{margin: `auto 0`}} control={
//                                         <Checkbox
//                                             id={String(el.id)}
//                                             checked={el[el.title]}
//                                             onChange={handleChange}
//                                             name={el.title}
//                                             color="primary"/>}
//                                             label={<Typography style={{fontSize: 13}}>{el.nameI}</Typography>}/>
//                                     </Grid>
//                                     <Grid item xs={4}>
//                                         <Typography style={{textAlign: `center`,fontSize: 13}} variant={"h6"}>
//                                             {`${el.value}₽`}</Typography>
//                                     </Grid>
//                                     </Grid>
//                                 <Divider/>
//                             </div>)})}
//                         </FormGroup>
                                    
//                         : <FormGroup style={{width: 200}}>
//                         { ing.map((el) => {
//                         return (
//                         <div key={String(el.id)}>
//                             <Grid container alignItems={"center"} justifyContent={"space-between"}>
//                             <Grid item xs={6}>
//                             <FormControlLabel value={el.value} style={{margin: `auto 0`}} control={
//                                     <Checkbox
//                                         id={String(el.id)}
//                                         checked={el[el.title]}
//                                         onChange={handleChange}
//                                         name={el.title}
//                                         color="primary"/>}
//                                         label={<Typography style={{fontSize: 13}}>{el.nameI}</Typography>}/>
//                                 </Grid>
//                                 <Grid item xs={4}>
//                                     <Typography style={{textAlign: `center`,fontSize: 13}} variant={"h6"}>
//                                         {`${el.value}₽`}</Typography>
//                                 </Grid>
//                                 </Grid>
//                             <Divider/>
//                         </div>)})}

// <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal
// // modifiers={[
// //     {flip: {enabled: false}}
    
// //     ]}>