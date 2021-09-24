import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { connect } from 'react-redux';
import { getPriceDecInc } from "../reducers/filters";

function FormControlLabelPosition({ filterPrice, priceFilter }) {

  const handleChange = event => {
    filterPrice(event.target.value)
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Фильтры</FormLabel>
      <RadioGroup aria-label="position" name="position" defaultValue="def" value={priceFilter} onChange={handleChange} column="true">
        <FormControlLabel
          value="def"
          control={<Radio color="primary" />}
          label="По умолчанию"
          labelPlacement="end"
        />
        <FormControlLabel
          value="inc"
          control={<Radio color="primary" />}
          label="Сначала дешевые"
          labelPlacement="end"
        />
        <FormControlLabel
          value="dec"
          control={<Radio color="primary" />}
          label="Сначала дорогие"
          labelPlacement="end"
        />
      </RadioGroup>
    </FormControl>
  );
}

const mapStateToProps = ({filters: {priceFilter}}) => ({
    priceFilter
  })

 const mapDispatchToProps = (dispatch) => ({
        filterPrice: (value) => dispatch(getPriceDecInc(value)),
    })


export default connect(mapStateToProps, mapDispatchToProps)(FormControlLabelPosition)
