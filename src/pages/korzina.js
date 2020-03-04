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
import Spinner from '../components/spinner/spinner'

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
    // margin: `0 auto`,
    textAlign: `start`,
    width: `300px`,
    // maxWidth: '90%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%'
    }
  },
  emty: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
  },
  typography: {
    fontSize: 18,
    padding: 5
  },
  bottomHead: {
  [theme.breakpoints.down('sm')]: {
    marginBottom: 60
  }
  }
}));

const ShoppingCartTable = ({data: {allContentfulProduct, allContentfulProductPizza, allContentfulHomePageCarts,
  allContentfulProductKlassika, allContentfulProductSlognyeRolly, allContentfulProductSushi, allContentfulProductHotRolly,
  allContentfulProductSalat, allContentfulProductNapitki, allContentfulProductGunkan, allContentfulProductZakuski,
  allContentfulProductSouse, allContentfulProductKombo},
    producSetsLoad, 
    items, 
    total,
    palochkiTotal, 
    onIncrease, 
    onDecrise, 
    onDelete, 
    onRazmer, 
    addedPribor,
    product
  }) => {


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

  const classes = useStyles();

  const handleChange = event => {
    setValue(() => {
      return R.update(event.target.id, [
        event.target.value
      ])(value)
    });
  };

   
  
const addPanelPribors = R.contains(true, R.map(({price33}) => price33 === undefined, items))
  
const onRadioChangedd = (id, price) =>  {
  onRazmer(id, price)
}

return (
  <>
  <SEO title="Корзина" />
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
            <Img style={{maxWidth: 128, margin: 0, padding: 0}} fluid={image}> </Img> 
         
            </ButtonBase>
            { !!price33 &&
              <FormControl component="fieldset" style={{marginTop: 20}}>
              {/* <FormLabel component="legend" style={{textAlign: 'center'}}>Размер</FormLabel> */}
              <RadioGroup aria-label="position" name="position" 
              value={value[idx]} onChange={handleChange} row>
              <FormControlLabel
                  value={name}
                  control={<Radio color="primary" name={idx + 1}  
                  onChange={() => onRadioChangedd(id, priceDef)}/>}
                  label="Маленькая"
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
                 {/* 76шт 1080кг */}
                </Typography>
                  <Typography variant="body2" color="textSecondary" style={{padding: `0 5px 7px 0`}}>
                  <b>{count} шт</b>
                </Typography>
                <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
       
                <button disabled={false}
                  onClick={()=> onIncrease(id, radioValue, product)}
                  className="btn btn-outline-success btn-sm">
                      <i className="fa fa-plus-circle fa-lg"></i>
                  </button>
                  <button 
                  onClick={()=> onDecrise(id, radioValue, product)}
                  className="btn btn-outline-warning btn-sm ml-2">
                      <i className="fa fa-minus-circle fa-lg"></i>
                  </button>
                  <button 
                  onClick={()=> onDelete(id, radioValue, product)}
                  className="btn btn-outline-danger btn-sm ml-2">
                      <i className="fa fa-trash-o fa-lg"></i>
                  </button>
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
    <Grid container className={classes.bottomHead}>
    <Grid item xs={12}>
     <Paper elevation={3} style={{padding: 20}}>
        { addPanelPribors &&
          <div className="container_pribor mb-2" >
            <div className="d-flex flex-column">
              <p style={{fontSize: `16px`}}>Количество <br></br> приборов(палочки)</p>
              <div className="d-flex">
              <button 
              onClick={()=> addedPribor(1)}
              className="btn btn-outline-success btn-sm">
                <i className="fa fa-plus-circle fa-lg"></i>
              </button>
              <b className="ml-3 mr-3" style={{fontSize: 18}}>{palochkiTotal}</b>
              <button 
              onClick={()=> addedPribor(-1) }
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
              name
              price
              image {
                  fluid(maxWidth: 128, maxHeight: 128) {
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
                  fluid(maxWidth: 128, maxHeight: 128) {
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
                  fluid(maxWidth: 128, maxHeight: 128) {
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
            fluid(maxWidth: 128, maxHeight: 128) {
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
              fluid(maxWidth: 128, maxHeight: 128) {
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
                   fluid(maxWidth: 128, maxHeight: 128) {
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
                       fluid(maxWidth: 128, maxHeight: 128) {
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
                         fluid(maxWidth: 128, maxHeight: 128) {
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
                        fluid(maxWidth: 128, maxHeight: 128) {
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
                      fluid(maxWidth: 128, maxHeight: 128) {
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
                      fluid(maxWidth: 128, maxHeight: 128) {
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
                    fluid(maxWidth: 128, maxHeight: 128) {
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
                 fluid(maxWidth: 128, maxHeight: 128) {
                   ...GatsbyContentfulFluid
                 }
               }
             }
           }
         }
        }
    `