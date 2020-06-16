import React from 'react'
import {graphql} from 'gatsby';
import SaleItem from "../components/SaleItem";
// import loadable from "@loadable/component";

// const SaleItem = loadable(() => import('../components/SaleItem'))

const SaleTeamplate = (props) => {
    return (
        <SaleItem
            name={props.data.contentfulProductSale.name}
            image={props.data.contentfulProductSale.image.fluid}
            md={props.data.markdownRemark !== null ? props.data.markdownRemark : props.data.contentfulProductSale.description}>
        </SaleItem>
    )
}
export default SaleTeamplate

export const query = graphql `
    query ($slug: String!) {
        markdownRemark(frontmatter: {slug: {eq: $slug}}) {
            html
            frontmatter {
                name
            }
        }
        contentfulProductSale(slug: {eq: $slug}) {
            description
            name
            image {
                fluid(maxWidth: 1280) {
                    ...GatsbyContentfulFluid
                }
            }
        }
    }

`
 