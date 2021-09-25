import React, {useState, useEffect} from 'react'
import { graphql } from 'gatsby';
import Spinner from  "../components/spinner/spinner-new"
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import loadable from "@loadable/component";
import { getImage } from "gatsby-plugin-image";

const SaleItem = loadable(() => import('../components/SaleItem'), {
    fallback: <Spinner/>});

const SaleTeamplate = ({ data: { contentfulProductSale: {
    image, name, detailedDescription, slug }} }) => {
    const [load, setLoad] = useState(true)
    const [mdr, setMdr] = useState(null)
    const img = getImage(image)

    useEffect(() => {
        async function fetchData() {
            const mdRemark = await detailedDescription
            setMdr(mdRemark)
            setLoad(false)
        }
        fetchData();
    }, [detailedDescription])

    return (
      <ErrorBoundary>
          { load === false ?
            <SaleItem
              name={name}
              image={img}
              slug={detailedDescription.childMarkdownRemark.frontmatter.sluginfo}
              textSlug={detailedDescription.childMarkdownRemark.frontmatter.sluginfotext}
              md={mdr}
              path={slug}
            />
            : <Spinner/> }
      </ErrorBoundary>
    )
}
export default SaleTeamplate

export const query = graphql `
    query PageSale ($slug: String!) {
        contentfulProductSale(slug: {eq: $slug}) {
            description
            id
            name
            slug
            image {
            gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
            }
            detailedDescription {
              childMarkdownRemark {
                frontmatter {
                  slug
                  sluginfo
                  sluginfotext
                  title
                  name
                }
                html
                }
            }
        }
    }
`