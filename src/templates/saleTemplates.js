import React from 'react'
import {graphql} from 'gatsby';
import SaleItem from "../components/SaleItem";
// import loadable from "@loadable/component";

// const SaleItem = loadable(() => import('../components/SaleItem'))

const SaleTeamplate = ({ data: {contentfulProductSale}}) => {

    return  (
            <>
                <SaleItem
                    name={contentfulProductSale.name}
                    image={contentfulProductSale.image.fluid}
                    markDeckription={contentfulProductSale.childContentfulProductSaleDetailedDescriptionTextNode.childMarkdownRemark}>
                </SaleItem>
            </>
        )
}

export default SaleTeamplate

export const query = graphql `
    query ($slug: String!) {
        contentfulProductSale(slug: {eq: $slug}) {
            id
            name
            slug
            image {
              fluid(maxWidth: 1280) {
                  ...GatsbyContentfulFluid
                }
            }
            childContentfulProductSaleDetailedDescriptionTextNode {
                childMarkdownRemark {
                    html
                }
            }
        }
    }
  `
 