import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import MaskedInput from 'react-text-mask';
// import { graphql } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image";
import Seo from "../components/seo";
import TextField from "@mui/material/TextField";
import HeadSection from "../components/HeadSection"
import styled from '@emotion/styled'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useLocalStorage from '../utils/useLocalStorage'
import axios from 'axios'
import { getFormattedDate } from '../utils';

const Container = styled.div`
    padding-left: 30px;
    display: flex;
    flex-wrap: wrap;
    h2 {
        padding-top: 20px;
    }
    @media (max-width: 500px) {
        padding-left: 20px;
        flex-direction: column;
    }
    .item-section {
        width: 99%;
        display: flex;
        margin-top: 10px;
        @media (max-width: 500px) {
            width: 99%;
            flex-wrap: wrap;
        }
    }
    .item-section-vacancy {
        display: flex;
        width: 96%;
        flex-direction: column;
        margin-bottom: 30px;
    }
`
const vacancy_value = {
    delivery: 'Работа Курьером',
    operator: 'Работа Оператором',
    cook: 'Работа Поваром',
    cookhelp: 'Работа помощником повара"',
    other: 'Работа любая',
}

const adress_value = {
    valuiki: 'Работа в Валуйках',
    urazovo: 'Работа в Уразово',
}

const med_value = {
    da: 'Действующая медкнижка: Да',
    net: 'Действующая медкнижка: Нет'
}

const opyt_value = {
    da: 'Имеется ли у вас опыт работы?: Да',
    net: 'Имеется ли у вас опыт работы?: Нет'
}

const Vacancy = () => {
    const [expanded, setExpanded] = React.useState({nameCart: false});
    const [nameUser, setNameUser] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [valueStorage, setValue] = useLocalStorage('vacancyTimer');
    const [severityText, setSeverityText] =  React.useState('');
    const [severityType, setSeverityType] =  React.useState('');
    const [phone, setPhone] =  React.useState('');

    const handleClick = () => {
        setOpen(true);
    };

    const validateUserName = () => {
        const nameValidate = /^[а-яё]{3,16}$/gi;
        const name = nameUser.trim().replace(/\s/g, "");
        return nameValidate.test(String(name).toLowerCase())
      };

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

      React.useEffect(() => {
        if(!valueStorage) return;
        let currentDateTime = new Date().getTime();
        if (currentDateTime > valueStorage.expires) {
          setValue(null); // expires: 1 минута для тестирования
        }
      }, [])

    const checkPushWork = () => {
        if(valueStorage && new Date().getTime() < valueStorage.expires) {
            setSeverityText('Вы уже отправляли отклик на вакансию. Попробуйте позже.');
            setSeverityType('warning');
            handleClick();
        }
    }

    const submitForm = async (ev) => {
        ev.preventDefault();
        try {
            const form = ev.target;
            const data = new FormData(form);
            const name = data.get('name');
            const phone = data.get('phone');
            const radioButtonsVacancy = data.get('radio-buttons-vacancy');
            const radioButtonsAdress = data.get('radio-buttons-adress');
            const radioButtonsMed = data.get('radio-buttons-med');
            const radioButtonsWeek = data.get('radio-buttons-week');
            const radioButtonsOpyt = data.get('radio-buttons-opyt');
            
            if(validateUserName() === false) {
                setSeverityText('Введите корректное имя.');
                setSeverityType('error');
                handleClick();
                return
            } else if(valueStorage && new Date().getTime() < valueStorage.expires) {
                setSeverityText('Попробуйте позже.');
                setSeverityType('warning');
                handleClick();
                return
            }
            
            // let date2 = new Date().setMinutes(new Date().getMinutes() + 1);
            // Получение текущей даты
            // // если срок 10 дней истек, можно еще отпрвить заявку
            let currentDate = new Date();
            // Добавление 10 дней к текущей дате
            let futureDate = new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000);
            // Получение времени в миллисекундах
            let millisecondsSinceEpoch = futureDate.getTime();

            setValue({ expires: millisecondsSinceEpoch, isSend: true, status: 'SUCCESS' })
                        
            axios({
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                data: { 
                    name, 
                    phone: 'Телефон: ' + '+7'+ phone.slice(1), 
                    vacancy: vacancy_value[radioButtonsVacancy], 
                    adress: adress_value[radioButtonsAdress], 
                    med: med_value[radioButtonsMed], 
                    week: 'Возраст: ' + radioButtonsWeek, 
                    opyt: opyt_value[radioButtonsOpyt],
                    date: getFormattedDate(),
                },
                url: `https://platformsvisni.ru/vacancy`
              });
        } catch (error) {
            console.log('error send vacancy: ', error);
        }
    }
    const handleExpandClick = (id) => {
        setExpanded({[id]: !expanded[id]});
    };

    return (
        <section>
            <Seo title="Работа, вакансии в Уразово"
                 description="Работа в Свисни Суши. Повар сушист, пиццмейкер"
                 noindex={true}/>
                <HeadSection titleTXT={"Вакансии Свисни Суши"} />
                <Container>
                    <div className="item-section">
                    <Typography variant="subtitle2" style={{padding: `10px 50px 10px 0`, width: `98%`}}>
                        Бренд Свисни Суши — был основан в 2018 году, когда открылся первый ресторан японской кухни формата «возьми с собой» в
                        Уразово. С 2018 года мы начали активное развитие и сейчас мы хотим, чтобы каждый имел возможность наслаждаться вкусом
                        лучших блюд японской, итальянской и европейской кухни.
                        И нам требуются ответственные и трудолюбивые сотрудники на постоянную работу.
                    </Typography>
                            <div className="item-section item-section-vacancy">

                            <Card key={1} raised style={{ margin: `8px 0` }}>
                                      <CardHeader
                                        title={"Курьер"}
                                        subheader={'Водитель-курьер с личным автомобилем'} />
                                      <CardActions disableSpacing>
                                          <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<ExpandMoreIcon />}
                                            id={1}
                                            style={{ width: `50%` }}
                                            onClick={() => handleExpandClick(1)}
                                            aria-expanded={expanded["one"]}
                                            aria-label="show more">
                                              Подробнее
                                          </Button>
                                      </CardActions>

                                      <Collapse in={expanded[1]} timeout="auto" unmountOnExit>
                                      <CardContent>
                                        <Typography variant='h4'>Требования</Typography>
                                       <ul>
                                            <li>Личный автомобиль</li>
                                            <li>Желание работать</li>
                                       </ul>
                                       <Typography variant='h4'>Обязанности</Typography>
                                       <ul>
                                            <li>Доставка заказов (пицца, суши, вок) по адресам Клиентов</li>
                                       </ul>
                                       <Typography variant='h4'>Условия</Typography>
                                       <ul>
                                            <li>Компенсация питания</li>
                                            <li>Заказов множество. Все они уже собраны</li>
                                            <li>Выход на смену возможен уже в день стажировки</li>
                                            <li>График 5/2, с 11:00 до 23:00</li>
                                       </ul>
                                       <Typography variant='body1'>Если интересует вакансия курьера оставьте заявку, мы свяжемся с вами в ближайшее время если есть свободная вакансия, или сразу как только появится и ответим на все интересующие вас вопросы.</Typography>
                                        {/* <Typography gutterBottom variant="h5" component="div">
                                        Водитель-курьер с личным автомобилем
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Описание вакансии
                                        </Typography> */}
                                    </CardContent>
                                    <CardActions onClick={checkPushWork}>
                                        <a href='#form'>
                                            <Button size="large" variant='contained'>Откликнуться</Button>
                                        </a>
                                    </CardActions>
                                      </Collapse>
                            </Card>
                            {/* =============== */}

                            <Card key={2} raised style={{ margin: `8px 0` }}>
                                      <CardHeader
                                        title={"Оператор"}
                                        subheader={'Можно без опыта'} />

                                      <CardActions disableSpacing>
                                          <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<ExpandMoreIcon />}
                                            id={2}
                                            style={{ width: `50%` }}
                                            onClick={() => handleExpandClick(2)}
                                            aria-expanded={expanded["two"]}
                                            aria-label="show more">
                                              Подробнее
                                          </Button>
                                      </CardActions>

                                      <Collapse in={expanded[2]} timeout="auto" unmountOnExit>
                                      <CardContent>
                                        <Typography variant='h4'>Требования</Typography>
                                       <ul>
                                            <li>Опыт работы оператором будет являться преимуществом</li>
                                            <li>Грамотная устная и письменная речь</li>
                                            <li>Внимательность, стрессоустойчивость</li>
                                            <li>Желание работать</li>
                                       </ul>
                                       <Typography variant='h4'>Обязанности</Typography>
                                       <ul>
                                            <li>Прием и обработка входящих звонков и интернет-заказов на доставку</li>
                                            <li>Консультация клиентов по меню</li>
                                            <li>Оформление заказов</li>
                                       </ul>
                                       <Typography variant='h4'>Условия</Typography>
                                       <ul>
                                            <li>Бесплатное питание</li>
                                            <li>Частота выплат: Раз в неделю</li>
                                            <li>Почасовая оплата + % от заказов, 30-60 тыс в месяц</li>
                                            <li>График 2/2, 5/2, плавающие выходные, с 10:00 до 22:00</li>
                                       </ul>
                                       <Typography variant='h4'>Место работы</Typography>
                                       <ul>
                                            <li>п.Уразово, ул.Красная Площадь 30А</li>
                                            <li>г.Валуйки, ул.Толстого 16/2</li>
                                        </ul>
                                    </CardContent>
                                    <CardActions onClick={checkPushWork}>
                                    <a href='#form'>
                                            <Button size="large" variant='contained'>Откликнуться</Button>
                                        </a>
                                    </CardActions>
                                    </Collapse>
                            </Card>
                            {/* =============== */}

                            <Card key={3} raised style={{ margin: `8px 0` }}>
                                      <CardHeader
                                        title={"Повар"}
                                        subheader={'Сушист, Пиццмейкер, Универсал'} />

                                      <CardActions disableSpacing>
                                          <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<ExpandMoreIcon />}
                                            id={3}
                                            style={{ width: `50%` }}
                                            onClick={() => handleExpandClick(3)}
                                            aria-expanded={expanded["tree"]}
                                            aria-label="show more">
                                              Подробнее
                                          </Button>
                                      </CardActions>

                                      <Collapse in={expanded[3]} timeout="auto" unmountOnExit>
                                      <CardContent>
                                        <Typography variant='h4'>Требования</Typography>
                                       <ul>
                                            <li>Рассмотрим кандидатов без опыта работы</li>
                                            <li>Наличие действующей мед.книжки ( или готовность её оформить )</li>
                                       </ul>
                                       <Typography variant='h4'>Обязанности</Typography>
                                       <ul>
                                            <li>Приготовление блюд согласно стандартам компании</li>
                                       </ul>
                                       <Typography variant='h4'>Условия</Typography>
                                       <ul>
                                            <li>Заработная плата от 50 000 рублей и выше</li>
                                            <li>График работы обсуждается на собеседовании</li>
                                            <li>Бесплатное питание</li>
                                            <li>Официальное оформление</li>
                                       </ul>
                                       <Typography variant='h4'>Место работы</Typography>
                                       <ul>
                                            <li>п.Уразово, ул.Красная Площадь 30А</li>
                                            <li>г.Валуйки, ул.Толстого 16/2</li>
                                        </ul>
                                    </CardContent>
                                    <CardActions onClick={checkPushWork}>
                                    <a href='#form'>
                                            <Button size="large" variant='contained'>Откликнуться</Button>
                                        </a>
                                    </CardActions>
                                    </Collapse>
                            </Card>
                            {/* =============== */}

                            <Card key={4} raised style={{ margin: `8px 0` }}>
                                      <CardHeader
                                        title={"Помощник-повара"}
                                        subheader={'Рассмотрим без опыта'} />

                                      <CardActions disableSpacing>
                                          <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<ExpandMoreIcon />}
                                            id={4}
                                            style={{ width: `50%` }}
                                            onClick={() => handleExpandClick(4)}
                                            aria-expanded={expanded["fo"]}
                                            aria-label="show more">
                                              Подробнее
                                          </Button>
                                      </CardActions>

                                      <Collapse in={expanded[4]} timeout="auto" unmountOnExit>
                                      <CardContent>
                                        <Typography variant='h4'>Требования</Typography>
                                       <ul>
                                            <li>Высокая работоспособность</li>
                                            <li>Наличие действующей мед.книжки ( или готовность её оформить )</li>
                                            <li>Чистоплотнoсть</li>
                                       </ul>
                                       <Typography variant='h4'>Обязанности</Typography>
                                       <ul>
                                            <li>Заготовки</li>
                                            <li>Рaбота на кухне</li>
                                            <li>Помoщь пoвару</li>
                                       </ul>
                                       <Typography variant='h4'>Условия</Typography>
                                       <ul>
                                            <li>Заработная плата от 30 000 рублей и выше</li>
                                            <li>Бесплатные обеды</li>
                                            <li>Официальное оформление</li>
                                       </ul>
                                       <Typography variant='h4'>Место работы</Typography>
                                       <ul>
                                            <li>п.Уразово, ул.Красная Площадь 30А</li>
                                            <li>г.Валуйки, ул.Толстого 16/2</li>
                                        </ul>
                                    </CardContent>
                                    <CardActions onClick={checkPushWork}>
                                    <a href='#form'>
                                            <Button size="large" variant='contained'>Откликнуться</Button>
                                    </a>
                                    </CardActions>
                                    </Collapse>
                            </Card>

                            {/* =============== */}
                            {/* =============== */}
                            <span id='form'></span>
                            {valueStorage && valueStorage.status === "SUCCESS" ?
                                            <h4 style={{ paddingTop: 15 }}>Благодарим вас за отклик на нашу вакансию.<br></br>
                                            <br></br>
                                            Ваш отклик будет сохранен, и мы свяжемся с вами, если есть свободная вакансия или если появится подходящая вакансия в будущем.<br></br>
                                            <br></br>
                                            Спасибо за проявленный интерес к нашей компании.<br></br> 
                                            С уважением, Свисни Суши.</h4> : <>
                                                <form onSubmit={submitForm}>
                                                <Typography variant="h2" sx={{ marginBottom: 2, marginTop: 2 }}>
                                                    Отклик на вакансию:
                                                </Typography>
                                                
                                                <TextField
                                                    id="filled-name"
                                                    error={!validateUserName() && nameUser.length > 2}
                                                    label="Ваше имя"
                                                    required
                                                    fullWidth
                                                    inputProps={{ maxLength: 30, minLength: 3 }}
                                                    variant="filled"
                                                    onChange={(e) => {setNameUser(e.target.value)}}
                                                    color="primary"
                                                    name="name" 
                                                    helperText={validateUserName() === false && nameUser.length !== 0 ? "Введите корректное имя" : "Введите ваше имя" } />
                                                <TextField
                                                    id="filled-phone"
                                                    label="Телефон"
                                                    required
                                                    fullWidth
                                                    inputProps={{minLength: 15}}
                                                    InputProps={{inputComponent: TextMaskCustom, minLength: 15}}
                                                    variant="filled"
                                                    color="primary"
                                                    name="phone"
                                                    onChange={(e) => {setPhone(e.target.value)}}
                                                    style={{ marginTop: 10 }} 
                                                    value={phone}
                                                    />
                                                <FormControl sx={{ marginTop: 3 }}>
                                                    <FormLabel id="vacancy-radio-group">Какая вакансия интересует?</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="vacancy-radio-group"
                                                        defaultValue="other"
                                                        name="radio-buttons-vacancy"
                                                    >
                                                        <FormControlLabel value="delivery" control={<Radio />} label="Курьер" />
                                                        <FormControlLabel value="operator" control={<Radio />} label="Оператор" />
                                                        <FormControlLabel value="cook" control={<Radio />} label="Повар" />
                                                        <FormControlLabel value="cookhelp" control={<Radio />} label="Помощник повара" />
                                                        <FormControlLabel value="other" control={<Radio />} label="Любая" />
                                                    </RadioGroup>
                                                    </FormControl>
    
                                                    <FormControl sx={{ marginTop: 3 }}>
                                                    <FormLabel id="opyt-radio-group">Имеется ли у вас опыт работы?</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="opyt-radio-group"
                                                        defaultValue="da"
                                                        name="radio-buttons-opyt"
                                                    >
                                                        <FormControlLabel value="da" control={<Radio />} label="Да" />
                                                        <FormControlLabel value="net" control={<Radio />} label="Нет" />
                                                    </RadioGroup>
                                                    </FormControl>
                                                    
                                                    <FormControl sx={{ marginTop: 3 }}>
                                                    <FormLabel id="adress-radio-group">Где вы хотели бы работать?</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="adress-radio-group"
                                                        defaultValue="valuiki"
                                                        name="radio-buttons-adress"
                                                    >
                                                        <FormControlLabel value="valuiki" control={<Radio />} label="В Валуйках" />
                                                        <FormControlLabel value="urazovo" control={<Radio />} label="В Уразово" />
                                                    </RadioGroup>
                                                    </FormControl>
                                                    <FormControl sx={{ marginTop: 3 }}>
                                                    <FormLabel id="med-radio-group">Имеется ли у вас действующая медкнижка?</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="med-radio-group"
                                                        defaultValue="da"
                                                        name="radio-buttons-med"
                                                    >
                                                        <FormControlLabel value="da" control={<Radio />} label="Да" />
                                                        <FormControlLabel value="net" control={<Radio />} label="Нет" />
                                                    </RadioGroup>
                                                    </FormControl>
                                                    <FormControl sx={{ marginTop: 3 }}>
                                                    <FormLabel id="week-radio-group">Сколько вам лет?</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="week-radio-group"
                                                        defaultValue="18-25"
                                                        name="radio-buttons-week"
                                                    >
                                                        <FormControlLabel value="18-25" control={<Radio />} label="18-25" />
                                                        <FormControlLabel value="26-35" control={<Radio />} label="26-35" />
                                                        <FormControlLabel value="36-45" control={<Radio />} label="36-45" />
                                                        <FormControlLabel value="46-65" control={<Radio />} label="46-65" />
                                                    </RadioGroup>
                                                    </FormControl>
                                                    <Button
                                                        sx={{ marginTop: 3, marginBottom: 3, display: 'block' }}
                                                                variant="contained"
                                                                color="info"
                                                                type="submit">
                                                    Откликнуться
                                                </Button>
                                                </form>
                                            </>}
                                            {/* {valueStorage && valueStorage.status === "ERROR" && <h3>Ooops! Произошла ошибка.</h3>} */}

                                {/* <SectionInfo>
                                <Typography 
                                variant="h2">Плюсы работы в Свисни Суши</Typography>

                                    <div className="items-container">
                                        <div>
                                            <div>
                                                <StaticImage src="../images/money.png"
                                                             alt="Возможность влиять на доход" />
                                            </div>
                                            <div className="item-content">
                                                <p>Возможность влиять на доход</p>
                                            </div>
                                        </div>
                                        <div>
                                            <StaticImage src="../images/icEducation.png" alt="Обучение у наставника" />
                                            <div className="item-content">
                                                <p>Обучение у наставника</p>
                                            </div>
                                        </div>
                                        <div>
                                            <StaticImage src="../images/growth.png"
                                                         alt="Возможность карьерного роста" />
                                            <div className="item-content">
                                                <p>Возможность карьерного роста</p>
                                            </div>
                                        </div>
                                        <div>
                                            <StaticImage src="../images/home.png" alt="Выбор графика работы" />
                                            <div className="item-content">
                                                <p>Выбор графика работы</p>
                                            </div>
                                        </div>

                                    </div>
                                </SectionInfo> */}
                            </div>
                    </div>
                </Container>
                <MuiSnackbar severityText={severityText} severityType={severityType} setOpen={setOpen} open={open} />                
        </section>
    );
}

const MuiSnackbar = ({ setOpen, open, severityText, severityType }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
            onClose={handleClose}
            severity={severityType}
            variant="filled"
            sx={{ width: '80%' }}
        >
            {severityText}
        </Alert>
        </Snackbar>
    )
}

export default Vacancy;