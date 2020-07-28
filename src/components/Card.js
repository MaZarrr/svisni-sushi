import React from 'react';
import Img from 'gatsby-image';
import { Link } from "gatsby"
import {useStyleCardIndexPage} from "./common/style";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Hidden} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SwipeableViews from 'react-swipeable-views';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {isNil} from "ramda";
// import {addedCart} from "../reducers/shopping-cart";
// import {connect} from "react-redux";

const useStylesCard = makeStyles(theme => ({
    titleIndex: {
        fontSize: '36px',
        width: `100%`,
        padding: `20px 10px`,
        textAlign: `center`,
        [theme.breakpoints.down('600')]: {
            fontSize: '26px',
            padding: `10px 30px 10px 35px`,
        },
    },
    buttonCombo: {
        margin: theme.spacing(1),
        backgroundColor: `orange`,
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
    },
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white',
    }
}));
const styles = {
    root: {
        padding: '0 50px',
        maxWidth: `100%`
    },
    slideContainer: {
        padding: '0 20px',
    },
    img: {
        maxWidth: 350
    }
};

const CardIndex = ({addedCart, indexProduct, indexMenu}) => {
    const classes = useStyleCardIndexPage();
    const classesCard = useStylesCard();

    // const titleNewProduct = indexProduct[0].node.title;
    // const newProducts = indexProduct[0].node.new;
    // const productsCombo = indexProduct[1].node.combos;

    // console.log(productsCombo)
    // console.log(newProducts)

    return (
        <div className={`mt-1 ${classes.root}`}>
            <Typography className={classesCard.titleIndex} variant={"h2"}>Собери свой комбо из пиццы, суши и роллов</Typography>
            <Typography variant={'button'}>
                <Link to={"/kombo"}>Все комбо</Link>
            </Typography>

            {/*Карусель комбо телефон*/}
            <Hidden smUp>
                <SwipeableViews style={styles.root} slideStyle={styles.slideContainer}>
                    {  isNil(indexProduct[1].node.combos) ? '' : indexProduct[1].node.combos.map((homeProduct) => (
                        <Card key={homeProduct.id} className={classes.cardCombo}>
                            <CardMedia
                                title={homeProduct.name}>
                                <Img style={styles.img} fluid={homeProduct.image.fluid} alt={homeProduct.name} />
                            </CardMedia>
                            <CardContent>
                                <Typography style={{fontSize: 18}} variant={"h6"}>{homeProduct.name}</Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Button
                                    variant="contained"
                                    className={classesCard.buttonCombo}
                                    component={Link}
                                    to={`/kombo/${homeProduct.slug}`}>
                                    Выбрать
                                </Button>
                                <Typography style={{fontSize: 20}} className="ml-auto mr-1"
                                            variant={"body1"}>{homeProduct.price} ₽</Typography>
                            </CardActions>
                        </Card>
                    ))}
                </SwipeableViews>

                {/* Новинки */}
                <Typography className={classesCard.titleIndex} variant={"h2"}>{isNil(indexProduct[0].node.title) ? "" : indexProduct[0].node.title}</Typography>
                <SwipeableViews style={styles.root} slideStyle={styles.slideContainer}>
                    { isNil(indexProduct[0].node.new) ? '' :  indexProduct[0].node.new.map((homeProduct) => (

                        <Card key={homeProduct.id} className={classes.cardCombo}>
                            <CardMedia
                                title={homeProduct.name}>
                                <Img style={styles.img} fluid={homeProduct.image.fluid} alt={homeProduct.name} />
                            </CardMedia>
                            <CardContent>
                                <Typography style={{fontSize: 18}} variant={"h6"}>{homeProduct.name}</Typography>
                                <Typography style={{fontSize: 13, height: 60, overflowY: `auto`}}
                                            variant={"subtitle1"}>{homeProduct.description}</Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                { homeProduct.__typename === "ContentfulProduct" ||
                                homeProduct.__typename === "ContentfulProductPizza" ?
                                    <Button
                                        variant="contained"
                                        className={classesCard.buttonCombo}
                                        component={Link}
                                        style={{fontSize: 12}}
                                        to={homeProduct.slug === "enjoyment" ? `/sety/${homeProduct.slug}` : "/pizza"}>
                                        Посмотреть
                                    </Button> : <Button
                                        variant="contained"
                                        className={classesCard.button}
                                        onClick={() => addedCart({id: homeProduct.id,
                                            productPrice: null, product: indexProduct[0].node.new})}>
                                        <ShoppingCartIcon/>
                                    </Button>
                                }

                                <Typography style={{fontSize: 20}} className="ml-auto mr-1"
                                            variant={"body1"}>{homeProduct.price} ₽</Typography>
                            </CardActions>
                        </Card>
                    ))}
                </SwipeableViews>
            </Hidden>

            {/*Комбо компьютер*/}
            <Hidden xsDown>
                <Grid container style={{width: `85%`}}>
                    { isNil(indexProduct[1].node.combos) ? '' : indexProduct[1].node.combos.map((homeProduct) => (
                        <Grid key={homeProduct.id} item sm={6} md={4} style={{width: `300px`}}>
                            <Card className={classes.cardComboPc}>
                                <CardMedia
                                    className={classes.media}
                                    title={homeProduct.name}>
                                    <Img fluid={homeProduct.image.fluid} alt={homeProduct.name} />
                                </CardMedia>
                                <CardContent>
                                    <Typography style={{fontSize: 18}} variant={"h6"}>{homeProduct.name}</Typography>
                                    <Typography style={{fontSize: 14, height: 75, width: `100%`, overflowY: `auto`}}
                                                variant={"subtitle1"}>{homeProduct.description}</Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <Button
                                        variant="contained"
                                        className={classesCard.buttonCombo}
                                        component={Link}
                                        to={`/kombo/${homeProduct.slug}`}>
                                        Выбрать
                                    </Button>
                                    <Typography style={{fontSize: 22}} className="ml-auto mr-2" variant={"body1"}>{homeProduct.price} ₽</Typography>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}

                    {/* Новинки компьютер  */}
                    <Typography className={classesCard.titleIndex} variant={"h2"}>{isNil(indexProduct[0].node.title) ? "" : indexProduct[0].node.title}</Typography>
                    { isNil(indexProduct[0].node.new) ? '' :  indexProduct[0].node.new.map((homeProduct) => (
                        <Grid key={homeProduct.id} item sm={6} md={4} style={{width: `300px`}}>
                            <Card className={classes.cardComboPc}>
                                <CardMedia
                                    className={classes.media}
                                    title={homeProduct.name}>
                                    <Img fluid={homeProduct.image.fluid} alt={homeProduct.name} />
                                </CardMedia>
                                <CardContent>
                                    <Typography style={{fontSize: 18}} variant={"h6"}>{homeProduct.name}</Typography>
                                    <Typography style={{fontSize: 14, height: 75, width: `100%`, overflowY: `auto`}} variant={"subtitle1"}>{homeProduct.description}</Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    { homeProduct.__typename === "ContentfulProduct" ||
                                    homeProduct.__typename === "ContentfulProductPizza" ?
                                        <Button
                                            variant="contained"
                                            className={classesCard.buttonCombo}
                                            component={Link}
                                            to={homeProduct.slug === "enjoyment" ? `/sety/${homeProduct.slug}` : "/pizza"}>
                                            Посмотреть
                                        </Button> : <Button
                                            variant="contained"
                                            className={classesCard.button}
                                            onClick={() => addedCart({id: homeProduct.id,
                                                productPrice: null, product: indexProduct[0].node.new})}>
                                            <ShoppingCartIcon/>
                                        </Button>
                                    }

                                    <Typography style={{fontSize: 22}} className="ml-auto mr-2"
                                                variant={"body1"}>{homeProduct.price} ₽</Typography>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Hidden>

            {/*Меню выбор*/}
            <Grid container className="mt-4">
                <Typography className={`mb-2 ${classesCard.titleIndex}`}
                            variant={"h2"}>Заказывайте роллы, суши и пиццу с доставкой</Typography>
                {indexMenu.map(({node: homeMenu}) => (
                    <Grid item xs={6} sm={4} key={homeMenu.id} >
                        <div className="cart_item">
                            <Link to={`/${homeMenu.slug}`}>
                                <div className="cart_title">
                                    <h3><b>{homeMenu.category}</b></h3>
                                </div>
                                <Img fluid={homeMenu.image.fluid} className="cart_img" imgStyle={{maxWidth: 300}} />
                            </Link>
                        </div>
                    </Grid>
                ))}
            </Grid>

        </div>
    );

};

// const mapStateToProps = (state) => ({
//     indexProduct: state.app.indexProduct,
//     indexMenu: state.app.indexMenu
// });
//
// const mapDispatchToProps = {
//     addedCart,
// };

export default CardIndex
// export default connect(mapStateToProps, mapDispatchToProps)(CardIndex)