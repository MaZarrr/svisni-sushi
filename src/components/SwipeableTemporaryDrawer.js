import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
// import Divider from '@material-ui/core/Divider';
import RadioButtonsFiltr from './RadioButtonsFiltr'
import FormControlLabelPosition from './FormControlLabelPosition'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto'
  },
  iconButton: {
    padding: 10,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: `white`
},
// divider: {
//   height: 28,
//   // margin: 4,
// },
});

export default function SwipeableTemporaryDrawer({location}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div style={{padding: 10}}>
    <RadioButtonsFiltr />
    {/* <Divider /> */}
    <hr></hr>
     { location === "/sety" &&
    <FormControlLabelPosition />
     }
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
    <Button variant="contained"
        color="secondary">Применить</Button> 
    </div>
    </div>
  );

  return (
    <div style={{marginLeft: `auto`, marginRight: 40}}>
   
    <IconButton onClick={toggleDrawer('left', true)} 
      className={classes.iconButton} aria-label="menu">
      <MenuIcon />
    </IconButton>
    {/* <Divider className={classes.divider} orientation="vertical" /> */}
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </div>
  );
}