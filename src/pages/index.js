import React from "react"
import SEO from "../components/seo"
import CarouselSvisni from "../components/common/CarouselSvisni"
import styled from 'styled-components';
import { Link, graphql } from "gatsby"
import "../components/sass/index.css"
import Img from 'gatsby-image';

import Grid from '@material-ui/core/Grid';
import {  makeStyles } from '@material-ui/core/styles';

import Card from '../components/Card'

const CarouselMenuSection = styled(CarouselSvisni) `
  width: 100vw;
`

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up('768')]: {
      display: 'none'
    }
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
}))


const IndexPage = ({data}) => {

const classes = useStyles();

return (
  <section >
      <SEO title="СвисниСуши" />
      <div className="home_page">
      <CarouselMenuSection />
    <div className="title_home">
    <h1>
      Свежая и разнообразная кухня 
    </h1>
    </div>
    <Grid container className={classes.root} spacing={16}>
      <Grid item xs={12}>
      <Grid container className={classes.demo} justify="center" spacing={16}>
        <Card data={data.allContentfulHomePageCarts}/>
      </Grid>
      </Grid>
    </Grid>

    <div className="menu">
      {data.allContentfulHomePageImageMenu.edges.map(({node: homeMenu}) => (
        <div key={homeMenu.id} className="cart_item">
          <div className="cart_container">
          <Link to={`/${homeMenu.slug}`} state={{ choice: 'Сеты' }}>
          <div className="cart_title">
            <h3>{homeMenu.category}</h3>
          </div>
          <Img fluid={homeMenu.image.fluid} className="cart_img"></Img>
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
  allContentfulHomePageCarts {
    edges {
      node {
        id
        description
        name
        price
        count
        weight
        contentful_id
        image {
          fluid(maxWidth: 768) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
  allContentfulHomePageImageMenu {
    edges {
      node {
        id
        slug
        category
        image {
          fluid(maxWidth: 390) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
}
`
