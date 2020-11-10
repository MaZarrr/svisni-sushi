import React from "react"
import SEO from "../components/seo"
import Avatar from '@material-ui/core/Avatar';
import {Container, Grid} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import {StylingInfo} from "../components/common/style";
import Divider from "@material-ui/core/Divider";
import InputBase from '@material-ui/core/InputBase';
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';

const delivery = [
    {
        id: 1,
        adress: 'Уразово',
        do: 499,
        posle: 500,
        price: 80,
        color: '#ff5733'
    },
    {
        id: 2,
        adress: 'Соболёвка',
        do: 699,
        posle: 700,
        color: '#dc9484',
        price: 100,
    },
    {
        id: 3,
        adress: 'Солоти',
        do: 2399,
        posle: 2400,
        color: '#5c3c35',
        price: 500,
    },
    {
        id: 4,
        adress: 'Шелаево',
        do: 999,
        posle: 1000,
        color: '#6aa241',
        price: 120,
    },
    {
        id: 5,
        adress: 'Двулучное',
        do: 999,
        posle: 1000,
        color: '#3099f0',
        price: 120,
    },
    {
        id: 6,
        adress: 'Шведуновка',
        do: 999,
        posle: 1000,
        color: '#0a4475',
        price: 120,
    },
    {
        id: 7,
        adress: 'Колыхалино',
        do: 1499,
        posle: 1500,
        color: '#81f030',
        price: 150,
    },
    {
        id: 8,
        adress: 'Герасимовка',
        do: 1499,
        posle: 1500,
        color: '#11161b',
        price: 250,
    },
    {
        id: 9,
        adress: 'Валуйки',
        do: 1499,
        posle: 1500,
        color: '#d2143a',
        price: 250,
    },
    {
        id: 10,
        adress: 'Борки',
        do: 1499,
        posle: 1500,
        color: '#27G943',
        price: 200,
    },
    {
        id: 11,
        adress: 'Логачёвка',
        do: 1499,
        posle: 1500,
        color: '#ABD689',
        price: 250,
    },
    {
        id: 12,
        adress: 'Кукуевка',
        do: 1199,
        posle: 1200,
        color: '#A6CCDE',
        price: 200,
    },
    {
        id: 13,
        adress: 'Казинка',
        do: 2299,
        posle: 2300,
        color: '#DADEA6',
        price: 400,
    },
    {
        id: 14,
        adress: 'Колосково',
        do: 2399,
        posle: 2400,
        color: '#DA288F',
        price: 500,
    },
    {
        id: 15,
        adress: 'Насоново',
        do: 2399,
        posle: 2400,
        color: '#DA282A',
        price: 500,
    },
    {
        id: 16,
        adress: 'Рождественно',
        do: 2399,
        posle: 2400,
        color: '#D9D827',
        price: 500,
    },
    {
        id: 17,
        adress: 'Яблоново',
        do: 2399,
        posle: 2400,
        color: '#27D943',
        price: 500,
    },
    {
        id: 18,
        adress: 'Знаменка',
        do: 699,
        posle: 700,
        color: '#5c3c35',
        price: 100,
    },
    {
        id: 19,
        adress: 'Тогобиевка',
        do: 699,
        posle: 700,
        color: '#82dc4e',
        price: 100,
    },
    {
        id: 20,
        adress: 'Новопетровка',
        do: 1499,
        posle: 1500,
        color: '#04dcd6',
        price: 300,
    },
    {
        id: 21,
        adress: 'Бабки',
        do: 1499,
        posle: 1500,
        color: '#416cdc',
        price: 300,
    },
    {
        id: 22,
        adress: 'Сухарево',
        do: 1199,
        posle: 1200,
        color: '#dc745f',
        price: 200,
    },
    {
        id: 23,
        adress: 'Татариевка',
        do: 699,
        posle: 700,
        color: '#d2dc54',
        price: 100,
    },
    {
        id: 24,
        adress: 'Пристень',
        do: 1199,
        posle: 1200,
        color: '#5ddcb7',
        price: 200,
    },
    {
        id: 25,
        adress: 'Лобковка',
        do: 999,
        posle: 1000,
        color: '#3788dc',
        price: 150,
    },
    {
        id: 26,
        adress: 'Самарино',
        do: 2499,
        posle: 2500,
        color: '#DA282A',
        price: 600,
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

return (
    <>
    <SEO title="Зоны и стоимость доставки суши роллов и пиццы в Валуйском районе"
       description="Доставка осуществляется с 10:00 до 22:00 в Валуйки и Уразово. Бесплатная доставка от 500 рублей"
    />
    <StylingInfo>
        <Container>
            <h1>Валуйский район&nbsp;- стоимость доставки</h1>
            <Divider/>
    <Grid container>
    <Grid item xs={12} sm={6}>
        <Paper style={{padding: '6px 8px', margin: `5px 0`, display: 'flex'}}>
        <IconButton style={{padding: `5px 10px 5px 8px`}} aria-label="menu">
            <SearchIcon />
        </IconButton>
        <InputBase
            style={{flex: 1, padding: 0, width: `100%`}}
            value={value}
            name="search"
            placeholder={"Начните вводить ваш нас.пункт"}
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={handleChange}
        />
        </Paper>
        <div style={{overflowY: `scroll`, height: `450px`}}>
        {deliveryState.map((el) => (
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
        <Divider/>
     </Grid>
     <Grid item xs={12} sm={5} style={{margin: `14px auto 0 auto`, borderRadius: 15}}>

         <div style={{borderRadius: 15}}>
             <img src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3A6c9654ff4500960caa168410dc7e08e8c8364690cf5a89b544e20cd237dc3970&amp;width=592&amp;height=422&amp;lang=ru_RU"
                  alt="Адрес Свисни суши" className="mapDelivery" />
         </div>
    </Grid>
     <Grid item xs={6} style={{backgroundColor: `tomato`, padding: `15px`, color: `white`}}>
          <Typography variant="body1"><strong>График работы: с 10:00 до 22:00</strong></Typography>
          <Typography variant="body1"><strong>+7(904)094-92-22</strong></Typography>
    </Grid>
    <Grid item xs={6} style={{backgroundColor: `#000`, padding: `15px`, color: `white`}}>
          <Typography  variant="body1"><strong>Доставка от 60 до 90 мин</strong></Typography>
    </Grid>

    <div style={{padding: `30px`}}>
    <h2>
    Как заказать
    </h2>
    <p>Заказывайте доставку суши и роллов удобным Вам способом: по телефону или через сайт.</p>
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
    </Container>
    </StylingInfo>
    </>
    
    )
};

export default Dostavkaioplata

      

