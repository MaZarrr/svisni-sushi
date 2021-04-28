import React, {useEffect, useState} from "react"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import { graphql } from "gatsby";
import { Hidden, Typography } from "@material-ui/core";

import Carousel from '../components/common/CarouselSvisni';
import MenuCategory from "../components/indexContent/MenuCategory";
import Combo from '../components/indexContent/combo/index'
import RecommendedProducts from "../components/indexContent/recommended-products";
import SpinnerNew from "../components/spinner/spinner-new";
import SEO from "../components/seo";

const IndexPage = ({ data: { allContentfulContentIndex: { edges }, allContentfulCarouselSiteImage } }) => {
        const [loading, setLoading] = useState(true)
        const [indexProduct, setIndexProduct] = useState(true)
        const classes = useStyleIndexPage();

        useEffect(() => {
          setIndexProduct(edges)
          setLoading(false)
        }, [edges])
        return (
            <section>
              <SEO title="Заказать любимые суши роллы c доставкой в Валуйки"
                   description="Бесплатная доставка суши, роллов, пиццы и воков в Валуйках.
                        Наше меню суши порадует широким выбором и низкими ценами. Заказ еды c 10 до 22:00"/>
              <Carousel dataCarousel={allContentfulCarouselSiteImage}/>
                <Grid container className={classes.root}>
                  <Hidden xsDown>
                    <Typography className={classes.title}
                                variant={"inherit"}
                                component={"h1"}>
                      Свисни Суши в Уразово</Typography>
                  </Hidden>
                  {/* Меню категории */}
                  <Hidden smUp>
                    <Grid container style={{ marginBottom: 20 }}>
                      <MenuCategory />
                    </Grid>
                  </Hidden>
                  { !loading ? <>
                  {/* Комбо */}
                  <Combo product={indexProduct[0]}/>
                  {/* Новинки/рекомендованые */}
                  <RecommendedProducts product={indexProduct[1]} />
                  </> : <SpinnerNew /> }
                </Grid>
            </section>
 )}


export default IndexPage

const useStyleIndexPage = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: `95%`,
        margin: `auto`
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

export const query = graphql `
{  
    allContentfulContentIndex {
        edges {
        node {
          combos {
          id
          description
          name
          __typename
          price
          slug
          image {
            gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
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
               gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
              }
            }
            ... on ContentfulProductPizza {
              id
              name
              __typename
              price
              priceIn33cm
              slug
              description
              image {
                gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
              }
            }
            ... on ContentfulProductSlognyeRolly {
              id
              name
              description
              __typename
              price
              image {
               gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
              }
            }
            ... on ContentfulProductHotRolly {
              id
              name
              __typename
              description
              price
              image {
                 gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
              }
            }
            ... on ContentfulProductKombo {
              id
              name
              __typename
              count
              description
              price
              image {
                gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
              }
            }
          ... on ContentfulProductSalat {
            id
            name
            __typename
            price
            description
            weight
            __typename
            image {
                 gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
            }
          }
          ... on ContentfulProductZakuski {
            id
            name
            __typename
            price
            description
            weight
            __typename
            image {
                 gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
            }
          }
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
            nameAkcii
            imgCarouselPc {
              gatsbyImageData(placeholder: BLURRED)
            }
        }
      }
    }
}
`
