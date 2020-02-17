import React from 'react'
import { graphql } from 'gatsby';
import SaleItem from '../components/SaleItem';

const PizzaTeamplate = ({
    data: {contentfulProductSale}, location}) => { 
      
 return  (
     <>
   <SaleItem
        name={contentfulProductSale.name}
        description={contentfulProductSale.description}
        createdAt={contentfulProductSale.createdAt}
        image={contentfulProductSale.image.fluid}
        location={location}
    >
    </SaleItem>
    </>
    )}

export default PizzaTeamplate

export const query = graphql ` 
    query ($slug: String!) {
        contentfulProductSale(slug: {eq: $slug}) {
          name
          description
          createdAt(formatString: "МММ Do, YYYY, h:mm:ss a")
          image {
              fluid(maxWidth: 1280) {
                  ...GatsbyContentfulFluid
                }
            }
        }
    }
  `
 