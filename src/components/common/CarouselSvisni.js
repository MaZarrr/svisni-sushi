import React, { useState } from 'react';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { Hidden } from "@material-ui/core";
import { mod } from 'react-swipeable-views-core';
import Pagination from '../pagination/Pagination';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import Grid from '@material-ui/core/Grid';

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
                            <GatsbyImage
                                image={data.edges[0].node.imgCarouselPc.gatsbyImageData}
                                className={classes.image}
                                loading={"eager"}
                                imgStyle={{maxWidth: 1900}}
                                alt={data.edges[0].node.nameAkcii} />
                        </Link>
                    </div>
                );

            case 1:
                return (
                    <div key={key}>
                        <Link to={data.edges[1].node.slug}>
                            <GatsbyImage
                                image={data.edges[1].node.imgCarouselPc.gatsbyImageData}
                                className={classes.image}
                                loading={"eager"}
                                imgStyle={{maxWidth: 1900}}
                                alt={data.edges[1].node.nameAkcii} />
                        </Link>
                    </div>
                );
            case 2:
                return (
                  <div key={key}>
                      <Link to={data.edges[2].node.slug}>
                          <GatsbyImage
                            image={data.edges[2].node.imgCarouselPc.gatsbyImageData}
                            className={classes.image}
                            loading={"eager"}
                            imgStyle={{maxWidth: 1900}}
                            alt={data.edges[2].node.nameAkcii} />
                      </Link>
                  </div>
                );

            case 3:
                return (
                    <div key={key}>
                        <Link to={data.edges[3].node.slug}>
                            <GatsbyImage
                                image={data.edges[3].node.imgCarouselPc.gatsbyImageData}
                                className={classes.image}
                                loading={"eager"}
                                imgStyle={{maxWidth: 1900}}
                                alt={data.edges[3].node.nameAkcii} />
                        </Link>
                    </div>
                );

            case 4:
                return (
                    <div key={key} style={styles.slide}>
                        <Link to={data.edges[4].node.slug}>
                            <GatsbyImage
                                image={data.edges[4].node.imgCarouselPc.gatsbyImageData}
                                className={classes.image}
                                loading={"eager"}
                                imgStyle={{maxWidth: 1900}}
                                alt={data.edges[4].node.nameAkcii} />
                        </Link>
                    </div>
                );

            case 5:
                return (
                    <div key={key} style={styles.slide}>
                        <Link to={data.edges[5].node.slug}>
                            <GatsbyImage
                                image={data.edges[5].node.imgCarouselPc.gatsbyImageData}
                                className={classes.image}
                                loading={"eager"}
                                imgStyle={{maxWidth: 1900}}
                                alt={data.edges[5].node.nameAkcii} />
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
        flexGrow: '1',
        marginTop: 40,
        position: 'relative',
        [theme.breakpoints.down('1200')]: {
            marginTop: 50,
        },
        [theme.breakpoints.down('768')]: {
            marginTop: 50,
            marginBottom: 20,
        },
        [theme.breakpoints.down('475')]: {
            marginBottom: 0,
            marginTop: 5,
        }
    },
    // fabBtn: {
    // },
    image: {
        borderRadius: 5,
        maxWidth: 1920,
        [theme.breakpoints.down('600')]: {
            borderRadius: 5,
        },
    },
    rootAutoSwipeable: {
        padding: '0 30vw 0 30vw',
    },
    rootCarousel: {
        padding: '0 20vw 0 20vw',
        [theme.breakpoints.down('475')]: {
            padding: 0,
        },
    }
}));

            //   {/* <Grid justifyContent='center'>
            //       <div style={{position: 'absolute'}}>
            //   <Fab style={{marginRight: '40%'}}>
            //         <AddIcon />
            //   </Fab>
            //   <Fab>
            //         <AddIcon />
            //   </Fab>
            //   </div> */}
            //   </Grid>