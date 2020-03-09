import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function FormControlLabelPosition() {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Наборы на:</FormLabel>
      <FormGroup aria-label="position" column="true">
        <FormControlLabel
          value="top"
          control={<Checkbox color="primary" />}
          label="На двоих"
          labelPlacement="end"
        />
        <FormControlLabel
          value="End"
          control={<Checkbox color="primary" />}
          label="На троих"
          labelPlacement="end"
        />
        <FormControlLabel
          value="bottom"
          control={<Checkbox color="primary" />}
          label="На четверых"
          labelPlacement="end"
        />
        <FormControlLabel
          value="end"
          control={<Checkbox color="primary" />}
          label="На петярых и более"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  );
}