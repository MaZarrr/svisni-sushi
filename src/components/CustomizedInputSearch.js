import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import {serchProduct} from '../actions'
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'
import {useStyleSearchInput} from "./common/style";

function CustomizedInputSearch({serchProduct, location}) {
  const classes = useStyleSearchInput();
  const [value, setValue] = React.useState('')

    const handleSabmit = (e) => {
       e.preventDefault();
       serchProduct(value)
      }
    const handleChange = (e) => {
     setValue(e.target.value)
     serchProduct(e.target.value)
    }

  return (
    <Paper component="form" onSubmit={handleSabmit} className={classes.root}>
      <SwipeableTemporaryDrawer location={location}/>
      <InputBase
        className={classes.input}
        value={value}
        name="search"
        placeholder={"Знаешь название! Пиши..."}
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={handleChange}
      />
     <Divider className={classes.divider} orientation="vertical" />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

 const mapDispatchToProps = (dispatch) => {
    return {
    serchProduct: (text) => dispatch(serchProduct(text)),
    }  
};

export default connect(null, mapDispatchToProps)(CustomizedInputSearch)