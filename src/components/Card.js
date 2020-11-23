import React, {memo} from 'react';
import Img from 'gatsby-image';
import { Link } from "gatsby"
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
import {isNil, isEmpty} from "ramda";

const useStylesCard = makeStyles(theme => ({
    root: {
        margin: `0 auto`,
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        borderRadius: `15px`
    },
    cardComboPc: {
        borderRadius: `10px`,
        maxWidth: `280px`,
        margin: `10px auto 0 auto`,
        [theme.breakpoints.up('500')]: {
            maxWidth: `280px`,
        },
    },
    cardCombo: {
        maxWidth: 280,
        borderRadius: `10px`,
        [theme.breakpoints.down('500')]: {
            maxHeight: `98%`
        },
    },
    titleIndex: {
        fontSize: '32px',
        fontWeight: `bold`,
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
        padding: '0 50px 0 50px',
        maxWidth: `100%`,
    },
    rootNewProd: {
        padding: '0 50px 70px 50px',
        maxWidth: `100%`,
    },
    slideContainer: {
        padding: '0 20px',
    },
    img: {
        maxWidth: 350
    }
};

const CardIndex = memo(({addedCart, indexProduct, indexMenu}) => {
    const classesCard = useStylesCard();

    const prod = isNil(indexProduct) || isEmpty(indexProduct);

    return (
        <div className={classesCard.root}>
            <Hidden smUp>
            {/*Меню выбор*/}
            <Grid container style={{marginBottom: 40, marginTop: 20}}>
                <Typography style={{marginBottom: 10}} className={classesCard.titleIndex}
                            variant={"h2"}>Заказывайте роллы, суши и пиццу</Typography>
                {indexMenu.map(({node: homeMenu}) => (
                    <Grid item xs={6} sm={4}
                          style={{margin: `0 auto`,
                              display: `flex`,
                              justifyContent: `center`, position: `relative`}}
                          key={homeMenu.id} >
                        <div>
                            <div className="cart_title">
                                <Typography variant={"h2"}>{homeMenu.category}</Typography>
                            </div>
                            <div style={{margin: `0 auto`}}>
                                <Link style={{textDecoration: `none`, margin: `0 auto`, color: 'grey', width: `120px`}} to={`/${homeMenu.slug}`}>
                                    <Img fluid={homeMenu.image.fluid} className="cart_img"/>
                                </Link>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
            </Hidden>

            { prod === true ? '' :
                <>
                <Typography className={classesCard.titleIndex} variant={"h2"}>Собери свой комбо из пиццы, суши и роллов</Typography>
                <Typography variant={'button'}>
                    <Link to={"/kombo"}>Все комбо</Link>
                </Typography>

                {/*Карусель комбо телефон*/}
                <Hidden smUp>
                    <SwipeableViews style={styles.root} slideStyle={styles.slideContainer}>
                        {  isNil(indexProduct[1].node.combos) ? '' : indexProduct[1].node.combos.map((homeProduct) => (
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
                                            to={`/kombo/${homeProduct.slug}`}>
                                            Выбрать
                                        </Button>
                                        <Typography style={{fontSize: 20, marginLeft: `auto`, marginRight: 10, fontWeight: 800}}
                                                    variant={"body1"}>{homeProduct.price} ₽</Typography>
                                    </CardActions>
                                </Card>
                            ))}
                        </SwipeableViews>

                        {/* Новинки */}
                        <Typography className={classesCard.titleIndex} variant={"h2"}>{isNil(indexProduct[0].node.title) ? "" : indexProduct[0].node.title}</Typography>
                        <SwipeableViews style={styles.rootNewProd} slideStyle={styles.slideContainer}>
                            { isNil(indexProduct[0].node.new) ? '' :  indexProduct[0].node.new.map((homeProduct) => (

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
                                        { homeProduct.__typename === "ContentfulProduct" ?
                                            <Button
                                                variant="contained"
                                                className={classesCard.buttonCombo}
                                                component={Link}
                                                to={homeProduct.slug === "gucci-set" ? `/sety/${homeProduct.slug}` : "/pizza"}>
                                                Посмотреть
                                            </Button> : <Button
                                                variant="contained"
                                                className={classesCard.button}
                                                onClick={() => addedCart({id: homeProduct.id,
                                                    productPrice: null, product: indexProduct[0].node.new})}>
                                                <ShoppingCartIcon/>
                                            </Button>
                                        }

                                        <Typography style={{fontSize: 20, fontWeight: 800, marginLeft: `auto`, marginRight: 10}}
                                                    variant={"body1"}>{homeProduct.price} ₽</Typography>
                                    </CardActions>
                                </Card>
                            ))}
                        </SwipeableViews>

                    </Hidden>

                    {/*Комбо компьютер*/}
                    <Hidden xsDown>
                        <Grid container justify={"center"} style={{width: `100%`, marginBottom: 50}}>
                            { isNil(indexProduct[1].node.combos) ? '' : indexProduct[1].node.combos.map((homeProduct) => (
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
                            <Typography className={classesCard.titleIndex} variant={"h2"}>{isNil(indexProduct[0].node.title) ? "" : indexProduct[0].node.title}</Typography>
                            { isNil(indexProduct[0].node.new) ? '' :  indexProduct[0].node.new.map((homeProduct) => (
                                <Grid key={homeProduct.id} item sm={6} md={4} style={{maxWidth: `300px`}}>
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
                                            { homeProduct.__typename === "ContentfulProduct" ?
                                                <Button
                                                    variant="contained"
                                                    className={classesCard.buttonCombo}
                                                    component={Link}
                                                    to={homeProduct.slug === "gucci-set" ? `/sety/${homeProduct.slug}` : "/pizza"}>
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
                    </Hidden>
                </> }
        </div>
    );

});
export default CardIndex
