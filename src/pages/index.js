import React from "react"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import { graphql } from "gatsby";
import { Hidden, Typography } from "@material-ui/core";

import Carousel from '../components/common/CarouselSvisni';
import MenuCategory from "../components/indexContent/MenuCategory";
import Combo from '../components/indexContent/combo/index'
import RecommendedProducts from "../components/indexContent/recommended-products";

const IndexPage = ( { data: { allContentfulCarouselSiteImage }}) => {
        const classes = useStyleIndexPage();
        return (
            <>
            <section>
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
                          <Grid container style={{marginBottom: 20}}>
                            <MenuCategory />
                          </Grid>
                        </Hidden>

                      {/* Комбо */}
                      <Combo />
                      {/* Новинки/рекомендованые */}
                      <RecommendedProducts />
                    </Grid>
            </section>
 </>
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
 query {
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
