import React from 'react';
import { graphql, useStaticQuery } from "gatsby"
import Img from 'gatsby-image';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: `100vw`,
    flexGrow: '1',
    [theme.breakpoints.down('768')]: {
      maxHeight: `75vw`,
      marginBottom: 40,
    },
  },
  rootPhone: {
  display: 'none',
  [theme.breakpoints.down('768')]: {
    display: 'block',
  },
},
  rootPhoneNone:{ 
  [theme.breakpoints.down('768')]: {
    display: 'none',
  }
},
  header: {
    // backgroundColor: 'lightgrey',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '8px',
    width: `100%`,
    justifyContent: 'center',
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up('768')]: {
      display: 'none',
    },
  },
  img: {
    height: 'inherit',
    display: 'block',
    maxWidth: `100vw`,
    overflow: 'hidden',
    width: '100%',
    [theme.breakpoints.down('768')]: {
      margin: `0 auto`,
      maxHeight: `70vw`,
      maxWidth: `60vw`,
    },
    [theme.breakpoints.down('580')]: {
      margin: `0 auto`,
      maxHeight: `70vw`,
      maxWidth: `70vw`,
    },
    [theme.breakpoints.down('425')]: {
      width: '100%',
      maxWidth: `100vw`,
    }
  },
  h1Home: {
    fontFamily: 'Neucha, cursive',
    fontWeight: '900',
    lineHeight: 2,
    fontSize: '10vw',
    [theme.breakpoints.down('786')]: {
      fontSize: '8vw',
    },
    [theme.breakpoints.down('425')]: {
      fontSize: '6vw',
    }
  },
  stepper: {
    marginBottom: 50,
    paddingLeft: '30vw'
  }
}));

const CarouselSvisni = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  // const [dataCarousel, setDataCarousel] = React.useState([]);

  const data = useStaticQuery(graphql `
  {
  allContentfulCarouselSiteImage {
    edges {
      node {
        id
        imgCarouselPc {
          fluid(maxWidth: 1200) {
              ...GatsbyContentfulFluid
            }
        }
        imgCarouselPhone {
          fluid(maxWidth: 400) {
              ...GatsbyContentfulFluid
            }
        }
      }
    }
  }
  }
  `)

// React.useEffect(()=> {
//   setDataCarousel(data)
// })
// console.log(data)
// console.log(dataCarousel)

const maxSteps = data.allContentfulCarouselSiteImage.edges.length;

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep - 1);
  // };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  // const handleStepChangeVigoda = step => {
  //   setActiveStepVigoda(step);
  // };

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
        enableMouseEvents
      >
        {data.allContentfulCarouselSiteImage.edges.map((step, index) => (
          <div key={step.node.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Img fluid={step.node.imgCarouselPc.fluid} className={classes.img} />
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
        {data.allContentfulCarouselSiteImage.edges.map((step, index) => (
          <div key={step.node.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Img fluid={step.node.imgCarouselPhone.fluid} className={classes.img} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="progress"
        activeStep={activeStep}
        className={classes.stepper}></MobileStepper> 
    </div>
  );
}

export default CarouselSvisni;


// {/* <AutoPlaySwipeableViews className={classes.rootPhone}
// axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
// index={activeStepVigoda}
// onChangeIndex={handleStepChangeVigoda}
// enableMouseEvents
// >
// {vigodaSteps.map((step, index) => (
//   <div key={step.id}>
//     {Math.abs(activeStepVigoda - index) <= 2 ? (
//       <Img fluid={step.imgPathPhone} className={classes.img} alt={step.id} />
//     ) : null}
//   </div>
// ))}
// </AutoPlaySwipeableViews>
// <MobileStepper
// steps={maxSteps}
// position="static"
// variant="progress"
// activeStep={activeStepVigoda}
// className={classes.stepper}/> */}

        // nextButton={
        //   <Button variant='contained' color='primary' size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
        //     {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        //   </Button>
        // }
        // backButton={
        //   <Button variant='contained' color='primary' size="small" onClick={handleBack} disabled={activeStep === 0}>
        //     {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        //   </Button>
        // }
    



