import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { connect } from 'react-redux';
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'
import {getSearchText} from "../reducers/filters";

const CustomizedInputSearch = React.memo(({serchProduct, location}) => {
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
    <Paper component="form" onSubmit={handleSabmit}
    sx={{
      padding: '2px 4px',
      marginTop: '5px',
      display: 'flex',
      // width: `95%`,
      height: '60px',
      '@media screen and (max-width: 500px) ': {
        padding: 0,
      }
    }}>
      <SwipeableTemporaryDrawer location={location}/>
      <InputBase
        sx={{
          flex: 1,
          padding: 0
        }}
        value={value}
        name="search"
        placeholder={"Поиск по названию"}
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={handleChange}
      />
    </Paper>
  );
});

 const mapDispatchToProps = (dispatch) => ({
    serchProduct: (text) => dispatch(getSearchText(text))
    })

export default connect(null, mapDispatchToProps)(CustomizedInputSearch)