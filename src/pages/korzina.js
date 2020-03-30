import React, {useEffect} from "react"
import SEO from "../components/seo"
import { connect } from 'react-redux';
import {graphql, Link} from 'gatsby'
import  Img  from 'gatsby-image';

import * as R from 'ramda'

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import CssBaseline from '@material-ui/core/CssBaseline';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {useStyleKorzina} from '../components/common/style'

import Spinner from '../components/spinner/spinner'
import {addedCart, removeCart, allRemoveCart, pizzaSized, addPribor, saleRoll, salePizza, deletePizza, deleteRoll} from "../reducers/shopping-cart";
import {getProduct} from "../reducers/app";

const ShoppingCartTable = ({data: {allContentfulProduct, allContentfulProductPizza, allContentfulHomePageCarts,
  allContentfulProductKlassika, allContentfulProductSlognyeRolly, allContentfulProductSushi, allContentfulProductHotRolly,
  allContentfulProductSalat, allContentfulProductNapitki, allContentfulProductGunkan, allContentfulProductZakuski,
  allContentfulProductSouse, allContentfulProductKombo},
    producSetsLoad,
    items = [], product,
    total = 0, palochkiTotal,
    onIncrease, onDecrise, onDelete, addedPriborCount, onRazmer, addedSaleRoll, addedSalePizza, deletePizzaSale, deleteFilaSale }) => {

    const [value, setValue] = React.useState([]);
    const [load, setLoad] = React.useState(true)

    useEffect(() => {
    const data = allContentfulProduct.edges.concat(allContentfulProductPizza.edges, allContentfulHomePageCarts.edges,
     allContentfulProductKlassika.edges, allContentfulProductSlognyeRolly.edges, allContentfulProductSushi.edges,
     allContentfulProductHotRolly.edges, allContentfulProductSalat.edges, allContentfulProductNapitki.edges,
     allContentfulProductGunkan.edges, allContentfulProductZakuski.edges, allContentfulProductSouse.edges, allContentfulProductKombo.edges)
      producSetsLoad(data); // action push to reduxStore
      setLoad(false)
    }, [allContentfulProduct, allContentfulProductPizza, producSetsLoad, allContentfulHomePageCarts, allContentfulProductNapitki,
   allContentfulProductHotRolly, allContentfulProductGunkan, allContentfulProductKlassika, allContentfulProductSalat,
   allContentfulProductSlognyeRolly, allContentfulProductSouse, allContentfulProductSushi, allContentfulProductZakuski,
   allContentfulProductKombo
 ])
    const pizzaSaleFlag = R.contains(true, items.map((el) => el.pizzaSale))
    const disabled = () => {
        return R.contains(true, items.map((el) => el.priceSale === 0))
    }

    const pizzaDarom = () => {
      const cart = items.filter((el) => {
          return allContentfulProductPizza.edges.find((data) => data.node.id === el.id)
      })
       const countPizza = R.compose(
          R.sum,
          R.pluck('count')
      )(cart)

      const pizza = () => {
          const {node: pizzaSale} = allContentfulProductPizza.edges.find((el) => el.node.name === 'Салями' )
          return {
              id: pizzaSale.id,
              name: pizzaSale.name,
              priceDef: 0,
              image: pizzaSale.image.fluid,
              count: 1,
              pizzaCountSale: 1,
              total: 0
          }
      }
        if(countPizza > 2 && pizzaSaleFlag === false ) {
            return (
                <Paper className={classes.paper}>
                    <Grid container spacing={3} className={classes.containerWrapped}>
                    <ButtonBase className={classes.image}>
                        <Img style={{width: 128, height: 128, margin: 0, padding: 0}} fluid={pizza().image}> </Img>
                    </ButtonBase>
              <Grid item xs={12} sm={6} container>
                <Grid item xs={12} sm={9} container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {pizza().name}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" style={{padding: `0 5px 7px 0`}}>
                      <b>{pizza().count} шт</b>
                    </Typography>
                    <Grid item>
                      <Typography variant="body2" style={{cursor: 'pointer'}}>
                        <button disabled={false}
                                onClick={() => addedSalePizza(pizza())}
                                className="btn btn-success btn-sm">
                          Пицца бесплатно!
                        </button>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{margin: `0 5px 5px 0`}}>
                  <Typography style={{color: '#000', textAlign: 'center', padding: `10px 5px 0 0`, fontSize: 20}}
                              variant="subtitle1"><b>{pizza().total} ₽</b></Typography>
                        </Grid>
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
            return allContentfulProductHotRolly.edges.concat(allContentfulProductSlognyeRolly.edges, allContentfulProductKlassika.edges).find((data) => data.node.id === el.id)
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
            id: node.id,
            name: node.name,
            radioValue: 79,
            total: 79,
            image: node.image.fluid,
            count: 1
        }

        if(test() > 789 && !disabled()) {
            return (
                <Paper className={classes.paper}>
                    <Grid container spacing={3} className={classes.containerWrapped}>
                    <ButtonBase className={classes.image}>
                        <Img style={{width: 128, height: 128, margin: 0, padding: 0}} fluid={saleRoll.image}> </Img>
                    </ButtonBase>
                    <Grid item xs={12} sm={6} container>
                        <Grid item xs={12} sm={9} container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {saleRoll.name}
                                </Typography>

                                <Typography variant="body2" color="textSecondary" style={{padding: `0 5px 7px 0`}}>
                                    <b>{saleRoll.count} шт</b>
                                </Typography>
                                <Grid item>
                                    <Typography variant="body2" style={{cursor: 'pointer'}}>
                                        <button disabled={false}
                                                onClick={() => addedSaleRoll(saleRoll)}
                                                className="btn btn-success btn-sm">
                                            Филадельфия за 79!
                                        </button>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                </Paper>
            )
        } else if (test() < 790 && disabled()) {
        deleteFilaSale(node.id)
    }
  }

    const classes = useStyleKorzina();

    const handleChange = event => {
    setValue(() => {
      return R.update(event.target.id, [
        event.target.value
      ])(value)
    });
  };

    const addPanelPribors = R.contains(true, R.map(({price33}) => price33 === undefined, items))

    const onRadioChangedd = (id, price, product) =>  {
  onRazmer({id, price, product})
}
//
return (
  <>
  <SEO title="Корзина" 
  description="Корзина товаров"/>
  <section>
  <div className={classes.root}>
    <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <Typography variant="h2">
            <Box fontFamily="Oswald" fontWeight={900} fontSize={46}>
                Корзина
            </Box>
          </Typography>
          </Paper>
           { R.isEmpty(items) ? <Box className={classes.emty} fontFamily="Comfortaa" fontWeight={700} fontSize={22}>
           Похоже, что в вашей корзине нет товаров, давайте добавим их :) </Box> : <div className={classes.paperDiv}>
          <Typography variant="h6"><b>Товар</b></Typography>
          { !load ? items.map((item, idx) => {

        const {id, name, count, total, image, price33, radioValue, priceDef, textRollSale, textPizza} = item // radioPrice

        return (
          <Paper key={id} className={classes.paper}>
          <Grid container spacing={3} className={classes.containerWrapped}>
          <Grid item >
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
                  control={<Radio color="primary" name={String(idx + 1)}
                  onChange={() => onRadioChangedd(id, priceDef, allContentfulProductPizza.edges)}/>}
                  label="Маленькая"
                  labelPlacement="bottom"
                  id={id}
                  name={name}
                  style={{margin: 5, padding: 0}}
                />
                <FormControlLabel
                  value={name + "a"}
                  control={<Radio color="primary"
                  name={String(idx + 1)}
                  onChange={() => onRadioChangedd(id, price33, allContentfulProductPizza.edges)}/>}
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
                 {/* 76шт 1080кг */}
                </Typography>
                  <Typography variant="body2" color="textSecondary" style={{padding: `0 5px 7px 0`}}>
                  <b>{priceDef === 0 ? "1 шт" : `${count} шт`}</b>
                </Typography>
                <Grid container justify="flex-start">
                  {radioValue !== 79 && priceDef !== 0 ?
                      <>
                      <button disabled={false}
                              onClick={()=> onIncrease( {id, radioValue, product} )} // priceDef
                              className="btn btn-outline-success btn-sm">
                        <i className="fa fa-plus-circle fa-lg"></i>
                      </button>
                      <button onClick={()=> onDecrise({ id, radioValue, product})}
                    className="btn btn-outline-warning btn-sm ml-2">
                    <i className="fa fa-minus-circle fa-lg"></i>
                      </button> </> : <Typography variant="subtitle2">{textPizza || textRollSale}</Typography> }

                      { disabled() && priceDef === 79 &&
                      <button
                          onClick={()=> onDelete( { id, radioValue, product } )}
                          className="btn btn-outline-danger btn-sm ml-2">
                          <i className="fa fa-trash-o fa-lg"></i>
                      </button>
                      }
                  <CssBaseline />
              </Grid>
              </Grid>
            </Grid>

            <Grid item style={{margin: `0 5px 5px 0`}}>
             <Typography style={{ color: '#000', textAlign: 'center', padding: `10px 5px 0 0`, fontSize: 20}} 
              variant="subtitle1"><b>{radioValue === 79 ? null : `${total} ₽`} </b></Typography>
            </Grid>
          </Grid>
        </Grid>
       </Paper>
                )
            })
    : <Spinner />}

    {saleRollFunc()}
    {pizzaDarom()}

    <Grid container className={classes.bottomHead}>
    <Grid item xs={12}>
     <Paper elevation={3} style={{padding: 20}}>
        { addPanelPribors && !pizzaSaleFlag &&
          <div className="container_pribor mb-2" >
            <div className="d-flex flex-column">
              <p style={{fontSize: `16px`}}>Количество <br></br> приборов(палочки)</p>
              <div className="d-flex">
              <button 
              onClick={()=> addedPriborCount(1)}
              className="btn btn-outline-success btn-sm">
                <i className="fa fa-plus-circle fa-lg"></i>
              </button>
              <b className="ml-3 mr-3" style={{fontSize: 18}}>{palochkiTotal}</b>
              <button 
              onClick={()=> addedPriborCount(-1) }
              className="btn btn-outline-warning btn-sm">
                <i className="fa fa-minus-circle fa-lg"></i>
              </button> 
            </div> 
            </div>
          </div>
    }
     <Typography variant="subtitle2" className={classes.typography}>Товары: {total} ₽ </Typography>
     <Typography variant="subtitle2" className={classes.typography}><b>Итого {total} ₽</b></Typography>
     <Button component={Link} to="/order" className={classes.button} >
      <b>Оформить заказ</b>
      </Button>
     </Paper>
    </Grid>
    </Grid>
    </div>         
    }
  </Grid>
  </Grid>
  </div>
  </section>
  </>
    )
}

const mapStateToProps = (state) => ({
  items: state.shoppingCart.cartItems,
  product: state.app.product,
  palochkiTotal: state.shoppingCart.palochkiTotal,
  total: state.shoppingCart.orderTotal
})

const mapDispatchToProps = {
        producSetsLoad: getProduct,
        onDecrise: removeCart,
        onIncrease: addedCart,
        onDelete: allRemoveCart,
        onRazmer: pizzaSized,
        addedPriborCount: addPribor,
        addedSaleRoll: saleRoll,
        addedSalePizza: salePizza,
        deletePizzaSale: deletePizza,
        deleteFilaSale: deleteRoll
};
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable)

export const queryKorzina = graphql `
    {
        allContentfulProduct {
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
          allContentfulProductPizza  {
          edges {
            node {
                id
              name
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
          allContentfulHomePageCarts {
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
                 allContentfulProductSalat {
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
                allContentfulProductNapitki {
                  edges {
                    node {
                      id
                      price
                      name
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
              allContentfulProductZakuski {
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
            allContentfulProductSouse {
              edges {
                node {
                  id
                  price
                  name
                  image {
                    fluid(maxWidth: 300) {
                      ...GatsbyContentfulFluid
                    }
                  }
                }
              }
            }
         allContentfulProductKombo {
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