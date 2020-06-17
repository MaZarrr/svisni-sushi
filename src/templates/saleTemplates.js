import React from 'react'
import {graphql, Link} from 'gatsby';
// import SaleItem from "../components/SaleItem";
import {StylingInfo} from "../components/common/style";
import SEO from "../components/seo";
import Img from "gatsby-image";
import Button from "@material-ui/core/Button";
import ReplyIcon from "@material-ui/icons/Reply";
// import loadable from "@loadable/component";
// const SaleItem = loadable(() => import('../components/SaleItem'))

const SaleTeamplate = ({data: {contentfulProductSale: {image, name, description,
    detailedDescription: {childMarkdownRemark: md}} }}) => {
    // console.log(md)
    return (
        <StylingInfo>
            <SEO title={`Акция ${name}`}
                 description={`Акции и скидки, подробнее на сайте. Воспользоввться акцией ${name}`}
                 noindex={true}
                 pathname="/sale"/>
            <div className="container">
                <h1>{name}</h1>
                <Img style={{maxWidth: 1280, marginTop: 30}} fluid={image.fluid} />
                <p>{description}</p>
                {/*<div className="col-md-12 col-12 mt-4">*/}
                {/*    <div dangerouslySetInnerHTML={{__html: md.html}} />*/}
                {/*</div>*/}
                <Button variant="outlined"
                        component={Link}
                        to="/sale"
                        size="large"
                        endIcon={<ReplyIcon/>}
                        style={{margin: `10px 0 40px 10px`}}>Все акции</Button>
            </div>
        </StylingInfo>
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

// <SaleItem
//     image={image.fluid}
//     md={mdRemark !== undefined ? mdRemark : {description, name}}>
// </SaleItem>