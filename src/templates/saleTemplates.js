import React from 'react'
import {graphql} from 'gatsby';
import SaleItem from "../components/SaleItem";
// import loadable from "@loadable/component";
// const SaleItem = loadable(() => import('../components/SaleItem'))

const SaleTeamplate = ({data: {contentfulProductSale: {image, description, name,
    detailedDescription: {childMarkdownRemark: mdRemark}} }}) => {

    return (
        <SaleItem
            image={image.fluid}
            md={mdRemark !== undefined ? mdRemark : {description, name}}>
        </SaleItem>
    )
}
export default SaleTeamplate

export const pageQuery = graphql `
    query PageSale ($slug: String!) {
        contentfulProductSale(slug: {eq: $slug}) {
            description
            id
            name
            slug
            image {
                fluid(maxWidth: 1280) {
                    ...GatsbyContentfulFluid
                }
            }
            detailedDescription {
                childMarkdownRemark {
                    html
                    frontmatter {
                        name
                    }
                }
            }
        }
    }
`
 