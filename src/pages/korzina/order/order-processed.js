import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from "@material-ui/core";

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

const OrderProcessed = ({ location: { state } }) => {
    const [data, setData] = React.useState([]);
    const [delivery, setDelivery] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [priceTotal, setPriceTotal] = React.useState("");

    const classes = useStyles();

    React.useEffect(() => {
        if(state === null) {
            return
        }
        if(typeof window !== `undefined`) {
            setData(state.products.map(el => {
                return createData(el.product, el.count, el.total)
            }));
            setPriceTotal(state.totalPrice);
            setPhone(state.phone);
            setDelivery(state.delivery)
        }
    }, []);

    return (
        <Grid container style={{marginTop: `75px`}}>
            { state !== null ? <>
                <Grid item xs={12}>
                    <Typography style={{textAlign: `center`}} variant={'h4'}>Ваш заказ успешно оформлен<span role="img" aria-label="accessible-emoji">🎉</span>
                        <span role="img" aria-label="accessible-emoji" >🎉</span><span role="img" aria-label="accessible-emoji">🎉</span>
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
                        {data.map((row) => (
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
                        <Typography style={{textAlign: `right`, paddingRight: 20}} variant={'h6'}>Общая цена к оплате <strong>{priceTotal} руб</strong></Typography>
                    </Grid>
                    <Divider/>
                    <Grid item xs={12}>
                        <div style={{background: `lightgrey`}}>
                        {delivery === "Самовывоз" && (
                          <Typography style={{textAlign: `right`}} variant={"body1"}>Время готовки заказа: <strong>25 - 45
                              мин</strong></Typography>
                        )}
                        { delivery !== "Самовывоз" && <>
                            <Typography style={{textAlign: `right`, paddingRight: 10}} variant={"body1"}>Время доставки
                                заказа(вместе с готовкой)<strong> 1ч - 1ч 30 мин</strong></Typography>
                            <Typography style={{textAlign: `right`, paddingRight: 10}} variant={"body1"}>В часы пик, и праздничные дни время доставки может увеличиться<strong> на 30 минут</strong></Typography>
                            <Typography style={{textAlign: `right`, paddingRight: 10, marginTop: 5}} variant={"subtitle2"}> оформляйте заказы заранее к определенному времени *</Typography>

                        </>}
                        </div>
                        <div style={{padding: `8px 0`}}>
                            <Typography style={{textAlign: `left`}} variant={"body1"}>Заказ оформленный ко времени будет готов/доставлен к указанному времени.</Typography>
                        </div>

                        <div style={{padding: `8px 0`}}>
                            <Typography style={{textAlign: `left`}} variant={"body1"}>Оператор с вами свяжется для подтверждения заказа.</Typography>
                        </div>
                        <div style={{padding: `8px 0`}}>
                            <Typography style={{textAlign: `left`}} variant={"body1"}>График работы с 10:00 до 22:00 без перерывов и выходных.</Typography>
                        </div>

                    </Grid>
                    <Divider/>
                    <Grid item xs={12}>
                        <Typography style={{textAlign: `left`, padding: `8px 0`}} variant={"body1"}>Спасибо что выбираете Свисни Суши!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button component={Link}
                                to="/"
                                variant="contained"
                                color="primary"
                                className={classes.button}>
                            Перейти на главную
                        </Button>
                        <Button component={"a"}
                                href="tel:+79040949222"
                                variant={"contained"}
                                className={classes.button}
                                color={"secondary"}>
                            Позвонить
                        </Button>
                    </Grid>
                </Grid>
            </>: <Grid item xs={12}>
                <Typography style={{textAlign: `center`}} variant={'h4'}>Ваша корзина пуста.</Typography>
                 <Typography variant={"h6"} style={{textAlign: `center`, padding: 7, fontSize: 13}}>Добавьте товары в корзину</Typography>
       </Grid>
         }
        </Grid>
    )
}

export default OrderProcessed
