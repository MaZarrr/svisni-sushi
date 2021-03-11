import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { GatsbyImage } from "gatsby-plugin-image";
import Typography from '@material-ui/core/Typography';
import { Divider } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { Link } from "gatsby"

import useImageStaticHook from "../../../components/image"

const OrderSuccess = () => {
  const [{ successImage },] = useImageStaticHook();

  useEffect(() => {
    typeof window !== undefined && localStorage.removeItem('basketProduct');
  }, [])

  return (
    <Grid container style={{paddingTop: 80}} >
      <Grid item xs={12}>
        <Typography style={{textAlign: `center`}} variant={'h4'}>Ваш заказ успешно оформлен<span role="img" aria-label="accessible-emoji">🎉</span>
          <span role="img" aria-label="accessible-emoji" >🎉</span><span role="img" aria-label="accessible-emoji">🎉</span>
        </Typography>
        <Typography variant={"h6"} style={{textAlign: `center`, padding: 7, fontSize: 13}}>заказ оформлен и принят в обработку</Typography>
      </Grid>
      <Grid item xs={12}>
        <GatsbyImage
          image={successImage.childImageSharp.gatsbyImageData}
          style={{width: 300, margin: `0 auto`}}
          alt={"заказ оформлен"} />
      </Grid>
      <Divider/>
      <Grid item xs={12}>
        <Typography style={{textAlign: `right`, paddingRight: 20}} variant={'h6'}>Оплата прошла успешно!</Typography>
      </Grid>
      <Divider/>
      <Grid item xs={12} style={{background: `lightgrey`}}>
          <Typography style={{textAlign: `right`, paddingRight: 20}} variant={"body1"}>Время готовки заказа: <strong>25 - 45
            мин</strong></Typography>
          <Typography style={{textAlign: `right`, paddingRight: 20}} variant={"body1"}>Время доставки
            заказа(вместе с готовкой)<strong> 1ч - 1ч 30 мин</strong></Typography>
          <Typography style={{textAlign: `right`, paddingRight: 20}} variant={"body1"}>В часы пик, и праздничные дни время доставки может увеличиться<strong> на 30 минут</strong></Typography>
          <Typography style={{textAlign: `right`, paddingRight: 20}} variant={"body2"}>(оформляйте предзаказ заранее)</Typography>
      </Grid>
      <Divider/>
      <Grid item xs={12}>
        <Typography style={{textAlign: `left`, padding: `10px 30px 10px 30px`, marginLeft: `15px`}} variant={'h6'}>Спасибо что выбираете Свисни Sushi!</Typography>
      </Grid>
      <Grid item xs={12} style={{ marginBottom: 60}}>
        <Button component={Link}
                to="/"
                style={{padding: `10px 25px 10px 25px`, marginLeft: `35px`}}
                variant="contained"
                color="primary">
          Перейти на главную
        </Button>
      </Grid>
    </Grid>
  );
}

export default OrderSuccess