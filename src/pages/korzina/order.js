import React, {useState} from "react"
import SEO from "../../components/seo"
import { connect } from 'react-redux';
import { navigate } from 'gatsby'
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import MaskedInput from 'react-text-mask';

import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from "axios";
import {useStyleOrder, IOSSwitch} from '../../components/common/style'
import {
    setAdresUser, setCityUser,
    setDateDeliveryUser, setDoorUser,
    setEnhanceUser, setHomeUser,
    setLavelUser, setNameUser,
    setPhoneUser, setTimeDeliveryUser, userCommentsFunc
} from "../../reducers/contacts-info";
import {defaultTo} from "ramda";
import {Container, Paper} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

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
net: {id: 0, priceDel: 0, deliverySalePrice: 0, name: "Не выбрано"},
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
        'product', ` <div style="display: flex; flex-direction: column; align-items: center;
                border: 1px solid lightgrey; margin-bottom: 10px; border-radius: 8px; padding: 10px;">
                <p style="text-align: center"><b>Toвар: </b> ${elem.name}</p>
                <p style="text-align: center"><b>Состав: </b> ${elem.description}</p> 
                <p style="text-align: center"><b>Размер: </b> ${elem.productSize}</p>
                <p style="text-align: center"><b>Доп.Ингидеенты: </b> ${elem.descriptionIngrideents}
                <p style="text-align: center"><b>Цена: </b> ${elem.total}</p>
                <p style="text-align: center"><b>Штук: </b> ${elem.count}</p></div>`);
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
 
  };

    const handleChange = event => setAge(event.target.value)
    const handleChangeDelivery = event => setDelivery(event.target.value);
    const handleChangeCity = city => event => {
        setSity(`${city[event.target.value].name}`)
        setStateDeliveryPrice(city[event.target.value]);
    };

    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true);

    const isEmpty = (obj) => {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false
}

    const validateUserName = () => {
        const nameValidate = /^[а-яё]{3,16}$/gi
        const name = nameUser.trim().replace(/\s/g, "")
        return nameValidate.test(String(name).toLowerCase())
    }
    const validateTextAria = () => {
    const commentTextArea = comments.trim().replace(/\s/g, "")
        if(comments === '') {
            return true
        } else if(comments !== '') {
            return ((/^[а-я_А-Я_0-9\-?()!,.ё]{3,230}$/).test(commentTextArea.toLowerCase()))
        }
    }
    // const validatePhone = () => {
    //     const phoneValidate = /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))$/gi
    //     const phone = phoneUser.trim().replace(/\s/g, "")
    //     return phoneValidate.test(phone.toLowerCase())
    // }

    const buttonDisabled = () => {
        if(validateUserName() === true && validateTextAria() === true ) {
            return false
        }
        return true
    }

    const itemCartSale = items.find((data) => data.total === 79 || data.priceDef === 0)
return (
    <section >
    <SEO title="Оформление заказа"
    noindex={true}/>
     <div className={classes.root}>
    <Container className={classes.paper}>
            <Typography variant="h2">
                <Box fontFamily="Oswald" fontWeight={900} fontSize={39}>Оформление заказа</Box>
            </Typography>
          </Container>
    <Container>
        { !isEmpty(items) ?
        <Grid container className={classes.gridContainer}>
        <form  
          method="POST"
          onSubmit={handleSubmit}
          // action="http://localhost:3000/"
          action={process.env.GATSBY_NODE_SERVE}
          name="svisniData"
          style={{width: '100%'}}>

            {/*Предзаказ или сразу время и дата*/}
            {/*Имя и Телефон*/}
            <Grid container>
                <Grid item xs={12} className="mt-3">
                    <Typography style={{textAlign: `center`}} variant="h6">
                        Дата и время доставки заказа
                    </Typography>
                    <FormGroup>

                        <Grid component="label" className="mt-1" container justify="center">
                            <Typography variant="body1">Сразу</Typography>
                            <Grid item>
                                <IOSSwitch checked={state.checkedC} onChange={handleChangee('checkedC')} value="checkedC"/>
                            </Grid>
                            <Typography variant="body1">Предзаказ</Typography>
                        </Grid>
                    </FormGroup>
                </Grid>
                {state.checkedC &&
                <>
                    <Grid item xs={12} sm={6} className="d-flex justify-content-center">
                        <TextField id="standard-full-width"
                                   variant="filled"
                                   fullWidth
                                   type="date"
                                   style={{ margin: `8px auto`, maxWidth: `90%` }}
                                   required
                                   name="date"
                                   onChange={(e) => {setDate(e.target.value);
                                   }}
                                   value={dateDelivery}
                                   helperText="Когда доставить"/>
                    </Grid>

                    <Grid item xs={12} sm={6} className="d-flex justify-content-center">
                        <TextField id="standard-full-width"
                                   variant="filled"
                                   margin="normal"
                                   fullWidth
                                   type="time"
                                   style={{ margin: `8px auto`, maxWidth: `90%` }}
                                   required
                                   name="time"
                                   onChange={(e) => {
                                       setTime(e.target.value);
                                   }}
                                   value={timeDelivery}
                                   helperText="К какому времени"/>
                    </Grid>
                </>
                }
                <Grid item xs={12} >
                    <Typography style={{textAlign: `center`}} variant="h6">
                        Укажите ваши личные данные </Typography>
                        {/*<Box fontFamily="Oswald"  fontWeight={900} fontSize={24}>Контактные данные</Box></Typography>*/}
                </Grid>
                <Grid item xs={12} sm={6} className="d-flex justify-content-center">
                    <TextField id="standard-full-width"
                        label="Ваше имя"
                        error={!validateUserName() && nameUser.length > 2}
                        fullWidth
                        variant="filled"
                        placeholder="Введите ваше имя"
                        style={{ margin: 8, maxWidth: `90%` }}
                        margin="normal"
                        required
                        inputProps={{maxLength: 11, minLength: 2}}
                        name="name"
                        onChange={(e) => {setName(e.target.value)}}
                        value={nameUser}
                        helperText={validateUserName() === false && nameUser.length !== 0 ? "Введите корректное имя" : "Введите ваше имя" } />
                </Grid>
                <Grid item xs={12} sm={6} className="d-flex justify-content-center">
                    <TextField id="standard-full-width"
                               helperText="Введите ваш телефон с цифры 9"
                               fullWidth
                               variant="filled"
                               type="tel"
                               style={{ margin: `8px auto`, maxWidth: `90%`}}
                               margin="normal"
                               required
                               InputProps={{inputComponent: TextMaskCustom}}
                               name="phone"
                               onChange={(e) => {setPhone(e.target.value)}}
                               value={phoneUser}/>
                </Grid>
            </Grid>

            {/*Доставка курьером или самовывоз*/}
            {/*Комментарий к заказу*/}
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6" style={{textAlign: `center`}}>
                        Как вы хотите получить заказ?
                    </Typography>
                </Grid>
                <Grid item xs={12} className="d-flex justify-content-center mt-3">
                    <FormControl required variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                            Способ получения заказа
                        </InputLabel>
                        <Select native value={delivery} onChange={handleChangeDelivery} inputProps={{
                            name: 'delivery',
                            id: 'outlined-age-native-simple'}}>
                            <option value=""></option>
                            <option value="Самовывоз">Заберу из Суши Бара</option>
                            <option value="Доставка курьером">Оформить доставку</option>
                        </Select>
                    </FormControl>
                </Grid>

                {delivery === "Доставка курьером" &&
                <>
                    <Grid item xs={12} sm={6} className="d-flex justify-content-center mt-3">
                        {/*<div className={classes.conatiner_info_delivery}>*/}
                        <FormControl required variant="filled" className={`${classes.formControl} mt-2`}>
                            <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                                Населённый пункт
                            </InputLabel>
                            <Select native value={deliverySity.city} onChange={handleChangeCity(city)} inputProps={{
                                name: 'city',
                                id: 'outlined-age-native-simple'}}>
                                <option value="net"></option>
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
                        {/*</div>*/}

                    </Grid>

                    <Grid item xs={12} sm={6} className="d-flex justify-content-center mt-3">
                        {/*<div className={classes.conatiner_info_delivery}>*/}
                        <TextField id="validation-outlined-input"
                                   label="Улица"
                                   variant="filled"
                                   margin="normal"
                                   fullWidth
                                   style={{ margin: `8px auto`, maxWidth: `90%` }}
                                   required
                                   inputProps={{maxLength: 20, minLength: 4}}
                                   name="street"
                                   onChange={(e) => {
                                       setAdress(e.target.value);
                                   }}
                                   value={deliveryAdress}
                                   helperText="Ваша улица"/>
                    </Grid>

                    <Grid item xs={6} sm={3} className="d-flex justify-content-center">
                        <TextField id="validation-outlined-input"
                                   label="Дом"
                                   variant="filled"
                                   margin="normal"
                                   fullWidth
                                   size="small"
                                   type="text"
                                   required
                                   style={{ margin: `8px auto`, maxWidth: `90%` }}
                                   inputProps={{maxLength: 5}}
                                   name="home"
                                   onChange={(e) => {
                                       setHome(e.target.value);
                                   }}
                                   value={homeNumber}
                                   helperText="Ваш номер дома"/>
                    </Grid>

                    <Grid item xs={6} sm={3} className="d-flex justify-content-center">
                        <TextField id="validation-outlined-input"
                                   label="Подъезд"
                                   variant="filled"
                                   margin="normal"
                                   fullWidth
                                   style={{ margin: `8px auto`, maxWidth: `90%` }}
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
                                   helperText="Номер подъезда"/>
                    </Grid>

                    <Grid item xs={6} sm={3} className="d-flex justify-content-center">
                        <TextField id="validation-outlined-input"
                                   label="Этаж"
                                   variant="filled"
                                   margin="normal"
                                   fullWidth
                                   size="small"
                                   style={{ margin: `8px auto`, maxWidth: `90%` }}
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
                    </Grid>

                    <Grid item xs={6} sm={3} className="d-flex justify-content-center">
                        <TextField id="validation-outlined-input"
                                   label="Код двери"
                                   variant="filled"
                                   margin="normal"
                                   fullWidth
                                   size="small"
                                   type="number"
                                   style={{ margin: `8px auto`, maxWidth: `90%` }}
                                   inputProps={{maxLength: 6}}
                                   name="kodDveri"
                                   onChange={(e) => {
                                       setDoor(e.target.value);
                                   }}
                                   value={doorPassword}
                                   helperText="Код двери"/>
                    </Grid>
                </>
                }
                <Grid item xs={12} className="d-flex justify-content-center mt-4">
                    <TextField
                        id="outlined-multiline-static"
                        label="Комментарий к заказу"
                        multiline
                        value={comments}
                        onChange={(e) => userCommentsFunc(e.target.value)}
                        rows="2"
                        error={!validateTextAria() && comments.length > 2}
                        inputProps={{minLength: 3, maxLength: 250}}
                        name="comments"
                        variant="filled"
                        margin="normal"
                        fullWidth
                        style={{ margin: `8px auto`, maxWidth: `95%` }}
                        helperText={!validateTextAria() && comments.length > 2 ? "Удалите лишние знаки и символы" : ""}
                    />
                </Grid>
            </Grid>

            {/*Кнопка заказать*/}
            <Grid container>
                <Grid item xs={12} style={{ margin: `12px auto 8px auto`, maxWidth: `90%`}}>
                    <Paper elevation={3} className={classes.paperEndOrder}>
                        { delivery !== "Самовывоз" && !isEmpty(stateDeliveryPrice) &&
                        <>
                            <div>
                                { itemCartSale === undefined &&
                                <Typography variant={"h5"} style={{fontSize: 22}}>{total <= stateDeliveryPrice.deliverySalePrice ? <>
                                    Доставка: + <strong>{stateDeliveryPrice.priceDel} ₽</strong></> : <strong>Доставка бесплатно</strong>}</Typography>
                                }
                                { itemCartSale === undefined &&
                                <Typography variant={"body2"}>{total <= stateDeliveryPrice.deliverySalePrice ? <>
                                        Для бесплатной доставки в {stateDeliveryPrice.name} сделайте заказ еще минимум
                                        на <strong> + {stateDeliveryPrice.deliverySalePrice - total} ₽</strong></>
                                    : ""}</Typography>
                                }
                                { itemCartSale !== undefined &&
                                <Typography variant={"subtitle2"} style={{fontSize: 20}}>Доставка вместе с акцией + <strong>{stateDeliveryPrice.priceDel}</strong></Typography>
                                }
                            </div>
                            <div>
                                <Grid item className="mt-4 mb-2" xs={12}>
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
                                </Grid>

                                { itemCartSale !== undefined &&
                                <Typography variant={"h5"} style={{fontSize: 22}}>Итого к оплате: <b>{` ${total + stateDeliveryPrice.priceDel} ₽`}</b> </Typography>
                                }
                                { itemCartSale === undefined &&
                                <Typography variant={"h5"} style={{fontSize: 22}}>Итого к оплате: <b>{total >= stateDeliveryPrice.deliverySalePrice ?
                                    `${total} ₽` : `${total + stateDeliveryPrice.priceDel} ₽`}</b></Typography>
                                }
                            </div>
                        </>
                        }
                        { isEmpty(stateDeliveryPrice) &&
                        <div>
                            <Typography variant={"h5"} style={{fontSize: 22}}>Итого к оплате: <strong>{total} ₽</strong></Typography>
                        </div>
                        }
                        <Tooltip title={buttonDisabled() === true && `Проверте правильность введенных данных
                         • Имя может быть только из букв`}>
                <span>
                <Button
                    type="submit"
                    color={'primary'}
                    size={'large'}
                    disabled={buttonDisabled()}
                    variant="contained"
                    // classes={{root: classes.button, label: classes.label}}
                >
                    Сделать заказ
                </Button>
                </span>
                        </Tooltip>

                        {buttonDisabled() === true &&
                        <>
                            <hr></hr>
                            <Typography style={{marginTop: 10}}>Проверте:</Typography>
                            <ul>
                                <li>Имя только из букв русского алфавита</li>
                            </ul>
                        </>
                        }
                    </Paper>
                </Grid>
            </Grid>

         </form>
         </Grid> :
            <Box className={classes.emty} fontFamily="Comfortaa" fontWeight={700} fontSize={22}>
           Ваша корзина пуста </Box>
         }
    </Container>
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
