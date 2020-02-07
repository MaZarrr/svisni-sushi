import React from 'react'
import { graphql } from 'gatsby';
import SloghItem from '../components/SloghItem';

const SlognyeTeamplates = ({
    data: {contentfulProductSlognyeRolly}}) => { 
      
 return  (
     <>
   <SloghItem
        name={contentfulProductSlognyeRolly.name}
        price={contentfulProductSlognyeRolly.price}
        description={contentfulProductSlognyeRolly.description}
        image={contentfulProductSlognyeRolly.image.fluid}
    >
    </SloghItem>
    </>
    )}

export default SlognyeTeamplates

export const query = graphql ` 
    query ($slug: String!) {
        contentfulProductSlognyeRolly(slug: {eq: $slug}) {
          name
          price
          description
          weight
          count
          image {
              fluid(maxWidth: 400) {
                  ...GatsbyContentfulFluid
                }
            }
        }
    }
  `
 

   
   
