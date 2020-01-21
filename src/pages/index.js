import React from "react"
import SEO from "../components/seo"
import CarouselSvisni from "../components/common/CarouselSvisni"
import styled from 'styled-components';
import { Link, graphql, useStaticQuery } from "gatsby"
import "../components/sass/index.css"
import Img from 'gatsby-image';

const CarouselMenuSection = styled(CarouselSvisni) `
  width: 100vw;
`

const IndexPage = () => {

const data = useStaticQuery(graphql`
  query {
    sety: file(relativePath: { eq: "img-starter/sety.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 330) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    slognye: file(relativePath: { eq: "img-starter/slognye.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 330) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
klassika: file(relativePath: { eq: "img-starter/klassika.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 330) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    goryachie: file(relativePath: { eq: "img-starter/goryachie.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 330) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    pizza: file(relativePath: { eq: "img-starter/pizza.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 330) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    kombo: file(relativePath: { eq: "img-starter/kombo.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 330) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    napitki: file(relativePath: { eq: "img-starter/napitki.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 330) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    salaty: file(relativePath: { eq: "img-starter/salaty.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 330) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
  `)


return (
  <section >
      <SEO title="СвисниСуши" />
      <div className="home_page">
      <CarouselMenuSection />
    <div className="title_home">
    <h1 >
      Свежая и разнообразная кухня 
    </h1>
    </div>

    <div className="menu">
   
        <div className="cart_item">
          <div className="cart_container">
          <Link to="/sety" state={{ choice: 'Сеты' }}>
          <div className="cart_title">
            <h3>СЕТЫ</h3>
          </div>
          <Img fluid={data.sety.childImageSharp.fluid} className="cart_img"></Img>
          </Link>
          </div>
        </div>

        <div className="cart_item">
          <div className="cart_container">
          <Link to="/pizza">
          <div className="cart_title">
            <h3>ПИЦЦА</h3>
          </div>
          <Img fluid={data.pizza.childImageSharp.fluid} className="cart_img" />
          </Link>
          </div>
        </div>

        <div className="cart_item">
          <div className="cart_container">
          <Link to="/kombo">
          <div className="cart_title">
            <h3>КОМБО</h3>
          </div>
          <Img fluid={data.kombo.childImageSharp.fluid} className="cart_img" />
          </Link>
          </div>
        </div>

        <div className="cart_item">
          <div className="cart_container">
          <Link to="/zapechenyeRolly">
          <div className="cart_title">
            <h3>ГОРЯЧИЕ</h3>
          </div>
          <Img fluid={data.goryachie.childImageSharp.fluid} className="cart_img" />
          </Link>
          </div>
        </div>

        <div className="cart_item">
          <div className="cart_container">
          <Link to="/napitki">
          <div className="cart_title">
            <h3>НАПИТКИ</h3>
          </div>
          <Img fluid={data.napitki.childImageSharp.fluid} className="cart_img" />
          </Link>
          </div>
        </div>

        <div className="cart_item">
          <div className="cart_container">
          <Link to="/salaty">
          <div className="cart_title">
            <h3>САЛАТЫ</h3>
          </div>
          <Img fluid={data.salaty.childImageSharp.fluid} className="cart_img" />
          </Link>
          </div>
        </div>

        <div className="cart_item">
          <div className="cart_container">
          <Link to="/klassicheskieRolly">
          <div className="cart_title">
            <h3>КЛАССИЧЕСКИЕ</h3>
          </div>
          <Img fluid={data.klassika.childImageSharp.fluid} className="cart_img" />
          </Link>
          </div>
        </div>

        <div className="cart_item">
          <div className="cart_container">
          <Link to="/klassicheskieRolly">
          <div className="cart_title">
            <h3>КЛАССИЧЕСКИЕ</h3>
          </div>
          <Img fluid={data.klassika.childImageSharp.fluid} className="cart_img" />
          </Link>
          </div>
        </div>
    </div>
    </div>
  </section>
   
  )
}

export default IndexPage
