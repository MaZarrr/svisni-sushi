import React from "react"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import CarouselSvisni from "../components/common/CarouselSvisni"
import styled from 'styled-components';
import MenuSite from './../components/common/MenuSite';


const CarouselMenuSection = styled(CarouselSvisni) `
  width: 100vw;
`
const LayoutStyle = styled(Layout) `
      background: red;

     .text_start {
      /* font-size: 10px; */
      /* text-align: center; */
      background: red;
      margin-left: 50px;
    }
`
const MainContent = styled.section `
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 30px 0 0 0 ;
  
  header h1 {
      font-size: 4vmax;
      /* white-space: nowrap; */
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

const IndexPage = () => (
  <>
  <LayoutStyle>
  <SEO title="СвисниСуши" />
  </LayoutStyle>
  <CarouselMenuSection />
  <MenuSite />
  <MainContent>
  <Content>
    <header role="banner">
      <h1 className="text_start">Доставка роллов и пиццы в Валуйках</h1>
    </header>
  </Content>
  </MainContent>
  </>
 
)

export default IndexPage


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
