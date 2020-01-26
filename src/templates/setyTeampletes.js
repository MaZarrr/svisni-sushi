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
                  ...GatsbyContentfulFluid
                }
            }
        }
    }
  `

  // import wrapWithProvider from "./wrap-with-provider"
// import wrapWithProvider from "./wrap-with-provider"
// export const wrapRootElement = wrapWithProvider
    // "react-transition-group": "4.0.0",
  
//   "react-swipeable-views": "^0.13.4",
//   "react-swipeable-views-core": "^0.13.4",
//   "react-swipeable-views-utils": "^0.13.4",
//    
// "gatsby-theme-material-ui": "^1.0.7",
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