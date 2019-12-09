import React from 'react'
import { graphql } from 'gatsby';
import SetyItem from '../components/SetyItem';


const SetyTeamplate = ( props ) =>{ 
  console.log(props);
 return  (
    <SetyItem name={props.data.contentfulProduct.name}
     price={props.data.contentfulProduct.price}
     description={props.data.contentfulProduct.description}
     createdAt={props.data.contentfulProduct.createdAt}
     image={props.data.contentfulProduct.image.fluid}
    
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
              fluid(maxWidth: 800) {
                  ...GatsbyContentfulFluid
                }
            }
        }
      }
  `
  export default SetyTeamplate

