import React from 'react'
import {graphql} from 'gatsby';
import SaleItem from "../components/SaleItem";
// import loadable from "@loadable/component";

// const SaleItem = loadable(() => import('../components/SaleItem'))

const SaleTeamplate = ({data: {contentfulProductSale: {image, description, name,
    childContentfulProductSaleDetailedDescriptionTextNode: txtNode} }}) => {

    return (
        <SaleItem
            image={image.fluid}
            md={txtNode.childMarkdownRemark !== undefined ? txtNode.childMarkdownRemark : {description, name}}>
        </SaleItem>
    )
}
export default SaleTeamplate

export const query = graphql `
    query ($slug: String!) {
        contentfulProductSale(slug: {eq: $slug}) {
            description
            name
            image {
                fluid(maxWidth: 1280) {
                    ...GatsbyContentfulFluid
                }
            }
            childContentfulProductSaleDetailedDescriptionTextNode {
                childMarkdownRemark {
                    html
                    frontmatter {
                        slug
                        name
                    }
                }
            }
        }
    }
`
 