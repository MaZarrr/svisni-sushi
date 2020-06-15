import React from 'react'
import {graphql} from 'gatsby';
import SaleItem from "../components/SaleItem";
// import loadable from "@loadable/component";

// const SaleItem = loadable(() => import('../components/SaleItem'))

const SaleTeamplate = (props) => {
    return (
        <SaleItem
            name={props.data.markdownRemark.frontmatter.name}
            image={props.data.contentfulProductSale.image.fluid}
            markDeckription={props.data.markdownRemark}>
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
            image {
                fluid(maxWidth: 1280) {
                    ...GatsbyContentfulFluid
                }
            }
        }
    }

`
 