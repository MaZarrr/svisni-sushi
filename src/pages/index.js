import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CarouselSvisni from "../components/common/CarouselSvisni"
import styled from 'styled-components';
import { Link, graphql, useStaticQuery } from "gatsby"
import "../components/sass/index.css"
import Img from 'gatsby-image';
import Korzina from './../components/korzinaComponent';



const CarouselMenuSection = styled(CarouselSvisni) `
  width: 100vw;
`

const IndexPage = () => {

const data = useStaticQuery(graphql`
  query {
    sety: file(relativePath: { eq: "img-starter/sety.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    slognye: file(relativePath: { eq: "img-starter/slognye.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
klassika: file(relativePath: { eq: "img-starter/klassika.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    goryachie: file(relativePath: { eq: "img-starter/goryachie.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    pizza: file(relativePath: { eq: "img-starter/pizza.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    kombo: file(relativePath: { eq: "img-starter/kombo.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    napitki: file(relativePath: { eq: "img-starter/napitki.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    salaty: file(relativePath: { eq: "img-starter/salaty.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
  `)


return (
  <Layout>
      <SEO title="СвисниСуши" />
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
  <Korzina />
  </Layout>
   
  )
}

export default IndexPage


// const IndexPage = () => (
//   <>
//   <Provider store={store}>
//     <ErrorBoundary>
//     <ProductServiceProvider value={productService}>
//       <LayoutStyle>
//         <SEO title="СвисниСуши" />
        
//       </LayoutStyle>
//       {/* <App /> */}
//       </ProductServiceProvider>
//     </ErrorBoundary>
//   </Provider>
//   </>
 
// )

// const IndexPage = ({data: {allContentfulProduct: {edges}}, 
//   product, producSetsLoad, 
//   loading, productRequested
// }) => {

//   useEffect(() => {
//     productRequested()
//     const data = edges
//     producSetsLoad(data); // action push to reduxStore
//     console.log(data)   
//   }, [])

//     if(loading) {
//       return <h2>...Загрузка</h2>
// }

// return (
//   <>
  
//   <LayoutStyle>
//       <SEO title="СвисниСуши" />
//     </LayoutStyle>
//       <CarouselMenuSection />
//   <MainContent>
//     <Content>
//       <header role="banner">
//         <h1 className="text_start">Доставка роллов и пиццы в Валуйках</h1>
//       </header>
//     </Content>
//   </MainContent>
//   </>
//   )

// }


// // const IndexPage = () => (
// //   <>
// //   <Provider store={store}>
// //     <ErrorBoundary>
// //     <ProductServiceProvider value={productService}>
// //       <LayoutStyle>
// //         <SEO title="СвисниСуши" />
        
// //       </LayoutStyle>
// //       {/* <App /> */}
// //       </ProductServiceProvider>
// //     </ErrorBoundary>
// //   </Provider>
// //   </>
 
// // )

// // {/* <Layout>
// <SEO title="Home" />
// <h1>Hi people</h1>
// <p>Welcome to your new Gatsby site.</p>
// <p>Now go build something great.</p>
// <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//   <Image />
// </div>
// <Link to="/page-2/">Go to page 2</Link>
// </Layout> */}

