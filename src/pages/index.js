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
    [theme.breakpoints.up('768')]: {
      display: 'none'
    }
  },
  menuPc: {
    maxWidth: 1368, 
    marginTop: 40,
    [theme.breakpoints.down('768')]: {
       display: 'none',
     }
  }
}))

const IndexPage = (props) => {
// const [screen, setScreen] = React.useState('')

const classes = useStyles();

// React.useEffect(() => {

//   const lg = window.screen.width >= 768
//   setScreen(lg)

// }, [])

return (
  <section>
  <SEO title="Cвисни Суши - доставка еды на дом в Валуйки с 10:00 до 22:00, заказать еду в Валуйском районе" />
  <CarouselSvisni />
    <div className="title_home">
    <h1>
      Свежая и разнообразная кухня 
    </h1>
    </div>

      <Grid item xs={12} className={classes.root}>
        <Card />
      </Grid>

      <Grid container className={classes.menuPc}>  
      {props.data.allContentfulHomePageImageMenu.edges.map(({node: homeMenu}) => (
        <Grid item xs={6} sm={4} key={homeMenu.id} >  
          <div className="cart_item">
          <Link to={`/${homeMenu.slug}`}>
          <div className="cart_title">
            <h3><b>{homeMenu.category}</b></h3> 
          </div>
          <Img fluid={homeMenu.image.fluid} className="cart_img" imgStyle={{maxWidth: 300}} />
          </Link>
          </div>
     </Grid>
      ))}
    </Grid>
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
          fluid(maxWidth: 300, toFormat: WEBP) {
            ...GatsbyContentfulFluid_tracedSVG
          }
        }
      }
    }
  }
}
`
