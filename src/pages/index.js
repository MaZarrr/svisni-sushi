import React from "react"
import SEO from "../components/seo"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import { addedCart } from "../reducers/shopping-cart";
import { connect } from "react-redux";
import { graphql } from "gatsby"
import { Hidden, Typography } from "@material-ui/core";
import Carousel from '../components/common/CarouselSvisni';
import IndexCards from '../components/Card';

    const IndexPage = ({ addedCart, data: { allContentfulContentIndex: { edges : indexProduct },
                     allContentfulHomePageImageMenu: { edges: indexMenu }, allContentfulCarouselSiteImage}}) => {

        const classes = useStyleIndexPage();

        return (
            <>
             <SEO title="Заказать любимые суши роллы c доставкой в Валуйки"
                        description="Бесплатная доставка суши, роллов, пиццы и воков в Валуйках.
                        Наше меню суши порадует широким выбором и низкими ценами. Заказ еды c 10 до 22:00"/>
                <section>
                    <Carousel dataCarousel={allContentfulCarouselSiteImage}/>
                    <Grid container className={classes.root}>
                        <Hidden xsDown>
                        <Typography className={classes.title}
                                    variant={"inherit"}
                                    component={"h1"}>
                            Свисни Суши в Уразово</Typography>
                        </Hidden>
                        <IndexCards addedCart={addedCart}
                           indexProduct={indexProduct}
                           indexMenu={indexMenu} />
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
        width: `95%`,
        margin: `auto`,
    },
    titleIndex: {
        fontSize: '28px',
        fontWeight: `bold`,
        width: `100%`,
        paddingBottom: 20,
        [theme.breakpoints.down('600')]: {
            fontSize: '22px',
            paddingTop: 20,
            paddingRight: 20,
            paddingBottom: 0,
        },
    },
    title: {
        fontWeight: 900,
        marginBottom: 30,
        marginTop: 30,
        width: `100%`,
        textTransform: `uppercase`,
        fontSize: 34,
        [theme.breakpoints.down('475')]: {
            fontSize: 24,
            letterSpacing: `-1px`,
            margin: `20px 0 0 0`
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
              ...GatsbyContentfulFluid_withWebp
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
              description
              image {
                fluid(maxWidth: 300) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
            ... on ContentfulProductPizza {
              id
              name
              price
              priceIn33cm
              slug
              description
              image {
                fluid(maxWidth: 300) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
            ... on ContentfulProductSlognyeRolly {
              id
              name
              description
              price
              image {
                fluid(maxWidth: 300) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
            ... on ContentfulProductHotRolly {
              id
              name
              description
              price
              image {
                fluid(maxWidth: 300) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
            ... on ContentfulProductKombo {
              id
              name
              count
              description
              price
              image {
                fluid(maxWidth: 300) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
          ... on ContentfulProductSalat {
            id
            name
            price
            description
            weight
           image {
            fluid(maxWidth: 300) {
              ...GatsbyContentfulFluid_withWebp
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
                            ...GatsbyContentfulFluid_withWebp
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
                            ...GatsbyContentfulFluid_withWebp
                        }
                    }
                }
            }
        }
    }
`
