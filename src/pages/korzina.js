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
import {addedCart, removeCart, allRemoveCart, pizzaSized, addPribor, saleRoll} from "../reducers/shopping-cart";
import {getProduct} from "../reducers/app";

const ShoppingCartTable = ({data: {allContentfulProduct, allContentfulProductPizza, allContentfulHomePageCarts,
  allContentfulProductKlassika, allContentfulProductSlognyeRolly, allContentfulProductSushi, allContentfulProductHotRolly,
  allContentfulProductSalat, allContentfulProductNapitki, allContentfulProductGunkan, allContentfulProductZakuski,
  allContentfulProductSouse, allContentfulProductKombo},
    producSetsLoad,
    items = [], product,
    total = 0, palochkiTotal,
    onIncrease, onDecrise, onDelete, addedPriborCount, onRazmer, addedSaleRoll }) => {

  // test()
  // console.log(saleRoll())
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

  console.log(items)
  const [value, setValue] = React.useState([]);
  const [load, setLoad] = React.useState(true)

  const test = () => {
    const cart = items.filter((data) => data.priceDef < 350)
    return R.compose(
        R.sum,
        R.pluck('total')
    )(cart)
  }

  const saleRoll = () => {
    if(test() > 750) {
      const {node} = allContentfulProductSlognyeRolly.edges.find((el) => el.node.name === 'Ногато' )
      return {
        id: node.id,
        name: node.name,
        priceDef: 79,
        image: node.image.fluid,
        count: 1,
        total: 0
      }
    }
  }

  const disabled = () => {
    return  R.contains(true, items.map((el) => el.count === 0))
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

return (
  <>
  <SEO title="Корзина" 
  description="Корзина товаров"
  />
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

        const {id, name, count, total, image, price33, radioValue, priceDef} = item // radioPrice
   
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
                  <b>{count} шт</b>
                </Typography>
                <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  {priceDef !== 79 ?
                      <>
                      <button disabled={false}
                              onClick={()=> onIncrease( {id, radioValue, product} )}
                              className="btn btn-outline-success btn-sm">
                        <i className="fa fa-plus-circle fa-lg"></i>
                      </button>
                      <button onClick={()=> onDecrise({ id, radioValue, product})}
                    className="btn btn-outline-warning btn-sm ml-2">
                    <i className="fa fa-minus-circle fa-lg"></i>
                    </button> </> : <p>Ваша филадельфия за 79р!</p>}

                      { disabled() && priceDef === 79 &&

                      <button
                          onClick={()=> onDelete( { id, radioValue, product } )}
                          className="btn btn-outline-danger btn-sm ml-2">
                          <i className="fa fa-trash-o fa-lg"></i>
                      </button>
                      }
                  <CssBaseline />
                </Typography>
              </Grid>
              </Grid>
            </Grid>

            <Grid item style={{margin: `0 5px 5px 0`}}>
             <Typography style={{ color: '#000', textAlign: 'center', padding: `10px 5px 0 0`, fontSize: 20}} 
              variant="subtitle1"><b>{total} ₽</b></Typography>
            </Grid>
          </Grid>
        </Grid>
       </Paper>
                )
            })
    : <Spinner />}
             { test() > 760 && !disabled() &&
               <Paper className={classes.paper}>
                 <Grid container spacing={3} className={classes.containerWrapped}>
                   <Grid item>
                     <ButtonBase className={classes.image}>
                       <Img style={{width: 128, height: 128, margin: 0, padding: 0}} fluid={saleRoll().image}> </Img>
                     </ButtonBase>
                   </Grid>
                   <Grid item xs={12} sm={6} container>
                     <Grid item xs={12} sm={9} container direction="column" spacing={2}>
                       <Grid item xs>
                         <Typography gutterBottom variant="subtitle1">
                           {saleRoll().name}
                         </Typography>

                         <Typography variant="body2" color="textSecondary" style={{padding: `0 5px 7px 0`}}>
                           <b>{saleRoll().count} шт</b>
                         </Typography>
                         <Grid item>
                           <Typography variant="body2" style={{cursor: 'pointer'}}>
                             <button disabled={false}
                                     onClick={() => addedSaleRoll(saleRoll())}
                                     className="btn btn-success btn-sm">
                               Филадельфия за 79р
                             </button>
                             <button
                                 onClick={() => onDelete({id: saleRoll().id, radioValue: saleRoll().priceDef, product})}
                                 className="btn btn-outline-danger btn-sm ml-2">
                               <i className="fa fa-trash-o fa-lg"></i>
                             </button>
                           </Typography>
                         </Grid>
                       </Grid>
                     </Grid>
                     <Grid item style={{margin: `0 5px 5px 0`}}>
                       <Typography style={{color: '#000', textAlign: 'center', padding: `10px 5px 0 0`, fontSize: 20}}
                                   variant="subtitle1"><b>{saleRoll().total} ₽</b></Typography>
                     </Grid>
                   </Grid>
                 </Grid>
               </Paper>
             }

    <Grid container className={classes.bottomHead}>
    <Grid item xs={12}>
     <Paper elevation={3} style={{padding: 20}}>
        { addPanelPribors &&
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
     <Button component={Link} state={{cart: addPanelPribors}} to="/order" className={classes.button} >
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
        addedSaleRoll: saleRoll
  };
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable)

export const querySets = graphql `
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