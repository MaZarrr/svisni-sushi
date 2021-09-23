import React from "react"
import Seo from "../components/seo"
import { graphql, Link} from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HeadSection from "../components/HeadSection"
import { makeStyles } from "@material-ui/core/styles"

const Sale = (props) => {
  const classes = useStyleSalePage();

  return <>
  <Seo title="Акции и скидки на пиццу, роллы и суши в Уразово"
  description="Акции на роллы суши и пиццу в Валуйках. Скидки до 50%, подарки именинникам, бесплатная пицца, роллы за 79 рублей "/>
  <HeadSection titleTXT={"Акции"} />
  <Grid container className={classes.container}>
      {props.data.allContentfulProductSale.edges.map((product) => (
      <Grid key={product.node.id} item xs={12} sm={6} md={4} className={classes.item}>
          <Link to={`/sale${product.node.slug}`} style={{textDecoration: `none`, color: '#000'}}>
              <GatsbyImage
                image={product.node.image.gatsbyImageData}
                className={classes.imageSale}
                alt={`Акция ${product.node.name}`} />
              <Typography className={classes.saleName} variant="h4">{product.node.name}</Typography>
              <Typography className={classes.saleDescription} variant="h4">{product.node.description}</Typography>
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
     [theme.breakpoints.down('475')]: {
       maxWidth: `80vmax`
     }
   },
    container: {
      padding: `30px 0 50px 30px`,
      [theme.breakpoints.down('475')]: {
        padding: `20px 0 50px 20px`
      }
    },
    item: {
      padding: `0 10px 30px 0`
    },
    saleName: {
      fontSize: 24,
      fontWeight: 600,
      padding: `15px 0 15px 0`,
      width: `85%`,
      [theme.breakpoints.down('475')]: {
        fontSize: 22,
        padding: `10px 0 10px 0`
      }
    },
    saleDescription: {
      fontSize: 15,
      width: `85%`,
      fontWeight: 500,
      [theme.breakpoints.down('475')]: {
        fontSize: 14
      }
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



