import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';
import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: `1440px`,
    [theme.breakpoints.down('769')]: {
      paddingLeft: '50px'
    },
    [theme.breakpoints.up('769')]: {
      marginTop: '90px',
    },
    margin: '0 auto',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }
}));



const Layout = ({ children, location }) => {
const classes = useStyles();

  return (
    <>
    <Header />
      <div className={classes.root}>
        <main>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
      {location.pathname !== "/order" && location.pathname !== "/korzina" ? (
        <Footer />
      ) : null}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout


// © {new Date().getFullYear()}, Built with
// {` `}
// <a href="https://www.gatsbyjs.org">Gatsby</a>


// const useStyles = makeStyles(theme => ({
//   root: {
//     maxWidth: `1440px`,
//     [theme.breakpoints.down('769')]: {
//       paddingLeft: '50px'
//     },
//     [theme.breakpoints.up('769')]: {
//       marginTop: '90px',
//     },
//     margin: '0 auto',
//   },
//   toolbar: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar,
//   },
//   content: {
//     flexGrow: 1
//   }
// }));



// const Layout = ({ children, location }) => {
// const classes = useStyles();
// // const data = useStaticQuery(graphql`
// //     # query SiteTitleQuery {
// //     #   site {
// //     #     siteMetadata {
// //     #       title
// //     #     }
// //     #   }
// //     }
// //   `)

//   return (
//     <>
//       <div id="container" className={classes.root}>
//         <main className={classes.content}>
//           {/* <VK apiId={7311665}> */}
//           <div className={classes.toolbar} />
//           {/* <CommunityMessages 
//             groupId={161250465} 
//             elementId="vk_message" 
//             options={{
//               disableButtonTooltip: 1
//             }}  
//             /> */}
//           {children}
//           {/* <LabelBottomNavigation /> */}
//         {/* </VK> */}
//         </main>
//         {location.pathname !== "/order" && location.pathname !== "/korzina" ? (
//           <Footer />
//         ) : null}
//       </div>
//     </>
//   )
// }