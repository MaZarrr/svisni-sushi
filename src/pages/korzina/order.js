import React, {useState} from "react"
import Seo from "../../components/seo"
import { connect } from 'react-redux';
import { navigate } from 'gatsby'
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MaskedInput from 'react-text-mask';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import {
  setAdresUser, setCityUser,
  setDateDeliveryUser,
  setEnhanceUser, setHomeUser, setNameUser,
  setPhoneUser, setTimeDeliveryUser,
  userCommentsFunc, userApartment
} from "../../reducers/contacts-info";
import { Container, Paper } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import makeStyles from '@mui/styles/makeStyles';
import loadable from "@loadable/component";
import HeadSection from "../../components/HeadSection"
import { isBrowser } from "../../components/common/constants";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ClipLoader from "react-spinners/ClipLoader";
import useCheckedInternet from "../../utils/useCheckedInternet";
// import PayDialog from "../../components/PayDialog"

const inputLabel = React.forwardRef(null)

const EmptyBasket = loadable(() => import('../../components/EmptyBasket'))

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
      <MaskedInput
          {...other}
          mask={[/[7, 8]/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          placeholderChar={'\u2000'}
          guide={false}
      />
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const city = {
  net: {id: 0, priceDel: 0, deliverySalePrice: 0, name: "Не выбрано"},
  kol: {id: 1, priceDel: 250, deliverySalePrice: 1600, name: "Колыхалино"},
  dvyl: {id: 2, priceDel: 200, deliverySalePrice: 1500, name: "Двулучное"},
  val: {id: 3, priceDel: 400, deliverySalePrice: 1800, name: "Валуйки(центр)"},
  yraz: {id: 4, priceDel: 100, deliverySalePrice: 500, name: "Уразово"},
  shel: {id: 5, priceDel: 200, deliverySalePrice: 1500, name: "Шелаево"},
  gera: {id: 6, priceDel: 350, deliverySalePrice: 1800, name: "Герасимовка"},
  sobo: {id: 7, priceDel: 150, deliverySalePrice: 1000, name: "Соболёвка"},
  sved: {id: 8, priceDel: 250, deliverySalePrice: 1400, name: "Шведуновка"},
  borki: {id: 9, priceDel: 350, deliverySalePrice: 1700, name: "Борки"},
  znamenk: {id: 10, priceDel: 150, deliverySalePrice: 1000, name: "Знаменка"},
  loga: {id: 11, priceDel: 400, deliverySalePrice: 2000, name: "Логачевка"},
  kyky: {id: 12, priceDel: 300, deliverySalePrice: 1600, name: "Кукуевка"},
  kolos: {id: 13, priceDel: 650, deliverySalePrice: 3400, name: "Колосково"},
  kazink: {id: 14, priceDel: 600, deliverySalePrice: 3300, name: "Казинка"},
  soloti: {id: 15, priceDel: 650, deliverySalePrice: 4000, name: "Солоти"},
  rogdestv: {id: 16, priceDel: 600, deliverySalePrice: 4000, name: "Рождественно"},
  samar: {id: 17, priceDel: 850, deliverySalePrice: 4900, name: "Самарино"},
  valsoshgor: {id: 18, priceDel: 350, deliverySalePrice: 1800, name: "Валуйки(соц.городок)"},
  valrazdol: {id: 19, priceDel: 350, deliverySalePrice: 1800, name: "Валуйки(раздолье)"},
  togobi: {id: 20, priceDel: 150, deliverySalePrice: 900, name: "Тогобиевка"},
  novopetr: {id: 21, priceDel: 550, deliverySalePrice: 3400, name: "Новопетровка"},
  babki: {id: 22, priceDel: 350, deliverySalePrice: 1800, name: "Бабки"},
  syxarevo: {id: 23, priceDel: 250, deliverySalePrice: 1500, name: "Сухарево"},
  tatarievka: {id: 24, priceDel: 100, deliverySalePrice: 1100, name: "Татариевка"},
  pricten: {id: 25, priceDel: 300, deliverySalePrice: 1600, name: "Пристень"},
  lobkovka: {id: 26, priceDel: 250, deliverySalePrice: 1300, name: "Лобковка"},
  nasonovo: {id: 27, priceDel: 650, deliverySalePrice: 4000 , name: "Насоново"},
  yablonovo: {id: 28, priceDel: 600, deliverySalePrice: 2900 , name: "Яблоново"},
  valsim: {id: 29, priceDel: 400, deliverySalePrice: 2000, name: "Валуйки(Нов.Симоновка)"},
  valsovhoz: {id: 30, priceDel: 500, deliverySalePrice: 2000, name: "Валуйки(совхоз)"},
  valkordon: {id: 31, priceDel: 500, deliverySalePrice: 2000, name: "Валуйки(байрацкий.корд)"},
  hrapovo: {id: 32, priceDel: 350, deliverySalePrice: 2000, name: "Храпово"},
  zerdevk: {id: 33, priceDel: 200, deliverySalePrice: 1000, name: "Жердевка"},
  yraevo: {id: 34, priceDel: 400, deliverySalePrice: 2100, name: "Ураево"},
  hohlovo: {id: 35, priceDel: 700, deliverySalePrice: 4500, name: "Хохлово"},
  romashowka: {id: 36, priceDel: 350, deliverySalePrice: 1900, name: "Ромашовка"},
  dolgoe: {id: 37, priceDel: 350, deliverySalePrice: 1900, name: "Долгое"},
};

const Order = ({items, palochkiTotal, nameUser, phoneUser, deliverySity, deliveryAdress, homeNumber,
                 entranceNumber, setName, setPhone, setSity, setAdress, setHome, setEntrance, userApartment,
                 setTime, setDate, total, dateDelivery, timeDelivery, userCommentsFunc, comments, apartment }) => {

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const [age, setAge] = useState('');
  const [delivery, setDelivery] = useState('');
  const [openAlert, setOpenAlert] = React.useState(false);
  const [state, setState] = React.useState("promptly");
  const [textAlert, setTextAlert] = React.useState("");
  const [variantPay, setVariantPay] = React.useState("cash");
  const [stateDeliveryPrice, setStateDeliveryPrice] = React.useState({});
  const [{vertical, horizontal},] = useState({
    vertical: 'bottom',
    horizontal: 'center',
  });
  
  const classes = useStyleOrder();
  const [isOnline, checkedIsOnline, removeCheckedEventIsOnline] = useCheckedInternet()


  React.useEffect(() => {
    setIsLoading(false)
    checkedIsOnline()
    const userData = JSON.parse(localStorage.getItem('localUserData'));
    console.log('userData__', userData);
    if(userData) {
      setName(userData.userName);
      setPhone(userData.userPhone)
    }
    return () => removeCheckedEventIsOnline()
  }, []);

  const handleChangee = name => event => setState(name);
  const onSwitchPay = (pay) => () => setVariantPay(pay);
  const handleSubmit = (ev) => {
    ev.preventDefault();

    const totalPriceOrder = () => {
      if(delivery === "Самовывоз") {
        return total
      } else if(delivery !== "Самовывоз" && !itemCartPizza) {
        if(total < stateDeliveryPrice.deliverySalePrice) {
          return stateDeliveryPrice.priceDel + total
        }
        return total
      } else if(delivery !== "Самовывоз" && itemCartPizza) {
        return stateDeliveryPrice.priceDel + total
      }
    }

    const pushOrder = async () => {
      setIsLoading(true)

      const deliveru = delivery === "Самовывоз" ? ev.target.delivery.value : {
        formDelivery: ev.target.delivery.value,
        adress: stateDeliveryPrice.name,
        street: deliveryAdress,
        home: ev.target.home.value,
        apartment: ev.target.apartment.value,
        podezd: ev.target.podezd.value,
        // etag: ev.target.etag.value,
        // kodDveri: ev.target.kodDveri.value
      };
      const deliveryTimeOrder = state !== "deliveryTime" ? "Сразу" : {
        dateDelivery: ev.target.date.value,
        timeDelivery: ev.target.time.value
      };
      const infoSuccess = {
        name: ev.target.name.value,
        phone: ev.target.phone.value,
        products: items.map((elem) => {

          const descriptionIngrideents = elem.descriptionIngrideents === "" ? "" : elem.descriptionIngrideents;
          const productSize = elem.productSize === "" ? "" : elem.productSize;
          const descriptionWok = elem.isWok ? elem.descriptionWok === "" ? "" : elem.descriptionWok : "";

          return {
            product: elem.name,
            total: elem.total,
            count: elem.count,
            description: elem.description,
            descriptionIngrideents,
            productSize,
            descriptionWok
          }
        }),
        delivery: deliveru,
        deliveryTime: deliveryTimeOrder,
        totalPrice: `${totalPriceOrder()} ${variantPay === "cash" ? "Нал" : "Он-й"}`,
        sdacha: variantPay === "cash" ? ev.target.sdacha.value === "" ? "Без сдачи" : `Сдача с ${ev.target.sdacha.value} руб` : "Онлайн оплата",
        chopsticks: palochkiTotal,
        comments: ev.target.comments.value,
      };

      if(isBrowser) {
        if(sessionStorage.getItem('checkOrder') !== 'true' && (variantPay === "cash" || variantPay === "bank")) {
          const sendSocial = await axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            data: infoSuccess,
            url: `https://platformsvisni.ru/sending`

          });
  
          const sendMail = await axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            data: infoSuccess,
            url: 'https://platformsvisni.ru/'
          });
          // const sendMail = new Promise((res) => res());
          // const sendSocial = new Promise((res) => res());
          Promise.all([sendSocial, sendMail])
          .then((data) => {
            // const checkedAllStatus = data.every((item) => item.status >= 300)
            // if(checkedAllStatus) {
              setIsLoading(false)
            // } else {
            //   setTextAlert("Усп! Непредвиденная ошибка. Попробуйте еще раз или свяжите с нами по телефону +7(904) 094-92-22")
            //   handleClickAlert()
            //   console.log(data);
            // }
          })
          .catch((error) => {
            setTextAlert("Усп! Непредвиденная ошибка. Попробуйте еще раз или свяжите с нами по телефону +7(904) 094-92-22")
            handleClickAlert()
            console.log(error)
            }
          )
          
        }
      }
      if(!isLoading) {
        isBrowser && sessionStorage.setItem('checkOrder', 'true');
        isBrowser && localStorage.removeItem('basketProduct');
        navigate('/korzina/order/order-processed', {
          state: infoSuccess, 
          replace: true 
          // state: {infoSuccess, isLoading: false}, 
          })
        }
    }

    if(isBrowser && sessionStorage.getItem('checkOrder') === 'true') {
      setTextAlert("Ваш заказ уже оформлен и отправлен! Ожидайте звонка оператора Свисни Суши.")
      handleClickAlert()
    } else if(!isOnline) {      
      // if(!navigator.onLine ) {
      setTextAlert("Проверьте подключение к интернету и попробуйте заново.")
      handleClickAlert()
    } else {
      pushOrder()
    }
    localStorage.setItem('localUserData', JSON.stringify({ userName: nameUser, userPhone: phoneUser }))

  };


  const handleChange = event => setAge(event.target.value);
  const handleChangeDelivery = event => setDelivery(event.target.value);
  const handleChangeCity = city => event => {
    setSity(`${city[event.target.value].name}`);
    setStateDeliveryPrice(city[event.target.value]);
  };
  // const handleClosePay = () => {
  //   setOpenPay(false);
  // };
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleClickAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };
  const isEmpty = (obj) => {
    if (Object.keys(obj).length === 0) {
      return true;
    }
    return false
  };
  const validateUserName = () => {
    const nameValidate = /^[а-яё]{3,16}$/gi;
    const name = nameUser.trim().replace(/\s/g, "");
    return nameValidate.test(String(name).toLowerCase())
  };
  const validateTextAria = () => {
    const commentTextArea = comments.trim().replace(/\s/g, "")
    if(comments === '') {
      return true
    } else if(comments !== '') {
      return ((((((((((((((((((((((((((((((((((((((((/^[а-я_А-Я_0-9\-?()!,.ё:]{3,230}$/)))))))))))))))))))))))))))))))))))))))).test(commentTextArea.toLowerCase());
    }
  };
  const validatePhone = () => {
    const phoneValidate =  /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/
    const phone = phoneUser.trim().replace(/\s/g, "")
    return phoneValidate.test(phone.toLowerCase())
  };
  const validateDelivery = () => {
    if(delivery === "Доставка курьером" && deliverySity !== "Не выбрано" && deliverySity !== "") {
      return true
    } else if (delivery === "Самовывоз") {
      return true
    }

    return false
  };

  const buttonDisabled = () => {
    if(validateUserName() === true && validatePhone() === true &&
        validateTextAria() === true && validateDelivery() === true ) {
      return false
    }
    return true
  };

  const itemCartPizza = items.includes(items.find((data) => data.priceDef === 0));
  return (
      <section>
        <Seo title="Оформление заказа"
             noindex={true}/>
          <div className={classes.root}>
          <HeadSection titleTXT={"Оформление заказа"} />
          {/* { !isLoading ? <> */}
                    
                    { isLoading && 
                    <div style={{ height: '100vh', 
                          width: "100%", 
                          flexDirection: 'column', 
                          minHeight: '280px', 
                          justifyContent: 'center', 
                          alignItems: 'center', 
                          display: 'flex' }}>
                            <div><ClipLoader size={150}/></div>
                            <div>Подождите, идет отправка заказа...</div>
                    </div> 
                    }

                    { !isLoading  &&
                      <Container maxWidth={"xl"}>
                        { !isEmpty(items) ?
                            <Grid container className={classes.gridContainer}>
                              <form
                                  onSubmit={handleSubmit}
                                  // action="https://formspree.io/xbjdqevk"
                                  // method="POST"
                                  name="svisniData"
                                  style={{width: '100%'}}>
          
                                <div className={classes.root}>
                                  <Grid container spacing={2}>
                                    {/*Имя и Телефон*/}
                                    <Grid item xs={12} style={{paddingBottom: 0, marginTop: 14}}>
                                      <Typography variant="body1">
                                        Укажите данные для связи </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{paddingTop: 0}}>
                                      <TextField id="standard-full-width"
                                                label="Ваше имя"
                                                error={!validateUserName() && nameUser.length > 2}
                                                fullWidth
                                                variant="filled"
                                                placeholder="Введите ваше имя"
                                                required
                                                inputProps={{maxLength: 20, minLength: 2}}
                                                name="name"
                                                onChange={(e) => {setName(e.target.value)}}
                                                value={nameUser}
                                                helperText={validateUserName() === false && nameUser.length !== 0 ? "Введите корректное имя" : "Введите ваше имя" } />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{paddingTop: 0}}>
                                      <TextField id="standard-full-width"
                                                helperText={validatePhone() === false ? "Введите телефон с 7 или 8" : "Ваш телефон" }
                                                fullWidth
                                                variant="filled"
                                                type="tel"
                                                required
                                                inputProps={{minLength: 14}}
                                                InputProps={{inputComponent: TextMaskCustom, minLength: 14}}
                                                name="phone"
                                                onChange={(e) => {setPhone(e.target.value)}}
                                                value={phoneUser}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Typography variant="body1">
                                        Выберите форму оплаты
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Button fullWidth style={{fontSize: 17}} variant={variantPay === "cash" ? "contained" : "outlined"} color="primary"
                                              onClick={onSwitchPay("cash")}>
                                        Оплата наличными
                                      </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Button fullWidth style={{fontSize: 17}} variant={variantPay === "bank" ? "contained" : "outlined"} color="primary"
                                              onClick={onSwitchPay("bank")}>
                                        Онлайн перевод
                                      </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Grid item xs={12}>
                                        <Typography variant="body1">
                                          Как вы хотите получить заказ?
                                        </Typography>
                                      </Grid>
                                      <FormControl required variant="outlined" className={classes.formControl}>
                                        <Select native value={delivery} onChange={handleChangeDelivery} inputProps={{
                                          name: 'delivery',
                                          id: 'outlined-age-native-simple'}}>
                                          <option value="">Не выбрано</option>
                                          <option value="Самовывоз">Самовынос</option>
                                          <option value="Доставка курьером">Оформить доставку</option>
                                        </Select>
                                        <FormHelperText id="my-helper-text">Способ получения заказа</FormHelperText>
                                      </FormControl>
                                    </Grid>
                                    {delivery !== '' && <>
                                      {/*Предзаказ или сразу время и дата*/}
                                      <Grid item xs={12}>
                                        <Typography  variant="body1">
                                          { delivery !== "Самовывоз" ? "Дата и время доставки заказа"
                                              : "Дата и время готовки заказа"}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Button fullWidth style={{fontSize: 17}} variant={state === "promptly" ? "contained" : "outlined"} color="primary"
                                                onClick={handleChangee("promptly")}>
                                          {delivery === "Самовывоз" ? "Приготовить сразу" : "Доставить сразу"}
                                        </Button>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Button fullWidth style={{fontSize: 17}} variant={state === "deliveryTime" ? "contained" : "outlined"} color="primary"
                                                onClick={handleChangee("deliveryTime")}>
                                          {delivery === "Самовывоз" ? "Приготовить ко времени" : "Доставить ко времени"}
                                        </Button>
                                      </Grid>
                                    </>}
          
                                    {delivery !== "" && state === "deliveryTime" && <>
                                      <Grid item xs={12} sm={6}>
                                        <TextField id="standard-full-width"
                                                  variant="filled"
                                                  fullWidth
                                                  type="date"
                                                  required
                                                  name="date"
                                                  onChange={(e) => {setDate(e.target.value);
                                                  }}
                                                  value={dateDelivery}
                                                  helperText="Дата доставки/готовки"/>
                                      </Grid>
          
                                      <Grid item xs={12} sm={6}>
                                        <TextField id="standard-full-width"
                                                  variant="filled"
                                                  fullWidth
                                                  type="time"
                                                  required
                                                  name="time"
                                                  onChange={(e) => {
                                                    setTime(e.target.value);
                                                  }}
                                                  value={timeDelivery}
                                                  helperText="К какому времени доставить/приготовить"/>
                                      </Grid>
                                    </>}
                                    {delivery === "Доставка курьером" && <>
                                      <Grid item xs={12} sm={4}>
                                        <FormControl required variant="filled" className={classes.formControl}>
                                          <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                                            Населённый пункт
                                          </InputLabel>
                                          <Select native value={deliverySity.city}
                                                  onChange={handleChangeCity(city)}
                                                  inputProps={{ name: 'city',
                                                    id: 'outlined-age-native-simple'}}>
                                            <option value="net">Не выбрано</option>
                                            <option value="yraz">Уразово</option>
                                            <option style={{background: `#f0ecec`}} value="val">Валуйки(центр)</option>
                                            <option value="valsoshgor">Валуйки(соц.городок)</option>
                                            <option style={{background: `#f0ecec`}} value="valrazdol">Валуйки(раздолье)</option>
                                            <option value="valsim">Валуйки(нов.симоновка)</option>
                                            <option style={{background: `#f0ecec`}}  value="valsovhoz">Валуйки(совхоз)</option>
                                            <option value="valkordon">Валуйки(байрацкий.корд)</option>
                                            <option style={{background: `#f0ecec`}} value="dvyl">Двулучное</option>
                                            <option value="shel">Шелаево</option>
                                            <option style={{background: `#f0ecec`}} value="sobo">Соболевка</option>
                                            <option value="kol">Колыхалино</option>
                                            <option style={{background: `#f0ecec`}} value="sved">Шведуновка</option>
                                            <option value="togobi">Тогобиевка</option>
                                            <option style={{background: `#f0ecec`}} value="novopetr">Новопетровка</option>
                                            <option value="babki">Бабки</option>
                                            <option style={{background: `#f0ecec`}} value="syxarevo">Сухарево</option>
                                            <option value="zerdevk">Жердевка</option>
                                            <option style={{background: `#f0ecec`}} value="tatarievka">Татариевка</option>
                                            <option value="pricten">Пристень</option>
                                            <option style={{background: `#f0ecec`}} value="lobkovka">Лобковка</option>
                                            <option value="romashowka">Ромашовка</option>
                                            <option style={{background: `#f0ecec`}} value="dolgoe">Долгое</option>
                                            <option value="soloti">Солоти</option>
                                            <option style={{background: `#f0ecec`}} value="borki">Борки</option>
                                            <option value="znamenk">Знаменка</option>
                                            <option style={{background: `#f0ecec`}} value="gera">Герасимовка</option>
                                            <option value="kazink">Казинка</option>
                                            <option style={{background: `#f0ecec`}} value="loga">Логачевка</option>
                                            <option value="kyky">Кукуевка</option>
                                            <option style={{background: `#f0ecec`}} value="kolos">Колосково</option>
                                            <option value="hrapovo">Храпово</option>
                                            <option style={{background: `#f0ecec`}} value="nasonovo">Насоново</option>
                                            <option value="yablonovo">Яблоново</option>
                                            <option style={{background: `#f0ecec`}} value="rogdestv">Рождественно</option>
                                            <option value="yraevo">Ураево</option>
                                            <option style={{background: `#f0ecec`}} value="samar">Самарино</option>
                                            <option value="hohlovo">Хохлово</option>
                                          </Select>
          
                                          <FormHelperText id="my-helper-text">Выберите населенный пункт</FormHelperText>
                                        </FormControl>
                                      </Grid>
                                      <Grid item xs={12} sm={4}>
                                        <TextField id="validation-outlined-input"
                                                  label="Улица"
                                                  variant="filled"
                                                  fullWidth
                                                  required
                                                  inputProps={{maxLength: 40, minLength: 4}}
                                                  name="street"
                                                  onChange={(e) => {
                                                    setAdress(e.target.value);
                                                  }}
                                                  value={deliveryAdress}
                                                  helperText="Ваша улица"/>
                                      </Grid>
                                      <Grid item xs={12} sm={4}>
                                        <TextField id="validation-outlined-input"
                                                  label="Дом"
                                                  variant="filled"
                                                  fullWidth
                                                  type="text"
                                                  required
                                                  inputProps={{maxLength: 5}}
                                                  name="home"
                                                  onChange={(e) => {
                                                    setHome(e.target.value);
                                                  }}
                                                  value={homeNumber}
                                                  helperText="Ваш номер дома"/>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <TextField id="validation-outlined-input"
                                                  label="Квартира"
                                                  variant="filled"
                                                  margin="normal"
                                                  fullWidth
                                                  size="small"
                                                  type="text"
                                                  style={{ margin: `8px auto` }}
                                                  inputProps={{ maxLength: 5 }}
                                                  name="apartment"
                                                  onChange={(e) => userApartment(e.target.value)}
                                                  value={apartment}
                                                  helperText="Номер квартиры"/>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <TextField id="validation-outlined-input"
                                                  label="Подъезд"
                                                  variant="filled"
                                                  margin="normal"
                                                  fullWidth
                                                  style={{ margin: `8px auto`}}
                                                  type="number"
                                                  size="small"
                                                  inputProps={{maxLength: 2}}
                                                  name="podezd"
                                                  onChange={(e) => {
                                                    setEntrance(e.target.value);
                                                  }}
                                                  value={entranceNumber}
                                                  helperText="Номер подъезда"/>
                                      </Grid>
                                    </>}
          
                                    <Grid item xs={12}>
                                      <TextField
                                          id="outlined-multiline-static"
                                          label="Комментарий к заказу"
                                          multiline
                                          value={comments}
                                          onChange={(e) => userCommentsFunc(e.target.value)}
                                          rows="3"
                                          error={!validateTextAria() && comments.length > 2}
                                          inputProps={{minLength: 3, maxLength: 255}}
                                          name="comments"
                                          variant="filled"
                                          margin="normal"
                                          fullWidth
                                          style={{ margin: `8px auto`}}
                                          helperText={!validateTextAria() && comments.length > 2 ? "Удалите лишние знаки и символы" : ""}
                                      />
                                    </Grid>
                                  </Grid>
                                </div>
          
                                {/*Кнопка заказать*/}
                                <Grid container>
                                  {/*Если онлайн оплата не показывать сдачу*/}
                                  {variantPay === 'cash' &&
                                  <Grid item xs={12}>
          
                                    <InputLabel id="demo-controlled-open-select-label">Сдача</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        open={open}
                                        onClose={handleClose}
                                        onOpen={handleOpen}
                                        value={age}
                                        name="sdacha"
                                        label="Без сдачи"
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
                                  }
                                  <Grid item xs={12} style={{ margin: `20px auto 50px auto`}}>
                                    <Paper elevation={3} className={classes.paperEndOrder}>
                                      { delivery !== "Самовывоз" && !isEmpty(stateDeliveryPrice) &&
                                      <>
                                        <div>
                                          { !itemCartPizza &&
                                          <Typography variant={"h5"} style={{fontSize: 18}}>{total < stateDeliveryPrice.deliverySalePrice ? <>
                                            Доставка: + <strong>{stateDeliveryPrice.priceDel} ₽</strong></> : <strong>Доставка бесплатно</strong>}</Typography>
                                          }
                                          { !itemCartPizza &&
                                          <Typography variant={"body2"}>{total < stateDeliveryPrice.deliverySalePrice ? <>
                                                Для бесплатной доставки в {stateDeliveryPrice.name} сделайте заказ еще минимум
                                                на <strong> + {stateDeliveryPrice.deliverySalePrice - total} ₽</strong></>
                                              : ""}</Typography>
                                          }
                                          { itemCartPizza &&
                                          <Typography variant={"subtitle2"} style={{fontSize: 16}}>Доставка с бесплатной пиццей Ветчина-Грибы-Бекон + <strong>{stateDeliveryPrice.priceDel} ₽</strong></Typography>
                                          }
                                        </div>
                                        <div style={{marginTop: 15, marginBottom: 15}}>
                                          { itemCartPizza &&
                                          <Typography variant={"h5"} style={{fontSize: 22}}>Итого к оплате: <b>{` ${total + stateDeliveryPrice.priceDel} ₽`}</b> </Typography>
                                          }
                                          { !itemCartPizza &&
                                          <Typography variant={"h5"} style={{fontSize: 22}}>Итого к оплате: <b>{total >= stateDeliveryPrice.deliverySalePrice ?
                                              `${total} ₽` : `${total + stateDeliveryPrice.priceDel} ₽`}</b></Typography>
                                          }
                                        </div>
                                      </>
                                      }
          
                                      { isEmpty(stateDeliveryPrice) || delivery === "Самовывоз" ?
                                          <div>
                                            <Typography variant={"h6"} style={{fontSize: 16}}>Итого к оплате: <strong>{total} ₽</strong></Typography>
                                          </div> : ''
                                      }
                                      {/*/!*если онлай оплата показывать другую кнопку*!/*/}
                                      {/*   {variantPay === 'cash' &&*/}
                                      <span style={{ position: `relative`}}>
                                    <Button
                                        type="submit"
                                        disabled={buttonDisabled()}
                                        variant="contained">
                                        Сделать заказ
                                        {/* { variantPay === "cash" ? "Сделать заказ" : "Сделать заказ"} */}
                                    </Button>
                                  </span>
          
                                      { buttonDisabled() === true &&
                                      <>
                                        <hr></hr>
                                        <Typography style={{marginTop: 10}}>* Обязательно:</Typography>
                                        <ul>
                                          { !validateUserName() && <li>Введите имя из букв</li>}
                                          { !validatePhone() && <li>Введите корректный телефон</li>}
                                          { !validateDelivery() && delivery === "Доставка курьером" && <li>Выберите населенный пункт</li>}
                                        </ul>
                                      </>
                                      }
                                    </Paper>
                                  </Grid>
                                </Grid>
          
                              </form>
                              {/* <PayDialog open={openPay} handleClose={() => handleClosePay()} name={nameUser} phone={phoneUser}
                                        total={delivery === "Самовывоз" ? total : total < stateDeliveryPrice.deliverySalePrice ? total + stateDeliveryPrice.priceDel : total}/> */}
          
                              <Snackbar open={openAlert} autoHideDuration={5000} style={{bottom: 90}} onClose={handleCloseAlert}
                                        anchorOrigin={{ vertical, horizontal }}
                                        key={vertical + horizontal}>
                                <Alert onClose={handleCloseAlert} severity="info">
                                  {textAlert}
                                </Alert>
                              </Snackbar>
                            </Grid> : <EmptyBasket/> }
                      </Container>
                    }
        </div>
      </section>
  )
};

const mapStateToProps = ({ app: { loading }, shoppingCart: {cartItems, orderTotal, palochkiTotal}, contactsUser: {
  nameUser, phoneUser, deliverySity, deliveryAdress, comments, homeNumber, entranceNumber, levelNumber, doorPassword, apartment}}) => ({
  items: cartItems,
  total: orderTotal,
  isLoadingOrder: loading,
  comments, apartment,
  nameUser, phoneUser, deliverySity, deliveryAdress, homeNumber, entranceNumber, levelNumber,
  doorPassword, palochkiTotal
});

const mapDispatchToProps = {
  setName: setNameUser,
  setPhone: setPhoneUser,
  setSity: setCityUser,
  setAdress: setAdresUser,
  setHome: setHomeUser,
  setEntrance: setEnhanceUser,
  setDate: setDateDeliveryUser,
  setTime: setTimeDeliveryUser,
  userApartment,
  userCommentsFunc
};

export default connect(mapStateToProps, mapDispatchToProps)(Order)

const useStyleOrder = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 'auto',
    maxWidth: 1536
  },
  paperEndOrder: {
    padding: `10px 50px`,
    [theme.breakpoints.down('500')]: {
      padding: `10px 10px`
    }
  },
  gridContainer: {
    flexGrow: 1
  },
  formControl: {
    width: `100%`
  },
  paper: {
    textAlign: 'center',
    paddingTop: 80,
    [theme.breakpoints.down('475')]: {
      paddingTop: 40
    },
  },
}));
