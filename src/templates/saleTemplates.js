import React from 'react'
import { graphql } from 'gatsby';
import loadable from "@loadable/component";

const SaleItem = loadable(() => import('../components/SaleItem'))

const SaleTeamplate = ({
    data: {contentfulProductSale}, location}) => { 
      
 return  (
     <>
   <SaleItem
        name={contentfulProductSale.name}
        description={contentfulProductSale.description}
        createdAt={contentfulProductSale.createdAt}
        image={contentfulProductSale.image.fluid}
        location={location}>
    </SaleItem>
    </>
    )}

export default SaleTeamplate

export const query = graphql ` 
    query ($slug: String!) {
        contentfulProductSale(slug: {eq: $slug}) {
        id
        slug
        variant
        description
        name
        detailedDescription {
          detailedDescription
        }
        description
          image {
              fluid(maxWidth: 1280) {
                  ...GatsbyContentfulFluid
                }
            }
        }
    }
  `
 