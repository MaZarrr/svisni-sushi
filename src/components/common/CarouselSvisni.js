import React from 'react';
import { graphql, useStaticQuery } from "gatsby"
import Img from 'gatsby-image';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const getImageData = graphql`
query {
  akcii1: file(relativePath: { eq: "3new.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  akcii2: file(relativePath: { eq: "3sets.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  akcii3: file(relativePath: { eq: "3new.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
}
`

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: `100vw`,
    flexGrow: 1,
    [theme.breakpoints.down('992')]:{
      display: 'none'
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    // height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 'inherit',
    display: 'block',
    maxWidth: `100vw`,
    overflow: 'hidden',
    width: '100%',
  },
}));

function CarouselSvisni() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const data = useStaticQuery(getImageData)
  const tutorialSteps = [
    {
      id: 0,
      imgPath: data.akcii2.childImageSharp.fluid,
    },
    {
      id: 1,
      imgPath: data.akcii2.childImageSharp.fluid,
    },
    {
      id: 2,
      imgPath: data.akcii2.childImageSharp.fluid,
    }
  ];

  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        {/* <Typography>{tutorialSteps[activeStep].label}</Typography> */}
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Img fluid={step.imgPath} className={classes.img} alt={step.id} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
       <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button variant='contained' color='primary' size="medium" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button variant='contained' color='primary' size="medium" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </Button>
        }
      />
    </div>
  );
}

export default CarouselSvisni;





// import React from "react"
// import Carousel from 'react-bootstrap/Carousel';
// import styled from  'styled-components'
// import { graphql, useStaticQuery } from "gatsby"
// import Img from 'gatsby-image';
// import akcii from './../../pages/akcii';



// const StyledCarousel = styled.div `
//     margin: 0;
//     padding: 0;
//     width: 100%;
//     z-index: 0;

//     .carousel {
//         margin: 0;
//         padding: 0;
//     }

//     img {
//         width: 100vw;
//         margin: 0 auto;
//         max-height: 30vw;
//     }
//     a {
//         max-height: 5vh;
//         max-width: 2vw;
//         background: red;
//         opacity: 0.5;
//         margin: auto 20px auto 20px;
//     }
// `
// const CarouselBootstrap = styled(Carousel)`
//     z-index: 0;
// `


// const CarouselSvisni = () => {



// return (
// <StyledCarousel>
// <CarouselBootstrap className="carousel">
//   <Carousel.Item>
//   <Img fluid={data.akcii1.childImageSharp.fluid} /> 
//   </Carousel.Item>
//   <Carousel.Item>
//     <Img fluid={data.akcii2.childImageSharp.fluid} />
    
//   </Carousel.Item>
//   <Carousel.Item>
//     <Img fluid={data.akcii3.childImageSharp.fluid} />
//   </Carousel.Item>
// </CarouselBootstrap>
// </StyledCarousel>
// )
// }
// export default CarouselSvisni