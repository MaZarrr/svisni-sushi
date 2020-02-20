import React from "react"
import SEO from "../components/seo"
import CarouselSvisni from "../components/common/CarouselSvisni"
import { Link, graphql } from "gatsby"
import "../components/sass/index.css"
import Img from 'gatsby-image';

import Grid from '@material-ui/core/Grid';
import {  makeStyles } from '@material-ui/core/styles';

import Card from '../components/Card'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: `100%`,
    margin: 0,
    padding: 0,
    [theme.breakpoints.up('768')]: {
      display: 'none'
    }
  },
  paper: {
    height: 140,
    width: 100,
  },
  demo: {
    margin: `0 auto`,
  },
  menuHome: {
    display: `block`,
    [theme.breakpoints.down('768')]: {
       display: 'none',
       margin: `0 auto`
     }
  }
  // control: {
  //   padding: theme.spacing.unit * 2,
  // },
}))


const IndexPage = ({data}) => {

  
// React.useEffect(() => {
//  window.Chatra('setButtonSize', 50)
// })


const classes = useStyles();

return (
  <section >

      <SEO title="СвисниСуши" />
      <div className="home_page">
      <CarouselSvisni />
    <div className="title_home">
    <h1>
      Свежая и разнообразная кухня 
    </h1>
    </div>
    <Grid container justify="center" className={classes.root}>
      <Grid  item xs={12}>
      <Grid container justify="center" className={classes.demo} >
        <Card />
      </Grid>
      </Grid>
    </Grid>

    {/* <div className={classes.menuHome}> */}
    <div className="menu">

      {data.allContentfulHomePageImageMenu.edges.map(({node: homeMenu}) => (
        <div key={homeMenu.id} className="cart_item">
          <div className="cart_container">
          <Link to={`/${homeMenu.slug}`} state={{ choice: 'Сеты' }}>
          <div className="cart_title">
            <h3><b>{homeMenu.category}</b></h3> 
          </div>
          <Img fluid={homeMenu.image.fluid} className="cart_img" imgStyle={{maxWidth: 300}}></Img>
          </Link>
          </div>
      </div>
      ))}
    </div>
    </div>
  </section>
  )
}

export default IndexPage

export const query = graphql `
{
  allContentfulHomePageImageMenu(sort: {fields: desc}) {
    edges {
      node {
        id
        slug
        category
        desc
        image {
          fluid(maxWidth: 300) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
}
`
