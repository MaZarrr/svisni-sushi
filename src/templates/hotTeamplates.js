import React from 'react'
import { graphql } from 'gatsby';
import HotItem from '../components/HotItem';

const HotTeamplates = ({
    data: {contentfulProductHotRolly}}) => { 
      
 return  (
     <>
   <HotItem
        name={contentfulProductHotRolly.name}
        price={contentfulProductHotRolly.price}
        description={contentfulProductHotRolly.description}
        image={contentfulProductHotRolly.image.fluid}
    >
    </HotItem>
    </>
    )}

export default HotTeamplates

export const query = graphql ` 
    query ($slug: String!) {
       contentfulProductHotRolly(slug: {eq: $slug}) {
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