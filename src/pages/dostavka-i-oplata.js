import React from "react"
import SEO from "../components/seo"
import Avatar from '@material-ui/core/Avatar';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import {StylingInfo} from "../components/common/style";

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   }
// }));

const Dostavkaioplata = () => {

const delivery = [
    {
        id: 1,
        adress: 'Уразово',
        do: 499,
        posle: 500,
        price: 100,
        color: '#ff5733'
    },
      {
        id: 2,
        adress: 'Соболёвка',
        do: 499,
        posle: 500,
        color: '#dc9484',
        price: 100,
    },
      {
        id: 3,
        adress: 'Знаменка',
        do: 499,
        posle: 500,
        color: '#5c3c35',
        price: 100,
    },
      {
        id: 4,
        adress: 'Шелаево',
        do: 999,
        posle: 1000,
        color: '#6aa241',
        price: 150,
    },
   {
        id: 5,
        adress: 'Колыхалино',
        do: 999,
        posle: 1000,
        color: '#81f030',
        price: 150,
    },
   {
        id: 6,
        adress: 'Двулучное',
        do: 999,
        posle: 1000,
        color: '#3099f0',
        price: 150,
    },
      {
        id: 7,
        adress: 'Шведуновка',
        do: 999,
        posle: 1000,
        color: '#0a4475',
        price: 150,
    },
    {
        id: 8,
        adress: 'Герасимовка',
        do: 999,
        posle: 1000,
        color: '#11161b',
        price: 150,
    },
  {
        id: 9,
        adress: 'Валуйки',
        do: 1399,
        posle: 1400,
        color: '#d2143a',
        price: 300,
    },
 {
        id: 10,
        adress: 'Борки',
        do: 1399,
        posle: 1400,
        color: '#fde601',
        price: 300,
    },
]

return (
    <>
    <SEO title="Зоны и стоимость доставки суши роллов и пиццы в Валуйском районе"
       description="Доставка осуществляется с 10:00 до 22:00 в Валуйки и Уразово. Бесплатная доставка от 500 рублей"
    />
    <StylingInfo>
        <div className="container">
            <h1>Валуйский район&nbsp;- стоимость доставки</h1>
        </div>
        <hr></hr>
    <Grid container>
    <Grid item xs={12} sm={6}>
      <div style={{overflowY: `scroll`, height: `400px`, marginLeft: 30}}>
      {delivery.map((el) => (
        <div key={el.id}>
        <Avatar style={{backgroundColor: `${el.color}`}}>{el.id}</Avatar> 
        <Typography variant="h6">
        <b>Доставка {el.adress}</b> 
        </Typography>
        <Grid container >
        <Grid item xs={6} style={{padding: `4px 4px 4px 0`}}>
          <Typography >до {el.do} ₽</Typography>
        </Grid>
        <Grid item xs={6} style={{padding: `4px 4px 4px 0`}}>
          <Typography>{el.price} ₽</Typography>
        </Grid>

        <Grid item xs={6} style={{padding: `4px 4px 4px 0`}}>
          <Typography >от {el.posle} ₽</Typography>
        </Grid>
        <Grid item xs={6} style={{padding: `4px 4px 4px 0`}}>
          <Typography>Бесплатно</Typography>
        </Grid>
        </Grid>
        <hr></hr>
        </div>
      ))}
      </div>
        <hr></hr>
     </Grid>
     <Grid item xs={10} sm={5} style={{margin: `auto auto`, borderRadius: 15}}>

         <div style={{borderRadius: 15}}>
             <img src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3A6c9654ff4500960caa168410dc7e08e8c8364690cf5a89b544e20cd237dc3970&amp;width=592&amp;height=422&amp;lang=ru_RU"
                  alt="Адрес Свисни суши" className="mapDelivery" />
         </div>
    </Grid>
     <Grid item xs={6} style={{backgroundColor: `tomato`, padding: `30px`, color: `white`}}>
          <Typography variant="subtitle2"><b>График работы: с 10:00 до 22:00</b></Typography>
          <Typography variant="subtitle2">Телефон: +7(904)094-92-22</Typography>
    </Grid>
    <Grid item xs={6} style={{backgroundColor: `#000`, padding: `30px`, color: `white`}}>
          <Typography  variant="subtitle2"><b>Доставка от 60 до 90 мин</b></Typography>
    </Grid>

    <div style={{padding: `30px`}}>
    <h2>
    Как заказать
    </h2>
    <p>Заказывайте доставку суши и роллов удобным Вам способом: по телефону или через сайт.</p>
    <p>Чтобы сделать заказ через сайт, добавьте понравившийся товар в корзину(нажмите кнопку Хочу!),
        затем перейдите на соответствующую страницу<strong>(значёк Корзины в правом верхнем углу)</strong> и нажмите «Оформить заказ».
        Далее, в появившемся окне, введите Ваши данные и способ получения заказа. Вы можете забрать заказ сами либо выбрать доставку
        курьером к определенному времени.</p>
    <p><strong>После оформления заказа вам поступит звонок с подтверждением. Если у вас нет возможности совершить заказ
    через интернет, звоните нам по телефону +7(904)094-92-22</strong>.</p>
    </div>
    </Grid>
    </StylingInfo>
    </>
    
    )
}

export default Dostavkaioplata

      

