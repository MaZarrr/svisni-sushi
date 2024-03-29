import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
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

export default function PayDialog({ total, open = false, handleClose, phone = "", name = ""}) {
  const classes = useStyles();
  return (
    <React.Fragment>

      <Dialog
        fullWidth={true}
        maxWidth={'xs'}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">Онлайн оплата</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate method="POST"
                action={process.env.GATSBY_ACTION_FORM}>
            <FormControl className={classes.formControl}>
              <input type="hidden" name="receiver" value={process.env.GATSBY_ACTION_PW}></input>
              <input type="hidden" name="targets" value="Оплата товаров"></input>
              <input type="hidden" name="formcomment" value="Оплата заказа"/>
              <input type="hidden" name="label" value={`транзакция ${total}`}></input>
              <input type="hidden" name="label" value={name}></input>
              <input type="hidden" name="label" value={phone}></input>
              <input type="hidden" name="quickpay-form" value="shop"></input>
              <input type="hidden" name="sum" value={total * (1 + 0.018)}></input>
              <input type="hidden" name="comment" value="с учётом комиссии 1,8%"/>
              <input type="hidden" name="successURL" value={process.env.GATSBY_ACTION_REDIRECT_P}></input>
              <DialogContentText><input type="radio" defaultChecked={true} name="paymentType" value="AC"/>Visa, MasterCard, Maestro, Мир</DialogContentText>
              <Button type="submit" variant={"contained"} size={"large"} style={{backgroundColor: `orange`, padding: `10px 30px 10px 30px`, fontSize: 18}}>Оплатить</Button>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}