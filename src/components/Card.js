import React, { useState } from 'react';
import Img from 'gatsby-image';
import { useStaticQuery, graphql, Link } from "gatsby"
import {useStyleCardIndexPage} from "./common/style";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ItemsCarousel from 'react-items-carousel';
import Grid from "@material-ui/core/Grid";
import {Hidden} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStylesCard = makeStyles(theme => ({
    titleIndex: {
        fontSize: '36px',
        width: `100%`,
        padding: `20px 10px`,
        textAlign: `center`,
        [theme.breakpoints.down('600')]: {
            fontSize: '26px',
            padding: `10px 0 10px 20px`,
            textAlign: `start`,
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
}));

const RecipeReviewCard = () => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const classes = useStyleCardIndexPage();
    const classesCard = useStylesCard();

    const {allContentfulContentIndex: {edges},
        allContentfulHomePageImageMenu: {edges: menu}} = useStaticQuery(graphql `
        {
            allContentfulContentIndex {
                edges {
                    node {
                        combos {
                            id
                            name
                            price
                            slug
                            description
                            image {
                                fluid(maxWidth: 300) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                        }
                    }
                }
            }
            allContentfulHomePageImageMenu(sort: {fields: desc}) {
                edges {
                    node {
                        id
                        slug
                        category
                        desc
                        image {
                            fluid(maxWidth: 300) {
                                ...GatsbyContentfulFluid
                            }
                        }
                    }
                }
            }
        }
    `);


    return (
        <div className={`mt-4 ${classes.root}`}>
            <Typography className={classesCard.titleIndex} variant={"h2"}>Собери свой комбо набор из пиццы, суши и роллов</Typography>
            <Typography variant={'button'}>
                <Link to={"/kombo"}>Все комбо</Link>
            </Typography>

            {/*Карусель комбо телефон*/}
            <Hidden smUp>
                <div style={{maxWidth: `100%`, margin: `0 auto`}}>
                    <ItemsCarousel
                        infiniteLoop={false}
                        gutter={12}
                        activePosition={'center'}
                        chevronWidth={60}
                        disableSwipe={false}
                        alwaysShowChevrons={false}
                        numberOfCards={1}
                        slidesToScroll={1}
                        outsideChevron={false}
                        showSlither={true}
                        firstAndLastGutter={true}
                        activeItemIndex={activeItemIndex}
                        requestToChangeActive={value => setActiveItemIndex(value)}
                    >
                        { edges[0].node.combos.map((homeProduct) => (
                            <Card key={homeProduct.id} className={classes.cardCombo}>
                                <CardMedia
                                    className={classes.media}
                                    title={homeProduct.name}>
                                    <Img fluid={homeProduct.image.fluid} alt={homeProduct.name} />
                                </CardMedia>
                                <CardContent>
                                    <Typography variant={"h6"}>{homeProduct.name}</Typography>
                                    <Typography style={{fontSize: 14, height: 50, width: `100%`, overflowY: `auto`}}
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
                                    <Typography style={{fontSize: 22}} className="ml-auto mr-2"
                                                variant={"body1"}>{homeProduct.price} ₽</Typography>
                                </CardActions>
                            </Card>
                        ))}
                    </ItemsCarousel>
                </div>
            </Hidden>

            {/*Комбо компьютер*/}
            <Hidden xsDown>
                <Grid container style={{width: `85%`}}>
                    { edges[0].node.combos.map((homeProduct) => (
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
                </Grid>
            </Hidden>

            {/*Меню выбор*/}
            <Grid container className="mt-4">
                <Typography className={`mb-2 ${classesCard.titleIndex}`}
                            variant={"h2"}>Заказывайте роллы, суши и пиццу с доставкой</Typography>
                {menu.map(({node: homeMenu}) => (
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

export default RecipeReviewCard