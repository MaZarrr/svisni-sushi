import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
// import {Hidden} from "@material-ui/core";
// import { virtualize } from 'react-swipeable-views-utils';
// import { mod } from 'react-swipeable-views-core';
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from 'gatsby-image';
// import {makeStyles, useTheme} from '@material-ui/core/styles';
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

    return (
        <AutoPlaySwipeableViews style={styles.root} slideStyle={styles.slideContainer}>
            {data.allContentfulCarouselSiteImage.edges.map((step, index) => (
                      <div key={step.node.id}>
                             {/*{Math.abs(activeStep - index) <= 2 ? (*/}
                                 <Link to={step.node.slug}>
                                     <Img fluid={step.node.imgCarouselPc.fluid} style={{borderRadius: 13, marginTop: 5}} imgStyle={{maxWidth: 1300}} alt={step.node.id} />
                                 </Link>
                             {/*) : null}*/}
                         </div>
                     ))}
        </AutoPlaySwipeableViews>
    );
}

export default DemoWidth;

// import React from 'react';
// import { graphql, useStaticQuery, Link } from "gatsby"
// import Img from 'gatsby-image';
// import {makeStyles, useTheme} from '@material-ui/core/styles';
// import MobileStepper from '@material-ui/core/MobileStepper';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';
// import {Hidden} from "@material-ui/core";
// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
//
// const useStyleCarousel = makeStyles(theme => ({
//     root: {
//         maxWidth: `100vw`,
//         flexGrow: '1',
//         [theme.breakpoints.down('768')]: {
//             marginBottom: 40,
//         },
//         [theme.breakpoints.down('475')]: {
//             marginBottom: 0,
//         },
//     },
//     header: {
//         display: 'flex',
//         alignItems: 'center',
//         paddingTop: '8px',
//         maxWidth: `1400px`,
//         justifyContent: 'flex-start',
//         background: `#f0ecec`,
//         paddingLeft: theme.spacing(2)
//     },
//     img: {
//         height: 'inherit',
//         display: 'block',
//         margin: `0 auto`,
//         borderRadius: `10px`,
//         // maxWidth: `100vw`,
//         overflow: 'hidden',
//         maxHeight: `350px`,
//         width: '95vw',
//         [theme.breakpoints.down('768')]: {
//             margin: `0 auto`,
//             maxHeight: `80vw`,
//             maxWidth: `90vw`,
//         },
//         [theme.breakpoints.down('590')]: {
//             margin: `0 auto`,
//             maxHeight: `50vw`,
//             maxWidth: `90vw`,
//         },
//         [theme.breakpoints.down('475')]: {
//             maxWidth: `91vw`,
//             maxHeight: `60vw`,
//             borderRadius: `10px`
//         }
//     },
//     h1Home: {
//         fontFamily: 'Oswald, cursive',
//         fontWeight: '900',
//         lineHeight: 2,
//         fontSize: '46px',
//         paddingLeft: `30px`,
//         [theme.breakpoints.down('600')]: {
//             fontSize: '32px',
//             lineHeight: `14vmin`,
//             letterSpacing: `1px`,
//             color: `#000`,
//             padding: `10px 0 10px 0`
//         },
//     },
//     button: {
//         margin: `0 auto`,
//         width: `100%`
//     }
// }))
//
// const CarouselSvisni = () => {
//
//     const [activeStep, setActiveStep] = React.useState(0);
//
//     const theme = useTheme();
//     const classes = useStyleCarousel();
//
//     const data = useStaticQuery(graphql `
//         {
//             allContentfulCarouselSiteImage {
//                 edges {
//                     node {
//                         id
//                         slug
//                         imgCarouselPc {
//                             fluid(maxWidth: 1680, quality: 90) {
//                                 ...GatsbyContentfulFluid
//                             }
//                         }
//                         imgCarouselPhone {
//                             fluid(maxWidth: 400, quality: 90) {
//                                 ...GatsbyContentfulFluid
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     `)
//
//     const maxSteps = data.allContentfulCarouselSiteImage.edges.length;
//
//     const handleStepChange = step => {
//         setActiveStep(step);
//     };
//
//     return (
//         <div className={classes.root}>
//
//             <Paper square elevation={0} className={classes.header}>
//                 <Typography variant="h1" className={classes.h1Home}>Свисни Суши в Уразово</Typography>
//             </Paper>
//             <Hidden xsDown>
//                 <AutoPlaySwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//                                         index={activeStep}
//                                         onChangeIndex={handleStepChange}
//                                         enableMouseEvents>
//
//                     {data.allContentfulCarouselSiteImage.edges.map((step, index) => (
//                         <div key={step.node.id}>
//                             {Math.abs(activeStep - index) <= 2 ? (
//                                 <Link to={step.node.slug}>
//                                     <Img fluid={step.node.imgCarouselPc.fluid} className={classes.img} imgStyle={{maxWidth: 1400}} alt={step.node.id} />
//                                 </Link>
//                             ) : null}
//                         </div>
//                     ))}
//                 </AutoPlaySwipeableViews>
//
//             </Hidden>
//
//             <Hidden smUp>
//                 <AutoPlaySwipeableViews
//                     axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//                     index={activeStep}
//                     onChangeIndex={handleStepChange}
//                     enableMouseEvents>
//                     {data.allContentfulCarouselSiteImage.edges.map((step, index) => {
//
//                         return (
//                             <div key={step.node.id}>
//                                 {Math.abs(activeStep - index) <= 2 ? (
//                                     <>
//                                         <Link to={step.node.slug}>
//                                             <Img fluid={step.node.imgCarouselPhone.fluid} className={classes.img} imgStyle={{maxWidth: 400}} alt={step.node.id} />
//                                         </Link>
//                                     </>
//                                 ) : null
//                                 }
//
//                             </div>
//                         )})}
//                 </AutoPlaySwipeableViews>
//             </Hidden>
//
//             <MobileStepper
//                 steps={maxSteps}
//                 position="static"
//                 variant="progress"
//                 activeStep={activeStep}
//                 style={{marginBottom: 5, paddingLeft: '30vw'}}>
//             </MobileStepper>
//         </div>
//     );
// }
//
// export default CarouselSvisni;
//
