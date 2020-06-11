import React from 'react';
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from 'gatsby-image';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
// import {useStyleCarousel} from "./style";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styleCarousel = makeStyles(theme => ({
    root: {
        maxWidth: `100vw`,
        flexGrow: '1',
        [theme.breakpoints.down('768')]: {
            maxHeight: `75vw`,
            marginBottom: 40,
        },
        [theme.breakpoints.down('475')]: {
            marginBottom: 95,
        },
    },
    rootPhone: {
        display: 'none',
        [theme.breakpoints.down('768')]: {
            display: 'block'
        },
    },
    rootPhoneNone:{
        [theme.breakpoints.down('768')]: {
            display: 'none',
        }
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
        // maxWidth: `100vw`,
        overflow: 'hidden',
        width: '100%',
        [theme.breakpoints.down('768')]: {
            margin: `0 auto`,
            maxHeight: `70vw`,
            maxWidth: `60vw`,
            borderRadius: `10px`
        },
        [theme.breakpoints.down('580')]: {
            margin: `0 auto`,
            maxHeight: `70vw`,
            maxWidth: `70vw`,
        },
        [theme.breakpoints.down('475')]: {
            maxWidth: `91vw`,
            borderRadius: `10px`
        }
    },
    h1Home: {
        fontFamily: 'Oswald, cursive',
        fontWeight: '900',
        lineHeight: 2,
        fontSize: '46px',
        paddingLeft: `30px`,
        [theme.breakpoints.down('786')]: {
            fontSize: '30px',
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
  const classes = styleCarousel();

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
      <AutoPlaySwipeableViews className={classes.rootPhoneNone}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
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

      <AutoPlaySwipeableViews className={classes.rootPhone}
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
                  <Img fluid={step.node.imgCarouselPhone.fluid} className={classes.img}  imgStyle={{maxWidth: 400}} alt={step.node.id} />
                </Link>
              {/* <Button variant='contained' color='primary' size="small"  > */}
               {/* <ArrowBackIcon  classes={{root: classes.button}}/>  */}
               {/* Подробнее */}
            {/* </Button> */}
            </>
            ) : null
            }
           
          </div>
        )})}
       
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="progress"
        activeStep={activeStep}
        style={{marginBottom: 50, paddingLeft: '30vw'}}>
        </MobileStepper> 
    </div>
  );
}

export default CarouselSvisni;

