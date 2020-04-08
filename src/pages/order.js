import React, {useState} from "react"
import SEO from "../components/seo"
import { connect } from 'react-redux';
import { navigate } from 'gatsby'
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';

import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from "axios";
import {useStyleOrder, IOSSwitch} from '../components/common/style'
import {
    setAdresUser,
    setCityUser, setDateDeliveryUser, setDoorUser,
    setEnhanceUser,
    setHomeUser, setLavelUser,
    setNameUser,
    setPhoneUser, setTimeDeliveryUser, userCommentsFunc
} from "../reducers/contacts-info";
import {defaultTo} from "ramda";

const Order = ({items, palochkiTotal, nameUser, phoneUser, deliverySity, deliveryAdress, homeNumber,
  entranceNumber, levelNumber, doorPassword, setName, setPhone, setSity, setAdress, setHome, setEntrance, 
  setLevel, setDoor, setTime, setDate, total, dateDelivery, timeDelivery, userCommentsFunc, comments }) => {

const [open, setOpen] = useState(false);

const [age, setAge] = useState('');
const [delivery, setDelivery] = useState('');

const classes = useStyleOrder();

const inputLabel = React.useRef(null);
 const [state, setState] = React.useState({checkedC: false});

const [city, ] = useState({
kol: {id: 1, priceDel: 150, deliverySalePrice: 1000, name: "Колыхалино"},          
dvyl: {id: 2, priceDel: 150, deliverySalePrice: 1000, name: "Двулучное"},            
val: {id: 3, priceDel: 300, deliverySalePrice: 1400, name: "Валуйки"},                    
yraz: {id: 4, priceDel: 100, deliverySalePrice: 500, name: "Уразово"},                 
shel: {id: 5, priceDel: 150, deliverySalePrice: 1000, name: "Шелаево"},
gera: {id: 6, priceDel: 200, deliverySalePrice: 1000, name: "Герасимовка"},
sobo: {id: 7, priceDel: 100, deliverySalePrice: 500, name: "Соболёвка"},
sved: {id: 8, priceDel: 150, deliverySalePrice: 1000, name: "Шведуновка"},
borki: {id: 9, priceDel: 300, deliverySalePrice: 1400, name: "Борки"},
znamenk: {id: 10, priceDel: 100, deliverySalePrice: 500, name: "Знаменка"},
kazink: {id: 11, priceDel: 300, deliverySalePrice: 1500, name: "Казинка"}
});

const [stateDeliveryPrice, setStateDeliveryPrice] = React.useState({});

const handleChangee = name => event => setState({ ...state, [name]: event.target.checked });

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
    data.append('chopsticks', palochkiTotal);
     const def = defaultTo({itemCartSale:{
         priceDef: 1,
         radioValue: 80
         }}, itemCartSale)

    const deliveryTotalPrice = total + stateDeliveryPrice.priceDel
    if(delivery !== "Самовывоз" && (def.priceDef === 0 || def.radioValue === 79) ) {
      data.append('totalPrice', `Цена с доставкой ${deliveryTotalPrice} руб.`);
    } else if(delivery !== "Самовывоз" && total <= stateDeliveryPrice.deliverySalePrice) {
        data.append('totalPrice', `Цена + c доставкой ${deliveryTotalPrice} руб.`);
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
    // navigate('/order-processed', {state: dataOrderInfo || {name: ":)", phone: "указанному"}  })
    
    axios({
        method: 'POST',
        data: {
          name: ev.target.name.value,
          phone: ev.target.phone.value,
          delivery: delivery === "Доставка курьером" ? {
            formDelivery: ev.target.delivery.value || "Не выбрано",
            adress: stateDeliveryPrice.name || "Самовывоз",
            street: ev.target.street.value || "Самовывоз",
            home: ev.target.home.value || "Самовывоз" } : "Самовывоз",
            products: 
            items.map((elem) => {
              return {
                product: elem.name,
                total: elem.total,
                count: elem.count,
              }
            }),
          totalPrice: total,
          comments: ev.target.comments.value || "Без комментария",
        },
        url: process.env.GATSBY_DATA_BASE
    })
 
  }

    const handleChange = event => setAge(event.target.value)
    const handleChangeDelivery = event => setDelivery(event.target.value);

    const handleClose = () => setOpen(false)

    const handleChangeCity = city => event => {
    setSity(`${city[event.target.value].name}`)
    setStateDeliveryPrice(city[event.target.value]);
};

    const handleOpen = () => setOpen(true);

    const isEmpty = (obj) => {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false
}

    const validateUserName = () => {
        const nameValidate = /^[а-я\ё]{3,16}$/gi
        const name = nameUser.trim().replace(/\s/g, "")
        return nameValidate.test(String(name).toLowerCase())
    }
    const validatePhone = () => {
        const phoneValidate = /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))$/gi
        const phone = phoneUser.trim().replace(/\s/g, "")
        return phoneValidate.test(phone.toLowerCase())
    }
    const validateTextAria = () => {
    const commentTextArea = comments.trim().replace(/\s/g, "")
        if(comments === '') {
            return true
        } else if(comments !== '') {
            return ((/^[а-я_А-Я_0-9\-?()!,.ё]{3,230}$/).test(commentTextArea.toLowerCase()))
        }
    }

    const buttonDisabled = () => {
        if(validateUserName() === true && validatePhone() === true && validateTextAria() === true ) {
            return false
        }
        return true
    }

const itemCartSale = items.find((data) => data.total === 79 || data.priceDef === 0)
return (
    <section >
    <SEO title="Оформление заказа" />
     <div className={classes.root}>
    <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <Typography variant="h2">
            <Box fontFamily="Oswald"
            fontWeight={900}
            fontSize={40}>
             Оформление заказа
            </Box>
          </Typography>
          </Paper>
          </Grid>
          </Grid>

        { !isEmpty(items) ? <Grid container className={classes.gridContainer}>
        <form  
          method="POST"
          onSubmit={handleSubmit}
            action={process.env.GATSBY_NODE_SERVE}
          name="svisniData"
          style={{width: '100%'}}>
   
          <Grid item xs={12}>
          <Typography variant="h6"><Box fontFamily="Oswald" fontWeight={900} 
          fontSize={24}>Контактные данные</Box></Typography>  
          </Grid>
         
            <Grid container >
              <TextField id="validation-outlined-input" 
                label="Имя"
                error={!validateUserName() && nameUser.length > 2}
                variant="outlined"
                style={{margin: `10px auto 10px 0`}}
                required
                inputProps={{maxLength: 11, minLength: 2}}
                name="name" 
                onChange={(e) => {setName(e.target.value)}}
                value={nameUser}
                helperText={validateUserName() === false && nameUser.length !== 0 ? "Введите корректное имя" : "Введите ваше имя" } />

              <TextField id="validation-outlined-input" 
                label="Телефон" 
                variant="outlined"
                error={!validatePhone() && phoneUser.length > 10}
                type="tel" 
                style={{margin: `10px auto 10px 0`}}
                required 
                inputProps={{maxLength: 13, minLength: 10}}
                name="phone"
                onChange={(e) => {setPhone(e.target.value)}}
                value={phoneUser} 
                helperText={!validatePhone() && phoneUser.length > 10 ? "Введите корректный номер" : "Введите ваш номер"}/>
              </Grid>
              <hr></hr>
              <Grid item xs={12}>
                <Typography variant="h6"><Box fontFamily="Oswald" fontWeight={900} 
                fontSize={24}>Доставка</Box></Typography>  
              </Grid>
          
              <Grid container >
               <div>
              <FormControl required variant="outlined" className={classes.formControl}>
                  <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                    Способ доставки
                  </InputLabel>
                  <Select
                        native
                        value={delivery} // 
                        onChange={handleChangeDelivery}
                        inputProps={{
                          name: 'delivery',
                          id: 'outlined-age-native-simple',
                        }}>
                    <option value=""></option>
                    <option value="Самовывоз">Самовывоз</option>
                    <option value="Доставка курьером">Доставка курьером</option>
                  </Select>
                </FormControl>
               </div>
            </Grid>
              
            <hr></hr>
            <Grid item xs={12}>
            <Typography variant="h6"> 
            <Box fontFamily = "Oswald"
            fontWeight={700}
            fontSize={24}>Дата и время доставки заказа</Box></Typography>  
            <FormGroup>
              <Grid component="label" container alignItems="center" spacing={1}>
                <Typography variant="body1">Сразу</Typography>
                <Grid item>
                  <IOSSwitch
                    checked={state.checkedC}
                    onChange={handleChangee('checkedC')}
                    value="checkedC"
                  />
                </Grid>
                <Typography variant="body1">Предзаказ</Typography>
              </Grid>
          </FormGroup>
          </Grid>
             
        {  state.checkedC &&
          <Grid container>
            <TextField id="validation-outlined-input" 
            label="Дата" 
            variant="outlined" 
            type="date" 
            style={{margin: `10px auto 10px 0`}}
            required 
            name="date" 
            onChange={(e) => {setDate(e.target.value);
            }}
            value={dateDelivery} 
            helperText="Когда доставить"/>
        
            <TextField id="validation-outlined-input" 
              label="Время" 
              variant="outlined"
              type="time" 
              style={{margin: `10px auto 10px 0`}}
              required 
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
            <Grid container justify="center">
              <div className={classes.conatiner_info_delivery}>
              <FormControl required variant="outlined" className={classes.formControl}>
                  <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                    Населённый пункт
                  </InputLabel>
                  <Select
                    native
                    value={deliverySity.city} //
                    onChange={handleChangeCity(city)}
                    inputProps={{
                      name: 'city',
                      id: 'outlined-age-native-simple',
                    }}>
                    <option value=""></option>
                    <option value="yraz">Уразово</option>
                    <option style={{background: `#f0ecec`}} value="val">Валуйки</option>
                    <option value="dvyl">Двулучное</option>
                    <option style={{background: `#f0ecec`}} value="shel">Шелаево</option>
                    <option value="sobo">Соболевка</option>
                    <option style={{background: `#f0ecec`}} value="kol">Колыхалино</option>
                    <option value="sved">Шведуновка</option>
                    <option style={{background: `#f0ecec`}} value="borki">Борки</option>
                    <option value="znamenk">Знаменка</option>
                    <option style={{background: `#f0ecec`}} value="gera">Герасимовка</option>
                    <option value="kazink">Казинка</option>
                  </Select>
                </FormControl>
               </div>

               <div className={classes.conatiner_info_delivery}>
               <TextField id="validation-outlined-input"
                 label="Улица"
                 variant="outlined"
                 required
                 inputProps={{
                    maxLength: 20,
                    minLength: 4
                   }}
                   name="street"
                   onChange={(e) => {
                     setAdress(e.target.value);
                 }}
                 value={deliveryAdress}
                 helperText="Ваша улица"/>
               </div>
               </Grid>

            <Grid container justify="space-around">
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
                   maxLength: 2,
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
                   maxLength: 2,
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
                   maxLength: 5,
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
             value={comments}
             onChange={(e) => userCommentsFunc(e.target.value)}
             rows="4"
             error={!validateTextAria() && comments.length > 2}
             inputProps={{minLength: 3, maxLength: 230}}
             name="comments"
             variant="outlined"
             style={{marginTop: `50px`}}
             helperText={!validateTextAria() && comments.length > 2 ? "Удалите лишние знаки и символы" : ""}
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
              <MenuItem value={1500}>С 1500 руб</MenuItem>
              <MenuItem value={2000}>С 2000 руб</MenuItem>
              <MenuItem value={3000}>С 3000 руб</MenuItem>
              <MenuItem value={5000}>С 5000 руб</MenuItem>
            </Select>
          </div>
          
            <div className={classes.payInfo}>
            { delivery !== "Самовывоз" && !isEmpty(stateDeliveryPrice) &&
            <>
            <div>
                { itemCartSale === undefined &&
                    <p>{total <= stateDeliveryPrice.deliverySalePrice ? <>
                            Для бесплатной доставки в {stateDeliveryPrice.name} сделайте заказ еще минимум
                            на <b> + {stateDeliveryPrice.deliverySalePrice - total} ₽</b></>
                        : ""}</p>
                }
                { itemCartSale !== undefined &&
                    <p>{`Доставка с акцией + ${stateDeliveryPrice.priceDel}`}</p>
                }
                </div>
              <hr></hr>
              <div>
                  { itemCartSale === undefined &&
                      <p>{total <= stateDeliveryPrice.deliverySalePrice ? <>
                          <b>Доставка:</b> + {stateDeliveryPrice.priceDel} ₽</> : <b>Доставка бесплатно</b>}</p>
                  }
                  { itemCartSale !== undefined &&
                      <b>{`Итого к оплате: ${total + stateDeliveryPrice.priceDel} ₽`}</b>
                  }
                  { itemCartSale === undefined &&
                      <b>{total >= stateDeliveryPrice.deliverySalePrice ?
                      `Итого к оплате: ${total} ₽` : `Итого к оплате: ${total + stateDeliveryPrice.priceDel} ₽`}</b>
                  }
             </div>
             </>
            }
            { isEmpty(stateDeliveryPrice) &&
              <div>
                <b>Итого к оплате: {total} ₽</b>
             </div>
             }
                <hr></hr>
                <Tooltip title={buttonDisabled() === true && `Проверте правильность введенных данных
                • Имя может быть только из букв
                • Телефон может состоять только из цифр и должен начинаться с 8, 7 или +7 
                `}>
                <span>
                <Button
                    type="submit"
                    color={'primary'}
                    size={'large'}
                    disabled={buttonDisabled()}
                    variant="contained"
                    // classes={{root: classes.button, label: classes.label}}
                    >
                    Заказать
                </Button>
                </span>
                </Tooltip>

                {buttonDisabled() === true &&
                <>
                    <hr></hr>
                    <Typography style={{marginTop: 10}}>Проверте:</Typography>
                    <ul>
                        <li>Имя только из букв русского алфавита</li>
                        <li>Телефон только из цифр, начинается с 8, 7 или +7 </li>
                    </ul>
                  </>
                }
             </div>

         </form>
         </Grid> :
            <Box className={classes.emty} fontFamily="Comfortaa" fontWeight={700} fontSize={34}>
           Ваша корзина пуста </Box>
         } 
         </div>
</section>
  )
}

const mapStateToProps = ({shoppingCart: {cartItems, orderTotal, palochkiTotal}, contactsUser: {
    nameUser, phoneUser, deliverySity, deliveryAdress, comments, homeNumber, entranceNumber, levelNumber, doorPassword}}) => ({
    items: cartItems,
    total: orderTotal,
    comments,
    nameUser, phoneUser, deliverySity, deliveryAdress, homeNumber, entranceNumber, levelNumber,
    doorPassword, palochkiTotal
})

const mapDispatchToProps = {
    setName: setNameUser,
    setPhone: setPhoneUser,
    setSity: setCityUser,
    setAdress: setAdresUser,
    setHome: setHomeUser,
    setEntrance: setEnhanceUser,
    setLevel: setLavelUser,
    setDoor: setDoorUser,
    setDate: setDateDeliveryUser,
    setTime: setTimeDeliveryUser,
    userCommentsFunc
};

export default connect(mapStateToProps, mapDispatchToProps)(Order)

