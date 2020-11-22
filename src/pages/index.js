import React from "react"
import SEO from "../components/seo"
import "../components/sass/index.css"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import { addedCart } from "../reducers/shopping-cart";
import { connect } from "react-redux";
import { graphql, StaticQuery } from "gatsby"
import Carousel from '../components/common/CarouselSvisni'
import IndexCards from '../components/Card'
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

    const useStyleIndexPage = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: `100%`
    },
        header: {
            paddingTop: '60px',
            background: `#f0ecec`,
            [theme.breakpoints.down('600')]: {
                paddingTop: '30px',
            },
        },
        h1Home: {
            fontFamily: 'Oswald, cursive',
            fontWeight: '800',
            lineHeight: 2,
            fontSize: '36px',
            padding: `0 0 0 35px`,
            [theme.breakpoints.down('600')]: {
                fontSize: '30px',
                color: `#000`,
                padding: `0 0 0 20px`,
            },
        },
    titleIndex: {
        fontSize: '36px',
        width: `100%`,
        fontWeight: `bold`,
        padding: `20px 10px`,
        textAlign: `center`,
        [theme.breakpoints.down('600')]: {
            fontSize: '28px',
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
                        fluid(maxWidth: 140) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
    }
`;

    const IndexPage = ({ addedCart }) => {
    const classes = useStyleIndexPage();

    React.useEffect(() => {
        moment.locale('ru');
    }, []);

    return (
            <StaticQuery query={QUERY_INDEX_DATA}
                     render={( { allContentfulContentIndex: { edges : indexProduct },
                                allContentfulHomePageImageMenu: { edges: indexMenu }}) => (
                <section>
                    <SEO title="Заказать любимые суши и роллы c доставкой в Валуйки"
                        description="Бесплатная доставка суши, роллов, пиццы и воков в Валуйках.
                        Наше меню суши порадует широким выбором и низкими ценами. Заказ еды c 10 до 22:00"/>

                    <Paper square elevation={0} className={classes.header}>
                        <Typography variant="h1" className={classes.h1Home}>Свисни Суши в Уразово</Typography>
                    </Paper>

                    <Carousel/>
                    <Grid item xs={12} className={classes.root}>
                    <IndexCards addedCart={addedCart}
                           indexProduct={indexProduct}
                           indexMenu={indexMenu} />
                    </Grid>

                </section>
         )}
        />
    )};

const mapDispatchToProps = {
    addedCart
};

export default connect(null, mapDispatchToProps)(IndexPage)
