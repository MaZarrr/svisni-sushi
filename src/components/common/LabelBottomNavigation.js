import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import RestoreIcon from '@material-ui/icons/Restore';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import KorzinaComponent from '../korzinaComponent';
import MessageIcon from '@material-ui/icons/Message';

const useStyles = makeStyles({
  root: {
    width: `100%`,
    position: 'fixed',
    bottom: `0`,
    zIndex: 1020
  },
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>

      <BottomNavigationAction value="recents" onClick={()=> window.Chatra('openChat', true)} icon={<MessageIcon />} />
      <BottomNavigationAction value="recents" icon={<KorzinaComponent />} />
      {/* <BottomNavigationAction value="nearby" icon={<LocationOnIcon />} /> */}
    </BottomNavigation>
  );
}