import React from "react"
import Carousel from 'react-bootstrap/Carousel';
import styled from  'styled-components'
import { graphql, useStaticQuery } from "gatsby"
import Img from 'gatsby-image';

const StyledCarousel = styled.div `
    margin: 0;
    padding: 0;
    width: 100%;
    z-index: 0;

    .carousel {
        margin: 0;
        padding: 0;
    }

    img {
        width: 100vw;
        margin: 0 auto;
        max-height: 30vw;
    }
    a {
        max-height: 5vh;
        max-width: 2vw;
        background: red;
        opacity: 0.5;
        margin: auto 20px auto 20px;
    }
`
const CarouselBootstrap = styled(Carousel)`
    z-index: 0;
`


const CarouselSvisni = () => {

  const data = useStaticQuery(graphql`
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
`)

return (
<StyledCarousel>
<CarouselBootstrap className="carousel">
  <Carousel.Item>
  <Img fluid={data.akcii1.childImageSharp.fluid} /> 
  </Carousel.Item>
  <Carousel.Item>
    <Img fluid={data.akcii2.childImageSharp.fluid} />
    
  </Carousel.Item>
  <Carousel.Item>
    <Img fluid={data.akcii3.childImageSharp.fluid} />
  </Carousel.Item>
</CarouselBootstrap>
</StyledCarousel>
)
}
export default CarouselSvisni