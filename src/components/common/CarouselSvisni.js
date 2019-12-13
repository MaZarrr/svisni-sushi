import React from "react"
import Carousel from 'react-bootstrap/Carousel';
import Imagess from '../../images/1-1.jpg'
import Images from '../../images/3sets.jpg'
import Imagesss from '../../images/3new.jpg'
import styled from  'styled-components'


const StyledCarousel = styled.div `
    margin: 0;
    padding: 0;
    width: 100%;
    z-index: 0;
    /* box-sizing: border-box; */

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

// const Item = styled(Carousel.Item) `
//     margin: 0;
//     padding: 0;
//     height: 100px;
// `

const CarouselSvisni = () => (
<StyledCarousel>
<CarouselBootstrap className="carousel">
  <Carousel.Item>
    <img
      className="d-block "
      src={Images}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block "
      src={Imagess}
      alt="Third slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block"
      src={Imagesss}
      alt="Third slide"
    />
  </Carousel.Item>
</CarouselBootstrap>
</StyledCarousel>
)

export default CarouselSvisni