import React from "react"
import SEO from "../components/seo"
import { connect } from 'react-redux';
import {graphql, Link} from 'gatsby'
import  Img  from 'gatsby-image';
import Divider from "@material-ui/core/Divider";
import * as R from 'ramda'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {useStyleKorzina} from '../components/common/style'
import ButtonSize from "../components/common/ButtonSizePizza";
import {addedCart, removeCart, allRemoveCart, addPribor, saleRoll, salePizza, deletePizza, deleteRoll} from "../reducers/shopping-cart";
import {getProduct} from "../reducers/app";
import SplitButton from "../components/SplitButton";
import {Container} from "@material-ui/core";
import uniqid from 'uniqid'

const ShoppingCartTable = ({data: {allContentfulProductPizza, allContentfulProductKlassika,
    allContentfulProductSlognyeRolly, allContentfulProductSushi, allContentfulProductHotRolly,
    allContentfulProductGunkan},
    items = [],
    total = 0, palochkiTotal,
    onIncrease, onDecrise, onDelete, addedPriborCount,
    addedSaleRoll, addedSalePizza, deletePizzaSale, deleteFilaSale, path }) => {

    const [value, setValue] = React.useState([]);
    const pizzaSaleFlag = R.contains(true, items.map((el) => el.pizzaSale))
    const disabled = () => R.contains(true, items.map((el) => el.priceSale === 0))

    const pizzaDarom = () => {
        const cart = items.filter((el) => {
            return el.priceIn33cm !== undefined
      });
       const countPizza = R.compose(
          R.sum,
          R.pluck('count')
      )(cart);

      const pizza = () => {
          // const pizzaSale = items.find((el) => el.node.name === 'Салями' )
          const {node: pizzaSale} = allContentfulProductPizza.edges.find((el) => el.node.name === 'Салями' )
          return {
              id: uniqid(),
              name: pizzaSale.name,
              priceDef: 0,
              image: pizzaSale.image.fluid,
              count: 1,
              pizzaCountSale: 1,
              total: 0
          }
      };
        if(countPizza > 2 && pizzaSaleFlag === false ) {
            return (
                <Paper style={{maxWidth: 400}} className="mb-4 p-2">
                <Grid container  spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <div className="d-flex">
                            <div style={{margin: `auto 0`, zIndex: 10}}>
                                <Img style={{width: 90, height: 90, margin: `auto 0`, padding: 0, zIndex: 10}} fluid={pizza().image}> </Img>
                            </div>
                            <div className="ml-4">
                                <Typography gutterBottom variant="subtitle1">
                                    {pizza().name}
                                </Typography>
                                <div className="d-flex">
                                    <Typography variant="subtitle2">
                                        <b>{pizza().count}шт</b>
                                    </Typography>
                                    <Typography style={{marginLeft: 50}} variant="subtitle2"><b>{pizza().total}₽</b></Typography>
                                </div>
                                <Grid item>
                                    <Typography variant="body2">
                                        Пицца бесплатно!
                                    </Typography>
                                    <button style={{cursor: 'pointer'}}
                                            disabled={false}
                                            onClick={() => addedSalePizza(pizza())}
                                            className="btn btn-success btn-sm">
                                        Добавить
                                    </button>
                                </Grid>
                            </div>
                        </div>
                        <Divider/>
                    </Grid>
                </Grid>
                </Paper>
      )
    } else if(countPizza < 3 && pizzaSaleFlag === true) {
            deletePizzaSale(pizza().id)
    }
  }

    const test = () => {
        const cart = items.filter((el) => {
            return allContentfulProductHotRolly.edges.concat(allContentfulProductSlognyeRolly.edges, allContentfulProductKlassika.edges, allContentfulProductGunkan.edges, allContentfulProductSushi.edges).find((data) => data.node.id === el.id)
        })

        const res = cart.findIndex((data) => data.name === "Филадельфия one")
        if(res >= 0) {
            const price = R.remove(res, 1, cart)
            return R.compose(
                R.sum,
                R.pluck('total')
            )(price)
        }
        return R.compose(
            R.sum,
            R.pluck('total')
        )(cart)
  }

    const saleRollFunc = () => {
      const {node} = allContentfulProductSlognyeRolly.edges.find((el) => el.node.name === 'Филадельфия one' )
        const saleRoll = {
            id: uniqid(),
            name: node.name,
            price: 79,
            total: 79,
            image: node.image.fluid,
            count: 1
        }

        if(test() > 789 && !disabled()) {
            return (
                <Paper style={{maxWidth: 400}} className="mb-4 p-2">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <div className="d-flex">
                            <div style={{margin: `auto 0`, zIndex: 10}}>
                                <Img style={{width: 90, height: 90, margin: `auto 0`, padding: 0, zIndex: 10}} fluid={saleRoll.image}> </Img>
                            </div>
                            <div className="ml-4">
                                <Typography variant="subtitle1">
                                    Акция
                                </Typography>
                                <Typography variant="subtitle2">
                                    {saleRoll.name} за 79₽
                                </Typography>

                                <button style={{cursor: 'pointer'}} disabled={false}
                                        onClick={() => addedSaleRoll(saleRoll)}
                                        className="btn btn-success btn-sm">
                                    Добавить
                                </button>
                            </div>
                        </div>
                        <Divider/>
                    </Grid>
                </Grid>
                </Paper>
            )
        } else if (test() < 790 && disabled()) {
        deleteFilaSale(node.id)
    }
  };

    const classes = useStyleKorzina();

    const handleChange = event => {
    setValue(() => {
      return R.update(event.target.id, [
        event.target.value
      ])(value)
    });
  };

    const addPanelPribors = R.contains(true, R.map(({priceIn33cm}) => priceIn33cm === undefined, items))
return (
  <>
  <SEO title="Корзина" 
       description="Корзина товаров"
       noindex={true}/>
  <section>
  <div className={classes.root}>
    <Container>
        <Grid item xs={12}>
          <Container className={classes.paper}>
          <Typography variant="h2">
            <Box fontFamily="Oswald" fontWeight={900} fontSize={39}>
                Корзина
            </Box>
          </Typography>
              {/*<div className="mt-3">*/}
              {/*<TextField id="outlined-basic" label="Промокод" style={{maxWidth: 180}} size={"small"} variant="outlined" />*/}
              {/*<Button style={{backgroundColor: "orange", color: "white", maxWidth: 90, padding: 9, fontSize: 13}} variant={"contained"}>Применить</Button>*/}
              {/*</div>*/}
              <Divider className="mt-3"/>
          </Container>
           { R.isEmpty(items) ? <Box className={classes.emty} fontFamily="Comfortaa" fontWeight={700} fontSize={22}>
           Похоже, что в вашей корзине нет товаров, давайте добавим их :) </Box> : <div className={classes.paperDiv}>
       <Grid className="mb-3" justify={"center"} container spacing={2}>
           <div className="d-flex flex-column">
       { items.map((item, idx) => {
        const {id, name, count, total, image, priceIn33cm, price, priceDef,
            textRollSale, textPizza, pizzaSale, description, edit = null, size, wok = false, slug = null, descriptionWok, contentful_id = "sizeBig", ingrideents, sostav, descriptionIngrideents = ""} = item
           return (
               <Paper key={id} style={{maxWidth: 400}} className="mt-3 mb-4 p-2">
                   <Grid item xs={12} sm={7}>
                       <div className="d-flex">
                           <div style={{margin: `auto 0`, zIndex: 10}}>
                               <Img style={{width: 90, height: 90, margin: `auto 0`, padding: 0, zIndex: 10}} fluid={image}> </Img>
                               {/*<ButtonBase className={classes.image}>*/}
                               {/*</ButtonBase>*/}
                           </div>
                           <div className="ml-3">
                               <Typography gutterBottom style={{fontSize: 15}} variant="h6">
                                   {name}
                               </Typography>
                               <div className="d-flex">
                                   <Typography variant="subtitle2" color="textSecondary" >
                                       <b>{priceDef === 0 ? "1шт" : `${count}шт`}</b>
                                   </Typography>
                                   <Typography style={{marginLeft: 50, paddingBottom: 7}}
                                               variant="subtitle2"><b>{price === 79 ? null : `${total}₽`} </b></Typography>
                               </div>

                               {/*button added count product*/}
                               <div className="d-flex mb-2">
                                   {price !== 79 && priceDef !== 0 ?
                                       <>
                                           <button disabled={false}
                                                   onClick={()=> onIncrease( {id, price, product: items} )}
                                                   className="btn btn-outline-success btn-sm">
                                               <i className="fa fa-plus-circle fa-lg"></i>
                                           </button>
                                           <button onClick={()=> onDecrise({ id, price, product: items})}
                                                   className="btn btn-outline-warning btn-sm ml-2">
                                               <i className="fa fa-minus-circle fa-lg"></i>
                                           </button> </> : <Typography variant="subtitle2">{textPizza || textRollSale}</Typography> }

                                   { price > 78 &&
                                   <button
                                       onClick={price !== 79 ? ()=> onDelete( { id, price, product: items } ) : () => deleteFilaSale(id)}
                                       className="btn btn-outline-danger btn-sm ml-2">
                                       <i className="fa fa-trash-o fa-lg"></i>
                                   </button>
                                   }
                                   {pizzaSale &&
                                   <button
                                       onClick={pizzaSaleFlag ? () => deletePizzaSale(id) : null }
                                       className="btn btn-outline-danger btn-sm ml-2">
                                       <i className="fa fa-trash-o fa-lg"></i>
                                   </button>
                                   }
                               </div>
                               { !!priceIn33cm &&
                               <>
                                   <FormControl component="fieldset">
                                       <RadioGroup aria-label="position" name="position"
                                                   value={value[idx]} onChange={handleChange} row>
                                           <FormControlLabel
                                               value={name}
                                               control={<ButtonSize
                                                   sizePizzaStyle={slug}
                                                   title="Маленькая"
                                                   pizzaSize={size}
                                                   id={id}
                                                   edges={items}
                                                   pricePizza={priceDef}/>}
                                               labelPlacement="bottom"
                                               id={id}
                                               name={name}
                                               style={{margin: `0 6px 0 0`, padding: 0}}/>
                                           <FormControlLabel
                                               value={name + "a"}
                                               control={<ButtonSize
                                                   sizePizzaStyle={contentful_id}
                                                   title="Большая"
                                                   pizzaSize={size}
                                                   id={id}
                                                   edges={items}
                                                   pricePizza={priceIn33cm}/>}
                                               labelPlacement="bottom"
                                               id={id}
                                               name={name}
                                               style={{margin: `0 0 5px 0`, padding: 0}}/>
                                       </RadioGroup>
                                   </FormControl>
                                   <SplitButton id={id} pizzaIng={items} sostav={sostav} ingrideents={ingrideents} dir={"flex-start"} path={path} height={130}/>
                                   <Typography style={{fontSize: 13}} variant={"subtitle2"}><b>Доп:</b> {descriptionIngrideents}</Typography>
                               </>
                               }
                               {wok &&
                                <Typography style={{fontSize: 13}} variant={"subtitle2"}><b>Лапша:</b> {descriptionWok}</Typography>
                               }
                               {edit !== null &&
                               <Typography style={{fontSize: 13}} variant={"subtitle2"}><b>Состав:</b> {description}</Typography>
                               }

                           </div>
                       </div>

                   </Grid>
               </Paper>
                )})}
               {saleRollFunc()}
               {pizzaDarom()}
           </div>
           <Grid style={{margin: `20px auto 0 auto`, padding: 0}} item xs={12} sm={5}>
               <Paper elevation={3} style={{padding: 20, position: `sticky`, top: `170px`}}>
                   { addPanelPribors  &&
                   <div className="container_pribor mb-2" >
                       <div className="d-flex flex-column">
                           <Typography variant={"subtitle2"} style={{fontSize: `13px`}}>Количество <br></br> приборов(палочки)</Typography>
                           <div className="d-flex">
                               <button
                                   onClick={()=> addedPriborCount(1)}
                                   className="btn btn-outline-success btn-sm">
                                   <i className="fa fa-plus-circle fa-lg"></i>
                               </button>
                               <b className="ml-3 mr-3" style={{fontSize: 16}}>{palochkiTotal}</b>
                               <button
                                   onClick={()=> addedPriborCount(-1) }
                                   className="btn btn-outline-warning btn-sm">
                                   <i className="fa fa-minus-circle fa-lg"></i>
                               </button>
                           </div>
                       </div>
                   </div>
                   }
                   <Typography variant="h6" className={classes.typography}>Итого </Typography>
                   <Typography variant="body1" className={classes.typography}>Сумма заказа <b>{total} ₽</b></Typography>
                   <Button
                       component={Link}
                       to={`${path}order`}
                       color={'primary'}
                       size={'large'}
                       variant="contained" >
                       <b>Продолжить</b>
                   </Button>
               </Paper>
           </Grid>

       </Grid>
           </div>
    }
                </Grid>
            </Container>
        </div>
    </section>
  </>
    )
}

const mapStateToProps = (state) => ({
    items: state.shoppingCart.cartItems,
    palochkiTotal: state.shoppingCart.palochkiTotal,
    total: state.shoppingCart.orderTotal,
})

const mapDispatchToProps = {
        producSetsLoad: getProduct,
        onDecrise: removeCart,
        onIncrease: addedCart,
        onDelete: allRemoveCart,
        addedPriborCount: addPribor,
        addedSaleRoll: saleRoll,
        addedSalePizza: salePizza,
        deletePizzaSale: deletePizza,
        deleteFilaSale: deleteRoll
};
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable)

export const queryKorzina = graphql `
    {
          allContentfulProductPizza  {
          edges {
            node {
                id
                contentful_id
                name
                slug
                price
                priceIn33cm
                image {
                  fluid(maxWidth: 300) {
                    ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
    allContentfulProductKlassika {
      edges {
        node {
          id
          name
          price
          image {
            fluid(maxWidth: 300) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
      allContentfulProductSlognyeRolly {
        edges {
          node {
            id
            name
            price
            image {
              fluid(maxWidth: 300) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
           allContentfulProductSushi {
             edges {
               node {
                 id
                 name
                 price
                 image {
                   fluid(maxWidth: 300) {
                     ...GatsbyContentfulFluid
                   }
                 }
               }
             }
           }
               allContentfulProductHotRolly {
                 edges {
                   node {
                     id
                     name
                     price
                     image {
                       fluid(maxWidth: 300) {
                         ...GatsbyContentfulFluid
                       }
                     }
                   }
                 }
               }
              allContentfulProductGunkan {
                edges {
                  node {
                    id
                    name
                    price
                    image {
                      fluid(maxWidth: 300) {
                        ...GatsbyContentfulFluid
                      }
                    }
                  }
                }
              }
        }
    `

//    useEffect(() => {
//    // const data = allContentfulProduct.edges.concat(allContentfulProductPizza.edges, allContentfulHomePageCarts.edges,
//    //  allContentfulProductKlassika.edges, allContentfulProductSlognyeRolly.edges, allContentfulProductSushi.edges,
//    //  allContentfulProductHotRolly.edges, allContentfulProductSalat.edges, allContentfulProductNapitki.edges,
//    //  allContentfulProductGunkan.edges, allContentfulProductZakuski.edges, allContentfulProductSouse.edges, allContentfulProductKombo.edges)
//      producSetsLoad(data); // action push to reduxStore
//      setLoad(false)
//    }, [allContentfulProduct, allContentfulProductPizza, producSetsLoad, allContentfulHomePageCarts, allContentfulProductNapitki,
//   allContentfulProductHotRolly, allContentfulProductGunkan, allContentfulProductKlassika, allContentfulProductSalat,
//   allContentfulProductSlognyeRolly, allContentfulProductSouse, allContentfulProductSushi, allContentfulProductZakuski,
//   allContentfulProductKombo
// ])