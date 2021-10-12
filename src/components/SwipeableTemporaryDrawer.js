import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import RadioButtonsFiltr from './RadioButtonsFiltr'
import FormControlLabelPosition from './FormControlLabelPosition'
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  }
}));

export default function SwipeableTemporaryDrawer({location}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div style={{padding: 10}}>
    <RadioButtonsFiltr />
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
    <div style={{margin: 'auto 15px auto 0'}}>
   
    <IconButton
      onClick={toggleDrawer('left', true)}
      sx={{
        border: `1px solid tomato`,

      }}
      aria-label="menu"
      size="large">
      <FilterListIcon />
    </IconButton>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor="left"
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </div>
  );
}