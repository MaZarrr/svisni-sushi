import React, {useState} from "react"
// import SEO from "../components/seo"
import { connect } from 'react-redux';
import { navigate} from 'gatsby'
import { setName, setPhone,
  setSity, setAdress, setHome, setEntrance, setLevel, setDoor } from "../actions";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  gridContainer: {
    flexGrow: 1,
    paddingLeft: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    marginBottom: 20,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  infoGrid: {
    display: `flex`,
    justifyContent: `center`,
    width: `100%`
  },
  conatiner_info: {
    // maxWidth: 200,
    // minHeight: 100,
    margin: `15px auto 15px 0`,
    border: `2px solid blue`,
    padding: 10,
    borderRadius: 10
  },
  conatiner_info_delivery: {
    // maxWidth: 200,
    // minHeight: 100,
    margin: `15px auto 15px 0`
  },
  conatiner_info_left: {
    // minHeight: 100,
    // maxWidth: 200,
    margin: `15px auto 15px 0`,
    border: `2px solid blue`,
    borderRadius: 10,
    padding: 10,

  }

}));



const Order = ({items, palochkiTotal, nameUser, location, phoneUser, deliverySity, deliveryAdress, homeNumber, entranceNumber, levelNumber, doorPassword,
    setName, setPhone, setSity, setAdress, setHome, setEntrance, setLevel, setDoor, total}) => {
    
const [open, setOpen] = useState(false);
const [openPayment, setOpenPayment] = useState(false);
const [openDelivery, setOpenDelivery] = useState(false);

const [age, setAge] = useState('');
const [payment, setPayment] = useState('');
const [delivery, setDelivery] = useState('');

const classes = useStyles();

const handleSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();

    items.forEach((elem) => {
      return data.append(
        product, 
        `
        Товар: ${elem.name},
        Общая цена ${elem.total},
        Количество: ${elem.count}`);
    });
    if(location.state.cart) {
      data.append(chopsticks, palochkiTotal);
    }
      data.append(totalPrice, total);

    xhr.open(form.method, form.action);
  // xhr.setRequestHeader("Accept", "application/json");
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
      }
    };
    xhr.send(data);
    // console.log(data)
   
    navigate('/order-processed', {replace: true})
  }
   
  const handleChange = event => {
    setAge(event.target.value);
  };
  const handleChangePayment = event => {
    setPayment(event.target.value);
  };

  const handleChangeDelivery = event => {
    setDelivery(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClosePayment = () => {
    setOpenPayment(false);
  };
  
  const handleOpenPayment = () => {
    setOpenPayment(true);
  };

  const handleCloseDelivery = () => {
    setOpenDelivery(false);
  };
  
  const handleOpenDelivery = () => {
    setOpenDelivery(true);
  };

return (
    <section>
     <div className={classes.root}>
    <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <Typography variant="h2">
            <Box fontFamily="Neucha" fontWeight={900} fontSize={32}>
             Оформление заказа
            </Box>
          </Typography>
          </Paper>
          </Grid>
          </Grid>

        <Grid container xs className={classes.gridContainer}>
        <form  
           method="POST"
           onSubmit={handleSubmit}
           action="http://localhost:3000/"
           name="svisniData"
          //  action="https://getform.io/f/a61244df-12d1-445d-9210-5033e2b633ca"
           style={{width: '100%'}}
           >
             {/* <SectionInfo>     */}
             <Grid item xs={12}>
             <Typography variant="h6"><Box fontFamily="Neucha" fontWeight={900} 
             fontSize={24}>Контактные данные</Box></Typography>  
             </Grid>
             
                <Grid container xs={12} >
                 {/* <Grid item xs={12}> */}
                 <TextField id="validation-outlined-input" 
                 label="Имя" 
                 variant="outlined" 
                 zIndex={0}
                 style={{margin: `10px auto 10px 0`}}
                 required inputProps={{
                   maxLength: 12,
                   }} 
                   name="name" 
                   onChange={(e) => {
                     setName(e.target.value);
                 }}  
                 value={nameUser} 
                 helperText="Введите ваше имя."/>
                 {/* </div> */}
                 {/* <div> */}
                 <TextField id="validation-outlined-input" 
                   label="Телефон" 
                   variant="outlined"
                   type="tel" 
                   style={{margin: `10px auto 10px 0`}}

                   required inputProps={{
                     maxLength: 12,
                     }} 
                     name="phone" 
                     onChange={(e) => {
                       setPhone(e.target.value);
                   }}  
                   value={phoneUser} 
                   helperText="Введите ваш телефон."/>
                   </Grid>

                  <Grid item xs={12}>
                  <Typography variant="h6"><Box fontFamily="Neucha" fontWeight={900} 
                  fontSize={24}>Дата и время доставки заказа</Box></Typography>  
                  </Grid>

                <Grid container xs={12} >
                 <TextField id="validation-outlined-input" 
                 label="Дата" 
                 variant="outlined" 
                 zIndex={0}
                 style={{margin: `10px auto 10px 0`}}
                 required inputProps={{
                   maxLength: 12,
                   }} 
                   name="date" 
                   onChange={(e) => {
                     setName(e.target.value);
                 }}  
                 value={nameUser} 
                 helperText="Когда доставить"/>

                 <TextField id="validation-outlined-input" 
                   label="Время" 
                   variant="outlined"
                   type="tel" 
                   style={{margin: `10px auto 10px 0`}}

                   required inputProps={{
                     maxLength: 12,
                     }} 
                     name="time" 
                     onChange={(e) => {
                       setPhone(e.target.value);
                   }}  
                   value={phoneUser} 
                   helperText="К какому времени"/>
                   </Grid>

                  <Grid item xs={12}>
                  <Typography variant="h6"><Box fontFamily="Neucha" fontWeight={900} 
                  fontSize={24}>Оплата</Box></Typography>  
                  </Grid>

                  <Grid container xs={12} >
                  <div className={classes.conatiner_info_left}>
                 <InputLabel id="controlled-open-select-label">Форма оплаты</InputLabel>
                 <Select
                   labelId="controlled-open-select-label"
                   id="controlled-open-select"
                   open={openPayment}
                   onClose={handleClosePayment}
                   onOpen={handleOpenPayment}
                   value={payment}
                   name="payForm"
                   onChange={handleChangePayment}>
                   <MenuItem value="">
                   <em>Форма оплаты</em>
                 </MenuItem>
                 <MenuItem value="Онлайн оплата">Онлайн оплата</MenuItem>
                 <MenuItem value="Оплата наличными">Оплата наличными</MenuItem>
               </Select>
               </div>

               <div className={classes.conatiner_info}>
               <InputLabel id="open-select-label">Способ доставки</InputLabel>
               <Select
                 labelId="open-select-label"
                 id="open-select"
                 open={openDelivery}
                 onClose={handleCloseDelivery}
                 onOpen={handleOpenDelivery}
                 value={delivery}
                 name="delivery"
                 onChange={handleChangeDelivery}>
                 <MenuItem value="">
                 <em>Способ доставки</em>
               </MenuItem>
               <MenuItem value="Самовывоз">Самовывоз</MenuItem>
               <MenuItem value="Доставка курьером">Доставка курьером</MenuItem>
             </Select>  
             </div>

       
              
               { payment === "Оплата наличными" &&
               <div className={classes.conatiner_info_left}> 
                 <InputLabel id="demo-controlled-open-select-label">Сдача</InputLabel>
                 <Select
                   labelId="demo-controlled-open-select-label"
                   id="demo-controlled-open-select"
                   open={open}
                   onClose={handleClose}
                   onOpen={handleOpen}
                   value={age}
                   name="sdacha"
                   onChange={handleChange}>
                   <MenuItem value="Без сдачи">
                   <em>Без сдачи</em>
                 </MenuItem>
                 <MenuItem value={700}>С 700 руб</MenuItem>
                 <MenuItem value={1000}>С 1000 руб</MenuItem>
                 <MenuItem value={2000}>С 2000 руб</MenuItem>
                 <MenuItem value={5000}>С 5000 руб</MenuItem>
               </Select>
             </div>
             
               }
             </Grid>

            
           { delivery === "Доставка курьером" &&  
           <>
            <Grid container xs={12} justify="center">      
              <div className={classes.conatiner_info_delivery}>
               <TextField id="validation-outlined-input" 
                 label="Населенный пункт" 
                 variant="outlined" 
                 required inputProps={{
                   maxLength: 20,
                   }} 
                   name="adress" 
                   onChange={(e) => {
                     setSity(e.target.value);
                 }}  
                 value={deliverySity} 
                //  style={{margin: `10px auto 10px 0`}}

                 helperText="Населенный пункт"/>
               </div>
               <div className={classes.conatiner_info_delivery}>
               <TextField id="validation-outlined-input" 
                 label="Улица" 
                 variant="outlined" 
                 required inputProps={{
                   maxLength: 20,
                   }} 
                   name="street" 
                   onChange={(e) => {
                     setAdress(e.target.value);
                 }}  
                 value={deliveryAdress} 
                 helperText="Ваша улица"/>
               </div>
               </Grid>
    
            <Grid container xs={8} justify="space-around">
                 <div className={classes.conatiner_info_delivery}>
               <TextField id="validation-outlined-input" 
                 label="Дом" 
                 variant="outlined" 
                 size="small"
                 type="text"
                 required inputProps={{
                   maxLength: 5,
                   }} 
                   name="home" 
                   onChange={(e) => {
                     setHome(e.target.value);
                 }}  
                 value={homeNumber}
                 helperText="Введите ваш номер дома."/>	
                </div>

                <div className={classes.conatiner_info_delivery}>               
               <TextField id="validation-outlined-input" 
                 label="Подъезд" 
                 variant="outlined" 
                 type="number"
                 size="small"
                 inputProps={{
                   maxLength: 3,
                   }} 
                   name="podezd" 
                   onChange={(e) => {
                     setEntrance(e.target.value);
                 }}  
                 value={entranceNumber}
                 helperText="Введите ваш номер подъезда."/>	
              </div>
              <div className={classes.conatiner_info_delivery}>
               <TextField id="validation-outlined-input" 
                 label="Этаж" 
                 variant="outlined" 
                 size="small"
                 type="number"
                 inputProps={{
                   maxLength: 3,
                   }} 
                   name="etag" 
                   onChange={(e) => {
                     setLevel(e.target.value);
                 }}  
                 value={levelNumber}
                 helperText="Введите ваш этаж."/>	
              </div>
              <div className={classes.conatiner_info_delivery}>
               <TextField id="validation-outlined-input" 
                 label="Код двери" 
                 variant="outlined" 
                 size="small"
                 type="number"
                 inputProps={{
                   maxLength: 6,
                   }} 
                   name="kodDveri" 
                   onChange={(e) => {
                     setDoor(e.target.value);
                 }}  
                 value={doorPassword}
                 helperText="Код двери подьезда."/>	
              </div>
               </Grid>
               </>
         }
  
         <Grid container xs={10} direction="column" >
 
           <TextField
             id="outlined-multiline-static"
             label="Комментарий к заказу"
             multiline
             rows="4"
             inputProps={{
               maxLength: 200,
               }} 
             name="comments"
             variant="outlined"
             style={{marginTop: `50px`}}
           />
           
           {/* <Grid container xs={12} direction="column" alignItems="center">
        
             </Grid> */}
             </Grid>
            <div className="total mt-3">
             <b>Итого к оплате: {total}</b>
             </div>
             <Button 
             type="submit" 
             variant="contained" 
             color="primary"
             size='large'
             >
             Оформить заказ
             </Button>
         </form>
         </Grid> 
         </div>
</section>
)
// : <NoneItem className="d-flex justify-content-center align-items-center mt-5 none_item">Ваша корзина пуста!</NoneItem>}

}

const mapStateToProps = ({shoppingCart: {cartItems, orderTotal}, contacts: { 
    nameUser, phoneUser, deliverySity, deliveryAdress, homeNumber, entranceNumber, levelNumber, doorPassword }, palochkiTotal}) => {
        return {
            items: cartItems, 
            palochkiTotal,
            total: orderTotal,
            nameUser, phoneUser, deliverySity, deliveryAdress, homeNumber, entranceNumber, levelNumber, doorPassword
        };
      }

const mapDispatchToProps = {
    setName, setPhone,
    setSity, setAdress, 
    setHome, setEntrance, 
    setLevel, setDoor
};

export default connect(mapStateToProps, mapDispatchToProps)(Order)

