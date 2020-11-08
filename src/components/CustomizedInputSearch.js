import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'
import {useStyleSearchInput} from "./common/style";
import {getSearchText} from "../reducers/filters";

const CustomizedInputSearch = React.memo(({serchProduct, location}) => {
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