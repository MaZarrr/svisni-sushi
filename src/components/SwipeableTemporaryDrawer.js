import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import RadioButtonsFiltr from './RadioButtonsFiltr'
import FormControlLabelPosition from './FormControlLabelPosition'
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  iconButton: {
    padding: 10,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: `white`,
    [theme.breakpoints.down('500')]: {
      color: `grey`,
      background: `white`
    }
}
}));

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
      <FilterListIcon />
    </IconButton>
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