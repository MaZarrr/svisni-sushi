import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled  from 'styled-components';
import MenuSite from '../components/common/MenuSite';
import { graphql, Link } from "gatsby";
// import Img from 'gatsby-image';
import Img from 'gatsby-image';


const SetySection = styled.section `
        .container {
        margin: 8vmax 0 0 2.5vw;
        padding: 0;
    }
    .container h1 {
        font-size: 5vw;
    }

    @media screen and (max-width: 768px) {
        .container {
        margin: 0 0 0 3vw;
        padding: 0;
    }

}
` 

const sety = ({data: {allContentfulProduct}}) => {
console.log(allContentfulProduct)

return (
    <Layout>
    <SEO title="Сеты" />
    <MenuSite />
    <div className="container"> 
        <h1>Сеты</h1>
    </div>
    <SetySection>
    {allContentfulProduct.edges.map(({node: product}) => (
        <div key={product.id}> 
        <h2>Сеты</h2>
        <Link to={`/sety/${product.slug}`}>
            <h3>{product.name}</h3>
        </Link>
        <Img style={{maxWidth: 400}}
        fluid={product.image.fluid}></Img>
    </div>
    ))}
  
    </SetySection>
    </Layout>
    )
}

export default sety

export const query = graphql `
    {
        allContentfulProduct {
          edges {
            node {
                id
              slug
              name
              image {
                  fluid(maxWidth: 800) {
                      ...GatsbyContentfulFluid_tracedSVG
                  }
              }
              }
            }
          }
        }
    `
