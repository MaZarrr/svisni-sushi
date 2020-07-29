import React from 'react';
import { autoPlay } from 'react-swipeable-views-utils';
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from 'gatsby-image';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import {Hidden} from "@material-ui/core";

const VirtualizeSwipeableViews = autoPlay(virtualize(SwipeableViews));

const useStyleCarousel = makeStyles(theme => ({
    root: {
        maxWidth: `100vw`,
        flexGrow: '1',
        [theme.breakpoints.down('768')]: {
            marginBottom: 40,
        },
        [theme.breakpoints.down('475')]: {
            marginBottom: 0,
            marginTop: 32
        },
    },
    header: {
        paddingTop: '8px',
        background: `#f0ecec`,
    },
    h1Home: {
        fontFamily: 'Oswald, cursive',
        fontWeight: '800',
        lineHeight: 2,
        fontSize: '30px',
        padding: `0 0 0 35px`,
        [theme.breakpoints.down('600')]: {
            fontSize: '22px',
            color: `#000`,
            padding: `0 0 0 34px`,
        },
    },
    image: {
        borderRadius: 13,
        maxWidth: 780,
        [theme.breakpoints.down('600')]: {
            borderRadius: 5,
            // height: 90,
        },
    },
    rootAutoSwipeable: {
        padding: '0 10vw 0 20vw',
    },
}));

const styles = {
    root: {
        padding: '0 10vw 0 20vw',
    },
    slideContainer: {
        padding: '0 20px',
    }
};

function DemoWidth() {

    const classes = useStyleCarousel();
    const data = useStaticQuery(graphql `
        {
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
                        imgCarouselPhone {
                            fluid(maxWidth: 400, quality: 90) {
                                ...GatsbyContentfulFluid
                            }
                        }
                    }
                }
            }
        }
    `)

    function slideRenderer(params) {
        const { index, key } = params;

        switch (mod(index, 4)) {
            case 0:
                return (
                    <div key={key}>
                        <Link to={data.allContentfulCarouselSiteImage.edges[0].node.slug}>
                            <Img fluid={data.allContentfulCarouselSiteImage.edges[0].node.imgCarouselPc.fluid}
                                 className={classes.image} imgStyle={{maxWidth: 1800}}
                                 alt={data.allContentfulCarouselSiteImage.edges[0].node.name} />
                        </Link>
                    </div>
                );

            case 1:
                return (
                    <div key={key}>
                        <Link to={data.allContentfulCarouselSiteImage.edges[1].node.slug}>
                            <Img fluid={data.allContentfulCarouselSiteImage.edges[1].node.imgCarouselPc.fluid}
                                 className={classes.image} imgStyle={{maxWidth: 1800}}
                                 alt={data.allContentfulCarouselSiteImage.edges[1].node.name} />
                        </Link>
                    </div>
                );

            case 2:
                return (
                    <div key={key}>
                        <Link to={data.allContentfulCarouselSiteImage.edges[2].node.slug}>
                            <Img fluid={data.allContentfulCarouselSiteImage.edges[2].node.imgCarouselPc.fluid}
                                 className={classes.image} imgStyle={{maxWidth: 1800}}
                                 alt={data.allContentfulCarouselSiteImage.edges[2].node.name} />
                        </Link>
                    </div>
                );

            case 3:
                return (
                    <div key={key}>
                        <Link to={data.allContentfulCarouselSiteImage.edges[3].node.slug}>
                            <Img fluid={data.allContentfulCarouselSiteImage.edges[3].node.imgCarouselPc.fluid}
                                 className={classes.image} imgStyle={{maxWidth: 1800}}
                                 alt={data.allContentfulCarouselSiteImage.edges[3].node.name} />
                        </Link>
                    </div>
                );

            default:
                return null;
        }
    }

    return (
        <div className={classes.root}>
            <Hidden xsDown>
                <Paper square elevation={0} className={classes.header}>
                    <Typography variant="h1" className={classes.h1Home}>Свисни Суши в Уразово</Typography>
                </Paper>
            </Hidden>

            <VirtualizeSwipeableViews style={styles.root} slideRenderer={slideRenderer} slideStyle={styles.slideContainer}/>
        </div>
    )
}

export default DemoWidth;
