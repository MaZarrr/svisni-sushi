import React, { useState } from 'react';
import {Link, graphql, useStaticQuery} from 'gatsby'
import Img from 'gatsby-image'
import '../sass/index.css'
import ItemsCarousel from 'react-items-carousel';
const Carousel = () => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    const {allContentfulCarouselSiteImage: {edges}} = useStaticQuery(graphql `
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
        <div style={{maxWidth: `100%`, margin: `0 auto`}}>
            <ItemsCarousel
                infiniteLoop={true}
                gutter={12}
                activePosition={'center'}
                chevronWidth={60}
                disableSwipe={false}
                alwaysShowChevrons={false}
                numberOfCards={1}
                slidesToScroll={1}
                outsideChevron={false}
                showSlither={true}
                firstAndLastGutter={true}
                activeItemIndex={activeItemIndex}
                requestToChangeActive={setActiveItemIndex}
                rightChevron={'>'}
                leftChevron={'<'}
            >
                    {edges.map((step, index) => (
                        <div key={step.node.id}>
                                <Link to={step.node.slug}>
                                    <Img style={{maxWidth: 1200, borderRadius: 10}} fluid={step.node.imgCarouselPc.fluid}  alt={step.node.id} />
                                </Link>
                        </div>
                    ))}
            </ItemsCarousel>
        </div>
            )}

export default Carousel

// import React from 'react';
// import SwipeableViews from 'react-swipeable-views';
// import Animated from 'react-dom';
//
// const styles = {
//     root: {
//         background: '#000',
//         padding: '0 50px',
//     },
//     slide: {
//         padding: '24px 16px',
//         color: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'column',
//         display: 'flex',
//     },
//     img: {
//         width: 180,
//         height: 180,
//         display: 'block',
//         marginBottom: 16,
//     },
// };
//
// const albums = [
//     {
//         name: 'Abbey Road',
//         src: '/static/album-art-1.jpg',
//     },
//     {
//         name: 'Bat Out of Hell',
//         src: '/static/album-art-2.jpg',
//     },
//     {
//         name: 'Homogenic',
//         src: '/static/album-art-3.jpg',
//     },
//     {
//         name: 'Number of the Beast',
//         src: '/static/album-art-4.jpg',
//     },
//     {
//         name: "It's Blitz",
//         src: '/static/album-art-5.jpg',
//     },
//     {
//         name: 'The Man-Machine',
//         src: '/static/album-art-6.jpg',
//     },
//     {
//         name: 'The Score',
//         src: '/static/album-art-7.jpg',
//     },
//     {
//         name: 'Lost Horizons',
//         src: '/static/album-art-8.jpg',
//     },
// ];
//
// class DemoCoverflow extends React.Component {
//     state = {
//         index: 0,
//         position: new Animated.value(0),
//     };
//
//     handleChangeIndex = index => {
//         this.setState({ index });
//     };
//
//     handleSwitch = (index, type) => {
//         if (type === 'end') {
//             Animated.spring(this.state.position, { toValue: index }).start();
//             return;
//         }
//         this.state.position.setValue(index);
//     };
//
//     render() {
//         const { index, position } = this.state;
//
//         return (
//             <SwipeableViews
//                 index={index}
//                 style={styles.root}
//                 onChangeIndex={this.handleChangeIndex}
//                 onSwitching={this.handleSwitch}
//             >
//                 {albums.map((album, currentIndex) => {
//                     const inputRange = albums.map((_, i) => i);
//                     const scale = position.interpolate({
//                         inputRange,
//                         outputRange: inputRange.map(i => {
//                             return currentIndex === i ? 1 : 0.7;
//                         }),
//                     });
//                     const opacity = position.interpolate({
//                         inputRange,
//                         outputRange: inputRange.map(i => {
//                             return currentIndex === i ? 1 : 0.3;
//                         }),
//                     });
//                     const translateX = position.interpolate({
//                         inputRange,
//                         outputRange: inputRange.map(i => {
//                             return (100 / 2) * (i - currentIndex);
//                         }),
//                     });
//
//                     return (
//                         <Animated.div
//                             key={String(currentIndex)}
//                             style={Object.assign(
//                                 {
//                                     opacity,
//                                     transform: [{ scale }, { translateX }],
//                                 },
//                                 styles.slide,
//                             )}
//                         >
//                             <img style={styles.img} src={album.src} alt="cover" />
//                             {album.name}
//                         </Animated.div>
//                     );
//                 })}
//             </SwipeableViews>
//         );
//     }
// }
//
// export default DemoCoverflow;




///===========================================================
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import React from 'react'
// import {Link, useStaticQuery, graphql} from 'gatsby'
// import Img from "gatsby-image";
// import '../sass/index.css'
//
// const responsive = {
//     desktop: {
//         breakpoint: { max: 3000, min: 1024 },
//         items: 1,
//         // width: `900px`,
//         // slidesToSlide: 1, // optional, default to 1.
//         // partialVisibilityGutter: 40
//     },
//     tablet: {
//         breakpoint: { max: 1024, min: 464 },
//         items: 1,
//         // partalVisibilityGutter : 30
//         // slidesToSlide: 2 // optional, default to 1.
//     },
//     mobile: {
//         breakpoint: { max: 464, min: 0 },
//         items: 1,
//         // partalVisibilityGutter : 30
//         // slidesToSlide: 1 // optional, default to 1.
//     }
// };
//
// const CarouselIdx = () =>  {
//     const {allContentfulCarouselSiteImage: {edges}} = useStaticQuery(graphql `
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
//     const [ref] = React.useRef();
//     return (
// <Carousel
//     // swipeable={true}
//     // showDots={true}
//     // draggable={true}
//     // transitionDuration={500}
//     // ref={ref}
//     // additionalTransfrom={-20 * 3} // отступ влево
//     responsive={responsive}
//     additionalTransfrom={0}
//     draggable={false}
//     arrows
//     autoPlaySpeed={3000}
//     centerMode
//     // className="react-carousel"
//     containerClass="container_items"
//     draggable
//     focusOnSelect={false}
//     infinite
//     autoPlay
//     swipeable
//     keyBoardControl
//     minimumTouchDrag={80}
//     renderButtonGroupOutside={false}
//     renderDotsOutside={false}
//     itemClass="react-carousel-ii"
//     ssr={true} // means to render carousel on server-side.
//     // infinite={true} // бесконечно
//     // autoPlaySpeed={2000}
//     // autoPlay={true}
//     // partialVisible={true}
//     // centerMode={true}
//     // keyBoardControl={true}
//     // customTransition="all .2"
//     // sliderClass="slide_class"
//     // containerClass="carousel-container"
//     // removeArrowOnDeviceType={["tablet", "mobile"]}
//     // deviceType={this.props.deviceType}
//     // dotListClass="custom-dot-list-style"
// >
//     {edges.map((step, index) => (
//                        <div key={step.node.id}>
//                                <Link to={step.node.slug}>
//                                    <Img style={{maxWidth: 1200, borderRadius: 10}} fluid={step.node.imgCarouselPc.fluid}  alt={step.node.id} />
//                                </Link>
//                        </div>
//                    ))}
// </Carousel>
// )};
//
// export default CarouselIdx


// import React from 'react';
// import SwipeableViews from 'react-swipeable-views';
// import { virtualize, autoPlay } from 'react-swipeable-views-utils';
// import { mod } from 'react-swipeable-views-core';
// import Pagination from "./PaginationsCarousel";
// import {graphql, useStaticQuery} from "gatsby";
// import {lastIndexOf} from "ramda";
//
// const VirtualizeSwipeableViews = autoPlay(virtualize(SwipeableViews));
//
// const styles = {
//     root: {
//         padding: '0 30px',
//     },
//     wrapped: {
//       position: `relative`,
//     },
//     slideContainer: {
//         padding: '0 10px',
//     },
//     slide: {
//         padding: 15,
//         minHeight: 100,
//         color: '#fff',
//     },
//     slide1: {
//         backgroundColor: '#FEA900',
//     },
//     slide2: {
//         backgroundColor: '#B3DC4A',
//     },
//     slide3: {
//         backgroundColor: '#6AC0FF',
//     },
// }
//
// function slideRenderer(params) {
//     console.log(params)
//     const { index, edges} = params;
//     const key = mod(index, params.edges.length)
//     console.log(params.edges.length)
//     // console.log('indexActive', index)
// //     console.log('key', key)
// //     // console.log(mod(8, 3))
// //     switch (mod()) {
// //     { params.edges.map((item) => {
// //
// //     })}
// // }
// //
//     switch (mod(index, params.edges.length)) {
//         case 0:
//             return (
//                 <div key={key} style={Object.assign({}, styles.slide, styles.slide1)}>
//                     slide n°1
//                 </div>
//             );
//
//         case 1:
//             return (
//                 <div key={key} style={Object.assign({}, styles.slide, styles.slide2)}>
//                     slide n°2
//                 </div>
//             );
//
//         case 2:
//             return (
//                 <div key={key} style={Object.assign({}, styles.slide, styles.slide3)}>
//                     slide n°3
//                 </div>
//             );
//
//         default:
//             return null;
//     }
// }
//
// function Carousel() {
//
//     const [activeStep, setActiveStep] = React.useState(1);
//     const steps = Object.keys(styles).length;
//     console.log(mod);
//     const handleChangeIndex = step => setActiveStep(step);
//     const {allContentfulCarouselSiteImage: {edges}} = useStaticQuery(graphql `
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
//     return (
//         <div style={styles.wrapped}>
//             <VirtualizeSwipeableViews index={activeStep}
//                                       onChangeIndex={handleChangeIndex}
//                                       enableMouseEvents
//                                       key={edges}
//                                       style={styles.root}
//                                       slideStyle={styles.slideContainer}
//                                       slideRenderer={() => slideRenderer({edges, index: activeStep})} />;
//             <Pagination dots={steps} index={activeStep} onChangeIndex={handleChangeIndex} />
//         </div>
//     )
// }
//
// export default Carousel;
//
//
//
//
// // import React from 'react';
// // import SwipeableViews from 'react-swipeable-views';
// // import { autoPlay, virtualize } from 'react-swipeable-views-utils';
// // import {makeStyles, useTheme} from '@material-ui/core/styles';
// // import { mod } from 'react-swipeable-views-core';
// //
// // const styles = {
// //     root: {
// //         padding: '0 30px',
// //     },
// //     slideContainer: {
// //         padding: '0 10px',
// //     },
// //     slide: {
// //         padding: 15,
// //         minHeight: 100,
// //         color: '#fff',
// //     },
// //     slide1: {
// //         backgroundColor: '#FEA900',
// //     },
// //     slide2: {
// //         backgroundColor: '#B3DC4A',
// //     },
// //     slide3: {
// //         backgroundColor: '#6AC0FF',
// //     },
// // };
// //
// // const AutoPlaySwipeable = autoPlay(SwipeableViews);
// //
// // function DemoWidth() {
// //     const [activeStep, setActiveStep] = React.useState(1);
// //     const steps = Object.keys(styles).length;
// //     const theme = useTheme();
// //
// //     const handleStepChange = step => {
// //             setActiveStep(step);
// //         }
// //
// //
// //     return (
// //         <AutoPlaySwipeable
// //             // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
// //             axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
// //                                index={activeStep}
// //                                onChangeIndex={handleStepChange}
// //                                enableMouseEvents style={styles.root} slideStyle={styles.slideContainer}>
// //             <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
// //             <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
// //             <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
// //         </AutoPlaySwipeable>
// //     );
// // }
// //
// // export default DemoWidth;
//
//
// // import React from 'react';
// // import { graphql, useStaticQuery, Link } from "gatsby"
// // import Img from 'gatsby-image';
// // import {makeStyles, useTheme} from '@material-ui/core/styles';
// // import MobileStepper from '@material-ui/core/MobileStepper';
// // import Paper from '@material-ui/core/Paper';
// // import Typography from '@material-ui/core/Typography';
// // import SwipeableViews from 'react-swipeable-views';
// // import { autoPlay } from 'react-swipeable-views-utils';
// // import {Hidden} from "@material-ui/core";
// // // import Carousel from 'react-multi-carousel';
// // // import 'react-multi-carousel/lib/styles.css';
// //
// //
// // const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
// //
// // const useStyleCarousel = makeStyles(theme => ({
// //     root: {
// //         padding: '0 30px',
// //         maxWidth: `100vw`,
// //         flexGrow: '1',
// //         [theme.breakpoints.down('768')]: {
// //             marginBottom: 40,
// //         },
// //         [theme.breakpoints.down('475')]: {
// //             marginBottom: 0,
// //         },
// //     },
// //     header: {
// //         display: 'flex',
// //         alignItems: 'center',
// //         paddingTop: '8px',
// //         maxWidth: `1400px`,
// //         justifyContent: 'flex-start',
// //         background: `#f0ecec`,
// //         paddingLeft: theme.spacing(2)
// //     },
// //     slideContainer: {
// //         padding: '0 10px',
// //     },
// //     slide: {
// //         padding: 15,
// //         minHeight: 100,
// //         color: '#fff',
// //     },
// //     slide1: {
// //         backgroundColor: '#FEA900',
// //     },
// //     slide2: {
// //         backgroundColor: '#B3DC4A',
// //     },
// //     slide3: {
// //         backgroundColor: '#6AC0FF',
// //     },
// //     img: {
// //         height: 'inherit',
// //         display: 'block',
// //         margin: `0 auto`,
// //         borderRadius: `10px`,
// //         // maxWidth: `100vw`,
// //         overflow: 'hidden',
// //         maxHeight: `350px`,
// //         width: '95vw',
// //         [theme.breakpoints.down('768')]: {
// //             margin: `0 auto`,
// //             maxHeight: `80vw`,
// //             maxWidth: `90vw`,
// //         },
// //         [theme.breakpoints.down('590')]: {
// //             margin: `0 auto`,
// //             maxHeight: `50vw`,
// //             maxWidth: `90vw`,
// //         },
// //         [theme.breakpoints.down('475')]: {
// //             maxWidth: `91vw`,
// //             maxHeight: `60vw`,
// //             borderRadius: `10px`
// //         }
// //     },
// //     h1Home: {
// //         fontFamily: 'Oswald, cursive',
// //         fontWeight: '900',
// //         lineHeight: 2,
// //         fontSize: '46px',
// //         paddingLeft: `30px`,
// //         [theme.breakpoints.down('600')]: {
// //             fontSize: '32px',
// //             lineHeight: `14vmin`,
// //             letterSpacing: `1px`,
// //             color: `#000`,
// //             padding: `10px 0 10px 0`
// //         },
// //     },
// //     button: {
// //         margin: `0 auto`,
// //         width: `100%`
// //     }
// // }));
// //
// // const CarouselSvisni = () => {
// //
// //     const [activeStep, setActiveStep] = React.useState(0);
// //
// //     const theme = useTheme();
// //     const classes = useStyleCarousel();
// //
// //     const data = useStaticQuery(graphql `
// //         {
// //             allContentfulCarouselSiteImage {
// //                 edges {
// //                     node {
// //                         id
// //                         slug
// //                         imgCarouselPc {
// //                             fluid(maxWidth: 1680, quality: 90) {
// //                                 ...GatsbyContentfulFluid
// //                             }
// //                         }
// //                         imgCarouselPhone {
// //                             fluid(maxWidth: 400, quality: 90) {
// //                                 ...GatsbyContentfulFluid
// //                             }
// //                         }
// //                     }
// //                 }
// //             }
// //         }
// //     `)
// //
// //     const maxSteps = data.allContentfulCarouselSiteImage.edges.length;
// //
// //     const handleStepChange = step => {
// //         setActiveStep(step);
// //     };
// //
// //     return (
// //         <div className={classes.root}>
// //
// //             <Paper square elevation={0} className={classes.header}>
// //                 <Typography variant="h1" className={classes.h1Home}>Свисни Суши в Уразово</Typography>
// //             </Paper>
// //             <Hidden xsDown>
// //                 <AutoPlaySwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
// //                                         index={activeStep}
// //                                         onChangeIndex={handleStepChange}
// //                                         enableMouseEvents>
// //
// //                     {data.allContentfulCarouselSiteImage.edges.map((step, index) => (
// //                         <div key={step.node.id}>
// //                             {Math.abs(activeStep - index) <= 2 ? (
// //                                 <Link to={step.node.slug}>
// //                                     <Img fluid={step.node.imgCarouselPc.fluid} className={classes.img} imgStyle={{maxWidth: 1400}} alt={step.node.id} />
// //                                 </Link>
// //                             ) : null}
// //                         </div>
// //                     ))}
// //                 </AutoPlaySwipeableViews>
// //
// //             </Hidden>
// //
// //             <Hidden smUp>
// //                 <AutoPlaySwipeableViews
// //                     axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
// //                     index={activeStep}
// //                     onChangeIndex={handleStepChange}
// //                     enableMouseEvents>
// //                     {data.allContentfulCarouselSiteImage.edges.map((step, index) => {
// //
// //                         return (
// //                             <div key={step.node.id}>
// //                                 {Math.abs(activeStep - index) <= 2 ? (
// //                                     <>
// //                                         <Link to={step.node.slug}>
// //                                             <Img fluid={step.node.imgCarouselPhone.fluid} className={classes.img} imgStyle={{maxWidth: 400}} alt={step.node.id} />
// //                                         </Link>
// //                                     </>
// //                                 ) : null
// //                                 }
// //
// //                             </div>
// //                         )})}
// //                 </AutoPlaySwipeableViews>
// //             </Hidden>
// //
// //             <MobileStepper
// //                 steps={maxSteps}
// //                 position="static"
// //                 variant="progress"
// //                 activeStep={activeStep}
// //                 style={{marginBottom: 5, paddingLeft: '30vw'}}>
// //             </MobileStepper>
// //         </div>
// //     );
// // }
// //
// // export default CarouselSvisni;
//
//
//
// // import React from 'react';
// // import {graphql, useStaticQuery} from 'gatsby'
// // import GatsbyImage from "gatsby-image";
// // import '../header.css'
// // import {animated, useSpring} from "react-spring"
// // import {useScroll} from "react-use-gesture";
// // import { makeStyles } from '@material-ui/core/styles';
// // import Card from '@material-ui/core/Card';
// // import CardActionArea from '@material-ui/core/CardActionArea';
// // import CardActions from '@material-ui/core/CardActions';
// // import CardContent from '@material-ui/core/CardContent';
// // import CardMedia from '@material-ui/core/CardMedia';
// // import Button from '@material-ui/core/Button';
// // import Typography from '@material-ui/core/Typography';
// //
// // const useStyles = makeStyles({
// //     root: {
// //         maxWidth: 150,
// //     },
// //     media: {
// //         height: 140,
// //     },
// // });
// //
// // const CarouselSvisni = () => {
// // const data = useStaticQuery(graphql`
// //     {
// //         allContentfulProductSushi {
// //             edges {
// //                 node {
// //                     id
// //                     name
// //                     description
// //                     count
// //                     price
// //                     weight
// //                     image {
// //                         fluid(maxWidth: 300, maxHeight: 300) {
// //                             ...GatsbyContentfulFluid
// //                         }
// //                     }
// //                 }
// //             }
// //         }
// //     }
// // `);
// // console.log("dataCarousel 27", data);
// //     const classes = useStyles();
// //
// // const [style, set] = useSpring(() => ({
// //  transform: "perspective(500px) rotateY(0deg)"
// // }));
// //
// // const clamp = (value, clampAt = 30) => {
// //     if(value > 0) {
// //         return value > clampAt ? clampAt : value;
// //     } else {
// //         return value < -clampAt ? -clampAt : value;
// //     }
// // };
// //
// // const bind = useScroll(event => {
// //     set({
// //         transform: `perspective(500px) rotateY(${
// //             event.scrolling ? clamp(event.delta[0]) : 0
// //         }deg)`
// //     })
// // });
// //
// //     return (
// //       <div className={"container"} {...bind()}>
// //           {data.allContentfulProductSushi.edges.map((elem) => {
// //               return (
// //                   <animated.div key={elem.id}
// //                   className={"card"}
// //                   style={{...style}}
// //                   >
// //                       <Card className={classes.root}>
// //                           <CardActionArea>
// //                               {/*<CardMedia className={classes.media}>*/}
// //                                   <GatsbyImage style={{maxWidth: 150}} fluid={elem.node.image.fluid}/>
// //                               {/*</CardMedia>*/}
// //                               <CardContent>
// //                                   <Typography gutterBottom variant="h5" component="h2">
// //                                       Lizard
// //                                   </Typography>
// //                                   {/*<Typography variant="body2" color="textSecondary" component="p">*/}
// //                                   {/*    Lizards are a widespread group of squamate reptiles, with over 6,000 species*/}
// //                                   {/*</Typography>*/}
// //                               </CardContent>
// //                           </CardActionArea>
// //                           <CardActions>
// //                               <Button size="small" color="primary">
// //                                   Share
// //                               </Button>
// //                               <Button size="small" color="primary">
// //                                   Learn More
// //                               </Button>
// //                           </CardActions>
// //                       </Card>
// //                   </animated.div>
// //               )
// //           })}
// //       </div>
// //     );
// // };
// //
// // export default CarouselSvisni;
//
//
//
//
// //
// // import React, {useState} from 'react';
// // import { graphql, useStaticQuery, Link } from "gatsby"
// // import Img from 'gatsby-image';
// // import {makeStyles, useTheme} from '@material-ui/core/styles';
// // import MobileStepper from '@material-ui/core/MobileStepper';
// // import Paper from '@material-ui/core/Paper';
// // import Typography from '@material-ui/core/Typography';
// // import SwipeableViews from 'react-swipeable-views';
// // import { autoPlay } from 'react-swipeable-views-utils';
// // import {Hidden} from "@material-ui/core";
// // import {useSpring, animated} from "react-spring"
// // import '../sass/index.css'
// // import {useDrag} from "react-use-gesture";
// // import Button from "@material-ui/core/Button";
// // import Checkout from "../Checkout";
// //
// // const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
// //
// // const useStyleCarousel = makeStyles(theme => ({
// //     root: {
// //         maxWidth: `100vw`,
// //         flexGrow: '1',
// //         [theme.breakpoints.down('768')]: {
// //             marginBottom: 40,
// //         },
// //         [theme.breakpoints.down('475')]: {
// //             marginBottom: 0,
// //         },
// //     },
// //     header: {
// //         display: 'flex',
// //         alignItems: 'center',
// //         paddingTop: '8px',
// //         maxWidth: `1400px`,
// //         justifyContent: 'flex-start',
// //         background: `#f0ecec`,
// //         paddingLeft: theme.spacing(2)
// //     },
// //     img: {
// //         height: 'inherit',
// //         display: 'block',
// //         margin: `0 auto`,
// //         borderRadius: `10px`,
// //         // maxWidth: `100vw`,
// //         overflow: 'hidden',
// //         maxHeight: `350px`,
// //         width: '95vw',
// //         [theme.breakpoints.down('768')]: {
// //             margin: `0 auto`,
// //             maxHeight: `80vw`,
// //             maxWidth: `90vw`,
// //         },
// //         [theme.breakpoints.down('590')]: {
// //             margin: `0 auto`,
// //             maxHeight: `50vw`,
// //             maxWidth: `90vw`,
// //         },
// //         [theme.breakpoints.down('475')]: {
// //             maxWidth: `91vw`,
// //             maxHeight: `60vw`,
// //             borderRadius: `10px`
// //         }
// //     },
// //     h1Home: {
// //         fontFamily: 'Oswald, cursive',
// //         fontWeight: '900',
// //         lineHeight: 2,
// //         fontSize: '46px',
// //         paddingLeft: `30px`,
// //         [theme.breakpoints.down('600')]: {
// //             fontSize: '32px',
// //             lineHeight: `14vmin`,
// //             letterSpacing: `1px`,
// //             color: `#000`,
// //             padding: `10px 0 10px 0`
// //         },
// //     },
// //     button: {
// //         margin: `0 auto`,
// //         width: `100%`
// //     }
// // }))
// //
// // // const THRESHOLD = 15;
// //
// // const CarouselSvisni = () => {
// //     const theme = useTheme();
// //     const data = useStaticQuery(graphql `
// //         {
// //             allContentfulCarouselSiteImage {
// //                 edges {
// //                     node {
// //                         id
// //                         slug
// //                         imgCarouselPc {
// //                             fluid(maxWidth: 1680, quality: 90) {
// //                                 ...GatsbyContentfulFluid
// //                             }
// //                         }
// //                         imgCarouselPhone {
// //                             fluid(maxWidth: 400, quality: 90) {
// //                                 ...GatsbyContentfulFluid
// //                             }
// //                         }
// //                     }
// //                 }
// //             }
// //             allContentfulProductSushi {
// //                 edges {
// //                     node {
// //                         id
// //                         name
// //                         description
// //                         count
// //                         price
// //                         weight
// //                         image {
// //                             fluid(maxWidth: 300, maxHeight: 300) {
// //                                 ...GatsbyContentfulFluid
// //                             }
// //                         }
// //                     }
// //                 }
// //             }
// //         }
// //     `)
// //     const classes = useStyleCarousel();
// //     const [activeStep, setActiveStep] = React.useState(0);
// //     const maxSteps = data.allContentfulCarouselSiteImage.edges.length;
// //     const [isToggled, setToggled] = React.useState(false);
// //     const [isNavOpen, setNavOpen] = React.useState(false);
// //     // const navAnimation = useSpring({
// //     //    transform: isNavOpen ? `translate3d(0, 0, 0)` : `translate3d(100%, 0, 0)`
// //     // });
// //
// //   const handleStepChange = step => {
// //     setActiveStep(step);
// //   };
// //
// //   // const fade = useSpring({
// //   //    from: {
// //   //        opacity: 0
// //   //    },
// //   //     to: {
// //   //        opacity: 1
// //   //     }
// //   // });
// //     const {backgroundColor, y} = useSpring({
// //         backgroundColor: isToggled ? 'tomato' : 'yellow',
// //         y: isToggled ? 0 : 50
// //     });
// //
// //   return (
// //     <div className={classes.root}>
// //       <Paper square elevation={0} className={classes.header}>
// //       <Typography variant="h1" className={classes.h1Home}>Свисни Суши в Уразово</Typography>
// //       </Paper>
// //         <Hidden xsDown>
// //             <AutoPlaySwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
// //                                     index={activeStep}
// //                                     onChangeIndex={handleStepChange}
// //                                     enableMouseEvents>
// //
// //                 {data.allContentfulCarouselSiteImage.edges.map((step, index) => (
// //                     <div key={step.node.id}>
// //                         {Math.abs(activeStep - index) <= 2 ? (
// //                             <Link to={step.node.slug}>
// //                                 <Img fluid={step.node.imgCarouselPc.fluid} className={classes.img} imgStyle={{maxWidth: 1400}} alt={step.node.id} />
// //                             </Link>
// //                         ) : null}
// //                     </div>
// //                 ))}
// //             </AutoPlaySwipeableViews>
// //
// //         </Hidden>
// //
// //     <Hidden smUp>
// //       <AutoPlaySwipeableViews
// //         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
// //         index={activeStep}
// //         onChangeIndex={handleStepChange}
// //         enableMouseEvents>
// //         {data.allContentfulCarouselSiteImage.edges.map((step, index) => {
// //
// //         return (
// //           <div key={step.node.id}>
// //             {Math.abs(activeStep - index) <= 2 ? (
// //               <>
// //                 <Link to={step.node.slug}>
// //                   <Img fluid={step.node.imgCarouselPhone.fluid} className={classes.img} imgStyle={{maxWidth: 400}} alt={step.node.id} />
// //                 </Link>
// //             </>
// //             ) : null
// //             }
// //
// //           </div>
// //         )})}
// //       </AutoPlaySwipeableViews>
// //     </Hidden>
// //
// //         <MobileStepper
// //         steps={maxSteps}
// //         position="static"
// //         variant="progress"
// //         activeStep={activeStep}
// //         style={{marginBottom: 5, paddingLeft: '30vw'}}>
// //         </MobileStepper>
// //
// // <div style={{width: `100%`, height: 100 }}>
// // <AnimatedButton style={{
// //     transform: y.interpolate(y => `translate3d(0, ${y}px, 0)`),
// //     backgroundColor
// // }}>
// //     <Button variant={"contained"} color={"primary"}>Fade</Button>
// // </AnimatedButton>
// // </div>
// //         <div>
// //             <Button onClick={() => setToggled(!isToggled)}>Toggled</Button>
// //         </div>
// //         {/*<div>*/}
// //         {/*    <Button onClick={() => setNavOpen(!isNavOpen)}>Toggled</Button>*/}
// //         {/*</div>*/}
// //
// //         {/*<Checkout isOpen={isNavOpen}/>*/}
// //     </div>
// //   );
// // };
// //
// // export default CarouselSvisni;
// //
// // const AnimatedButton = animated.div;
// // // const AnimatedButton = animated(componentName);
// //
// // // const [animating, setAnimating] = React.useState(false);
// // // const [activeItem, setActiveItem] = React.useState(0);
// // // // console.log(activeItem);
// // //
// // // const [{x}, set] = useSpring(() => ({
// // //     x: [0, 0]
// // // }));
// // // const bind = useDrag(({movement: [mx]}) => {
// // //     let moveX = (mx / window.innerHeight) * 100;
// // //     let rotate = 360 * (moveX / 100);
// // //     //block animation
// // //     if (animating) {
// // //         return
// // //     }
// // //
// // //     if(moveX > 0 && activeItem === 0) {
// // //         return;
// // //     }
// // //
// // //     if(moveX < 0 && activeItem === data.allContentfulProductSushi.edges.length - 1) {
// // //         setActiveItem(0);
// // //         return;
// // //     }
// // //
// // //     if(moveX < -THRESHOLD) {
// // //         // going left
// // //         moveX = -100;
// // //         rotate = 360;
// // //         animateNextSlide("left")
// // //     } else if (moveX > THRESHOLD) {
// // //         // going right
// // //         moveX = 100;
// // //         rotate = -360;
// // //         animateNextSlide("right")
// // //     }
// // //
// // //     moveX = moveX - (100 * activeItem);
// // //     rotate = rotate + 360 * activeItem;
// // //
// // //     set({
// // //         x: [moveX, rotate]
// // //     });
// // // });
// // //
// // // const animateNextSlide = (direction) => {
// // //     setAnimating(true);
// // //     const value = direction === "left" ? 1 : -1
// // //     setActiveItem(activeItem + value);
// // //     setTimeout(() => {
// // //         setAnimating(false)
// // //     }, 1000)
// // // };
// //
// //
// //
// // // <animated.div className="slider" {...bind()}>
// // //     {data.allContentfulProductSushi.edges.map(el => <animated.div key={el.id} className="slider-item" style={{
// // //         transform: x.interpolate(
// // //             (value, rotate) => `translate3d(${value}%, 0px, 0px) rotate(${rotate}deg)`
// // //         )
// // //     }}>
// // //         <Img className="slider-img" fluid={el.node.image.fluid}/>
// // //     </animated.div>)}
// // //
// // // </animated.div>
