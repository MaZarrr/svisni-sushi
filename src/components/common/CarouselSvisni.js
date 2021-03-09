import React, { useState } from 'react';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link } from "gatsby"
import Img from 'gatsby-image';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import Pagination from '../pagination/Pagination'
import { Hidden } from "@material-ui/core";
import { mod } from 'react-swipeable-views-core';

const VirtualizeSwipeableViews = autoPlay(virtualize(SwipeableViews));

const styles = {
    slideContainer: {
        padding: '1vw'
    },
    // slide: {
    //     padding: 10
    // }
};

function Carousel({ dataCarousel }) {
    const [state, setState] = useState(0)
    const [data,] = useState(dataCarousel)
    const classes = useStyleCarousel();

    const handleChangeIndex = index => {
        setState(index)
    };

    function slideRenderer(params) {
        const { index, key } = params;

        switch (mod(index, 5)) {
            case 0:
                return (
                    <div key={key}>
                        <Link to={data.edges[0].node.slug}>
                            <Img fluid={data.edges[0].node.imgCarouselPc.fluid}
                                 className={classes.image} imgStyle={{maxWidth: 1900}}
                                 alt={data.edges[0].node.name} />
                        </Link>
                    </div>
                );

            case 1:
                return (
                    <div key={key}>
                        <Link to={data.edges[1].node.slug}>
                            <Img fluid={data.edges[1].node.imgCarouselPc.fluid}
                                 className={classes.image} imgStyle={{maxWidth: 1900}}
                                 alt={data.edges[1].node.name} />
                        </Link>
                    </div>
                );

            case 2:
                return (
                    <div key={key}>
                        <Link to={data.edges[2].node.slug}>
                            <Img fluid={data.edges[2].node.imgCarouselPc.fluid}
                                 className={classes.image} imgStyle={{maxWidth: 1900}}
                                 alt={data.edges[2].node.name} />
                        </Link>
                    </div>
                );

            case 3:
                return (
                    <div key={key} style={styles.slide}>
                        <Link to={data.edges[3].node.slug}>
                            <Img fluid={data.edges[3].node.imgCarouselPc.fluid}
                                 className={classes.image} imgStyle={{maxWidth: 1900}}
                                 alt={data.edges[3].node.name} />
                        </Link>
                    </div>
                );

            case 4:
                return (
                    <div key={key} style={styles.slide}>
                        <Link to={data.edges[4].node.slug}>
                            <Img fluid={data.edges[4].node.imgCarouselPc.fluid}
                                 className={classes.image} imgStyle={{maxWidth: 1900}}
                                 alt={data.edges[4].node.name} />
                        </Link>
                    </div>
                );


            default:
                return null;
        }
    }

    return (
        <div className={classes.root}>
            <VirtualizeSwipeableViews 
                className={classes.rootCarousel}
                slideRenderer={slideRenderer}
                // slideCount={5}
                slideStyle={styles.slideContainer}
                index={state}
                onChangeIndex={handleChangeIndex}
              />
            <Hidden smUp>
                <Pagination dots={5} index={state} onChangeIndex={handleChangeIndex} />
            </Hidden>
        </div>
    )
}

export default Carousel;

const useStyleCarousel = makeStyles(theme => ({
    root: {
        // maxWidth: `100vw`,
        flexGrow: '1',
        marginTop: 75,
        position: 'relative',
        [theme.breakpoints.down('768')]: {
            marginBottom: 30,
        },
        [theme.breakpoints.down('475')]: {
            marginBottom: 0,
            marginTop: 37,
        }
    },
    image: {
        borderRadius: 5,
        maxWidth: 1920,
        [theme.breakpoints.down('600')]: {
            // maxWidth: 780,
            borderRadius: 5,
            // height: 90,
        },
    },
    rootAutoSwipeable: {
        padding: '0 20vw 0 20vw',
    },
    rootCarousel: {
        // padding: '0 20vw 0 20vw',
        padding: '0 9vw 0 9vw',
        [theme.breakpoints.down('475')]: {
            padding: 0,
        },
    }
}));