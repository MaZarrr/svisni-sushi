import React from 'react';
import { graphql, useStaticQuery } from "gatsby"
import Img from 'gatsby-image';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
// import Button from '@material-ui/core/Button'
// import ArrowBackIcon from '@material-ui/icons/ArrowBack'
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
      [theme.breakpoints.down('786')]: {
        background: `tomato`
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
      fontSize: '30px',
      lineHeight: `14vmin`,
      letterSpacing: `1px`,
      color: `white`
    },
    // [theme.breakpoints.down('425')]: {
    //   fontSize: '6vw',
    // }
  },
  stepper: {
    marginBottom: 50,
    paddingLeft: '30vw'
  },
  button: {
    margin: `0 auto`,
    width: `100%`
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
          fluid(maxWidth: 1680) {
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
              <Img fluid={step.node.imgCarouselPc.fluid} className={classes.img} imgStyle={{maxWidth: 1400}} alt={step.node.id} />
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
              <Img fluid={step.node.imgCarouselPhone.fluid} className={classes.img}  imgStyle={{maxWidth: 400}} alt={step.node.id} />
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
        className={classes.stepper}>
        </MobileStepper> 
    </div>
  );
}

export default CarouselSvisni;



  //  {/* nextButton={

  //   <Button variant='contained' color='primary' size="small"  disabled={activeStep === maxSteps - 1}>
  //     {theme.direction === 'rtl' ? <ArrowBackIcon /> : <ArrowBackIcon />}
  //   </Button>
  
  // }
  // backButton={
  // <Button variant='contained' color='primary' size="small" disabled={activeStep === 0}>
  //   {theme.direction === 'rtl' ? <ArrowBackIcon /> : <ArrowBackIcon />}
  // </Button>
  // } 
  //      */}
//

// class CarouselSvisni extends Component {
//   state = {
//     slideIndex: 0
//   }

//   handleContentClick = (e) => e.stopPropagation() || e.preventDefault()

//   handleChange = (slideIndex) => {
//     this.setState({
//       slideIndex
//     }, this.onChange(slideIndex))
//   }

//   decreaseIndex () {
//     const slideIndex = this.state.slideIndex - 1
//     this.setState({
//       slideIndex
//     }, this.onChange(slideIndex))
//   }

//   increaseIndex () {
//     const slideIndex = this.state.slideIndex + 1
//     this.setState({
//       slideIndex
//     }, this.onChange(slideIndex))
//   }

//   onChange (slideIndex) {
//     if (this.props.onChange) {
//       this.props.onChange(modulo(slideIndex, this.props.children.length))
//     }
//   }

//   render () {
//     const {
//       autoplay,
//       ButtonProps,
//       children,
//       classes,
//       containerStyle,
//       hideArrows,
//       interval,
//       label,
//       landscape: landscapeProp,
//       mobile,
//       ModalProps,
//       open,
//       onClose,
//       onStart
//     } = this.props
//     const landscape = mobile && landscapeProp
//     const transitionDuration = { enter: duration.enteringScreen, exit: duration.leavingScreen }
//     const hasMultipleChildren = children.length != null

//     const carousel = (
//       <Carousel
//         autoplay={open && autoplay && hasMultipleChildren}
//         className={classes.carousel}
//         containerStyle={{ height: '100%', ...containerStyle }}
//         index={this.state.slideIndex}
//         interval={interval}
//         onChangeIndex={this.handleChange}
//         slideClassName={classes.slide}
//       >
//         {
//           React.Children.map(children, c => React.cloneElement(c, {
//             mobile,
//             landscape
//           }))
//         }
//       </Carousel>
//     )

//     return (
//       <Modal
//         className={classNames(classes.root, {
//           [classes.rootMobile]: mobile
//         })}
//         open={open}
//         onClose={onClose}
//         BackdropComponent={Backdrop}
//         BackdropProps={ModalProps ? { transitionDuration, ...ModalProps.BackdropProps } : { transitionDuration }}
//         {...ModalProps}
//       >
//         <Fade
//           appear
//           in={open}
//           timeout={transitionDuration}
//         >
//           <div
//             className={classNames(classes.content, {
//               [classes.contentMobile]: mobile
//             })}
//             onClick={this.handleContentClick}
//           >
//             <Paper
//               elevation={mobile ? 0 : 1}
//               className={classes.carouselWrapper}>
//               {carousel}
//             </Paper>
//             <div style={landscape ? { minWidth: 300, maxWidth: 'calc(50% - 48px)', padding: 24, float: 'right' } : null}>
//               <div
//                 className={classNames(classes.footer, {
//                   [classes.footerMobile]: mobile,
//                   [classes.footerMobileLandscape]: landscape
//                 })}
//               >
//                 {label && <Button
//                   variant='contained'
//                   onClick={onStart}
//                   {...ButtonProps}
//                 >
//                   {label}
//                 </Button>}
//                 {
//                   hasMultipleChildren &&
//                   <Dots
//                     count={children.length}
//                     index={modulo(this.state.slideIndex, children.length)}
//                     className={classNames(classes.dots, {
//                       [classes.dotsMobile]: mobile,
//                       [classes.dotsMobileLandscape]: landscape
//                     })}
//                     onDotClick={this.handleChange}
//                   />
//                 }
//               </div>
//             </div>
//             {!mobile && !hideArrows && hasMultipleChildren && (
//               <div>
//                 <Fab
//                   className={classNames(classes.arrow, classes.arrowLeft)}
//                   onClick={() => this.decreaseIndex()}
//                 >
//                   <ArrowBackIcon className={classes.arrowIcon} />
//                 </Fab>
//                 <Fab
//                   className={classNames(classes.arrow, classes.arrowRight)}
//                   onClick={() => this.increaseIndex()}
//                 >
//                   <ArrowForwardIcon className={classes.arrowIcon} />
//                 </Fab>
//               </div>
//             )}
//           </div>
//         </Fade>
//       </Modal>
//     )
//   }
// }

// CarouselSvisni.defaultProps = {
//   autoplay: true,
//   interval: 3000,
//   mobile: false,
//   open: false,
//   hideArrows: false
// }

// CarouselSvisni.propTypes = {
//   /** If `false`, the auto play behavior is disabled. */
//   autoplay: PropTypes.bool,
//   /** Properties applied to the [Button](https://material-ui.com/api/button/) element. */
//   ButtonProps: PropTypes.object,
//   /** Object for customizing the CSS classes. */
//   classes: PropTypes.object.isRequired,
//   /** Override the inline-styles of the carousel container. */
//   containerStyle: PropTypes.object,
//   /** Delay between auto play transitions (in ms). */
//   interval: PropTypes.number,
//   /** Button text. If not supplied, the button will be hidden. */
//   label: PropTypes.string,
//   /** If `true`, slide will adjust content for wide mobile screens. */
//   landscape: PropTypes.bool,
//   /** If `true`, the screen width and height is filled. */
//   mobile: PropTypes.bool,
//   /** Properties applied to the [Modal](https://material-ui.com/api/modal/) element. */
//   ModalProps: PropTypes.object,
//   /** Fired when the index changed. Returns current index. */
//   onChange: PropTypes.func,
//   /** Fired when the gray background of the popup is pressed when it is open. */
//   onClose: PropTypes.func,
//   /** Fired when the user clicks the getting started button. */
//   onStart: PropTypes.func,
//   /** Controls whether the AutoRotatingCarousel is opened or not. */
//   open: PropTypes.bool,
//   /** If `true`, the left and right arrows are hidden in the desktop version. */
//   hideArrows: PropTypes.bool
// }

// export default withStyles(styles)(CarouselSvisni)
 
// const CarouselSvisni = ()=> {

//       return (
//         <Carousel>
//          <div style={{marginTop: 200}}>
//              <Img fluid={data.allContentfulCarouselSiteImage.edges[0].node.imgCarouselPc.fluid} style={{width: 1200}}  alt="asd" />
//                     <p className="legend">Legend 1</p>
//                 </div>
//                 <div>
//                 <Img fluid={data.allContentfulCarouselSiteImage.edges[1].node.imgCarouselPc.fluid} style={{width: 1200}}  alt="asd"/>
//                     <p className="legend">Legend 2</p>
//                 </div>
//                 <div>
//                 <Img fluid={data.allContentfulCarouselSiteImage.edges[2].node.imgCarouselPc.fluid} style={{width: 1200}}  alt="asd"/>
//                     <p className="legend">Legend 3</p>
//                 </div>
//             {/* <div> */}
//             {/* <h1>1</h1>
//             <h1>3</h1>
//             <h1>3</h1> */}
//             {/* {data.allContentfulCarouselSiteImage.edges.map((step, index) => (
//             <div key={step.node.id}>
//                 <Img fluid={step.node.imgCarouselPc.fluid} />
//             </div>
//           ))} */}
//           {/* </div> */}
//         </Carousel>
//     );
//     };

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// class CarouselSvisni extends React.Component {
//   state = {
//     index: 0,
//   };

//   handleChangeIndex = index => {
//     this.setState({
//       index,
//     });
//   };

//   render() {
//     const { index } = this.state;

//     return (
//       <div style={styles.root}>
//         <AutoPlaySwipeableViews index={index} autoplay={true} direction="decremental" enableMouseEvents onChangeIndex={this.handleChangeIndex}>
//           <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
//           <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
//           <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
//         </AutoPlaySwipeableViews>
//         {/* <Pagination dots={3} index={index} onChangeIndex={this.handleChangeIndex} /> */}
//       </div>
//     );
//   }
// }


// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

//   return (
//     <div className={classes.root}>
//       <Paper square elevation={0} className={classes.header}>
//         <Typography>{tutorialSteps[activeStep].label}</Typography>
//       </Paper>
//       <AutoPlaySwipeableViews
//         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//         index={activeStep}
//         onChangeIndex={handleStepChange}
//         enableMouseEvents
//       >
//         {tutorialSteps.map((step, index) => (
//           <div key={step.label}>
//             {Math.abs(activeStep - index) <= 2 ? (
//               <img className={classes.img} src={step.imgPath} alt={step.label} />
//             ) : null}
//           </div>
//         ))}
//       </AutoPlaySwipeableViews>
//       <MobileStepper
//         steps={maxSteps}
//         position="static"
//         variant="text"
//         activeStep={activeStep}
//         nextButton={
//           <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
//             Next
//             {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//           </Button>
//         }
//         backButton={
//           <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
//             {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//             Back
//           </Button>
//         }
//       />
//     </div>
//   );
// }
// export default CarouselSvisni;




