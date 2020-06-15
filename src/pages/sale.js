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
    <SEO title="Акции и скидки на пиццу, роллы и суши"
    description="Акции на роллы суши и пиццу в Валуйках. Скидки до 60%, подарки именинникам, бесплатная пицца, роллы за 79 рублей "/>
    <StylingInfo>

    <div className="container">
    <h1>Акции</h1>
    <hr></hr>

    <Grid container style={{margin: `0 0 50px 0`}}>
        {data.allContentfulProductSale.edges.map((product) => (
        <Grid key={product.node.id} item xs={12} sm={12} md={6}>
            <Img fluid={product.node.image.fluid} style={{maxWidth: `600px`, margin: `20px 40px 20px 0`}} />
            <Link to={`/sale/${product.node.slug}`}>
                <Typography variant="subtitle1"><b>{product.node.name}</b></Typography>
            </Link>
        </Grid> ))}
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
                fluid(maxWidth: 600) {
                    ...GatsbyContentfulFluid
                }
            }
          }
      }
  }
}
`



