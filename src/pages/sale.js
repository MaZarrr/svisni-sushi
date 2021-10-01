import React from "react"
import Seo from "../components/seo"
import { graphql, Link} from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import HeadSection from "../components/HeadSection"
import makeStyles from '@mui/styles/makeStyles';

const Sale = (props) => {
    const classes = useStyleSalePage();

    return <>
        <Seo title="Акции и скидки на пиццу, роллы и суши в Уразово"
             description="Акции на роллы суши и пиццу в Валуйках. Скидки до 50%, подарки именинникам, бесплатная пицца, роллы за 79 рублей "/>
        <HeadSection titleTXT={"Акции"} />
        <Grid container style={{padding: '0 20px'}}>
            {props.data.allContentfulProductSale.edges.map((product) => (
                <Grid key={product.node.id} item xs={12} sm={6} md={4} className={classes.item}>
                    <Link to={`/sale${product.node.slug}`} style={{textDecoration: `none`, color: '#000'}}>
                        <GatsbyImage
                            image={product.node.image.gatsbyImageData}
                            className={classes.imageSale}
                            alt={`Акция ${product.node.name}`} />
                        <Typography variant="h4">{product.node.name}</Typography>
                        <Typography variant="subtitle2">{product.node.description}</Typography>
                    </Link>
                </Grid> ))}
        </Grid>
    </>;
}

export default Sale

const useStyleSalePage = makeStyles(theme => ({
    imageSale: {
        cursor: `pointer`,
        maxWidth: `80vmax`,
        borderRadius: 2,
        [theme.breakpoints.down('md')]: {
            maxWidth: `80vmax`
        }
    },
    item: {
        padding: `0 10px 30px 0`
    }
}));

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
                        gatsbyImageData(
                            formats: [WEBP, AUTO]
                        )
                    }
                }
            }
        }
    }
`



