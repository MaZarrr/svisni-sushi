import React from "react"
import SEO from "../components/seo"
import { graphql, Link} from "gatsby"
import Img from 'gatsby-image';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HeadSection from "../components/HeadSection"

const Sale = (props) => {
return (
    <>
    <SEO title="Акции и скидки на пиццу, роллы и суши"
    description="Акции на роллы суши и пиццу в Валуйках. Скидки до 60%, подарки именинникам, бесплатная пицца, роллы за 79 рублей "/>
    <HeadSection titleTXT={"Акции"} />
    <Grid container style={{margin: `0 0 50px 0`}}>
        {props.data.allContentfulProductSale.edges.map((product) => (
        <Grid key={product.node.id} item xs={12} sm={12} md={6} style={{padding: 20}}>
            <Link to={`/sale${product.node.slug}`} style={{textDecoration: `none`, color: '#000'}}>
                <Img fluid={product.node.image.fluid}
                     style={{cursor: `pointer`, maxWidth: `50vmax`, margin: `0 auto`, borderRadius: 12}}
                     alt={`Акция ${product.node.name}`} />
                <Typography style={{fontSize: 22, fontWeight: 600}} variant="h4">{product.node.name}</Typography>
            </Link>
        </Grid> ))}
    </Grid>
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
                    name
                    slug
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



