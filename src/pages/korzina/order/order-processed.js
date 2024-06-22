
import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'gatsby';
import makeStyles from '@mui/styles/makeStyles';
import { Divider } from "@mui/material";
import { isBrowser } from '../../../components/common/constants';
import EmptyBasket from '../../../components/EmptyBasket';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    button: {
        marginTop: `10px`,
        marginRight: `8px`
    }
}));

function createData(name, count, price) {
    return { name, count, price};
}

const OrderProcessed = ({ location: { state }, adressDelivery, isOpenDelivery }) => {
    const [data, setData] = React.useState([]);
    const [delivery, setDelivery] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [priceTotal, setPriceTotal] = React.useState("");

    const classes = useStyles();

    React.useEffect(() => {
        if(state === null) {
            return
        }
        if(isBrowser) {
            setData(state.products.map(el => {
                return createData(el.product, el.count, el.total)
            }));
            setPriceTotal(state.totalPrice);
            setPhone(state.phone);
            setDelivery(state.delivery)
            // setTimeout(() => {
            //     setIsLoading(false)
            // }, 1000)
        }
    }, []);

    return (
        <Grid container style={{marginTop: `25px`}}>
            { state !== null ? <>
            {/* { state !== null && !isLoading ? <> */}
                <Grid item xs={12}>
                    <Typography style={{textAlign: `center`,}} variant={'h4'}><span role="img" aria-label="accessible-emoji" >🎉</span>Ваш заказ успешно оформлен
                    <span role="img" aria-label="accessible-emoji">🎉</span>
                    </Typography>
                    <Typography variant={"h6"} style={{textAlign: `center`, padding: 7, fontSize: 13}}>заказ оформлен и принят в обработку</Typography>
                </Grid>
                <Grid item xs={11} sm={10} style={{margin: `15px auto 50px auto`}}>
                    <Grid item xs={12}>
                        <Typography variant={'h5'}>Детали заказа:</Typography>
                    </Grid>
                    <Divider/>
                    <Grid item xs={12} style={{background: `lightgrey`}}>
                        <Typography style={{textAlign: `left`, paddingLeft: 20}} variant={"body1"}>Ваш телефон: <strong>{phone}</strong></Typography>
                    </Grid>
                    <Grid item xs={12} style={{borderRadius: 10, border: `1px lightgrey solid`, margin: `10px auto`}}>
                        {data && data.map((row) => (
                          <div key={row.name} style={{marginTop: 8 }}>
                              <Typography style={{textAlign: `left`, paddingLeft: 20}} variant={"body1"}><strong>Блюдо: </strong>
                                  {row.name}</Typography>
                              <Typography style={{textAlign: `left`, paddingLeft: 20}} variant={"body1"}><strong>Количество: </strong>
                                  {row.count} шт</Typography>
                              <Typography style={{textAlign: `left`, paddingLeft: 20}} variant={"body1"}><strong>Цена: </strong>
                                  {row.price} руб</Typography>
                              <Divider/>
                          </div>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"body1"}>Общая цена к оплате <strong>{priceTotal} руб</strong></Typography>
                    </Grid>
                    <Divider/>
                    <Grid item xs={12}>
                        <div style={{background: `lightgrey`}}>
                        {delivery === "Самовывоз" && (
                          <Typography variant={"body1"}>Время готовки заказа: <strong>25 - 45
                              мин</strong></Typography>
                        )}
                        { delivery !== "Самовывоз" && <>
                            <Typography style={{ paddingRight: 10, marginBottom: '5px'}} variant={'subtitle2'}>Время доставки
                                заказа от <strong> 1ч - 1ч 30 мин</strong></Typography>
                            <Typography style={{ paddingRight: 10, marginBottom: '6px'}} variant={"subtitle2"}>В часы пик, и праздничные дни время доставки может увеличиться<strong> на 30 минут</strong></Typography>
                            <Typography style={{ paddingRight: 10, marginTop: 5}} variant={"caption"}> * оформляйте заказы заранее к определенному времени </Typography>

                        </>}
                        </div>
                        {/* <div style={{padding: `8px 0`}}>
                            <Typography variant='subtitle2' style={{textAlign: `left`}}>Заказ оформленный ко времени будет готов/доставлен к указанному времени.</Typography>
                        </div> */}

                        <div style={{padding: `8px 0` }}>
                            <Typography variant='subtitle2' style={{textAlign: `left`}}>Оператор с вами свяжется для подтверждения заказа.</Typography>
                        </div>
                        <div style={{padding: `8px 0`}}>
                            <Typography style={{textAlign: `left`}} variant='subtitle2'>
                                {adressDelivery === "Валуйки" ? "г.Валуйки, ул.Толстого 16/2. График работы с 11:00 до 22:00 без перерывов и выходных." : "п.Уразово, ул.Красная Площадь 30А. График работы с 10:00 до 22:00 без перерывов и выходных."}</Typography>
                        </div>

                    </Grid>
                    <Divider/>
                    <Grid item xs={12}>
                        <Typography style={{textAlign: `left`, padding: `8px 0`}} 
                        variant={"body2"}>Спасибо что выбираете Свисни Суши!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button component={Link}
                                to="/"
                                variant="contained"
                                color="success"
                                size={'small'}
                                style={{background: 'white', color: '#00000', marginRight: '5px'}}
                                className={classes.button}>
                            Перейти на главную
                        </Button>
                        <Button component={"a"}
                                href={adressDelivery === "Валуйки" ? "tel:+79524225422" : "tel:+79040949222"}
                                variant={"contained"}
                                size={'small'}
                                style={{background: 'white', color: '#00000'}}
                                className={classes.button}
                                // color={"secondary"}
                                >
                            Позвонить
                        </Button>
                    </Grid>
                </Grid>
            </> : <EmptyBasket />
            }
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    adressDelivery: state.app.userSettings?.adressDelivery,
    isOpenDelivery: state.app.userSettings?.isOpenDelivery,
  });

export default connect(mapStateToProps, null)(OrderProcessed)

