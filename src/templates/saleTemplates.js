import React, {useState, useEffect} from 'react'
import {graphql} from 'gatsby';
import Spinner from  "../components/spinner/spinner-new"
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import loadable from "@loadable/component";

const SaleItem = loadable(() => import('../components/SaleItem'), {
    fallback: <Spinner/>});

const SaleTeamplate = ({data: {contentfulProductSale: {image, name,
    detailedDescription, slug}}, path}) => {

    const [load, setLoad] = useState(true)
    const [mdr, setMdr] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const mdRemark = await detailedDescription
            setMdr(mdRemark)
            setLoad(false)
        }
        fetchData()
    }, [image, detailedDescription])

    return (
                <ErrorBoundary>
                    { load === false ?
                    <SaleItem
                        name={name}
                        image={image.fluid}
                        md={mdr}
                        path={slug}
                    /> : <Spinner/> }
                </ErrorBoundary>
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

