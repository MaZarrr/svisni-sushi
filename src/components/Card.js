import React, { memo, useState } from 'react';
import Img from 'gatsby-image';
import { Link } from "gatsby"
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableViews from 'react-swipeable-views';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { isNil } from "ramda";
import IconButton from "@material-ui/core/IconButton"

const styles = {
    root: {
        padding: '0 30px 0 0',
        maxWidth: `100%`,
    },
    rootNewProd: {
        padding: '0 30px 0 0',
        maxWidth: `100%`,
    },
    slideContainer: {
        padding: '10px 0',
    },
    img: {
        maxWidth: 350
    }
};

const CardIndex = memo(({ addedCart, indexProduct, indexMenu }) => {
    const classesCard = useStylesCard();
    const [menu,] = useState(indexMenu)
    const [product,] = useState(indexProduct)
    // const prod = isNil(indexProduct) || isEmpty(indexProduct);

    return (
      <>
        <div className={classesCard.root}>
            <Hidden smUp>
            {/*Меню выбор*/}
            <Grid container style={{marginBottom: 20, marginTop: 20}}>
                <Typography className={classesCard.titleIndex}
                            variant={"h2"}>Заказывайте роллы суши и пиццу</Typography>
                { menu.map(({node: homeMenu}) => (
                    <Grid item xs={6} sm={4}
                          style={{ position: `relative` }}
                          key={homeMenu.id} >
                        <IconButton style={{padding: `20px 0`}}>
                            <Link style={{textDecoration: `none`, color: 'grey', width: `43vmin`, height: `200px`}} to={`/${homeMenu.slug}/`}>
                            <div className={classesCard.cartTitle}>
                                <Typography className={classesCard.menuTitle} variant={"h2"}>{homeMenu.category}</Typography>
                            </div>
                            <div style={{margin: `0 auto`}}>
                                <Img fluid={homeMenu.image.fluid} style={{width: `43vmin`, borderRadius: 5,
                                            height: `200px`}} alt={homeMenu.category}/>
                            </div>
                            </Link>
                        </IconButton>
                    </Grid>
                ))}
            </Grid>
            </Hidden>
        </div>

        <Typography className={classesCard.titleIndex} variant={"h2"}>Собери свой комбо из пиццы, суши и роллов</Typography>
        <Typography variant={'button'}>
            <Link to={"/kombo"}>Все комбо</Link>
        </Typography>

        {/*Карусель комбо телефон*/}
        <Hidden smUp>
            <SwipeableViews style={styles.root} slideStyle={styles.slideContainer}>
                {  isNil(product[1].node.combos) ? '' : product[1].node.combos.map((homeProduct) => (
                    <Card key={homeProduct.id} className={classesCard.cardCombo}>
                        <CardMedia
                            title={homeProduct.name}>
                            <Img style={styles.img} fluid={homeProduct.image.fluid} alt={homeProduct.name} />
                        </CardMedia>
                        <CardContent>

                            <Typography style={{fontSize: 18, fontWeight: 600}} variant={"h6"}>{homeProduct.name}</Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                                <Button
                                    variant="contained"
                                    className={classesCard.buttonCombo}
                                    component={Link}
                                    size={"small"}
                                    to={`/kombo/${homeProduct.slug}`}>
                                    Выбрать
                                </Button>
                                <Typography style={{fontSize: 18, marginLeft: `auto`, marginRight: 10, fontWeight: 800}}
                                            variant={"body1"}>{homeProduct.price} ₽</Typography>
                            </CardActions>
                        </Card>
                    ))}
                </SwipeableViews>

                {/* Новинки */}
                <Typography className={classesCard.titleIndex} variant={"h2"}>{isNil(product[0].node.title) ? "" :
                  product[0].node.title}</Typography>
                <SwipeableViews style={styles.rootNewProd} slideStyle={styles.slideContainer}>
                    { isNil(product[0].node.new) ? '' :  product[0].node.new.map((homeProduct) => (

                        <Card key={homeProduct.id} className={classesCard.cardCombo}>
                            <CardMedia
                                title={homeProduct.name}>
                                <Img style={styles.img} fluid={homeProduct.image.fluid} alt={homeProduct.name} />
                            </CardMedia>
                            <CardContent>
                                <Typography style={{fontSize: 18, fontWeight: 600}} variant={"h6"}>{homeProduct.name}</Typography>
                                <Typography style={{fontSize: 13, height: 60, overflowY: `auto`}}
                                            variant={"subtitle1"}>{homeProduct.description}</Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                { homeProduct.__typename === "ContentfulProduct" || homeProduct.__typename === "ContentfulProductPizza" ?
                                    <Button
                                        variant="contained"
                                        className={classesCard.buttonCombo}
                                        component={Link}
                                        size={"small"}
                                        to={homeProduct.__typename === "ContentfulProduct" ? `/sety/${homeProduct.slug}` : homeProduct.__typename === "ContentfulProductPizza" ? "/pizza/" : null}>
                                        Посмотреть
                                    </Button> : <Button
                                        variant="contained"
                                        className={classesCard.button}
                                        onClick={() => addedCart({id: homeProduct.id,
                                            productPrice: null, product: indexProduct[0].node.new})}>
                                        <ShoppingCartIcon/>
                                    </Button>
                                }
                                <Typography style={{fontSize: 18, fontWeight: 800, marginLeft: `auto`, marginRight: 10}}
                                            variant={"body1"}>{homeProduct.price} ₽</Typography>
                            </CardActions>
                        </Card>
                    ))}
                </SwipeableViews>

            </Hidden>

        {/*Комбо компьютер*/}
        <Hidden xsDown>
                <Grid container
                      justify={"space-between"}
                      style={{width: `100%`, marginBottom: 50}}>
                    { isNil(product[1].node.combos) ? '' : product[1].node.combos.map((homeProduct) => (
                        <Grid key={homeProduct.id} item sm={6} md={4} style={{maxWidth: `300px`}}>
                            <Card className={classesCard.cardComboPc}>
                                <CardMedia
                                    className={classesCard.media}
                                    title={homeProduct.name}>
                                    <Img fluid={homeProduct.image.fluid} alt={homeProduct.name} />
                                </CardMedia>
                                <CardContent>
                                    <Typography style={{fontSize: 18, fontWeight: 600}} variant={"h6"}>{homeProduct.name}</Typography>
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
                                    <Typography style={{fontSize: 22, fontWeight: 800, marginLeft: `auto`, marginRight: 10}} variant={"body1"}>{homeProduct.price} ₽</Typography>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}

                    {/* Новинки компьютер  */}
                    <Grid container justify={"space-between"}>
                    <Typography style={{marginTop: 50, marginBottom: 20}} className={classesCard.titleIndex} variant={"h2"}>{isNil(product[0].node.title) ? "" :
                      product[0].node.title}</Typography>
                    { isNil(product[0].node.new) ? '' :  product[0].node.new.map((homeProduct) => (
                        <Grid key={homeProduct.id} item sm={6} md={4} style={{maxWidth: `300px`, margin: `20px 0`}}>
                            <Card className={classesCard.cardComboPc}>
                                <CardMedia
                                    title={homeProduct.name}>
                                    <Img fluid={homeProduct.image.fluid} alt={homeProduct.name} />
                                </CardMedia>
                                <CardContent>
                                    <Typography style={{fontSize: 18, fontWeight: 600}} variant={"h6"}>{homeProduct.name}</Typography>
                                    <Typography style={{fontSize: 14, height: 75, width: `100%`, overflowY: `auto`}} variant={"subtitle1"}>{homeProduct.description}</Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    { homeProduct.__typename === "ContentfulProduct" || homeProduct.__typename === "ContentfulProductPizza" ?
                                        <Button
                                            variant="contained"
                                            className={classesCard.buttonCombo}
                                            component={Link}
                                            to={homeProduct.__typename === "ContentfulProduct" ? `/sety/${homeProduct.slug}` : homeProduct.__typename === "ContentfulProductPizza" ? "/pizza/" : null}>
                                            Посмотреть
                                        </Button> : <Button
                                            variant="contained"
                                            className={classesCard.button}
                                            onClick={() => addedCart({id: homeProduct.id,
                                                productPrice: null, product: indexProduct[0].node.new})}>
                                            <ShoppingCartIcon/>
                                        </Button>
                                    }

                                    <Typography style={{fontSize: 22, fontWeight: 800, marginLeft: `auto`, marginRight: 10}}
                                                variant={"body1"}>{homeProduct.price} ₽</Typography>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                    </Grid>
                </Grid>
            </Hidden>
    </>
    );

});
export default CardIndex

const useStylesCard = makeStyles(theme => ({
    root: {
        margin: `0 auto`,
        display: `flex`,
        flexDirection: `column`,
        alignItems: "baseline",
        borderRadius: `5px`
    },
    cardComboPc: {
        borderRadius: `3px`,
        maxWidth: `280px`,
        [theme.breakpoints.up('500')]: {
            maxWidth: `280px`,
        },
    },
    cardCombo: {
        maxWidth: 280,
        borderRadius: `3px`,
        [theme.breakpoints.down('500')]: {
            maxHeight: `98%`
        },
    },
    titleIndex: {
        fontSize: '28px',
        fontWeight: `bold`,
        width: `100%`,
        [theme.breakpoints.down('600')]: {
            fontSize: '22px'
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
    cartTitle: {
        textAlign: `center`,
        position: `absolute`,
        bottom: `0`,
        color: `#fff`,
        left: 0,
        width: `100%`,
        zIndex: 1000,
        [theme.breakpoints.down('600')]: {
            height: `70px`
        }
    },
    menuTitle: {
        textAlign: `center`,
        padding: `25px 0 0 0`,
        fontWeight: 900,
        fontSize: `4vmin`
    },
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white',
    }
}));

