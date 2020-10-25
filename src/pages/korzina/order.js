import React, {useState} from "react"
import SEO from "../../components/seo"
import { connect } from 'react-redux';
import { navigate } from 'gatsby'
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MaskedInput from 'react-text-mask';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from "axios";
import {useStyleOrder} from '../../components/common/style'
import {
    setAdresUser, setCityUser,
    setDateDeliveryUser, setDoorUser,
    setEnhanceUser, setHomeUser,
    setLavelUser, setNameUser,
    setPhoneUser, setTimeDeliveryUser,
    userCommentsFunc, userApartment
} from "../../reducers/contacts-info";
import {defaultTo} from "ramda";
import {Container, Paper} from "@material-ui/core";
import EmptyBasket from '../../components/EmptyBasket';
import FormHelperText from "@material-ui/core/FormHelperText";

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[7, 8]/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            guide={false}
        />
    );
}

const city = {
    net: {id: 0, priceDel: 0, deliverySalePrice: 0, name: "Не выбрано"},
    kol: {id: 1, priceDel: 250, deliverySalePrice: 1400, name: "Колыхалино"},
    dvyl: {id: 2, priceDel: 150, deliverySalePrice: 1000, name: "Двулучное"},
    val: {id: 3, priceDel: 350, deliverySalePrice: 1400, name: "Валуйки(центр)"},
    yraz: {id: 4, priceDel: 100, deliverySalePrice: 500, name: "Уразово"},
    shel: {id: 5, priceDel: 150, deliverySalePrice: 1000, name: "Шелаево"},
    gera: {id: 6, priceDel: 250, deliverySalePrice: 1400, name: "Герасимовка"},
    sobo: {id: 7, priceDel: 150, deliverySalePrice: 700, name: "Соболёвка"},
    sved: {id: 8, priceDel: 150, deliverySalePrice: 1000, name: "Шведуновка"},
    borki: {id: 9, priceDel: 300, deliverySalePrice: 1400, name: "Борки"},
    znamenk: {id: 10, priceDel: 150, deliverySalePrice: 700, name: "Знаменка"},
    loga: {id: 11, priceDel: 250, deliverySalePrice: 1400, name: "Логачевка"},
    kyky: {id: 12, priceDel: 250, deliverySalePrice: 1400, name: "Кукуевка"},
    kolos: {id: 13, priceDel: 500, deliverySalePrice: 2400, name: "Колосково"},
    kazink: {id: 14, priceDel: 400, deliverySalePrice: 2300, name: "Казинка"},
    soloti: {id: 15, priceDel: 500, deliverySalePrice: 2400, name: "Солоти"},
    rogdestv: {id: 16, priceDel: 500, deliverySalePrice: 2400, name: "Рождественно"},
    samar: {id: 17, priceDel: 600, deliverySalePrice: 2500, name: "Самарино"},
    valsoshgor: {id: 18, priceDel: 300, deliverySalePrice: 1400, name: "Валуйки(соц.городок)"},
    valrazdol: {id: 19, priceDel: 300, deliverySalePrice: 1400, name: "Валуйки(раздолье)"},
}

const Order = ({items, palochkiTotal, nameUser, phoneUser, deliverySity, deliveryAdress, homeNumber,
                   entranceNumber, levelNumber, doorPassword, setName, setPhone, setSity, setAdress, setHome, setEntrance, userApartment,
                   setLevel, setDoor, setTime, setDate, total, dateDelivery, timeDelivery, userCommentsFunc, comments, apartment }) => {

    const [open, setOpen] = useState(false);

    const [age, setAge] = useState('');
    const [delivery, setDelivery] = useState('');

    const classes = useStyleOrder();

    const inputLabel = React.useRef(null);
    const [state, setState] = React.useState("promptly");

    const [stateDeliveryPrice, setStateDeliveryPrice] = React.useState({});

    const handleChangee = name => event => setState(name);
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
                <p style="text-align: center"><b>Лапша: </b> ${elem.descriptionWok}
                <p style="text-align: center"><b>Цена: </b> ${elem.total}</p>
                <p style="text-align: center"><b>Штук: </b> ${elem.count}</p></div>`);
        });

        data.append('chopsticks', palochkiTotal);
        const def = defaultTo(false, itemCartPizza);

        const deliveryTotalPrice = total + stateDeliveryPrice.priceDel;
        if(delivery !== "Самовывоз" && (def === true) ) {
            data.append('totalPrice', `Цена с доставкой и акцией ${deliveryTotalPrice} руб.`);
        } else if(delivery !== "Самовывоз" && total <= stateDeliveryPrice.deliverySalePrice) {
            data.append('totalPrice', `Цена вместе c доставкой ${deliveryTotalPrice} руб.`);
        } else {
            data.append('totalPrice', total);
        }
        if(apartment !== "") {
            data.append('adress', `${stateDeliveryPrice.name}, Номер квартиры: ${apartment}`);
        } else {
            data.append('adress', stateDeliveryPrice.name);
        }
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

    const handleChange = event => setAge(event.target.value);
    const handleChangeDelivery = event => setDelivery(event.target.value);
    const handleChangeCity = city => event => {
        setSity(`${city[event.target.value].name}`)
        setStateDeliveryPrice(city[event.target.value]);
    };

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

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
            return ((/^[а-я_А-Я_0-9\-?()!,.ё]{3,230}$/).test(commentTextArea.toLowerCase()))
        }
    };
    const validatePhone = () => {
        const phoneValidate =  /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/
        // const phoneValidate = /(^8|7|\+7)[)(-]((\d{15})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))$/gi
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
            <SEO title="Оформление заказа"
                 noindex={true}/>
            <div className={classes.root}>
                <Container className={classes.paper}>
                    <Typography variant="h2">
                        <Box style={{textTransform: "uppercase"}} fontFamily="Oswald"
                             fontWeight={800} fontSize={34}>Оформление заказа</Box>
                    </Typography>
                </Container>
                <Container>
                    { !isEmpty(items) ?
                        <Grid container className={classes.gridContainer}>
                            <form
                                method="POST"
                                onSubmit={handleSubmit}
                                action={process.env.GATSBY_NODE_SERVE}
                                name="svisniData"
                                style={{width: '100%'}}>

                                <div className={classes.root}>
                                <Grid container spacing={3}>
                                    {/*Имя и Телефон*/}
                                    <Grid item xs={12}>
                                        <Typography style={{textAlign: `center`, fontSize: 22}} variant="h5">
                                            Укажите ваши личные данные </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
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
                                    <Grid item xs={12} sm={6}>
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
                                    <Grid item xs={12}>
                                        <Typography variant="h5" style={{textAlign: `center`, fontSize: 22}}>
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
                                            <Typography style={{textAlign: `center`, fontSize: 22}} variant="h5">
                                                { delivery !== "Самовывоз" ? "Дата и время доставки заказа"
                                                    : "Дата и время готовки заказа"}

                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button fullWidth variant={state === "promptly" ? "contained" : "outlined"} color={"secondary"}
                                                    onClick={handleChangee("promptly")}>
                                                {delivery === "Самовывоз" ? "Готовить сразу" : "Доставить сразу"}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button fullWidth variant={state === "deliveryTime" ? "contained" : "outlined"} color="secondary"
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
                                            <option value="dvyl">Двулучное</option>
                                            <option style={{background: `#f0ecec`}} value="shel">Шелаево</option>
                                            <option value="sobo">Соболевка</option>
                                            <option style={{background: `#f0ecec`}} value="kol">Колыхалино</option>
                                            <option value="sved">Шведуновка</option>
                                            <option style={{background: `#f0ecec`}} value="borki">Борки</option>
                                            <option value="znamenk">Знаменка</option>
                                            <option style={{background: `#f0ecec`}} value="gera">Герасимовка</option>
                                            <option value="kazink">Казинка</option>
                                            <option style={{background: `#f0ecec`}} value="loga">Логачевка</option>
                                            <option value="kyky">Кукуевка</option>
                                            <option style={{background: `#f0ecec`}} value="kolos">Колосково</option>
                                            <option value="soloti">Солоти</option>
                                            <option style={{background: `#f0ecec`}} value="rogdestv">Рождественно</option>
                                            <option value="samar">Самарино</option>
                                        </Select>
                                        <FormHelperText id="my-helper-text">Выберите населенный пункт</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField id="validation-outlined-input"
                                               label="Улица"
                                               variant="filled"
                                               fullWidth
                                               // style={{maxWidth: `90%`}}
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
                                <Grid item xs={6}>
                                    <TextField id="validation-outlined-input"
                                               label="Этаж"
                                               variant="filled"
                                               margin="normal"
                                               fullWidth
                                               size="small"
                                               style={{ margin: `8px auto`}}
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
                                <Grid item xs={6}>
                                    <TextField id="validation-outlined-input"
                                                   label="Код двери"
                                                   variant="filled"
                                                   margin="normal"
                                                   fullWidth
                                                   size="small"
                                                   type="number"
                                                   style={{ margin: `8px auto`}}
                                                   inputProps={{maxLength: 6}}
                                                   name="kodDveri"
                                                   onChange={(e) => {
                                                       setDoor(e.target.value);
                                                   }}
                                                   value={doorPassword}
                                                   helperText="Код двери"/>
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
                                    <Grid item xs={12} style={{ margin: `12px auto 8px auto`}}>
                                        <Paper elevation={3} className={classes.paperEndOrder}>
                                            { delivery !== "Самовывоз" && !isEmpty(stateDeliveryPrice) &&
                                            <>
                                                <div>
                                                    { !itemCartPizza &&
                                                    <Typography variant={"h5"} style={{fontSize: 18}}>{total <= stateDeliveryPrice.deliverySalePrice ? <>
                                                        Доставка: + <strong>{stateDeliveryPrice.priceDel} ₽</strong></> : <strong>Доставка бесплатно</strong>}</Typography>
                                                    }
                                                    { !itemCartPizza &&
                                                    <Typography variant={"body2"}>{total <= stateDeliveryPrice.deliverySalePrice ? <>
                                                            Для бесплатной доставки в {stateDeliveryPrice.name} сделайте заказ еще минимум
                                                            на <strong> + {stateDeliveryPrice.deliverySalePrice - total} ₽</strong></>
                                                        : ""}</Typography>
                                                    }
                                                    { itemCartPizza &&
                                                    <Typography variant={"subtitle2"} style={{fontSize: 16}}>Доставка с бесплатной пиццей Ветчина-Грибы-Бекон + <strong>{stateDeliveryPrice.priceDel} ₽</strong></Typography>
                                                    }
                                                </div>
                                                <div style={{marginTop: 15}}>
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
                                            <Grid item xs={12} style={{marginBottom: 20}}>
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

                                            { isEmpty(stateDeliveryPrice) || delivery === "Самовывоз" ?
                                                <div>
                                                    <Typography variant={"h5"} style={{fontSize: 22}}>Итого к оплате: <strong>{total} ₽</strong></Typography>
                                                </div> : ''
                                            }

                                         <span>
                                            <Button
                                                type="submit"
                                                color={"secondary"}
                                                size={'large'}
                                                disabled={buttonDisabled()}
                                                variant="contained">
                                                Сделать заказ
                                            </Button>
                                            </span>

                                            {buttonDisabled() === true &&
                                            <>
                                                <hr></hr>
                                                <Typography style={{marginTop: 10}}>* Обязательно:</Typography>
                                                <ul>
                                                    { !validateUserName() && <li>Введите ваше имя - из букв русского алфавита</li>}
                                                    { !validatePhone() && <li>Введите ваш телефон - начинается 7 или 8</li>}
                                                    { !validateDelivery() && delivery === "Доставка курьером"
                                                    && <li>Выберите населенный пункт</li>}
                                                </ul>
                                            </>
                                            }
                                        </Paper>
                                    </Grid>
                                </Grid>

                            </form>
                        </Grid> : <EmptyBasket/> }
                </Container>
            </div>
        </section>
    )
};

const mapStateToProps = ({shoppingCart: {cartItems, orderTotal, palochkiTotal}, contactsUser: {
    nameUser, phoneUser, deliverySity, deliveryAdress, comments, homeNumber, entranceNumber, levelNumber, doorPassword, apartment}}) => ({
    items: cartItems,
    total: orderTotal,
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
    setLevel: setLavelUser,
    setDoor: setDoorUser,
    setDate: setDateDeliveryUser,
    setTime: setTimeDeliveryUser,
    userApartment,
    userCommentsFunc
};

export default connect(mapStateToProps, mapDispatchToProps)(Order)












