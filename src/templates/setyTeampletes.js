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
 
//    "gatsby-plugin-material-ui": "^2.1.6",
// "gatsby-plugin-web-font-loader": "^1.0.4",
// {
//     resolve: 'gatsby-plugin-web-font-loader',
//     options: {
//       google: {
//         families: ['Comfortaa', 'Neucha', 'Montserrat Alternates']
//       }
//     }
//   },

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