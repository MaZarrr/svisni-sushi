import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import {serchProduct} from '../actions'
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: `95%`,
    margin: `0 auto`
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    padding: 0
  },
  divider: {
    height: 28,
    margin: 4,
  },
  iconButton: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: `white`,
    padding: 10
  }
}));

function CustomizedInputSearch({serchProduct, location}) {
  const classes = useStyles();
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