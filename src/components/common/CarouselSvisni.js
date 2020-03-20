import React from 'react';
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from 'gatsby-image';
import { useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {useStyleCarousel} from "./style";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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
          fluid(maxWidth: 1680, quality: 30) {
              ...GatsbyContentfulFluid
            }
        }
        imgCarouselPhone {
          fluid(maxWidth: 400, quality: 30) {
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

        {/* <Typography>{tutorialSteps[activeStep].label}</Typography> */}
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
        enableMouseEvents
      >
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

