import React, {useEffect} from "react"
import SEO from "../components/seo"
import { connect } from 'react-redux';
import {graphql, Link} from 'gatsby'
import { setAddedToCart, setRemoveFromCart, allSetRemoveFromCart, 
  producSetsLoad, onRazmer, addedPalochki } from "../actions";
import  Img  from 'gatsby-image';

import * as R from 'ramda'

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import CssBaseline from '@material-ui/core/CssBaseline';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    marginBottom: 20,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  paperDiv: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  containerWrapped: {
    marginBottom: 30
  },
  button: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: 'white',
    marginTop: 8,
    margin: `0 auto` 
  }
}));

const ShoppingCartTable = ({data: {allContentfulProduct, allContentfulProductPizza, allContentfulHomePageCarts}, 
    producSetsLoad, 
    items, 
    total,
    palochkiTotal, 
    onIncrease, 
    onDecrise, 
    onDelete, 
    onRazmer, 
    addedPribor
  }) => {

  const classes = useStyles();
    
  const [value, setValue] = React.useState([]);
  const handleChange = event => {
    setValue(() => {
      return R.update(event.target.id, [
        event.target.value
      ])(value)
    });
  };
  
    useEffect(() => {
        const data = allContentfulProduct.edges.concat(allContentfulProductPizza.edges, allContentfulHomePageCarts.edges)
        producSetsLoad(data); // action push to reduxStore
      }, [allContentfulProduct, allContentfulProductPizza, producSetsLoad, allContentfulHomePageCarts])
      
    const addPanelPribors = R.contains(true, R.map(({price33}) => price33 === undefined, items))
      
    const onRadioChangedd = (id, price) =>  {
      // const { target: { id, value } } = e
      onRazmer(id, price)
      console.log(price)
    }

return (
  <>
  <SEO title="Корзина" />
  <section>
  <div className={classes.root}>
    <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          { items.length !== 0 &&
          <Typography variant="h2">
            <Box fontFamily="Neucha" fontWeight={900} fontSize={46}>
             Корзина
            </Box>
          </Typography>
          }
          </Paper>
          <div className={classes.paperDiv}>
          <Typography variant="h6"><b>Товар</b></Typography>
          {  
        items.map((item, idx) => {

        const {id, name, count, total, image, price33, radioPrice, radioValue, priceDef} = item
   
        return (
          <Paper key={id} className={classes.paper}>
          <Grid container spacing={3} className={classes.containerWrapped}>
          <Grid item style={{backgroundColor: `lightgrey`}}>
            <ButtonBase className={classes.image}>
            <Img style={{width: 128, height: 128, margin: 0, padding: 0}} fluid={image}> </Img> 
         
            </ButtonBase>
            { !!price33 &&
              <FormControl component="fieldset" style={{marginTop: 20}}>
              {/* <FormLabel component="legend" style={{textAlign: 'center'}}>Размер</FormLabel> */}
              <RadioGroup aria-label="position" name="position" 
              value={value[idx]} onChange={handleChange} row>
              <FormControlLabel
                  value={name}
                  control={<Radio color="primary" name={idx + 1}  onChange={() => onRadioChangedd(id, priceDef)}/>}
                  label="Средняя"
                  labelPlacement="bottom"
                  id={id}
                  name={name}
                  style={{margin: 5, padding: 0}}
                />
                <FormControlLabel
                  value={name + "a"}
                  control={<Radio color="primary" name={idx + 1}  onChange={() => onRadioChangedd(id, price33)}/>}
                  label="Большая"
                  labelPlacement="bottom"
                  id={id}
                  name={name}
                  style={{margin: 5, padding: 0}}
                />
              </RadioGroup>
            </FormControl>
             }
          </Grid>
          <Grid item xs={12} sm={6} container>
            <Grid item xs={12} sm={9} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                 76шт 1080кг
                </Typography>
                  <Typography variant="body2" color="textSecondary">
                  {count} шт
                </Typography>
                <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                <div className="mt-1">
                <button disabled={false}
                  onClick={()=> onIncrease(id, radioValue)}
                  className="btn btn-outline-success btn-sm">
                      <i className="fa fa-plus-circle fa-lg"></i>
                  </button>
                  <button 
                  onClick={()=> onDecrise(id, radioValue)}
                  className="btn btn-outline-warning btn-sm ml-2">
                      <i className="fa fa-minus-circle fa-lg"></i>
                  </button>
                  <button 
                  onClick={()=> onDelete(id, radioValue)}
                  className="btn btn-outline-danger btn-sm ml-2">
                      <i className="fa fa-trash-o fa-lg"></i>
                  </button>
                  <CssBaseline />
              </div>
              
                </Typography>
                
              </Grid>
              
              </Grid>
            </Grid>

            <Grid item style={{margin: `0 5px 5px 0`}}>
      
             <Typography style={{ color: '#000', textAlign: 'center'}} variant="subtitle1"><b>{total} ₽</b></Typography>
            
            </Grid>
          </Grid>
        </Grid>
       </Paper>
                )
            })
        }
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
      <div className="total text-center mt-3">
              <div>
                <b> Итого к оплате: {total}</b>
              </div>
              <div>
              <Button component={Link} state={{cart: addPanelPribors}} to="/order" className={classes.button}>Продолжить оформление</Button>
              </div>
             </div>
        </div>         
        {/* </Paper> */}
    
        </Grid>
        </Grid>
        </div>
        </section>
  </>
    )
}
 
const mapStateToProps = ({shoppingCart: { cartItems, orderTotal}, setList: {product}, palochkiTotal}) => {
    return {
        items: cartItems, 
        product: product,
        palochkiTotal,
        total: orderTotal
    };
  }
   
const mapDispatchToProps = {
        producSetsLoad: producSetsLoad,
        onDecrise: setRemoveFromCart,
        onIncrease: setAddedToCart,
        onDelete: allSetRemoveFromCart,
        onRazmer: onRazmer,
        addedPribor: addedPalochki,
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
                    ...GatsbyContentfulFluid
                  }
                }
              }
            }
  }
        }
    `







// {/* <Grid item xs={12} key={id}>
// <Paper className={classes.paper} >
// <Grid item xs={12}>
//   <Paper className={classes.paper}>
//   <Typography variant="h6">Товар</Typography>
//     <Grid item= justify="flex-start" spacing={6}>
//   <Img style={{width: 100, height: 100}} fluid={image}> ₽</Img> 
//   <div>
//     <div>{name}</div>
//     <div>{count}</div>
//   </div>
  

//   </Grid>
//   </Paper>

  
 
// </Grid>

 
//   <ShoppingCartTr >
//   <div>{idx + 1}</div>
//   <div className="img_shopping_cart">
 
//   </div>
//   {/* <div></div> */}
  
//   <div>{total} ₽</div>

//   <div>
//   { !!price33 &&

//   <div>
//   <span>Размер пиццы</span>
//   <RadioWrapper className='radio'>
//   <Radio type='radio'
//     className='radio_input'
//     id={id}
//     name={idx + 1}
//     onChange={onRadioChangedd}
//     value={radioPrice}
//   />
//     <label htmlFor="radio_1" 
//     className="radio_label" 
//     >Средняя</label>
//   </RadioWrapper>
//   <RadioWrapper className='radio'>
//   <Radio type='radio'
//     className='radio_input'
//     id={id}
//     name={idx + 1}
//     onChange={onRadioChangedd}
//     value={price33}
//   />
//     <label htmlFor="radio_2" 
//     className="radio_label" 
//     >Большая</label>
//   </RadioWrapper>
//    </div>
// }
// </div>
//   <div>
//   <button 
//   onClick={()=> onDelete(id, radioValue)}
//    className="btn btn-outline-danger">
//       <i className="fa fa-trash-o"></i>
//   </button>
//   <button disabled={false}
//   onClick={()=> onIncrease(id, radioValue)}
//   className="btn btn-outline-success">
//       <i className="fa fa-plus-circle"></i>
//   </button>
//   <button 
//   onClick={()=> onDecrise(id, radioValue)}
//   className="btn btn-outline-warning">
//       <i className="fa fa-minus-circle"></i>
//   </button>
//   <CssBaseline />
// </div>

// </ShoppingCartTr>

// </Paper>
// </Grid>





//  */}


























// <table className="table">
//     { items.length !== 0 &&
//       <thead >
//         <tr>
//         <th>#</th>
//         <th>Фото</th>
//         <th>Заказ</th>
//         <th>Количество</th>
//         <th>Цена</th>
//         </tr>
//     </thead> 
//     }


//     <tbody>
//         {
//         items.map((item, idx) => {
//         const {id, name, count, total, image, price33, radioPrice, radioValue} = item
    
//         return (
//             <ShoppingCartTr key={id}>
//             <td>{idx + 1}</td>
//             <td className="img_shopping_cart">
//             <Img 
//             style={{maxWidth: 100, height: 100}}
//             fluid={image}> ₽</Img> 
//             </td>
//             <td>{name}</td>
//             <td>{count}</td>
//             <td>{total} ₽</td>
        
//             <td>
// -----------------------------------------------------------------------------------------------
//             { !!price33 &&
       
//             <div>
//             <span>Размер пиццы</span>
//             <RadioWrapper className='radio'>
//             <Radio type='radio'
//               className='radio_input'
//               id={id}
//               name={idx + 1}
//               onChange={onRadioChangedd}
//               value={radioPrice}
//             />
//               <label htmlFor="radio_1" 
//               className="radio_label" 
//               >Средняя</label>
//             </RadioWrapper>
//             <RadioWrapper className='radio'>
//             <Radio type='radio'
//               className='radio_input'
//               id={id}
//               name={idx + 1}
//               onChange={onRadioChangedd}
//               value={price33}
//             />
//               <label htmlFor="radio_2" 
//               className="radio_label" 
//               >Большая</label>
//             </RadioWrapper>
//              </div>
//           }
//           </td>
//             <td>
//             <button 
//             onClick={()=> onDelete(id, radioValue)}
//              className="btn btn-outline-danger">
//                 <i className="fa fa-trash-o"></i>
//             </button>
//             <button disabled={false}
//             onClick={()=> onIncrease(id, radioValue)}
//             className="btn btn-outline-success">
//                 <i className="fa fa-plus-circle"></i>
//             </button>
//             <button 
//             onClick={()=> onDecrise(id, radioValue)}
//             className="btn btn-outline-warning">
//                 <i className="fa fa-minus-circle"></i>
//             </button>
//         </td>
//         </ShoppingCartTr>
//                 )
//             })
//         }
//     </tbody>
//     </table>
//     { addPanelPribors &&
//       <div className="container_pribor">
//       <div className="d-flex flex-column align-items-center">
//       <b><p>Количество приборов</p></b>
//       <div className="d-flex">
//       <button 
//       onClick={()=> addedPribor(1)}
//       className="btn btn-outline-success">
//         <i className="fa fa-plus-circle"></i>
//       </button>
//       <b className="ml-3 mr-3">{palochkiTotal}</b>
//       <button 
//       onClick={()=> addedPribor(-1) }
//       className="btn btn-outline-warning">
//         <i className="fa fa-minus-circle"></i>
//       </button> 
//       </div> 
//       </div>
//       </div>
//     }
//     <div className="total mt-3">
//              <b> Итого к оплате: {total}</b>
//              </div>
//       <div className="total mt-3">
//             <Link state={{data: {items, addPanelPribors, palochkiTotal}}} to="/order" >Продолжить оформление заказа</Link> 
//              </div>
//     </section>
//     </>
    
//     )
// }


// export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable)




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
        //   }, (error) => {
        //     console.log(error);
        //   }); 
        
        // application/json;charset=utf-8
        // application/x-www-form-urlencoded
        // v: '5.103' // v: '5.62'
         // user_id: 526580165

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







