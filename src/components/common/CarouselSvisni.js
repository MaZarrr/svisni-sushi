// import React from 'react';
// import {graphql, useStaticQuery} from 'gatsby'
// import GatsbyImage from "gatsby-image";
// import '../header.css'
// import {animated, useSpring} from "react-spring"
// import {useScroll} from "react-use-gesture";
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
//
// const useStyles = makeStyles({
//     root: {
//         maxWidth: 150,
//     },
//     media: {
//         height: 140,
//     },
// });
//
// const CarouselSvisni = () => {
// const data = useStaticQuery(graphql`
//     {
//         allContentfulProductSushi {
//             edges {
//                 node {
//                     id
//                     name
//                     description
//                     count
//                     price
//                     weight
//                     image {
//                         fluid(maxWidth: 300, maxHeight: 300) {
//                             ...GatsbyContentfulFluid
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `);
// console.log("dataCarousel 27", data);
//     const classes = useStyles();
//
// const [style, set] = useSpring(() => ({
//  transform: "perspective(500px) rotateY(0deg)"
// }));
//
// const clamp = (value, clampAt = 30) => {
//     if(value > 0) {
//         return value > clampAt ? clampAt : value;
//     } else {
//         return value < -clampAt ? -clampAt : value;
//     }
// };
//
// const bind = useScroll(event => {
//     set({
//         transform: `perspective(500px) rotateY(${
//             event.scrolling ? clamp(event.delta[0]) : 0
//         }deg)`
//     })
// });
//
//     return (
//       <div className={"container"} {...bind()}>
//           {data.allContentfulProductSushi.edges.map((elem) => {
//               return (
//                   <animated.div key={elem.id}
//                   className={"card"}
//                   style={{...style}}
//                   >
//                       <Card className={classes.root}>
//                           <CardActionArea>
//                               {/*<CardMedia className={classes.media}>*/}
//                                   <GatsbyImage style={{maxWidth: 150}} fluid={elem.node.image.fluid}/>
//                               {/*</CardMedia>*/}
//                               <CardContent>
//                                   <Typography gutterBottom variant="h5" component="h2">
//                                       Lizard
//                                   </Typography>
//                                   {/*<Typography variant="body2" color="textSecondary" component="p">*/}
//                                   {/*    Lizards are a widespread group of squamate reptiles, with over 6,000 species*/}
//                                   {/*</Typography>*/}
//                               </CardContent>
//                           </CardActionArea>
//                           <CardActions>
//                               <Button size="small" color="primary">
//                                   Share
//                               </Button>
//                               <Button size="small" color="primary">
//                                   Learn More
//                               </Button>
//                           </CardActions>
//                       </Card>
//                   </animated.div>
//               )
//           })}
//       </div>
//     );
// };
//
// export default CarouselSvisni;





import React from 'react';
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from 'gatsby-image';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {Hidden} from "@material-ui/core";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyleCarousel = makeStyles(theme => ({
    root: {
        maxWidth: `100vw`,
        flexGrow: '1',
        [theme.breakpoints.down('768')]: {
            marginBottom: 40,
        },
        [theme.breakpoints.down('475')]: {
            marginBottom: 0,
        },
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: '8px',
        maxWidth: `1400px`,
        justifyContent: 'flex-start',
        background: `#f0ecec`,
        paddingLeft: theme.spacing(2)
    },
    img: {
        height: 'inherit',
        display: 'block',
        margin: `0 auto`,
        borderRadius: `10px`,
        // maxWidth: `100vw`,
        overflow: 'hidden',
        maxHeight: `350px`,
        width: '95vw',
        [theme.breakpoints.down('768')]: {
            margin: `0 auto`,
            maxHeight: `80vw`,
            maxWidth: `90vw`,
        },
        [theme.breakpoints.down('590')]: {
            margin: `0 auto`,
            maxHeight: `50vw`,
            maxWidth: `90vw`,
        },
        [theme.breakpoints.down('475')]: {
            maxWidth: `91vw`,
            maxHeight: `60vw`,
            borderRadius: `10px`
        }
    },
    h1Home: {
        fontFamily: 'Oswald, cursive',
        fontWeight: '900',
        lineHeight: 2,
        fontSize: '46px',
        paddingLeft: `30px`,
        [theme.breakpoints.down('600')]: {
            fontSize: '32px',
            lineHeight: `14vmin`,
            letterSpacing: `1px`,
            color: `#000`,
            padding: `10px 0 10px 0`
        },
    },
    button: {
        margin: `0 auto`,
        width: `100%`
    }
}))

const CarouselSvisni = () => {

  const [activeStep, setActiveStep] = React.useState(0);

  const theme = useTheme();
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

const maxSteps = data.allContentfulCarouselSiteImage.edges.length;

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>

      <Paper square elevation={0} className={classes.header}>
      <Typography variant="h1" className={classes.h1Home}>Свисни Суши в Уразово</Typography>
      </Paper>
        <Hidden xsDown>
            <AutoPlaySwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={activeStep}
                                    onChangeIndex={handleStepChange}
                                    enableMouseEvents>

                {data.allContentfulCarouselSiteImage.edges.map((step, index) => (
                    <div key={step.node.id}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Link to={step.node.slug}>
                                <Img fluid={step.node.imgCarouselPc.fluid} className={classes.img} imgStyle={{maxWidth: 1400}} alt={step.node.id} />
                            </Link>
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>

        </Hidden>

    <Hidden smUp>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents>
        {data.allContentfulCarouselSiteImage.edges.map((step, index) => {

        return (
          <div key={step.node.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <>
                <Link to={step.node.slug}>
                  <Img fluid={step.node.imgCarouselPhone.fluid} className={classes.img} imgStyle={{maxWidth: 400}} alt={step.node.id} />
                </Link>
            </>
            ) : null
            }

          </div>
        )})}
      </AutoPlaySwipeableViews>
    </Hidden>

        <MobileStepper
        steps={maxSteps}
        position="static"
        variant="progress"
        activeStep={activeStep}
        style={{marginBottom: 5, paddingLeft: '30vw'}}>
        </MobileStepper>
    </div>
  );
}

export default CarouselSvisni;

