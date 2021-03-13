import React from "react"
import SEO from "../components/seo"
import { connect } from 'react-redux';
import {graphql, Link} from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import * as R from 'ramda'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import ButtonSize from "../components/common/ButtonSizePizza";
import { addedCart, removeCart,
  allRemoveCart, addPribor,
  saleRoll, salePizza,
  deletePizza, deleteRoll } from "../reducers/shopping-cart";
import { getProduct } from "../reducers/app";
import uniqid from 'uniqid'
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import EmptyBasket from "../components/EmptyBasket";
import Hidden from "@material-ui/core/Hidden";
import HeadSection from "../components/HeadSection"
import { makeStyles } from "@material-ui/core/styles"

const ShoppingCartTable = ({ data: {allContentfulProductPizza, allContentfulProductKlassika,
  allContentfulProductSlognyeRolly, allContentfulProductSushi, allContentfulProductHotRolly,
  allContentfulProductGunkan}, items = [], total = 0, palochkiTotal,
                             onIncrease, onDecrise, onDelete, addedPriborCount, addedSaleRoll,
  addedSalePizza, deletePizzaSale, deleteFilaSale, location }) => {

  const [value, setValue] = React.useState([]);
  const classes = useStyleBasket();

  const pizzaSaleFlag = R.contains(true, items.map((el) => el.pizzaSale));
  const disabled = () => R.contains(true, items.map((el) => el.priceSale === 0));

  const pizzaDarom = () => {
    const cart = items.filter((el) => {
      return el.priceIn33cm !== undefined
    });
    const countPizza = R.compose(
      R.sum,
      R.pluck('count')
    )(cart);

    const pizza = () => {
      const {node: pizzaSale} = allContentfulProductPizza.edges.find((el) => el.node.name === 'Ветчина-Грибы-Бекон' )
      return {
        id: uniqid(),
        name: pizzaSale.name,
        priceDef: 0,
        image: pizzaSale.image.gatsbyImageData,
        count: 1,
        pizzaCountSale: 1,
        total: 0
      }
    };
    if(countPizza > 2 && pizzaSaleFlag === false ) {
      return (
        <Grid item xs={12} sm={7} style={{padding: `10px 0 5px 0`}}>
          <div style={{display: `flex`, borderBottom: `1px solid lightgrey`, paddingBottom: 10}}>
              <div style={{margin: `auto 0`, zIndex: 10, maxWidth: 192}}>
                <GatsbyImage style={{maxWidth: 192, padding: 0, zIndex: 10}}
                             image={pizza().image} alt={pizza().name}/>
              </div>
              <div style={{padding: `8px 0 8px 14px`, width: `100%`}}>
                <Typography gutterBottom variant="h6" style={{fontSize: 14}}>
                  {pizza().name}
                </Typography>
                <div style={{display: `flex`, fontSize: 14, fontWeight: `bold`}}>
                  <Typography variant="subtitle2">
                    <b>{pizza().count}шт</b>
                  </Typography>
                  <Typography style={{marginLeft: 50}} variant="subtitle2"><b>{pizza().total}₽</b></Typography>
                </div>
                <Grid item>
                  <Typography variant="subtitle1" style={{fontSize: 14, fontWeight: `bold`}}>
                    Пицца бесплатно!
                  </Typography>
                  <Button variant={"contained"} color={"secondary"}
                          style={{cursor: 'pointer'}}
                          size={"small"}
                          disabled={false}
                          onClick={() => addedSalePizza(pizza())}>
                    Добавить
                  </Button>
                </Grid>
              </div>
            </div>
        </Grid>

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
      image: node.image.gatsbyImageData,
      count: 1
    }

    if(test() > 789 && !disabled()) {
      return (
        <Grid item xs={12} sm={7} style={{padding: `10px 0 5px 0`}}>
            <div style={{display: `flex`, borderBottom: `1px solid lightgrey`, paddingBottom: 10}}>
              <div style={{margin: `auto 0`, zIndex: 10, maxWidth: 192}}>
                <GatsbyImage style={{maxWidth: 192}} image={saleRoll.image} alt={saleRoll.name}/>
              </div>
              <div style={{padding: `8px 0 8px 14px`, width: `100%`}}>
                <Typography variant="subtitle1" style={{fontSize: 16}}>
                  Акция
                </Typography>
                <Typography variant="subtitle1">
                  {saleRoll.name} за 79₽
                </Typography>

                <Button variant={"contained"} color={"secondary"}
                        size={"small"}
                        disabled={false}
                        onClick={() => addedSaleRoll(saleRoll)}>
                  Добавить
                </Button>
              </div>
            </div>
        </Grid>

      )
    } else if (test() < 790 && disabled()) {
      deleteFilaSale(node.id)
    }
  };

  const handleChange = event => {
    setValue(() => {
      return R.update(event.target.id, [
        event.target.value
      ])(value)
    });
  };
  const addPanelPribors = R.contains(true, R.map(({priceIn33cm}) => priceIn33cm === undefined, items));
  return (
    <>
      <SEO title="Корзина"
           description="Корзина товаров"
           noindex={true}/>
      <section>
        <div className={classes.root}>
          <HeadSection titleTXT={"Корзина товаров"} />
            { R.isEmpty(items) ? <EmptyBasket/> :
              <Grid container spacing={2} style={{ width: `100%` }}>
                <Grid item sm={7}>
                  <Grid container spacing={2} className={classes.wrappedContainer}>

                    { items.map((item, idx) => {
                      const { id, name, count, total, image, priceIn33cm, price, priceDef,
                        textRollSale, textPizza, pizzaSale, description, edit = null, size,
                        wok = false, slug = null, descriptionWok, contentful_id = "sizeBig",
                        descriptionIngrideents = ""} = item
                    return (
                    <Grid item key={id} xs={12} sm={7} style={{padding: `10px 0 5px 0`}}>
                            <div style={{display: `flex`, borderBottom: `1px solid lightgrey`, paddingBottom: 10}}>
                              <div style={{margin: `auto 0`, zIndex: 10}}>
                                <GatsbyImage
                                  // style={{width: 70, height: 70, margin: `auto 0`, padding: 0, zIndex: 10}}
                                  image={image} alt={name} />
                              </div>
                              <div style={{width: `100%`}}>
                                <div style={{padding: `8px 0 8px 0`, width: `100%`}}>
                                  <Typography variant="subtitle1" style={{paddingLeft: 8}}>
                                    {name}
                                  </Typography>
                                  {/*button added count product*/}
                                  <div style={{display: `flex`, paddingLeft: 10}}>
                                    <Typography style={{fontSize: 14, fontWeight: 600, margin: `auto 0`}} variant="subtitle2">
                                      {priceDef === 0 ? "1шт" : `${count}шт`}
                                    </Typography>

                                    <div style={{display: `flex`, alignItems: `center`, margin: `auto`}}>
                                      {price !== 79 && priceDef !== 0 ?
                                        <>
                                          <IconButton aria-label="plus" component="span"
                                                      onClick={()=> onIncrease( {id, price, product: items} )}
                                                      // style={{padding: `7px`}}
                                          >
                                            <AddBoxOutlinedIcon />
                                          </IconButton>
                                          <IconButton aria-label="remove" component="span"
                                                      onClick={()=> onDecrise({ id, price, product: items})}>
                                            <IndeterminateCheckBoxOutlinedIcon/>
                                          </IconButton>
                                        </> : <Typography variant="subtitle2">{textPizza || textRollSale}</Typography> }

                                      { price > 78 &&
                                      <IconButton aria-label="remove" component="span"
                                                  // style={{padding: `7px`}}
                                                  onClick={price !== 79 ? ()=> onDelete( { id, price, product: items } )
                                                    : () => deleteFilaSale(id)}>
                                        <DeleteOutlineOutlinedIcon/>
                                      </IconButton>

                                      }
                                      { pizzaSale &&
                                      <IconButton aria-label="remove" component="span"
                                                  onClick={pizzaSaleFlag ? () => deletePizzaSale(id) : null }>
                                        <DeleteOutlineOutlinedIcon/>
                                      </IconButton>
                                      }
                                    </div>
                                    <Typography style={{fontSize: 14, fontWeight: 600, margin: `auto 20px auto 0`}}
                                                variant="subtitle2">{price === 79 ? null : `${total}₽`}</Typography>
                                  </div>
                                </div>

                                { !!priceIn33cm &&
                                <>
                                  <FormControl component="fieldset" style={{width: `95%`}}>
                                    <RadioGroup aria-label="position" name="position"
                                                value={value[idx]} onChange={handleChange} row style={{marginLeft: 8}}>
                                      <FormControlLabel
                                        value={name}
                                        control={<ButtonSize
                                          sizePizzaStyle={slug}
                                          title="Средняя"
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
                                  <Typography style={{fontSize: 12, marginLeft: 8}} variant={"subtitle2"}>Доп: {descriptionIngrideents}</Typography>
                                </>
                                }
                                {wok &&
                                <Typography style={{fontSize: 13}} variant={"subtitle2"}><b>Лапша:</b> {descriptionWok}</Typography>
                                }
                                {edit !== null &&
                                <Typography style={{fontSize: 13, padding: `0 10px`}} variant={"subtitle2"}><b>Состав:</b> {description}</Typography>
                                }

                              </div>
                            </div>
                        </Grid>
                      )})}
                    {saleRollFunc()}
                    {pizzaDarom()}

                    <Hidden smUp>
                      { addPanelPribors  &&
                      <Paper style={{marginTop: 0, marginBottom: 40, padding: 8, width: `100%`}}>
                        <div style={{display: `flex`, flexDirection: `column`}}>
                          <Typography variant={"subtitle2"}>Количество палочек</Typography>
                          <div style={{display: `flex`, alignItems: `center`}}>
                            <IconButton aria-label="plus" component="span"
                                        onClick={()=> addedPriborCount(1)}>
                              <AddBoxOutlinedIcon aria-label="plus" />
                            </IconButton>
                            <Typography variant={"h6"}>{palochkiTotal}</Typography>
                            <IconButton aria-label="remove" component="span"
                                        onClick={()=> addedPriborCount(-1)}>
                              <IndeterminateCheckBoxOutlinedIcon aria-label="remove" />
                            </IconButton>
                          </div>
                        </div>
                      </Paper>
                      }
                    </Hidden>
                  </Grid>

                </Grid>

                {/*phone next order*/}
                <Hidden smUp>
                  <div style={{margin: `20px auto 0 auto`,
                    position: `fixed`,
                    padding: `0 0 0 15px`,
                    bottom: 25,
                    width: `100%`,
                    zIndex: 1200
                  }}>

                    <Paper style={{padding: 5, opacity: `90%`}}>
                      <Typography variant="body1" style={{fontSize: 18}}>Сумма заказа <b>{total} ₽</b></Typography>
                    </Paper>
                      <Button
                        component={Link}
                        to={`${location.pathname}order`}
                        size={'small'}
                        color={"secondary"}
                        className={classes.buttonCheckout}
                        variant="contained" >
                        Перейти к оформлению
                      </Button>
                  </div>
                </Hidden>

                {/*PC block*/}
                <Hidden xsDown>
                  <Grid item xs={12} sm={4} style={{margin: `20px 0`, padding: 0}}>
                    <Paper elevation={3} style={{padding: 20, position: `sticky`, top: `170px`, width: `100%`}}>
                      { addPanelPribors  && <>
                        <Typography variant={"subtitle2"}>Количество <br></br> приборов(палочки)</Typography>
                        <div style={{display: `flex`}}>
                          <IconButton aria-label="plus" component="span"
                                      onClick={()=> addedPriborCount(1)}>
                            <AddBoxOutlinedIcon aria-label="plus" />
                          </IconButton>
                          <Typography variant={"h6"} style={{margin: `auto 8px`}}>{palochkiTotal}</Typography>
                          <IconButton aria-label="remove" component="span"
                                      onClick={()=> addedPriborCount(-1)}>
                            <IndeterminateCheckBoxOutlinedIcon aria-label="remove" />
                          </IconButton>
                        </div>
                      </>}

                      <Typography variant="h6" style={{fontSize: 24}}>Итого </Typography>
                      <Typography variant="body1" style={{fontSize: 24}}>Сумма заказа <b>{total} ₽</b></Typography>
                      <Button
                        component={Link}
                        to={`${location.pathname}order`}
                        color={"primary"}
                        size={'large'}
                        variant="contained" >
                        Продолжить
                      </Button>
                    </Paper>
                  </Grid>
                </Hidden>

              </Grid>
            }
          </div>
      </section>
    </>
  )
};

const mapStateToProps = (state) => ({
  items: state.shoppingCart.cartItems,
  palochkiTotal: state.shoppingCart.palochkiTotal,
  total: state.shoppingCart.orderTotal,
});

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

export const query = graphql `
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
                gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
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
            gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
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
             gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
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
             gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
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
               gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
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
               gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
            }
              }
            }
          }
        }
    `

const useStyleBasket  = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 10
  },
  wrappedContainer: {
    paddingLeft: 25,
    [theme.breakpoints.down('500')]: {
      paddingBottom: 50
    }
  },
    buttonCheckout: {
    position: "fixed",
    bottom: 44,
    backgroundColor: "#303032",
    color: "white",
    marginTop: 5,
    marginBottom: 15,
    width: '96%',
    opacity: `93%`
},
}));