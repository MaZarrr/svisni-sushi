import React from "react"
import SEO from "../components/seo"
import { StylingInfo } from '../components/common/style';
import { graphql, Link} from "gatsby"
import Img from 'gatsby-image';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Container} from "@material-ui/core";

const Sale = (props) => {
return (
    <>
    <SEO title="Акции и скидки на пиццу, роллы и суши"
    description="Акции на роллы суши и пиццу в Валуйках. Скидки до 60%, подарки именинникам, бесплатная пицца, роллы за 79 рублей "/>
    <StylingInfo>

    <Container>
    <h1>Акции</h1>

    <Grid container style={{margin: `0 0 50px 0`}}>
        {props.data.allContentfulProductSale.edges.map((product) => (
        <Grid key={product.node.id} item xs={12} sm={12} md={6}>
            <Link to={`/sale${product.node.slug}`} style={{textDecoration: `none`, color: '#000'}}>
                <Img fluid={product.node.image.fluid}
                     style={{cursor: `pointer`, maxWidth: `600px`, margin: `20px 40px 5px 0`, borderRadius: 12}}
                     alt={`Акция ${product.node.name}`} />
                <Typography style={{fontSize: 18}} variant="h4">{product.node.name}</Typography>
            </Link>
        </Grid> ))}
    </Grid>
    </Container>
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



