import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function PayDialog({ total, open = false, handleClose}) {
  const classes = useStyles();

  return (
    <React.Fragment>

      <Dialog
        fullWidth={true}
        maxWidth={'xs'}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Онлайн оплата</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate method="POST"
                action="https://yoomoney.ru/quickpay/confirm.xml">
            <FormControl className={classes.formControl}>
              <input type="hidden" name="receiver" value="410018704311161"></input>
              <input type="hidden" name="targets" value="Оплата товаров"></input>
              <input type="hidden" name="label" value="$order_id"></input>
              <input type="hidden" name="quickpay-form" value="shop"></input>
              <input type="hidden" name="sum" value={total}></input>
              <input type="hidden" name="successURL" value="https://svisni-sushi.ru/korzina/order/order-success"></input>
              <DialogContentText><input type="radio" defaultChecked={true} name="paymentType" value="AC"/>Visa, MasterCard, Maestro, Мир</DialogContentText>
              <Button type="submit" variant={"contained"} size={"large"} style={{backgroundColor: `orange`, padding: `10px 30px 10px 30px`, fontSize: 20}}>Оплатить</Button>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}