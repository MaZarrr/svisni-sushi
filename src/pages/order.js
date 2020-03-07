import React, {useState} from "react"
import SEO from "../components/seo"
import { connect } from 'react-redux';
import { navigate} from 'gatsby'
import { setName, setPhone,
  setSity, setAdress, setHome, setEntrance, setLevel, setDoor, setTime, setDate } from "../actions";

import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  gridContainer: {
    flexGrow: 1,
    paddingLeft: theme.spacing(4),
    width: `98%`
  },
   formControl: {
     margin: theme.spacing(1),
     width: `220px`,
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
    margin: `15px auto 15px 0`,
    border: `2px solid blue`,
    padding: 10,
    borderRadius: 10,
    maxWidth: `300px`,
  },
  conatiner_info_delivery: {
    margin: `15px auto 15px 0`
  },
  // conatiner_info_left: {
  //   margin: `15px auto 15px 0`,
  //   border: `2px solid blue`,
  //   borderRadius: 10,
  //   padding: 10,
  //   maxWidth: `200px`
  // },
    button: {
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      color: 'white',
      marginTop: 8,
      textAlign: `start`,
      width: `300px`,
      [theme.breakpoints.down('sm')]: {
        maxWidth: '90%',
        marginBottom: 60
      }
  },
   emty: {
     padding: theme.spacing(2),
     paddingLeft: theme.spacing(4),
   },
}));

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: `#00BFFF`,
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {

  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const Order = ({items, palochkiTotal, nameUser, location, phoneUser, deliverySity, deliveryAdress, homeNumber, 
  entranceNumber, levelNumber, doorPassword, setName, setPhone, setSity, setAdress, setHome, setEntrance, 
  setLevel, setDoor,  setTime, setDate, total, dateDelivery, timeDelivery}) => {
    
const [open, setOpen] = useState(false);
// const [openPayment, setOpenPayment] = useState(false);
const [openDelivery, setOpenDelivery] = useState(false);

const [age, setAge] = useState('');
// const [payment, setPayment] = useState('');
const [delivery, setDelivery] = useState('');

const inputLabel = React.useRef(null);
const [labelWidth, setLabelWidth] = React.useState(0);
 const [state, setState] = React.useState({
   checkedC: false
 });

const [city, setCity] = useState({
kol: {id: 3, priceDel: 150, deliverySalePrice: 1000, name: "Колыхалино"},          
dvyl: {id: 4, priceDel: 150, deliverySalePrice: 1000, name: "Двулучное"},            
val: {id: 5, priceDel: 300, deliverySalePrice: 1400, name: "Валуйки"},                    
yraz: {id: 6, priceDel: 100, deliverySalePrice: 500, name: "Уразово"},                 
shel: {id: 7, priceDel: 150, deliverySalePrice: 1000, name: "Шелаево"},
gera: {id: 8, priceDel: 200, deliverySalePrice: 1000, name: "Герасимовка"},
sobo: {id: 2, priceDel: 100, deliverySalePrice: 500, name: "Соболёвка"},
sved: {id: 1, priceDel: 150, deliverySalePrice: 1000, name: "Шведуновка"}
});

const [stateDeliveryPrice, setStateDeliveryPrice] = React.useState({});

 const handleChangee = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

const classes = useStyles();

const handleSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();

    items.forEach((elem) => {
      return data.append(
        'product', 
        `
        Товар: ${elem.name},
        Общая цена ${elem.total},
        Количество: ${elem.count}`);
    });
    if(location.state.cart) {
      data.append('chopsticks', palochkiTotal);
    }
    if(delivery !== "Самовывоз" && total <= stateDeliveryPrice.deliverySalePrice) {
      const deliveryTotalPrice = total + stateDeliveryPrice.priceDel
      data.append('totalPrice', `Цена с доставкой ${deliveryTotalPrice} руб.`);
    } else {
       data.append('totalPrice', total);
    }
    data.append('adress', stateDeliveryPrice.name);
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
      }
    };
    xhr.send(data);
    
    navigate('/order-processed')
    
    // axios({
    //     method: 'POST',
    //     data: {
    //       name: ev.target.name.value,
    //       phone: ev.target.phone.value,
    //       delivery: delivery === "Доставка курьером" ? {
    //         formDelivery: ev.target.delivery.value || "Не выбрано",
    //         timeDelivery: ev.target.time.value || "Без предзаказа",
    //         dateDelivery: ev.target.date.value || "Без предзаказа",
    //         adress: ev.target.adress.value || "Самовывоз",
    //         street: ev.target.street.value || "Самовывоз",
    //         home: ev.target.home.value || "Самовывоз" } : "Самовывоз",
    //       products: 
    //         items.map((elem) => {
    //           return {
    //             product: elem.name,
    //             total: elem.total,
    //             count: elem.count,
    //           }
    //         }),
    //       totalPrice: total,
    //       comments: ev.target.comments.value || "Без комментария",
    //     },
    //     url: 'https://svisni-sushi.firebaseio.com/order.json'
    // })
 
  }
   
  const handleChange = event => {
    setAge(event.target.value);
  };
  // const handleChangePayment = event => {
  //   setPayment(event.target.value);
  // };

  const handleChangeDelivery = event => {
    setDelivery(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleChangeCity = city => event => {
    console.log(event.target.value);
    setSity(`${city[event.target.value].name}`)
    // setSity(`${city[event.target.value].name}`)
    setStateDeliveryPrice(city[event.target.value]);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  // const handleClosePayment = () => {
  //   setOpenPayment(false);
  // };
  
  // const handleOpenPayment = () => {
  //   setOpenPayment(true);
  // };

  const handleCloseDelivery = () => {
    setOpenDelivery(false);
  };
  
  const handleOpenDelivery = () => {
    setOpenDelivery(true);
  };
// console.log(stateDeliveryPrice);
console.log(deliverySity);

return (
    <section >
    <SEO title="Оформление заказа" />
     <div className={classes.root}>
  
    <Grid container>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <Typography variant="h2">
            <Box fontFamily = "Oswald"
            fontWeight={900}
            fontSize={32}>
             Оформление заказа
            </Box>
          </Typography>
          </Paper>
          </Grid>
          </Grid>

         { items.length !== 0 ? <Grid container className={classes.gridContainer}>
        <form  
           method="POST"
           onSubmit={handleSubmit}
            action="https://node-server-ten.now.sh/"
           name="svisniData"
          //  action="https://getform.io/f/a61244df-12d1-445d-9210-5033e2b633ca"
           style={{width: '100%'}}>
   
              <Grid item xs={12}>
              <Typography variant="h6"><Box fontFamily="Oswald" fontWeight={900} 
              fontSize={24}>Контактные данные</Box></Typography>  
              </Grid>
             
                <Grid container >
                 <TextField id="validation-outlined-input" 
                 label="Имя" 
                 variant="outlined" 
                 style={{margin: `10px auto 10px 0`}}
                 required 
                 inputProps={{
                   maxLength: 12,
                   }} 
                   name="name" 
                   onChange={(e) => {
                     setName(e.target.value);
                 }}  
                 value={nameUser} 
                 helperText="Введите ваше имя"/>

                 <TextField id="validation-outlined-input" 
                   label="Телефон" 
                   variant="outlined"
                   type="tel" 
                   style={{margin: `10px auto 10px 0`}}
                   required 
                   inputProps={{
                     maxLength: 12,
                     }} 
                     name="phone" 
                     onChange={(e) => {
                       setPhone(e.target.value);
                   }}  
                   value={phoneUser} 
                   helperText="Введите ваш телефон"/>
                  </Grid>
                  <hr></hr>
                  <Grid item xs={12}>
                    <Typography variant="h6"><Box fontFamily="Oswald" fontWeight={900} 
                    fontSize={24}>Доставка</Box></Typography>  
                  </Grid>
              
                <Grid container >
              
                  {/* <div className={classes.conatiner_info_left}>
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
               </div> */}
               
               {/* <div className={classes.conatiner_info}> */}
               <div className={classes.conatiner_info}>
              <FormControl required variant="outlined" className={classes.formControl}>
                  <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                    Способ доставки
                  </InputLabel>
                  <Select
                        native
                        value={delivery} // 
                        onChange={handleChangeDelivery}
                        labelWidth={labelWidth}
                        inputProps={{
                          name: 'delivery',
                          id: 'outlined-age-native-simple',
                        }}>
                      {/* labelId="open-select-label"
                      id="open-select"
                      open={openDelivery}
                      onClose={handleCloseDelivery}
                      onOpen={handleOpenDelivery}
                      value={delivery}
                      name="delivery"
                      onChange={handleChangeDelivery}> */}
                    <option value=""></option>
                    <option value="Самовывоз">Самовывоз</option>
                    <option value="Доставка курьером">Доставка курьером</option>
                  </Select>
                </FormControl>
               </div>
            </Grid>
               
               {/* <FormControl required variant="standard" className={classes.formControl}>
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
                 {/* <em>Способ доставки</em> */}
               {/* </MenuItem> */}
               {/* <option value="Самовывоз">Самовывоз</option>
               <option value="Доставка курьером">Доставка курьером</option> */}
             {/* </Select>
             </FormControl> */}
           
            {/* { payment === "Оплата наличными" &&
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
            } */}
      
                  <hr></hr>
                  <Grid item xs={12}>
                  <Typography variant = "h6" > <Box fontFamily = "Oswald"
                  fontWeight={700}
                  fontSize={24}>Дата и время доставки заказа</Box></Typography>  
                  <FormGroup>
                    <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                      <Grid item>Сразу</Grid>
                      <Grid item>
                        <IOSSwitch
                          checked={state.checkedC}
                          onChange={handleChangee('checkedC')}
                          value="checkedC"
                        />
                      </Grid>
                      <Grid item>Предзаказ</Grid>
                    </Grid>
                  </Typography>
                </FormGroup>
                </Grid>
             
              {  state.checkedC &&
                <Grid container xs={12} >
                 <TextField id="validation-outlined-input" 
                 label="Дата" 
                 variant="outlined" 
                 type="date" 
                 style={{margin: `10px auto 10px 0`}}
                 required 
                 inputProps={{
                   maxLength: 22,
                   }} 
                   name="date" 
                   onChange={(e) => {
                     setDate(e.target.value);
                 }}  
                 value={dateDelivery} 
                 helperText="Когда доставить"/>
              
                 <TextField id="validation-outlined-input" 
                   label="Время" 
                   variant="outlined"
                   type="time" 
                   style={{margin: `10px auto 10px 0`}}
                   required 
                   inputProps={{
                     maxLength: 16,
                     }} 
                     name="time" 
                     onChange={(e) => {
                       setTime(e.target.value);
                   }}  
                   value={timeDelivery} 
                   helperText="К какому времени"/>
                   </Grid>
                }
                  <hr></hr>
              
           { delivery === "Доставка курьером" &&  
           <>
            <Grid container xs={12} justify="center">      
              <div className={classes.conatiner_info_delivery}>
              <FormControl required variant="outlined" className={classes.formControl}>
                  <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                    Населённый пункт
                  </InputLabel>
                  <Select
                    native
                    value={deliverySity.city} // 
                    onChange={handleChangeCity(city)}
                    labelWidth={labelWidth}
                    inputProps={{
                      name: 'city',
                      id: 'outlined-age-native-simple',
                    }}>
                    <option value=""></option>
                    <option value="yraz">Уразово</option>
                    <option value="val">Валуйки</option>
                    <option value="kol">Колыхалино</option>
                    <option value="dvyl">Двулучное</option>
                    <option value="shel">Шелаево</option>
                    <option value="sobo">Соболевка</option>
                    <option value="yraz">Уразово</option>
                    <option value="sved">Шведуновка</option>
                    <option value="gera">Герасимовка</option>
                  </Select>
                </FormControl>
               {/* <TextField id="validation-outlined-input" 
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

                 helperText="Населенный пункт"/> */}
               </div>
               <div className={classes.conatiner_info_delivery}>
               <TextField id="validation-outlined-input" 
                 label="Улица" 
                 variant="outlined" 
                 required 
                 inputProps={{
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
                 required 
                 inputProps={{
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
  
         <Grid container direction="column" >
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
           </Grid>
            <div className={classes.conatiner_info}> 
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
            <div className="total" style={{margin: `20px 0 20px 0`, fontSize: 20}}>
            { delivery !== "Самовывоз" && delivery !== "" &&
            <>
            <div>
             <b>{total <= stateDeliveryPrice.deliverySalePrice ? `Доставка: + ${stateDeliveryPrice.priceDel} ₽` : "Доставка бесплатно"}</b>
             </div>

              <div>
              <b>{total <= stateDeliveryPrice.deliverySalePrice ? 
              `До бесплатной доставки в ${stateDeliveryPrice.name} + ${stateDeliveryPrice.deliverySalePrice - total}` : '' }</b>
             </div>

              <div>
             <b>{total >= stateDeliveryPrice.deliverySalePrice ? `Итого к оплате: ${total} ₽` : `Итого к оплате: ${total + stateDeliveryPrice.priceDel} ₽`}</b>
             </div>
             </>
            }
            { delivery !== "Доставка курьером" &&
              <div>
                <b>Итого к оплате: {total} ₽</b>
             </div>
             }
             </div>
             <Button 
             type="submit" 
             variant="contained" 
             className={classes.button}
             >
            Заказать
             </Button>
         </form>
         </Grid> : <Box className={classes.emty} fontFamily="Comfortaa" fontWeight={700} fontSize={34}>
           Ваша корзина пуста </Box>
         } 
         </div>
</section>
  )
}

const mapStateToProps = ({shoppingCart: {cartItems, orderTotal}, contacts: { 
    nameUser, phoneUser, deliverySity, deliveryAdress, homeNumber, entranceNumber, levelNumber, doorPassword, timeDelivery,
    dateDelivery}, palochkiTotal
    }) => {
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
    setLevel, setDoor, 
    setDate, setTime
};

export default connect(mapStateToProps, mapDispatchToProps)(Order)

