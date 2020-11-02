import React from "react"
import SEO from "../components/seo"
import "../components/sass/index.css"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import {addedCart} from "../reducers/shopping-cart";
import {connect} from "react-redux";
import { graphql, useStaticQuery } from "gatsby"
import {isEmpty} from "ramda"
import loadable from "@loadable/component";
import {loadIndexItems} from "../reducers/app";
import Spinner from "../components/spinner/spinner"
import Typography from "@material-ui/core/Typography";

const CarouselSvisni = loadable(() => import('../components/common/CarouselSvisni'));
const InstaSection = loadable(() => import('../components/insta'));
const CardIndex = loadable(() => import('../components/Card'), {
    fallback: <Spinner/>});

const useStyleIndexPage = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: `100%`,
        marginBottom: 9,
    },
    titleIndex: {
        fontSize: '32px',
        width: `100%`,
        padding: `20px 10px`,
        textAlign: `center`,
        [theme.breakpoints.down('600')]: {
            fontSize: '22px',
            padding: `10px 30px 10px 35px`,
        },
    },
}));

const QUERY_INDEX_DATA = graphql`
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
                            ... on ContentfulProductGunkan {
                                id
                                name
                                price
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
                            ... on ContentfulProductZakuski {
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
                        fluid(maxWidth: 300) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
    }

`;

const IndexPage = ({loadIndexItems, addedCart, indexProduct: product, indexMenu: menus}) => {

    const { allContentfulContentIndex: {edges},
            allContentfulHomePageImageMenu: { edges: menu }} = useStaticQuery(QUERY_INDEX_DATA);
    const classes = useStyleIndexPage();
    React.useEffect(() => {
        loadIndexItems({edges, menu})
    }, [edges, menu, loadIndexItems]);

    const indexProduct = isEmpty(product) ? edges : product;
    const indexMenu = isEmpty(menus) ? menu : menus;

    return (
        <section>
            <SEO title="Заказать любимые суши и роллы c доставкой в Валуйки"
                 description="Бесплатная доставка суши, роллов, пиццы и воков в Валуйках.
                    Наше меню суши порадует широким выбором и низкими ценами. Заказ еды c 10 до 22:00"/>

            <CarouselSvisni />
            <Grid item xs={12} className={classes.root}>
                <CardIndex addedCart={addedCart}
                           indexProduct={indexProduct}
                           indexMenu={indexMenu} />
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Typography className={classes.titleIndex} variant={"h2"}>Мы в Instagram</Typography>
                </Grid>
                <InstaSection/>
            </Grid>
        </section>
    )};

const mapStateToProps = (state) => ({
    indexProduct: state.app.indexProduct,
    indexMenu: state.app.indexMenu
});

const mapDispatchToProps = {
    addedCart,
    loadIndexItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
