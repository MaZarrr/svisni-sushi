import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from 'gatsby-image';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
    root: {
        padding: '0 30px',
    },
    slideContainer: {
        padding: '0 10px',
    },
    slide: {
        padding: 15,
        minHeight: 100,
        color: '#fff',
    }
};

function DemoWidth() {


const styles = {
    root: {
        padding: '0 30px',
    },
    slideContainer: {
        padding: '0 10px',
    },
    slide: {
        padding: 15,
        minHeight: 100,
        color: '#fff',
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
                    }
                }
            }
        }
    `)

    return (
        <AutoPlaySwipeableViews style={styles.root} slideStyle={styles.slideContainer}>
            {data.allContentfulCarouselSiteImage.edges.map((step, index) => (
                      <div key={step.node.id}>
                                 <Link to={step.node.slug}>
                                     <Img fluid={step.node.imgCarouselPc.fluid} style={{borderRadius: 13, marginTop: 5}} imgStyle={{maxWidth: 1300}} alt={step.node.id} />
                                 </Link>
                         </div>
                     ))}
        </AutoPlaySwipeableViews>
    );
}

export default DemoWidth;

