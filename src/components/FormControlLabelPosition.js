import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { connect } from 'react-redux';
import {getCheckNabor} from "../reducers/filters";

function FormControlLabelPosition({setFilterCheckbox, checkboxFilter}) {

  const handleChange = (e) => {
      setFilterCheckbox(e.target.value)
  }
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Наборы на:</FormLabel>
      <RadioGroup aria-label="position" name="position" value={checkboxFilter} onChange={handleChange} column="true">
        <FormControlLabel
          value="def"
          control={<Radio color="primary" />}
          label="Показать все"
          labelPlacement="end"
        />
        <FormControlLabel
          value="two"
          control={<Radio color="primary" />}
          label="На двоих"
          labelPlacement="end"
        />
        <FormControlLabel
          value="three"
          control={<Radio color="primary" />}
          label="На троих"
          labelPlacement="end"
        />
        <FormControlLabel
          value="five"
          control={<Radio color="primary" />}
          label="На большую компанию"
          labelPlacement="end"
        />
      </RadioGroup>
    </FormControl>
  );
}

const mapStateToProps = ({filters: {checkboxFilter}}) => ({
    checkboxFilter
})
  
  const mapDispatchToProps = (dispatch) => ({
    setFilterCheckbox: (check) => dispatch(getCheckNabor(check))
    })
  
export default connect(mapStateToProps, mapDispatchToProps)(FormControlLabelPosition)





// {
//   /* <FormGroup aria-label="position" column="true">
//           <FormControlLabel
//             value="two"
//             onChange={handleChange}
//             control={<Checkbox color="primary" />}
//             label="На двоих"
//             labelPlacement="end"
//           />
//           <FormControlLabel
//             value="three"
//             onChange={handleChange}
//             control={<Checkbox color="primary" />}
//             label="На троих"
//             labelPlacement="end"
//           />
//           <FormControlLabel
//             value="fo"
//             onChange={handleChange}
//             control={<Checkbox color="primary" />}
//             label="На четверых"
//             labelPlacement="end"
//           />
//           <FormControlLabel
//             value="five"
//             onChange={handleChange}
//             control={<Checkbox color="primary" />}
//             label="На петярых и более"
//             labelPlacement="end"
//           /> */
// }
// </FormGroup>
