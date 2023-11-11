import React from "react"
import Seo from "../components/seo"
import Avatar from '@mui/material/Avatar';
import { Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import InputBase from '@mui/material/InputBase';
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import HeadSection from "../components/HeadSection"

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
        adress: 'Валуйки(городок/раздолье)',
        do: 1799,
        posle: 1800,
        color: '#11161b',
        price: 350,
    },
    {
        id: 3,
        adress: 'Валуйки(центр)',
        do: 1799,
        posle: 1800,
        color: '#d2143a',
        price: 400,
    },
    {id: 4, do: 1999, posle: 2000, color: '#27G943',  price: 500, adress: "Валуйки(Нов.Симоновка)"},
    {id: 5, do: 1999, posle: 2000, color: '#A6CCDE',  price: 500, adress: "Валуйки(совхоз)"},
    {id: 6, do: 1999, posle: 2000, color: '#5c3c35',  price: 500, adress: "Валуйки(байрацкий.корд)"},
    {
        id: 7,
        adress: 'Соболёвка',
        do: 999,
        posle: 1000,
        color: '#dc9484',
        price: 200,
    },
    {
        id: 8,
        adress: 'Шелаево',
        do: 1599,
        posle: 1600,
        color: '#6aa241',
        price: 250,
    },
    {
        id: 9,
        adress: 'Двулучное',
        do: 1599,
        posle: 1600,
        color: '#3099f0',
        price: 250,
    },
    {
        id: 10,
        adress: 'Шведуновка',
        do: 1499,
        posle: 1500,
        color: '#0a4475',
        price: 250,
    },
    {
        id: 11,
        adress: 'Колыхалино',
        do: 1699,
        posle: 1700,
        color: '#81f030',
        price: 250,
    },
    {
        id: 12,
        adress: 'Борки',
        do: 1799,
        posle: 1800,
        color: '#27G943',
        price: 350,
    },
    {id: 13, do: 2099, posle: 2100, color: '#DADEA6',  price: 350, adress: "Храпово"},
    {id: 14, do: 999, posle: 1000, color: '#27D943', price: 200, adress: "Жердевка"},
    {
        id: 15,
        adress: 'Солоти',
        do: 3999,
        posle: 4000,
        color: '#5c3c35',
        price: 600,
    },
    {
        id: 16,
        adress: 'Герасимовка',
        do: 2199,
        posle: 2200,
        color: '#11161b',
        price: 550,
    },
    {
        id: 17,
        adress: 'Логачёвка',
        do: 1899,
        posle: 1900,
        color: '#ABD689',
        price: 400,
    },
    {
        id: 18,
        adress: 'Кукуевка',
        do: 1799,
        posle: 1800,
        color: '#A6CCDE',
        price: 300,
    },
    {
        id: 19,
        adress: 'Казинка',
        do: 3299,
        posle: 3300,
        color: '#DADEA6',
        price: 600,
    },
    {
        id: 20,
        adress: 'Колосково',
        do: 3999,
        posle: 4000,
        color: '#DA288F',
        price: 650,
    },
    {id: 21, do: 2399, posle: 2400, color: '#27G943',  price: 400, adress: "Ураево"},
    {
        id: 22,
        adress: 'Насоново',
        do: 4499,
        posle: 4500,
        color: '#DA282A',
        price: 650,
    },
    {
        id: 23,
        adress: 'Рождественно',
        do: 3999,
        posle: 4000,
        color: '#D9D827',
        price: 600,
    },
    {
        id: 24,
        adress: 'Яблоново',
        do: 2899,
        posle: 2900,
        color: '#27D943',
        price: 550,
    },
    {
        id: 25,
        adress: 'Знаменка',
        do: 999,
        posle: 1000,
        color: '#5c3c35',
        price: 200,
    },
    {
        id: 26,
        adress: 'Хохлово',
        do: 4999,
        posle: 5000,
        color: '#DA282A',
        price: 700,
    },
    {
        id: 27,
        adress: 'Тогобиевка',
        do: 999,
        posle: 1000,
        color: '#82dc4e',
        price: 200,
    },
    {
        id: 28,
        adress: 'Новопетровка',
        do: 3999,
        posle: 4000,
        color: '#04dcd6',
        price: 550,
    },
    {
        id: 29,
        adress: 'Бабки',
        do: 1999,
        posle: 2000,
        color: '#416cdc',
        price: 450,
    },
    {
        id: 30,
        adress: 'Сухарево',
        do: 1799,
        posle: 1800,
        color: '#dc745f',
        price: 250,
    },
    {
        id: 31,
        adress: 'Татариевка',
        do: 1099,
        posle: 1100,
        color: '#d2dc54',
        price: 200,
    },
    {
        id: 32,
        adress: 'Пристень',
        do: 1599,
        posle: 1600,
        color: '#5ddcb7',
        price: 300,
    },
    {
        id: 33,
        adress: 'Лобковка',
        do: 1299,
        posle: 1300,
        color: '#3788dc',
        price: 250,
    },
    {
        id: 34,
        adress: 'Долгое',
        do: 1999,
        posle: 2000,
        color: '#5c3c35',
        price: 350,
    },
    {
        id: 35,
        adress: 'Ромашовка',
        do: 1899,
        posle: 1900,
        color: '#82dc4e',
        price: 350,
    },
    {
        id: 36,
        adress: 'Самарино',
        do: 4999,
        posle: 5000,
        color: '#DA282A',
        price: 850,
    },
];

const Dostavkaioplata = () => {
    const [value, setValue] = React.useState("");
    const [deliveryState, setDeliveryState] = React.useState(delivery);

    const handleChange = (e) => {
        const sity = delivery.filter(el => {
            if(e.target.value === "") {
                return delivery
            }
            return el.adress.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
            });
            setValue(e.target.value);
            setDeliveryState(sity)
    };

return <>
<Seo title="Зоны и стоимость доставки суши и пиццы в Валуйках"
   description="Доставка осуществляется по Уразово и Валуйскому району с 10:00 до 22:00. Бесплатная доставка от 500 рублей"
   pathname=""
/>
<HeadSection titleTXT={"Стоимость доставки"} />
<Divider/>
<Grid container>
<Grid item xs={12} sm={6}>
    <Paper style={{padding: '6px 0', paddingLeft: 10, margin: `5px 0`, display: 'flex'}}>
    <IconButton style={{padding: `5px 10px 5px 8px`}} aria-label="menu" size="large">
        <SearchIcon />
    </IconButton>
    <InputBase
        style={{flex: 1, padding: 0, width: `100%`}}
        value={value}
        name="search"
        placeholder={"Введите населённый пункт"}
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={handleChange}
    />
    </Paper>
    <div style={{overflowY: `scroll`, paddingLeft: 20, height: `450px`}}>
    {deliveryState.map((el) => (
    <div key={el.id}>
    <Avatar style={{backgroundColor: `${el.color}`}}>{el.id}</Avatar> 
    <Typography variant="subtitle1">
        Доставка {el.adress}
    </Typography>
    <Grid container >
    <Grid item xs={6} style={{padding: `4px 4px 4px 0`}}>
      <Typography variant="subtitle2">до {el.do} ₽</Typography>
    </Grid>
    <Grid item xs={6} style={{padding: `4px 4px 4px 0`}}>
      <Typography variant="subtitle2">{el.price} ₽</Typography>
    </Grid>

    <Grid item xs={6} style={{padding: `4px 4px 4px 0`}}>
      <Typography variant="subtitle2">от {el.posle} ₽</Typography>
    </Grid>
    <Grid item xs={6} style={{padding: `4px 4px 4px 0`}}>
      <Typography variant="subtitle2">Бесплатно</Typography>
    </Grid>
    </Grid>
    <hr></hr>
    </div>
  ))}
  </div>
    <Divider/>
 </Grid>
    <Grid item xs={12} sm={5} style={{margin: `14px auto 0 auto`, borderRadius: 15}}>

    <div style={{borderRadius: 15}}>
         <img src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3A6c9654ff4500960caa168410dc7e08e8c8364690cf5a89b544e20cd237dc3970&amp;width=592&amp;height=422&amp;lang=ru_RU"
              alt="Адрес Свисни суши" style={{borderRadius: `10px`,
                border: `1px solid lightgrey`,
                width: `100%`,
                height: `420px`}} className="mapDelivery" />
    </div>
    </Grid>
    <Grid item xs={6} style={{backgroundColor: `tomato`, padding: `15px`, color: `white`}}>
      <Typography variant="body2"><strong>График работы: с 10:00 до 22:00</strong></Typography>
      <Typography variant="body2"><strong>+7(904)094-92-22</strong></Typography>
</Grid>
    <Grid item xs={6} style={{backgroundColor: `#000`, padding: `15px`, color: `white`}}>
      <Typography  variant="body1"><strong>Доставка от 60 до 110 мин</strong></Typography>
</Grid>

<div style={{padding: `30px`}}>
<h2>
Как заказать
</h2>
<p>Заказывайте доставку роллов удобным Вам способом: по телефону или через сайт.</p>
<p>Чтобы сделать заказ через сайт:</p>
    <ul>
        <li>добавьте товар в корзину (иконка Корзина)</li>
        <li>перейдите в корзину (значёк в правом верхнем углу)</li>
        <li>нажмите кнопку «Продолжить»</li>
        <li>введите Ваши данные и способ получения заказа</li>
        <li>нажмите кнопку «Сделать заказ»</li>
    </ul>
<p>Вы можете забрать заказ сами либо выбрать доставку курьером к определенному времени<strong>. После оформления заказа вам поступит звонок с подтверждением</strong>. Если у вас нет возможности совершить заказ
через интернет, звоните нам по телефону <a itemProp="telephone" href="tel:+79040949222">+7(904)094-92-22</a>.</p>
</div>
</Grid>
</>;
};

export default Dostavkaioplata

      

