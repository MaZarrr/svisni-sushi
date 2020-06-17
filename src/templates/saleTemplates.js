import React from 'react'
import {graphql} from 'gatsby';
import SaleItem from "../components/SaleItem";
// import loadable from "@loadable/component";

// const SaleItem = loadable(() => import('../components/SaleItem'))

const SaleTeamplate = ({data: {contentfulProductSale: {image, childContentfulProductSaleDetailedDescriptionTextNode} }}) => {
    return (
        // <SaleItem
        //     name={props.data.contentfulProductSale.childContentfulProductSaleDetailedDescriptionTextNode.childMarkdownRemark.name}
        //     image={props.data.contentfulProductSale.image.fluid}
        //     md={props.data.contentfulProductSale !== null ? props.data.childContentfulProductSaleDetailedDescriptionTextNode.childMarkdownRemark
        //         : props.data.contentfulProductSale.description}>
        // </SaleItem>
        <SaleItem
            image={image.fluid}
            md={childContentfulProductSaleDetailedDescriptionTextNode.childMarkdownRemark}>
        </SaleItem>
    )
}
export default SaleTeamplate

export const query = graphql `
    query ($slug: String!) {
        contentfulProductSale(slug: {eq: $slug}) {
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
 