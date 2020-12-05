import React from "react"
import SEO from "../components/seo"
import { connect } from 'react-redux';
import {graphql, Link} from 'gatsby'
import  Img  from 'gatsby-image';
import Spinner from '../components/spinner/spinner-new'
import * as R from 'ramda'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {useStyleKorzina} from '../components/common/style'
import ButtonSize from "../components/common/ButtonSizePizza";
import {addedCart, removeCart,
    allRemoveCart, addPribor,
    saleRoll, salePizza,
    deletePizza, deleteRoll} from "../reducers/shopping-cart";
import {getProduct} from "../reducers/app";
import SplitButton from "../components/SplitButton";
import uniqid from 'uniqid'
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EmptyBasket from "../components/EmptyBasket";
import Hidden from "@material-ui/core/Hidden";
import HeadSection from "../components/HeadSection"

const ShoppingCartTable = ({data: {allContentfulProductPizza, allContentfulProductKlassika,
    allContentfulProductSlognyeRolly, allContentfulProductSushi, allContentfulProductHotRolly,
    allContentfulProductGunkan},
    items = [],
    total = 0, palochkiTotal,
    onIncrease, onDecrise, onDelete, addedPriborCount,
    addedSaleRoll, addedSalePizza, deletePizzaSale, deleteFilaSale }) => {

    const [load, setLoad] = React.useState(true);
    const [value, setValue] = React.useState([]);
    const classes = useStyleKorzina();

    React.useEffect(() => {
        setTimeout(() => {
            setLoad(false)
        }, 600);

      if(typeof window !== undefined && localStorage.getItem('checkPushOrder') === 'true') {
          typeof window !== undefined && localStorage.removeItem('checkPushOrder');
      }
    }, []);

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
              image: pizzaSale.image.fluid,
              count: 1,
              pizzaCountSale: 1,
              total: 0
          }
      };
        if(countPizza > 2 && pizzaSaleFlag === false ) {
            return (
                <Grid item  xs={12} sm={7}>

                <Paper style={{marginTop: 10, marginBottom: 10, padding: 8}}>
                        <div style={{display: `flex`}}>
                            <div style={{margin: `auto 0`, zIndex: 10}}>
                                <Img style={{width: 90, height: 90, margin: `auto 0`, padding: 0, zIndex: 10}} fluid={pizza().image}> </Img>
                            </div>
                            <div style={{padding: `8px 0 8px 14px`, width: `100%`}}>
                                <Typography gutterBottom variant="h6" style={{fontSize: 15}}>
                                    {pizza().name}
                                </Typography>
                                <div style={{display: `flex`, fontSize: 18, fontWeight: `bold`}}>
                                    <Typography variant="subtitle2">
                                        <b>{pizza().count}шт</b>
                                    </Typography>
                                    <Typography style={{marginLeft: 50}} variant="subtitle2"><b>{pizza().total}₽</b></Typography>
                                </div>
                                <Grid item>
                                    <Typography variant="subtitle1" style={{fontSize: 20, fontWeight: `bold`}}>
                                        Пицца бесплатно!
                                    </Typography>
                                    <Button variant={"contained"} color={"secondary"}
                                            style={{cursor: 'pointer'}}
                                            disabled={false}
                                            onClick={() => addedSalePizza(pizza())}>
                                        Добавить
                                    </Button>
                                </Grid>
                            </div>
                        </div>
                    </Paper>
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
            image: node.image.fluid,
            count: 1
        }

        if(test() > 789 && !disabled()) {
            return (
                <Grid item  xs={12} sm={7}>

                    <Paper style={{marginTop: 10, marginBottom: 10, padding: 8}}>
                        <div style={{display: `flex`}}>
                            <div style={{margin: `auto 0`, zIndex: 10}}>
                                <Img style={{width: 90, height: 90, margin: `auto 0`, padding: 0, zIndex: 10}} fluid={saleRoll.image}> </Img>
                            </div>
                            <div style={{padding: `8px 0 8px 14px`, width: `100%`}}>
                                <Typography variant="subtitle1" style={{fontSize: 20, fontWeight: `bold`}}>
                                    Акция
                                </Typography>
                                <Typography variant="subtitle1" style={{fontSize: 18, fontWeight: `bold`}}>
                                    {saleRoll.name} за 79₽
                                </Typography>

                                <Button variant={"contained"} color={"secondary"}
                                        disabled={false}
                                        onClick={() => addedSaleRoll(saleRoll)}>
                                    Добавить
                                </Button>
                        </div>
                        </div>
                    </Paper>
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
                {R.isEmpty(items) ? <div>Корзина пустая<span role="img" aria-label="accessible-emoji">😕</span></div> :
                  <HeadSection titleTXT={"Корзина товаров"} /> }
            { load === false ? <div>
            { R.isEmpty(items) ? <EmptyBasket/> :
                <Grid container spacing={2} style={{width: `100%`}}>
                    <Grid item sm={7}>
                    <Grid container spacing={2} className={classes.wrappedContainer}>

                    { items.map((item, idx) => {
                        const {id, name, count, total, image, priceIn33cm, price, priceDef,
                        textRollSale, textPizza, pizzaSale, description, edit = null, size, wok = false, slug = null, descriptionWok, contentful_id = "sizeBig", ingrideents, sostav, descriptionIngrideents = ""} = item

                      return (
                      <Grid item key={id} xs={12} sm={7} style={{paddingLeft: 0}}>
                       <Paper style={{marginTop: 20, marginBottom: 10}}>
                       <div style={{display: `flex`}}>
                           <div style={{margin: `auto 0`, zIndex: 10}}>
                               <Img style={{width: 90, height: 90, margin: `auto 0`, padding: 0, zIndex: 10}} fluid={image}> </Img>
                           </div>
                           <div style={{marginLeft: 30, width: `100%`}}>
                               <div style={{backgroundColor: `lightgrey`, padding: `8px 0 8px 14px`, width: `100%`}}>
                               <Typography variant="subtitle1" style={{fontSize: 20, fontWeight: `bold`}}>
                                   {name}
                               </Typography>
                               <div style={{display: `flex`}}>
                                   <Typography style={{paddingBottom: 7, fontSize: 18, fontWeight: `bold`}} variant="subtitle2">
                                       <b>{priceDef === 0 ? "1шт" : `${count}шт`}</b>
                                   </Typography>
                                   <Typography style={{marginLeft: 50, paddingBottom: 7, fontSize: 18, fontWeight: `bold`}}
                                               variant="subtitle2"><b>{price === 79 ? null : `${total}₽`} </b></Typography>
                               </div>
                               </div>
                               {/*button added count product*/}
                               <div style={{display: `flex`, marginBottom: 20}}>
                                   {price !== 79 && priceDef !== 0 ?
                                       <>
                                           <IconButton color="primary" aria-label="plus" component="span"
                                                       onClick={()=> onIncrease( {id, price, product: items} )}>
                                              <AddCircleOutlineIcon />
                                           </IconButton>
                                           <IconButton color="primary" aria-label="remove" component="span"
                                               onClick={()=> onDecrise({ id, price, product: items})}>
                                               <RemoveCircleOutlineOutlinedIcon/>
                                           </IconButton>
                                       </> : <Typography variant="subtitle2">{textPizza || textRollSale}</Typography> }

                                   { price > 78 &&

                                   <IconButton color="primary" aria-label="remove" component="span"
                                               onClick={price !== 79 ? ()=> onDelete( { id, price, product: items } ) : () => deleteFilaSale(id)}>
                                       <DeleteOutlineOutlinedIcon/>
                                       </IconButton>

                                   }
                                   {pizzaSale &&
                                   <IconButton color="primary" aria-label="remove" component="span"
                                               onClick={pizzaSaleFlag ? () => deletePizzaSale(id) : null }>
                                       <DeleteOutlineOutlinedIcon/>
                                   </IconButton>

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
                                   <SplitButton id={id} pizzaIng={items} sostav={sostav} ingrideents={ingrideents} dir={"flex-start"} path={"/korzina/"} height={130}/>
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
                       </Paper>
                   </Grid>
                )})}

                        {saleRollFunc()}
                        {pizzaDarom()}
                        <Hidden smUp>
                            { addPanelPribors  &&
                            <Paper style={{marginTop: 10, padding: 10, width: `100%`}}>
                                <div style={{display: `flex`, flexDirection: `column`}}>
                                    <Typography variant={"subtitle2"}>Количество палочек</Typography>
                                    <div style={{display: `flex`}}>
                                        <IconButton color="primary" aria-label="plus" component="span"
                                                    onClick={()=> addedPriborCount(1)}>
                                            <AddCircleOutlineIcon aria-label="plus" />
                                        </IconButton>
                                        <Typography variant={"h6"} style={{margin: `auto 8px`}}>{palochkiTotal}</Typography>
                                        <IconButton color="primary" aria-label="remove" component="span"
                                                    onClick={()=> addedPriborCount(-1)}>
                                            <RemoveCircleOutlineOutlinedIcon aria-label="remove" />
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
                    <Grid style={{margin: `20px auto 0 auto`,
                        position: `fixed`,
                        padding: `0 0 0 15px`,
                        bottom: 0,
                        width: `100%`,
                        zIndex: 1200
                        }} item xs={12} sm={5}>

                        <Paper elevation={3} style={{padding: 10}}>
                        <Typography variant="body1" style={{fontSize: 20}}>Сумма заказа <b>{total} ₽</b></Typography>
                    <Button
                       component={Link}
                       to="/korzina/order"
                       color={"primary"}
                       size={'large'}
                       style={{fontWeigh: `bold`, fontSize: 18, marginBottom: 5}}
                       variant="contained" >
                       Продолжить
                   </Button>
               </Paper>
                    </Grid>
                </Hidden>

                    {/*PC block*/}
                    <Hidden xsDown>
                    <Grid item xs={12} sm={4} style={{margin: `20px 0`, padding: 0}}>
                    <Paper elevation={3} style={{padding: 20, position: `sticky`, top: `170px`, width: `100%`}}>
                        { addPanelPribors  &&
                        <div className="container_pribor mb-2" >
                            <div className="d-flex flex-column">
                                <Typography variant={"subtitle2"}>Количество <br></br> приборов(палочки)</Typography>
                                <div style={{display: `flex`}}>
                                    <IconButton color="primary" aria-label="plus" component="span"
                                                onClick={()=> addedPriborCount(1)}>
                                        <AddCircleOutlineIcon aria-label="plus" />
                                    </IconButton>
                                    <Typography variant={"h6"} style={{margin: `auto 8px`}}>{palochkiTotal}</Typography>
                                    <IconButton color="primary" aria-label="remove" component="span"
                                                onClick={()=> addedPriborCount(-1)}>
                                        <RemoveCircleOutlineOutlinedIcon aria-label="remove" />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                        }

                        <Typography variant="h6" style={{fontSize: 24}}>Итого </Typography>
                        <Typography variant="body1" style={{fontSize: 24}}>Сумма заказа <b>{total} ₽</b></Typography>
                        <Button
                            component={Link}
                            to="/korzina/order"
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
        </div> : <Spinner/>}
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
