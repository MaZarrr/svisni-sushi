import React, {useState, useEffect} from "react"
import SEO from "../components/seo"
import { connect } from 'react-redux';
import {graphql, navigate} from 'gatsby'
import { setAddedToCart, setRemoveFromCart, allSetRemoveFromCart, 
  producSetsLoad, onRazmer, addedPalochki, setName, setPhone,
  setSity, setAdress, setHome, setEntrance, setLevel, setDoor } from "../actions";
import  Img  from 'gatsby-image';

import * as R from 'ramda'
import styled  from 'styled-components';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const NoneItem = styled.h2 `
font-family: 'Comfortaa', cursive;
font-weight: 700;
`

const RadioWrapper = styled.div `
 position: relative;
 background-color: whitesmoke;
`
const Radio = styled.input `
  .radio_label {
    padding-left: 25px;
    font-size: 1rem;
    color: darkblue;
    cursor: pointer;
  }
  .radio_label:before {
    content:'';
    display: block;
    width: 16px;
    height: 16px;

    background-color: #fff;
    border: 1px solid #cccccc;
    border-radius: 50%;

    position: absolute;
    top: 0;
    left: 0;
  }
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
const ShoppingCartTr = styled.tr `
  .img_shopping_cart {
    margin: 0;
    padding: 0;
  }
`

const ShoppingCartTable = ({data: {allContentfulProduct, allContentfulProductPizza, allContentfulHomePageCarts}, 
    producSetsLoad, 
    items, total, 
    palochkiTotal, 
    onIncrease, 
    onDecrise, 
    onDelete, 
    onRazmer, 
    addedPribor,
    nameUser, phoneUser, deliverySity, deliveryAdress, homeNumber, entranceNumber, levelNumber, doorPassword,
    setName, setPhone, setSity, setAdress, setHome, setEntrance, setLevel, setDoor
  }) => {
    
    // console.log(nameUser, phoneUser, deliverySity, deliveryAdress, homeNumber, entranceNumber, levelNumber, doorPassword)

    const [open, setOpen] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [openDelivery, setOpenDelivery] = useState(false);

    const [age, setAge] = useState('');
    const [payment, setPayment] = useState('');
    const [delivery, setDelivery] = useState('');

    useEffect(() => {
        const data = allContentfulProduct.edges.concat(allContentfulProductPizza.edges, allContentfulHomePageCarts.edges)
        producSetsLoad(data); // action push to reduxStore
      }, [allContentfulProduct, allContentfulProductPizza, producSetsLoad, allContentfulHomePageCarts])
      
      const addPanelPribors = R.contains(true, R.map(({price33}) => price33 === undefined, items))
      
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
     

    const onRadioChangedd = (e) =>  {
      const { target: { id, value } } = e
      onRazmer(id, value)
      console.log(value)
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
    <>
    <SEO title="Корзина" />
    <section>

 <table className="table">
    { items.length !== 0 &&
      <thead >
        <tr>
        <th>#</th>
        <th>Фото</th>
        <th>Заказ</th>
        <th>Количество</th>
        <th>Цена</th>
        </tr>
    </thead> 
    }


    <tbody>
        {
        items.map((item, idx) => {
        const {id, name, count, total, image, price33, radioPrice, radioValue} = item
    
        return (
            <ShoppingCartTr key={id}>
            <td>{idx + 1}</td>
            <td className="img_shopping_cart">
            <Img 
            style={{maxWidth: 100, height: 100}}
            fluid={image}> ₽</Img> 
            </td>
            <td>{name}</td>
            <td>{count}</td>
            <td>{total} ₽</td>
            
            <td>
            { !!price33 &&
       
            <div>
            <span>Размер пиццы</span>
            <RadioWrapper className='radio'>
            <Radio type='radio'
              className='radio_input'
              id={id}
              name={idx + 1}
              onChange={onRadioChangedd}
              value={radioPrice}
            />
              <label htmlFor="radio_1" 
              className="radio_label" 
              >Средняя</label>
            </RadioWrapper>
            <RadioWrapper className='radio'>
            <Radio type='radio'
              className='radio_input'
              id={id}
              name={idx + 1}
              onChange={onRadioChangedd}
              value={price33}
            />
              <label htmlFor="radio_2" 
              className="radio_label" 
              >Большая</label>
            </RadioWrapper>
             </div>
          }
          </td>
            <td>
            <button 
            onClick={()=> onDelete(id, radioValue)}
             className="btn btn-outline-danger">
                <i className="fa fa-trash-o"></i>
            </button>
            <button disabled={false}
            onClick={()=> onIncrease(id, radioValue)}
            className="btn btn-outline-success">
                <i className="fa fa-plus-circle"></i>
            </button>
            <button 
            onClick={()=> onDecrise(id, radioValue)}
            className="btn btn-outline-warning">
                <i className="fa fa-minus-circle"></i>
            </button>
        </td>
        </ShoppingCartTr>
                )
            })
        }
    </tbody>
    </table>
    { addPanelPribors &&
      <div className="container_pribor">
      <div className="d-flex flex-column align-items-center">
      <b><p>Количество приборов</p></b>
      <div className="d-flex">
      <button 
      onClick={()=> addedPribor(1)}
      className="btn btn-outline-success">
        <i className="fa fa-plus-circle"></i>
      </button>
      <b className="ml-3 mr-3">{palochkiTotal}</b>
      <button 
      onClick={()=> addedPribor(-1) }
      className="btn btn-outline-warning">
        <i className="fa fa-minus-circle"></i>
      </button> 
      </div> 
      </div>
      </div>
    }
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
    </>
    
    )
}
 
const mapStateToProps = ({shoppingCart: { cartItems, orderTotal}, setList: {product}, contacts: { 
nameUser, phoneUser, deliverySity, deliveryAdress, homeNumber, entranceNumber, levelNumber, doorPassword }, palochkiTotal}) => {
    return {
        items: cartItems, 
        total: orderTotal,
        product: product,
        palochkiTotal,
        nameUser, phoneUser, deliverySity, deliveryAdress, homeNumber, entranceNumber, levelNumber, doorPassword
    };
  }
   
const mapDispatchToProps = {
        producSetsLoad: producSetsLoad,
        onDecrise: setRemoveFromCart,
        onIncrease: setAddedToCart,
        onDelete: allSetRemoveFromCart,
        onRazmer: onRazmer,
        addedPribor: addedPalochki,
        setName, setPhone,
        setSity, setAdress, 
        setHome, setEntrance, 
        setLevel, setDoor
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable)


export const querySets = graphql `
    {
        allContentfulProduct {
          edges {
            node {
                id
              slug
              name
              price
              description
              image {
                  fluid(maxWidth: 400) {
                    ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
          allContentfulProductPizza  {
          edges {
            node {
                id
              slug
              name
              price
              description
              priceIn33cm
              image {
                  fluid(maxWidth: 400) {
                    ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
          allContentfulHomePageCarts {
            edges {
              node {
                id
                name
                price
                description
                image {
                  fluid(maxWidth: 768) {
                    src
                    base64
                  }
                }
              }
            }
  }
        }
    `


//     // const [selectedValue, setSelectedValue] = useState(R.map((item) => R.prop('price33', item), items));
//     const [data, setData] = useState([])
//     // const loadData = useCallback(async () => await fetchData(), [fetchData])
//     // const fetchData = () => {
//     //   axios('https://svisni-sushi.firebaseio.com/sushilid.json', {
//     //   method: 'GET',
//     //   responseType: 'json',
//     //   headers: {'Content-Type': 'application/json'}
//     //   }).then((res) => {
//     //     const todo = Object.keys(res.data).map(key => ({...res.data[key], id: key}))
//     //     setData(todo)
//     //     console.log(todo)
//     //   })
//     // }
//     console.log(data) ///---------------------------
   
//     useEffect(() => {
//       let isSubscribed = false;
//       axios('https://svisni-sushi.firebaseio.com/sushilid.json', {
//         method: 'GET',
//         responseType: 'json',
//         headers: {'Content-Type': 'application/json'}
//         }).then((res) => {
//           const todo = Object.keys(res.data).map(key => ({...res.data[key], id: key}))
//           !isSubscribed && setData(todo)
//           console.log(todo)
//         })
//         return () => isSubscribed = true; 
//     }, [data.id])

//     useEffect(() => {
      
//         const data = allContentfulProduct.edges.concat(allContentfulProductPizza.edges)
//         producSetsLoad(data); // action push to reduxStore
//         // if(!isSubscribed) {
//         //   loadData();
//         // }
         
//       }, [allContentfulProduct, allContentfulProductPizza])
      
//       const addPanelPribors = R.contains(true, R.map(({price33}) => price33 === undefined, items))
      
//       const handleSubmit = (ev) => {
//       ev.preventDefault();
//       //  axios('https://svisni-sushi.firebaseio.com/sushilid.json', {
//       //     method: 'POST',
//       //     headers: {'Content-Type': 'application/json'},
//       //     data: {
//       //       body: '2222'
//       //     }
//       //   }).then((data) => {
//       //     console.log(data);
//       //     }, (error) => {
//       //       console.log(error);
//       //     });

//       const form = ev.target;
//       const data = new FormData(form);
//       const xhr = new XMLHttpRequest();
//       xhr.open(form.method, form.action);
//       xhr.setRequestHeader("Accept", "application/json");
//       xhr.onreadystatechange = () => {
//         if (xhr.readyState !== XMLHttpRequest.DONE) return;
//         if (xhr.status === 200) {
//           form.reset();
//         }
//       };
//       xhr.send(data);
//     }
     

// const onRadioChangedd = (e) => {

//   const { target: { id, value } } = e
//   onRazmer(id, value)
//   console.log(value)
//   }
 
// return (
//     <>
//     <SEO title="Корзина" />
//     <Layout>

//     <div className="shopping_cart_table">
//     {/* {
//       R.map(({id, body}) => {
//         return (
//           <div key={id}>
//           <h2>{body}</h2>
//           </div>
//         )
//       } )(data)
//     } */}
  
























//       // console.log(visitor_uid)
//   //     window.AMOPIXEL_IDENTIFIER_PARAMS = window.AMOPIXEL_IDENTIFIER_PARAMS || { } ;
//   //     window.AMOPIXEL_IDENTIFIER_PARAMS.onload = function (pixel_identifier) {
//   //       let visitor_uid = pixel_identifier.getVisitorUid ( ) ; // Получаем visitor_uid
//   //       console.log ( 'visitor_uid' , visitor_uid) ;
//   //       if (visitor_uid) {
//   //         // Записываем его в скрытое поле формы 'visitor_uid'
//   //         document.getElementById ( 'visitor_uid' ).value = visitor_uid;
//   //         setUid(visitor_uid)
//   //      }
//   //   };
//   //   {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
//   //     "add" : [
//   //           {
//   //               "name" : "Заявка с сайта" ,
//   //               "status_id" : 142 ,
//   //               "visitor_uid" : "12345678-52d2-44c2-9e16-ba0052d9f6d6"
//   //           }
//   //      ]



   
        // // const visitor_uid = document.getElementById ( 'visitor_uid' ).value 
        // console.log(uid)
        // axios.post('api.vk.com/method/messages.send', {
        //       user_id: 539634162,
        //       message: 'asdasdasdasd',
        //       access_token: 'c1c4162c4b0e11c9ca3e40e9426b56a39e9ab29d754c22a6c7e54f43c70173a590694de5fb38ec5114448',
        //       v: '5.103'
        //     }).then((response) => {
        //         // console.log(response);
        //         // console.log(response.data);
        //         // console.log(response.status);
        //         // console.log(response.statusText);
        //         // console.log(response.headers);
        //         // console.log(response.config);
        //       }, (error) => {
        //         console.log(error);
        //       });
        // url: 'api.vk.com/method/messages.send?user_ids=539634162&message=asdasdasdasd&access_token=c1c4162c4b0e11c9ca3e40e9426b56a39e9ab29d754c22a6c7e54f43c70173a590694de5fb38ec5114448'
        // responseType: 'json',
        
        // axios({
        //     method: 'POST',
        //     url: 'api.vk.com/method/messages.send?user_id=539634162&message=фывфыв&access_token=c1c4162c4b0e11c9ca3e40e9426b56a39e9ab29d754c22a6c7e54f43c70173a590694de5fb38ec5114448&v=5.103',
        //     transformRequest: [(data) => {
        //       return data;
        //     }],
        //     data: {
        //       user_id: 539634162,
        //       message: 'Сообщение пользователю',
        //       access_token: '9838d5915895d1a192bb996620cbec9db2d8cca92c2e3fed4d904cbe2e543249c4bf4f21c38d17ec1d7f9',
        //       contorm_token: '53e150ae',
        //       v: '5.50'
        //     },
        //     headers: { 
        //       'content-type': "text/html; charset=UTF-8",
        //       'Access-Control-Allow-Origin': "*",
        //       'X-Requested-With': 'XMLHttpRequest'
        //     }
        //   }).then((response) => {
        //     console.log(response);
        //     console.log(response.data);
        //     console.log(response.status);
        //     console.log(response.statusText);
        //     console.log(response.headers);
        //     console.log(response.config);
        //   }, (error) => {
        //     console.log(error);
        //   }); 
        
        // application/json;charset=utf-8
        // application/x-www-form-urlencoded
        // v: '5.103' // v: '5.62'
         // user_id: 526580165






// const sentMassege = (id, totalPrice) => {
//   // let message = `Новый заказ на сайте ${totalPrice}`

//   // const url = 'https://api.vk.com/method/messages.send'

// //   const options = {
// //   method: 'post',
// //   url: 'https://api.vk.com/method/messages.send',
// //   data: {
// //     user_id: id,
// //     message:{
// //       firstName: 'Finn',
// //       lastName: 'Williams'
// //     },
// //     access_token: 'c760f0624f1cc8e00cd22ea4e3c742d20df1a1f4283ca7fac0a955363c959749a588777126b14ad94f91b',
// //     v: '5.103'
// //   },
// //   headers: { 
// //     'content-type': 'application/x-www-form-urlencoded',
// //     'access-control-allow-origin': 'http://localhost:8000'
// //   },
// // };

// // 0f74772b719ddce445d401ca97e3c34f92e80f05d5ac537937e1292d6a22454b68401c21eb2a77a96ca3c
//   // Access-Control-Allow-Origin: localhost:8000/korzina
//   // access_token=c760f0624f1cc8e00cd22ea4e3c742d20df1a1f4283ca7fac0a955363c959749a588777126b14ad94f91b
//   axios( {
//     method: 'post',
//     url: 'https://api.vk.com/method/messages.send',
//     data: {
//       user_id: id,
//       message:{
//         firstName: 'Finn',
//         lastName: 'Williams'
//       },
//       access_token: 'c760f0624f1cc8e00cd22ea4e3c742d20df1a1f4283ca7fac0a955363c959749a588777126b14ad94f91b',
//       v: '5.103'
//     },
//     headers: { 
//       'content-type': 'application/x-www-form-urlencoded',
//       'access-control-allow-origin': 'http://localhost:8000'
//     },
//   })
//   // axios.request(options)

// //   const url = 'https://api.vk.com/method/messages.send'
// //   const params = {
// //     user_id: id,
// //     message: message,
// //     access_token: 'f630d08308074868fb009e2ecbc80f0bc04fe80545fe5d89a2a1640c8431b193e421ffc64de63f6efe9f7',
// //     v: '5.62'
// //   }

// //  const result = file_get_contents(url, false, stream_context_create({
// //     http: {
// //       method: 'POST',
// //       header: 'Content-type: application/x-www-form-urlencoded',
// //       content: http_build_query(params)
// //     }
// //   }))
// //   console.log(result)

// //   return result
// }














//  // sendMail(items)
//  axios.post('https://vitalistarkiii.amocrm.ru/api/v2/leads', {
//   add: [{
//     name: "Покупка карандашей",
//     created_at: "1508101200",
//     updated_at: "1508274000",
//     status_id: "13670637",
//     responsible_user_id: "957083",
//     sale: "5000",
//     tags: "pencil, buy",
//     contacts_id: [
//       "1099149"
//     ],
//     company_id: "1099148",
//     catalog_elements_id: {
//       99999: {
//         111111: 10
//       }
//     },
//     custom_fields: [{
//         id: "4399649",
//         values: [
//           "3691615",
//           "3691616",
//           "3691617"
//         ]
//       },
//       {
//         id: "4399656",
//         values: [{
//           value: "2017-10-26"
//         }]
//       },
//       {
//         id: "4399655",
//         values: [{
//             value: "ул. Охотный ряд, 1",
//             subtype: "address_line_1"
//           },
//           {
//             value: "Москва",
//             subtype: "city"
//           },
//           {
//             value: "101010",
//             subtype: "zip"
//           },
//           {
//             value: "RU",
//             subtype: "country"
//           }
//         ]
//       }
//     ]
//   }]
// })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });





  // const sentMassege = (id, totalPrice) => {
        // let message = `Новый заказ на сайте ${totalPrice}`

        // const url = 'https://api.vk.com/method/messages.send'

      //   const options = {
      //   method: 'post',
      //   url: 'https://api.vk.com/method/messages.send',
      //   data: {
      //     user_id: id,
      //     message:{
      //       firstName: 'Finn',
      //       lastName: 'Williams'
      //     },
      //     access_token: 'c760f0624f1cc8e00cd22ea4e3c742d20df1a1f4283ca7fac0a955363c959749a588777126b14ad94f91b',
      //     v: '5.103'
      //   },
      //   headers: { 
      //     'content-type': 'application/x-www-form-urlencoded',
      //     'access-control-allow-origin': 'http://localhost:8000'
      //   },
      // };

// 0f74772b719ddce445d401ca97e3c34f92e80f05d5ac537937e1292d6a22454b68401c21eb2a77a96ca3c
        // Access-Control-Allow-Origin: localhost:8000/korzina
        // access_token=c760f0624f1cc8e00cd22ea4e3c742d20df1a1f4283ca7fac0a955363c959749a588777126b14ad94f91b
        // axios({
        //   method: 'post',
        //   url: 'https://api.vk.com/method/messages.send',
        //   data: {
        //     user_id: id,
        //     message:{
        //       firstName: 'Finn',
        //       lastName: 'Williams'
        //     },
        //     access_token: 'c760f0624f1cc8e00cd22ea4e3c742d20df1a1f4283ca7fac0a955363c959749a588777126b14ad94f91b',
        //     v: '5.103'
        //   },
        //   headers: { 
        //     'content-type': 'application/x-www-form-urlencoded',
        //     'access-control-allow-origin': 'http://localhost:8000'
        //   }
        // }).then((response) => {
        //   console.log(response);
        // }, (error) => {
        //   console.log(error);
        // });
        // axios.request(options)

      //   const url = 'https://api.vk.com/method/messages.send'
      //   const params = {
      //     user_id: id,
      //     message: message,
      //     access_token: 'f630d08308074868fb009e2ecbc80f0bc04fe80545fe5d89a2a1640c8431b193e421ffc64de63f6efe9f7',
      //     v: '5.62'
      //   }

      //  const result = file_get_contents(url, false, stream_context_create({
      //     http: {
      //       method: 'POST',
      //       header: 'Content-type: application/x-www-form-urlencoded',
      //       content: http_build_query(params)
      //     }
      //   }))
      //   console.log(result)

      //   return result
      // }
      //  // const client_id = '7260651'











//     const sendMail = async (dataCartItems) => {

//      const mail = dataCartItems.map(({id, name, count, total}) => {
//       return (
        
//         <div>
//         <h2>Новый заказ</h2>
//         <p>{id} - {name} - {count} - {total}</p>
//         <hr></hr>
//         </div> 
        
//         )    
//       })
    
//       let testAccount = await nodemailer.createTestAccount();

//       let transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//           user: testAccount.user, // generated ethereal user
//           pass: testAccount.pass // generated ethereal password
//     }
//   });

//   let mailOption = {
//     from: '<vitalistarkiii@gmail.com>',
//     to: 'vitalistarkiii@gmail.com', // + data.email
//     subject: 'Oder in shop', 
//     text: 'Упрощенная версия заказа', // если не отображается верста у клиента (он запретил html) 
//     html: mail
//   }

//   let info = await transporter.sendMail(mailOption);
//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// }







