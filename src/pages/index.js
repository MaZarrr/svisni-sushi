import React from "react"
import SEO from "../components/seo"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import { addedCart } from "../reducers/shopping-cart";
import { connect } from "react-redux";
import { graphql } from "gatsby"
import loadable from "@loadable/component";
import Spinner from '../components/spinner/spinner-new'
import { Typography } from "@material-ui/core"

const Carousel = loadable(() => import('../components/common/CarouselSvisni'));
const Map = loadable(() => import('../components/MapContent'));
const IndexCards = loadable(() => import('../components/Card'), {
    fallback: <Spinner/>
});

    const IndexPage = ({ addedCart, data: { allContentfulContentIndex: { edges : indexProduct },
                     allContentfulHomePageImageMenu: { edges: indexMenu }, allContentfulCarouselSiteImage}}) => {

        const classes = useStyleIndexPage();

        return (
            <>
             <SEO title="Заказать любимые суши и роллы c доставкой в Валуйки"
                        description="Бесплатная доставка суши, роллов, пиццы и воков в Валуйках.
                        Наше меню суши порадует широким выбором и низкими ценами. Заказ еды c 10 до 22:00"/>
                <section>
                    <Carousel dataCarousel={allContentfulCarouselSiteImage}/>
                    <Grid container className={classes.root}>
                        <h1 className={classes.title}>Свисни Суши в Уразово</h1>
                      <IndexCards addedCart={addedCart}
                           indexProduct={indexProduct}
                           indexMenu={indexMenu} />

                      <Map />
                    </Grid>
                </section>
         </>
         )}


const mapDispatchToProps = {
    addedCart
};

export default connect(null, mapDispatchToProps)(IndexPage)

const useStyleIndexPage = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: `90%`,
        margin: `auto`,
    },
    title: {
        fontWeight: 900,
        marginBottom: 0,
        marginTop: 80,
        width: `100%`,
        textTransform: `uppercase`,
        fontSize: 34,
        [theme.breakpoints.down('475')]: {
            fontSize: 24,
            letterSpacing: `-2.5px`,
            margin: `20px 0 0 0`,
        }
    }
}));

export const queryIndexPage = graphql `    
    query {
        allContentfulContentIndex {
            edges {
                node {
                    title
                    combos {
                        id
                        description
                        name
                        price
                        slug
                        image {
                            fluid(maxWidth: 300) {
                                ...GatsbyContentfulFluid
                            }
                        }
                    }
                    new {
                        __typename
                        ... on Node {
                            ... on ContentfulProduct {
                                id
                                name
                                price
                                slug
                                count
                                description
                                image {
                                    fluid(maxWidth: 300) {
                                        ...GatsbyContentfulFluid
                                    }
                                }
                            }
                            ... on ContentfulProductPizza {
                                id
                                name
                                price
                                priceIn33cm
                                slug
                                count
                                description
                                image {
                                    fluid(maxWidth: 300) {
                                        ...GatsbyContentfulFluid
                                    }
                                }
                            }
                            ... on ContentfulProductSlognyeRolly {
                                id
                                name
                                count
                                description
                                price
                                image {
                                    fluid(maxWidth: 300) {
                                        ...GatsbyContentfulFluid
                                    }
                                }
                            }
                            ... on ContentfulProductHotRolly {
                                id
                                name
                                count
                                description
                                price
                                image {
                                    fluid(maxWidth: 300) {
                                        ...GatsbyContentfulFluid
                                    }
                                }
                            }
                            ... on ContentfulProductKombo {
                                id
                                name
                                count
                                description
                                price
                                slug
                                image {
                                    fluid(maxWidth: 300) {
                                        ...GatsbyContentfulFluid
                                    }
                                }
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
                        fluid(maxWidth: 180, quality: 100) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
        allContentfulCarouselSiteImage {
            edges {
                node {
                    id
                    slug
                    imgCarouselPc {
                        fluid(maxWidth: 1680, quality: 90) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
    }
`
