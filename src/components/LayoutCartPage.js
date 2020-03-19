import React, {useEffect} from "react"
import { Link } from "gatsby";
import Img from 'gatsby-image';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Spinner from '../components/spinner/spinner'
import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Grid } from "@material-ui/core";
import { useStylesCart } from '../components/common/style';
import CustomizedInputSearch from '../components/CustomizedInputSearch'
import filtersProducts from '../utils/filtersProducts'

const Sety = ({
                  data: {
                      allContentfulProduct: {
                          edges: setyProduct
                      },
                      contentfulIconMenuLeftPanel: {
                          image
                      }
                  },
                  producSetsLoad,
                  setAddedToCart,
                  product, searchText, priceFilter, checkboxFilter, location
              }) => {

    // const [ listJsx, updateLustJsx ] = React.useState('')
    const [load, setLoad] = React.useState(true)

    useEffect(() => {
        producSetsLoad(setyProduct)
        setLoad(false)
    }, [setyProduct, producSetsLoad])

    const classes = useStylesCart();

    const visibleItems = filtersProducts(product, searchText, priceFilter, checkboxFilter)

    if(load) {
        return <div style={{display: `flex`,
            justifyContent: `center`,
            alignItems: `center`}}>
            <Spinner /></div>
    }

    return (
            <section>

                <div className={classes.titleH1}>
                    <h1 style={{fontFamily: `Oswald, cursive`,
                        fontWeight: 600, }}>Сеты</h1>
                </div>
                <CustomizedInputSearch location={location.pathname}/>
                <Grid container justify="center" >
                    { visibleItems.map(({node: productSets}) => {

                        const {id, name, slug, description, price, weight, count, image: {fluid} } = productSets

                        return (
                            <Grid item xs={12} sm={6} md={3} key={id}>
                                <Card className={classes.card}>
                                    <CardHeader
                                        classes={{title: classes.title}}
                                        avatar={
                                            <Avatar className={classes.avatar}>
                                                <Img style={{width: 50}} fluid={image.fluid} />
                                            </Avatar>
                                        }
                                        title="Сет"
                                        subheader={name}
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        title={name}
                                    >
                                        <Img fluid={fluid} />
                                    </CardMedia>

                                    <CardContent>
                                        <Typography className={classes.deckript} variant="caption" color="textSecondary" component="p">
                                            {description}
                                        </Typography>
                                        <Typography component="div" variant="overline" classes={{overline: classes.overline}}>
                                            <b><p>{weight}кг</p></b>
                                            <b><p>{count}шт</p></b>
                                        </Typography>
                                        <p>{`${price}₽`}</p>
                                    </CardContent>

                                    <CardActions disableSpacing>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<ShoppingBasketIcon />}
                                            onClick={()=> setAddedToCart(id, null, product)}
                                        >
                                            Хочу
                                        </Button>
                                        <Button
                                            component={Link}
                                            to={`/sety/${slug}`}
                                            variant="contained"
                                            color="secondary"
                                            className={classes.buttonInfo}
                                        >
                                            Подробнее
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )})}
                </Grid>
            </section>
        </>
    )
}



