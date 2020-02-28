import React from "react"
import SEO from "../components/seo"
import { StylingInfo } from '../components/common/style';
import { graphql, Link} from "gatsby"
import Img from 'gatsby-image';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Sale = ({data}) => {

return (
    <>
    <SEO title="Акции и скидки Свисни Суши Уразово 2020 на пиццу, роллы, суши и наборы" />
    <StylingInfo>
    <div className="container">
    <h1 style={{fontSize: `40px`}}>Акции</h1>
    <hr></hr>

    <Grid container xs style={{margin: `0 0 50px 0`}}>
        {data.allContentfulProductSale.edges.map((product) => (
        <Grid key={product.node.id} item xs={12} sm={12} md={6}>
            <Img fluid={product.node.image.fluid} style={{maxWidth: `600px`, margin: `20px 40px 20px 0`}} />
            <Link to={`/sale/${product.node.slug}`}>
                <Typography variant="subtitle1"><b>{product.node.name}</b></Typography>
            </Link>
        </Grid>
        ))
        }
    </Grid>
      </div> 
    </StylingInfo>
    </>
    
    )
}

export default Sale

export const query = graphql `
{
  allContentfulProductSale {
      edges {
          node {
              id
              variant
              slug
              name
              description
                image {
                fluid(maxWidth: 600, toFormat: WEBP) {
                    ...GatsbyContentfulFluid_tracedSVG
                }
            }
          }
      }
  }
}
`



