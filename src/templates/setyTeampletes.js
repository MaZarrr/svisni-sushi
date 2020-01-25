import React from 'react'
import { graphql } from 'gatsby';
import SetyItem from '../components/SetyItem';

const SetyTeamplate = ({
    data: {contentfulProduct}}) => { 

 return  (
     <>
    <SetyItem 
        name={contentfulProduct.name}
        price={contentfulProduct.price}
        description={contentfulProduct.description}
        createdAt={contentfulProduct.createdAt}
        image={contentfulProduct.image.fluid}
    > </SetyItem>
    </>
    )}

export default SetyTeamplate

export const query = graphql ` 
    query ($slug: String!) {
       contentfulProduct(slug: {eq: $slug}) {
          name
          price
          description
          createdAt(formatString: "МММ Do, YYYY, h:mm:ss a")
          image {
              fluid(maxWidth: 400) {
                  ...GatsbyContentfulFluid_tracedSVG
                }
            }
        }
    }
  `
 
//  "gatsby-theme-material-ui": "^1.0.7",
//  export const query = graphql ` 
//  query ($slug: String!) {
//     contentfulProduct(slug: {eq: $slug}) {
//        image {
//            fluid(maxWidth: 400) {
//                ...GatsbyContentfulFluid
//              }
//          }
//      }
//  }
// `