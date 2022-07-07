import React, {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import { StaticImage } from "gatsby-plugin-image";
import Typography from '@mui/material/Typography';
import { Divider } from "@mui/material"
import Button from "@mui/material/Button"
import { Link } from "gatsby"
import { isBrowser } from '../../../components/common/constants';

const OrderSuccess = () => {

  useEffect(() => {
    isBrowser && localStorage.removeItem('basketProduct');
  }, [])

  return (
    <Grid container style={{paddingTop: 80}} direction={"column"} alignItems={"center"} >
      <Grid item xs={12}>
        <Typography style={{textAlign: `center`}} variant={'h4'}>Ваш заказ успешно оформлен<span role="img" aria-label="accessible-emoji">🎉</span>
          <span role="img" aria-label="accessible-emoji" >🎉</span><span role="img" aria-label="accessible-emoji">🎉</span>
        </Typography>
        <Typography variant={"h6"} style={{textAlign: `center`, padding: 7, fontSize: 13}}>заказ оформлен и принят в обработку</Typography>
      </Grid>
      <Grid item xs={12}>
        <StaticImage
          src="../../../images/checked.png"
          style={{maxWidth: 300, display: `flex`}}
          placeholder="blurred"
          alt={"заказ оформлен"} />
      </Grid>
      <Divider/>
      <Grid item xs={12}>
        <Typography style={{textAlign: `right`, paddingRight: 20}} variant={'h6'}>Оплата прошла успешно!</Typography>
      </Grid>
      <Divider/>
      <Grid item xs={12}>
        <div style={{background: `lightgrey`}}>
          <Typography style={{textAlign: `right`, paddingRight: 10}} variant={"body1"}>Время готовки заказа: <strong>25 - 45
            мин</strong></Typography>
          <Typography style={{textAlign: `right`, paddingRight: 10}} variant={"body1"}>Время доставки
            заказа(вместе с готовкой)<strong> 1ч - 1ч 30 мин</strong></Typography>
          <Typography style={{textAlign: `right`, paddingRight: 10}} variant={"body1"}>В часы пик, и праздничные дни время доставки может увеличиться<strong> на 30 минут</strong></Typography>
          <Typography style={{textAlign: `right`, paddingRight: 10, marginTop: 5}} variant={"subtitle2"}> оформляйте заказы заранее к определенному времени *</Typography>
        </div>
        <div style={{padding: `8px 0`}}>
          <Typography style={{textAlign: `left`}} variant={"body2"}>Оператор с вами свяжется для подтверждения заказа.</Typography>
        </div>
        <div style={{padding: `8px 0`}}>
            <Typography style={{textAlign: `left`}} variant={"body2"}>График работы с 10:00 до 22:00 без перерывов и выходных.</Typography>
        </div>
          <Divider />
        <div style={{padding: `8px 0`}}>
          <Typography style={{textAlign: `left`}} variant={"body2"}>Заказ оформленный ко времени будет готов/доставлен к указанному времени.</Typography>
        </div>

        </Grid>
      <Divider/>
      <Grid item xs={12}>
        <Typography style={{textAlign: `left`, padding: `8px 0`}} variant={"body2"}>Спасибо что выбираете Свисни Sushi!</Typography>
      </Grid>
      <Grid item xs={12} style={{ marginBottom: 60, display: `flex`}}>
        <Button component={Link}
                to="/"
                size={'small'}
                variant="contained"
                color="info">
          Перейти на главную
        </Button>
        <Button component={"a"}
                href="tel:+74722429519"
                variant={"contained"}
                style={{marginLeft: `10px`}}
                color={"secondary"}
                size={'small'}
                >
          Позвонить
        </Button>
      </Grid>
    </Grid>
  );
}

export default OrderSuccess