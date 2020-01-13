import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CarouselSvisni from "../components/common/CarouselSvisni"
import styled from 'styled-components';
import { Link, graphql, useStaticQuery } from "gatsby"
import "../components/sass/index.css"
import Img from 'gatsby-image';

const CarouselMenuSection = styled(CarouselSvisni) `
  width: 100vw;
`
const LayoutStyle = styled(Layout) `
     .text_start {
        background: red;
        margin-left: 50px;
    }
`
const MainContent = styled.section `
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 30px 0 0 0 ;

  .nav_navigation {
    width: 100%;
  }


.menu_items {
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-grow: 1;
  flex-wrap: wrap;
}

.nav_menu{
  max-width: 400px;
  position: relative;
}

.nav_menu img {
  border-radius: 7%;
  max-height: 250px;
  background-size: cover;
}

.nav_menu span {
  position: absolute;
  left: 42%;
  top: 70%;
  color: white;
  font-weight: 700;
}

  header h1 {
      font-size: 4vmax;
    }

    @media screen and (min-width: 1200px) {
      margin: 200px 0 0 0 ;
      header h1 {
        font-size: 3vmax;
      } 
    }
    @media screen and (min-width: 960px) {
      margin: 100px 0 0 0 ;
    }
    @media screen and (max-width: 768px) {
      margin: 50px 0 0 0;
    }
`
const Content = styled.div `
max-width: 1440px;
min-height: 2000px;
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
  <LayoutStyle>
      <SEO title="СвисниСуши" />
      <CarouselMenuSection />
    <div className="title_home">
    <h1 >
      свежая и разнообразная кухня 
    </h1>
    </div>

    <div className="menu">

      <Link to="/sety" state={{ choice: 'Сеты' }}>
      <div className="cart">
        <div className="cart_item">
          <div className="cart_container">
          <div className="cart_title">
            <h3>СЕТЫ</h3>
          </div>
          <Img fluid={data.sety.childImageSharp.fluid} className="cart_img"></Img>
          </div>
        </div>
      </div>
      </Link>
      
      <Link to="/pizza">
      <div className="cart">
        <div className="cart_item">
          <div className="cart_container">
          <div className="cart_title">
            <h3>ПИЦЦА</h3>
          </div>
          <Img fluid={data.pizza.childImageSharp.fluid} className="cart_img" />
          </div>
        </div>
      </div>
      </Link>

      <Link to="/kombo">
      <div className="cart">
        <div className="cart_item">
          <div className="cart_container">
          <div className="cart_title">
            <h3>КОМБО</h3>
          </div>
          <Img fluid={data.kombo.childImageSharp.fluid} className="cart_img" />
          </div>
        </div>
      </div>
      </Link>

      <Link to="/zapechenyeRolly">
      <div className="cart">
        <div className="cart_item">
          <div className="cart_container">
          <div className="cart_title">
            <h3>ГОРЯЧИЕ</h3>
          </div>
          <Img fluid={data.goryachie.childImageSharp.fluid} className="cart_img" />
          </div>
        </div>
      </div>
      </Link>

      <Link to="/slozhnyeRolly">
      <div className="cart">
        <div className="cart_item">
          <div className="cart_container">
          <div className="cart_title">
            <h3>СЛОЖНЫЕ</h3>
          </div>
          <Img fluid={data.slognye.childImageSharp.fluid} className="cart_img" />
          </div>
        </div>
      </div>
      </Link>

      <Link to="/napitki">
      <div className="cart">
        <div className="cart_item">
          <div className="cart_container">
          <div className="cart_title">
            <h3>НАПИТКИ</h3>
          </div>
          <Img fluid={data.napitki.childImageSharp.fluid} className="cart_img" />
          </div>
        </div>
      </div>
      </Link>

      <Link to="/salaty">
      <div className="cart">
        <div className="cart_item">
          <div className="cart_container">
          <div className="cart_title">
            <h3>САЛАТЫ</h3>
          </div>
          <Img fluid={data.salaty.childImageSharp.fluid} className="cart_img" />
          </div>
        </div>
      </div>
      </Link>
      
      <Link to="/klassicheskieRolly">
      <div className="cart">
        <div className="cart_item">
          <div className="cart_container">
          <div className="cart_title">
            <h3>КЛАССИЧЕСКИЕ</h3>
          </div>
          <Img fluid={data.klassika.childImageSharp.fluid} className="cart_img" />
          </div>
        </div>
      </div>
      </Link>
    </div>
  </LayoutStyle>
   
  
  )
}

export default IndexPage


//  {/* <MenuSite /> */}
//  <MainContent>
//  {/* <Content>
//    <header role="banner">
//      <h1 className="text_start">Доставка роллов и пиццы в Валуйках</h1>
//    </header>
//  </Content> */}
//  {/* <nav className="nav_navigation">
//  <div className="menu_items">
//  <div className="nav_menu">
//    <Link className="d" to="/pizza">
//    <img src={picca} alt="пицца"></img>
//    <span>Пицца</span>
//    </Link>
//  </div>
//  <div className="nav_menu">
//    <Link className="d" to="/kombo">
//    <img src={kombo} alt="пицца"></img>
//    <span>Комбо</span>
//    </Link>
//  </div>
//  <div className="nav_menu"> 
//    <Link className="d dm" to="/zapechenyeRolly">
//    <img src={sushi} alt="роллы"></img>
//    <span>Роллы</span>
//    </Link>
//    </div>
//  </div>

//  <div className="menu_items">
//  <div className="nav_menu"> 
//    <Link className="d" to="/salaty">
//    <img src={salaty} alt="salaty"></img>
//    <span>Салаты</span>
//    </Link>
//  </div>
//  <div className="nav_menu"> 
//    <Link className="d dm" to="/napitki">
//    <img src={napitki} alt="пицца"></img>
//    <span>Напитки</span>
//    </Link>
//    </div> 
//  </div>
//    </nav>
// </MainContent> */}
























// import React from "react"
// import {Provider} from 'react-redux'

// import Layout from "../components/layout"
// import SEO from "../components/seo"
// import styled from 'styled-components';
// import {ProductServiceProvider} from '../product-service-context'
// import productService from '../services/product-service'

// import store from '../services/product-service'
// import ErrorBoundary from './../components/error-boundary/error-boundary';
// // import App from './../components/app/app';




// const LayoutStyle = styled(Layout) `
//       background: red;
//       /* .text_start {
//         background: red;
//         margin-left: 50px;
//     } */
// `

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

// export default IndexPage


// {/* <Layout>
// <SEO title="Home" />
// <h1>Hi people</h1>
// <p>Welcome to your new Gatsby site.</p>
// <p>Now go build something great.</p>
// <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//   <Image />
// </div>
// <Link to="/page-2/">Go to page 2</Link>
// </Layout> */}




































// import React, {useEffect} from "react"
// import { graphql } from 'gatsby';
// import Layout from "../components/layout"
// import SEO from "../components/seo"
// import CarouselSvisni from "../components/common/CarouselSvisni"
// import styled from 'styled-components';
// import MenuSite from './../components/common/MenuSite';
// import { connect } from 'react-redux';
// import ProductService from './../services/product-service';
// // import { producSetsLoad } from "../actions";
// import { producSetsLoad, productRequested } from '../actions'
// // import { Query } from "react-apollo";
// // import {queryS} from '../services/product-service'

// const CarouselMenuSection = styled(CarouselSvisni) `
//   width: 100vw;
// `
// const LayoutStyle = styled(Layout) `
//       background: red;

//      .text_start {
//         background: red;
//         margin-left: 50px;
//     }
// `
// const MainContent = styled.section `
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   margin: 30px 0 0 0 ;
  
//   header h1 {
//       font-size: 4vmax;
//     }

//     @media screen and (min-width: 1200px) {
//       margin: 200px 0 0 0 ;
//       header h1 {
//         font-size: 3vmax;
//       } 
//     }
//     @media screen and (min-width: 960px) {
//       margin: 100px 0 0 0 ;
//     }
//     @media screen and (max-width: 768px) {
//       margin: 50px 0 0 0;
//     }
// `
// const Content = styled.div `
// max-width: 1440px;
// min-height: 2000px;
// `

// const IndexPage = ({data: {allContentfulProduct: {edges}}, 
//   product, producSetsLoad, 
//   loading, productRequested
// }) => {

//   console.log(product);
//   console.log(loading);

// //  const productServise = new ProductService();
// //  console.log('====================================');
// //  console.log(productServise);
// //  console.log('====================================');

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
//       <MenuSite />
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


// const mapStateToProps = ({product, loading}) => {
//   return {product, loading};
// }

// const mapDispatchToProps = {
//   producSetsLoad,
//   productRequested
// };

// export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)

// export const query = graphql `
//     {
//         allContentfulProduct {
//           edges {
//             node {
//                 id
//               slug
//               name
//               price
//               description
//               image {
//                   fluid(maxWidth: 400) {
//                     ...GatsbyContentfulFluid_tracedSVG
//                   }
//               }
//               }
//             }
//           }
//         }
// `

// // import React from "react"
// // import {Provider} from 'react-redux'

// // import Layout from "../components/layout"
// // import SEO from "../components/seo"
// // import styled from 'styled-components';
// // import {ProductServiceProvider} from '../product-service-context'
// // import productService from '../services/product-service'

// // import store from '../services/product-service'
// // import ErrorBoundary from './../components/error-boundary/error-boundary';
// // // import App from './../components/app/app';


// // const LayoutStyle = styled(Layout) `
// //       background: red;
// //       /* .text_start {
// //         background: red;
// //         margin-left: 50px;
// //     } */
// // `

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

// // export default IndexPage


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

