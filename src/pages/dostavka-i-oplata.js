import React from "react"
import SEO from "../components/seo"
import { StylingInfo } from '../components/common/style';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   }
// }));

const Dostavkaioplata = () => {

// const classes = useStyles();

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
        do: 999,
        posle: 1000,
        color: '#d2143a',
        price: 300,
    },
 {
        id: 10,
        adress: 'Борки',
        do: 999,
        posle: 1000,
        color: '#fde601',
        price: 300,
    },
]

return (
    <>
    <SEO title="Доставка и оплата" />
     <Grid container> 
     <StylingInfo>
      <header>
            <h1 style={{paddingLeft: 30}}>Валуйский район - Зоны и стоимость доставки</h1>
        </header>
      
     </StylingInfo>

      <Grid item xs={12} sm={6}> 
    <hr></hr>
      <Container style={{overflowY: `scroll`, height: `400px`}}>
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
      ))
      }
      </Container>
     </Grid>
     <Grid item xs={12} sm={6} > 
    <hr></hr>
     <div>
     <iframe 
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A5890352ad60fb8387e1c5fd4bb4b006f6a978ed56444d0b0ec143b5caffa6608&amp;source=constructor" 
        width="100%" 
        height="400" 
        frameBorder="0"
        title="frameMapping"
        >
    </iframe> 
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
    <p>
    Заказывайте доставку суши и роллов удобным Вам способом: по телефону или через сайт. 
    Чтобы сделать заказ через сайт, добавьте понравившийся товар в корзину, затем перейдите в соответствующую вкладку и 
    нажмите «Оформить». В появившемся окне введите Ваши данные и 
    способ получения заказа. Вы можете забрать заказ сами либо выбрать доставку курьером к определенному времени. 
    После оформления заказа вам поступит звонок с подтверждением. Если у вас нет возможности совершить заказ 
    через интернет, звоните на нашу горячую линию или воспользуйтесь функцией «Обратный звонок» - и наш оператор сам с 
    вами свяжется.
    </p>
    </div>
    </Grid>
    
      {/* </div> */}
    {/* <StylingInfo>
 
    <article>
       
        <div>
            <p className="text">
            <b>Доставка осуществляется курьерами, которые доставят Ваш заказ в удобное для Вас место и время. </b> <br/>
            <b>Условия заказа и доставки: </b> 
            <br></br>
                • Заказ осуществляется у наших операторов по номерам телефонов или у нас на сайте
            <br></br>
            <b>п.Уразово</b>
            <br></br>
                366-233, +7(904)094-92-22 
            <br></br><br></br>
                • Минимальная сумма заказа для бесплатной доставки составляет 500 ₽. точную стоимость доставки уточняйте
                у оператора.
            <br></br> <br></br>
                • Время доставки 60–80мин. Скорость доставки напрямую зависит от ситуаций на дорогах, погодных 
                условий и времени суток. Надеемся на понимание с Вашей стороны. <br></br><br></br>
                • Приём заказов и доставка осуществляется с 10:00 до 22.00, в субботу с 11:00 до 23.00
                <br></br> <br></br>
                • Оплата курьеру - наличный расчёт или безналичный расчёт с оплатой у нас на сайте. 
            </p>
        </div> */}
		
    {/* </article> */}
    {/* </div> */}
    {/* </StylingInfo> */}
    </>
    
    )
}

export default Dostavkaioplata

      

