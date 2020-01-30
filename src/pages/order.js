import React, {useState, useEffect} from "react"
// import SEO from "../components/seo"
import { connect } from 'react-redux';
import { navigate} from 'gatsby'
import { setName, setPhone,
  setSity, setAdress, setHome, setEntrance, setLevel, setDoor } from "../actions";
// import  Img  from 'gatsby-image';

// import * as R from 'ramda'

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import styled  from 'styled-components';


const NoneItem = styled.h2 `
font-family: 'Comfortaa', cursive;
font-weight: 700;
`
const SectionInfo = styled.div `
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
margin: 40px auto;


.table {
  font-family: 'Comfortaa', cursive;
  font-weight: 400;
}

.container-wrap {
  display: flex;
  flex-grow: 1;
  background-color: #EEEADD;
  width: 100%;
  margin: 50px 0 50px 0;
  /* flex-wrap: wrap; */
}

.conatiner-info {
  margin: 50px auto 50px auto;
}

.section-contacts {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.container_delivery {
  width: 100%;
}
.container_delivery h4 {
  text-align: center;
}

.content_info_user {
  display: flex;
  justify-content: space-around;
  margin: 0 0 50px 0;
}

.container_delivery_info {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.content_info_delivery {
  display: flex;
  justify-content: space-around;
  padding: 20px 0 20px 0;
}
`

const Order = ({location: {state: {data: {items, addPanelPribors, palochkiTotal}}}, nameUser, phoneUser, deliverySity, deliveryAdress, homeNumber, entranceNumber, levelNumber, doorPassword,
    setName, setPhone, setSity, setAdress, setHome, setEntrance, setLevel, setDoor, total}) => {
// console.log(data)
const [open, setOpen] = useState(false);
const [openPayment, setOpenPayment] = useState(false);
const [openDelivery, setOpenDelivery] = useState(false);

const [age, setAge] = useState('');
const [payment, setPayment] = useState('');
const [delivery, setDelivery] = useState('');

const handleSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();

    items.forEach((elem) => {
      return data.append(
        elem.name, 
        `Цена ${elem.total},
        Количество: ${elem.count}`);
    });
   
    if(addPanelPribors) {
      data.append('Палочки(шт):', palochkiTotal);
    }
      data.append('Общая цена:', total);

    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
      }
    };
    xhr.send(data);
    console.log(data)
   
    navigate('/order-processed', {replace: true})
  }
   
  const handleChange = event => {
    setAge(event.target.value);
  };
  const handleChangePayment = event => {
    setPayment(event.target.value);
  };

  const handleChangeDelivery = event => {
    setDelivery(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClosePayment = () => {
    setOpenPayment(false);
  };
  
  const handleOpenPayment = () => {
    setOpenPayment(true);
  };

  const handleCloseDelivery = () => {
    setOpenDelivery(false);
  };
  
  const handleOpenDelivery = () => {
    setOpenDelivery(true);
  };

return (
    <section>
    { items.length !== 0 ?
        <form  
           method="POST"
           onSubmit={handleSubmit}
           action="https://getform.io/f/a61244df-12d1-445d-9210-5033e2b633ca">
             <SectionInfo>    
             <h4>Контактные данные</h4>  
               <div className="section-contacts">
               <div>
                 <TextField id="validation-outlined-input" 
                 label="Имя" 
                 variant="outlined" 
                 zIndex={0}
                 required inputProps={{
                   maxLength: 12,
                   }} 
                   name="Имя" 
                   onChange={(e) => {
                     setName(e.target.value);
                 }}  
                 value={nameUser} 
                 helperText="Введите ваше имя."/>
                 </div>
                 <div>
                 <TextField id="validation-outlined-input" 
                   label="Телефон" 
                   variant="outlined"
                   type="tel" 
                   required inputProps={{
                     maxLength: 12,
                     }} 
                     name="Телефон" 
                     onChange={(e) => {
                       setPhone(e.target.value);
                   }}  
                   value={phoneUser} 
                   helperText="Введите ваш телефон."/>       
               </div>
               </div>
               <div className="container-wrap">
               <div className="conatiner-info">
                 <InputLabel id="controlled-open-select-label">Выберите форму оплаты</InputLabel>
                 <Select
                   labelId="controlled-open-select-label"
                   id="controlled-open-select"
                   open={openPayment}
                   onClose={handleClosePayment}
                   onOpen={handleOpenPayment}
                   value={payment}
                   name="Форма оплаты"
                   onChange={handleChangePayment}>
                   <MenuItem value="">
                   <em>Форма оплаты</em>
                 </MenuItem>
                 <MenuItem value="Онлайн оплата">Онлайн оплата</MenuItem>
                 <MenuItem value="Оплата наличными">Оплата наличными</MenuItem>
               </Select>
               </div>
    
               <div className="conatiner-info">
               <InputLabel id="open-select-label">Выберите способ доставки</InputLabel>
               <Select
                 labelId="open-select-label"
                 id="open-select"
                 open={openDelivery}
                 onClose={handleCloseDelivery}
                 onOpen={handleOpenDelivery}
                 value={delivery}
                 name="Доставка"
                 onChange={handleChangeDelivery}>
                 <MenuItem value="">
                 <em>Способ доставки</em>
               </MenuItem>
               <MenuItem value="Самовывоз">Самовывоз</MenuItem>
               <MenuItem value="Доставка курьером">Доставка курьером</MenuItem>
             </Select>  
             </div>
    
               { payment === "Оплата наличными" &&
               <div className="conatiner-info">
                 <InputLabel id="demo-controlled-open-select-label">С какой суммы сдача?</InputLabel>
                 <Select
                   labelId="demo-controlled-open-select-label"
                   id="demo-controlled-open-select"
                   open={open}
                   onClose={handleClose}
                   onOpen={handleOpen}
                   value={age}
                   name="Сдача"
                   onChange={handleChange}>
                   <MenuItem value="Без сдачи">
                   <em>Без сдачи</em>
                 </MenuItem>
                 <MenuItem value={700}>С 700 руб</MenuItem>
                 <MenuItem value={1000}>С 1000 руб</MenuItem>
                 <MenuItem value={2000}>С 2000 руб</MenuItem>
                 <MenuItem value={5000}>С 5000 руб</MenuItem>
               </Select>
             </div>
               }
             </div>
    
           <div className="container_delivery">
           { delivery === "Доставка курьером" &&  
            <div>
            <h4>Адрес доставки</h4>
               <div className="content_info_user">
               <div>
               <TextField id="validation-outlined-input" 
                 label="Населенный пункт" 
                 variant="outlined" 
                 required inputProps={{
                   maxLength: 20,
                   }} 
                   name="Адрес" 
                   onChange={(e) => {
                     setSity(e.target.value);
                 }}  
                 value={deliverySity} 
                 helperText="Введите ваш населенный пункт."/>
               </div>
               <div>
               <TextField id="validation-outlined-input" 
                 label="Улица" 
                 variant="outlined" 
                 required inputProps={{
                   maxLength: 20,
                   }} 
                   name="Улица" 
                   onChange={(e) => {
                     setAdress(e.target.value);
                 }}  
                 value={deliveryAdress} 
                 helperText="Ваша улица"/>
               </div>
               </div>
    
               <div className="container_delivery_info">
               <div className="content_info_delivery"> 
               <div>
               <TextField id="validation-outlined-input" 
                 label="Дом" 
                 variant="outlined" 
                 size="small"
                 type="text"
                 required inputProps={{
                   maxLength: 5,
                   }} 
                   name="Дом" 
                   onChange={(e) => {
                     setHome(e.target.value);
                 }}  
                 value={homeNumber}
                 helperText="Введите ваш номер дома."/>	
                               </div>
    
               <div>
               <TextField id="validation-outlined-input" 
                 label="Подъезд" 
                 variant="outlined" 
                 type="number"
                 size="small"
                 inputProps={{
                   maxLength: 3,
                   }} 
                   name="Подъезд" 
                   onChange={(e) => {
                     setEntrance(e.target.value);
                 }}  
                 value={entranceNumber}
                 helperText="Введите ваш номер подъезда."/>	
               </div>
               </div>
    
               <div className="content_info_delivery"> 
               <div>
               <TextField id="validation-outlined-input" 
                 label="Этаж" 
                 variant="outlined" 
                 size="small"
                 type="number"
                 inputProps={{
                   maxLength: 3,
                   }} 
                   name="Этаж" 
                   onChange={(e) => {
                     setLevel(e.target.value);
                 }}  
                 value={levelNumber}
                 helperText="Введите ваш этаж."/>	
               </div>
    
               <div>
               <TextField id="validation-outlined-input" 
                 label="Код двери" 
                 variant="outlined" 
                 size="small"
                 type="number"
                 inputProps={{
                   maxLength: 6,
                   }} 
                   name="Код двери" 
                   onChange={(e) => {
                     setDoor(e.target.value);
                 }}  
                 value={doorPassword}
                 helperText="Код двери подьезда."/>	
               </div>
               </div>
               </div>
           </div>
         }
        
        </div>
         
           <div>
           <TextField
             id="outlined-multiline-static"
             label="Комментарий к заказу"
             multiline
             rows="4"
             inputProps={{
               maxLength: 200,
               }} 
             name="Комментарий к заказу"
             variant="outlined"
             className="mt-3"
           />
           </div>
                  
           <div className="total mt-3">
             <b> Итого к оплате: {total}</b>
             </div>
    
             <Button 
             type="submit" 
             variant="contained" 
             color="primary"
             size='large'
             label='aa'
             >
             Оформить заказ
             </Button>
           </SectionInfo>
         </form> 
    : <NoneItem className="d-flex justify-content-center align-items-center mt-5 none_item">Ваша корзина пуста!</NoneItem>}
</section>
)

}

const mapStateToProps = ({shoppingCart: { orderTotal}, contacts: { 
    nameUser, phoneUser, deliverySity, deliveryAdress, homeNumber, entranceNumber, levelNumber, doorPassword }, palochkiTotal}) => {
        return {
            total: orderTotal,
            nameUser, phoneUser, deliverySity, deliveryAdress, homeNumber, entranceNumber, levelNumber, doorPassword
        };
      }

const mapDispatchToProps = {
    setName, setPhone,
    setSity, setAdress, 
    setHome, setEntrance, 
    setLevel, setDoor
};

export default connect(mapStateToProps, mapDispatchToProps)(Order)

