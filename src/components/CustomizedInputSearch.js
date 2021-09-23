import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import { connect } from 'react-redux';
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'
import {getSearchText} from "../reducers/filters";
import makeStyles from '@mui/styles/makeStyles';

const CustomizedInputSearch = React.memo(({serchProduct, location}) => {
  const classes = useStyleSearchInput();
  const [value, setValue] = React.useState('');

    const handleSabmit = (e) => {
       e.preventDefault();
       serchProduct(value)
      };

    const handleChange = (e) => {
     setValue(e.target.value);
     serchProduct(e.target.value)
    };

  return (
    <Paper component="form" onSubmit={handleSabmit} className={classes.root}>
      <SwipeableTemporaryDrawer location={location}/>
      <InputBase
        className={classes.input}
        value={value}
        name="search"
        placeholder={"Поиск по названию"}
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={handleChange}
      />
     <Divider className={classes.divider} orientation="vertical" />
    </Paper>
  );
});

 const mapDispatchToProps = (dispatch) => ({
    serchProduct: (text) => dispatch(getSearchText(text))
    })

export default connect(null, mapDispatchToProps)(CustomizedInputSearch)

export const useStyleSearchInput = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    marginTop: 10,
    display: 'flex',
    width: `95%`,
    [theme.breakpoints.down(undefined)]: {
      border: `1px solid #282828`,
      borderRadius: 20,
      width: `98%`,
      padding: 0,
    }
  },
  input: {
    flex: 1,
    padding: 0
  },
  divider: {
    height: 28,
    margin: 4,
  }
}));