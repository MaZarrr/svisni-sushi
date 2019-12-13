import React from 'react'
import { graphql } from 'gatsby';
import SetyItem from '../components/SetyItem';


const SetyTeamplate = ({data: {contentfulProduct}} ) =>{ 
//   console.log(props);s
 return  (
    <SetyItem name={contentfulProduct.name}
        price={contentfulProduct.price}
        description={contentfulProduct.description}
        createdAt={contentfulProduct.createdAt}
        image={contentfulProduct.image.fluid}
    > </SetyItem>
    
    )}

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
  export default SetyTeamplate

