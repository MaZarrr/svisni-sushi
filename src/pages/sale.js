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
             description="Акции на роллы суши и пиццу в Валуйках. Скидки до 40%, подарки именинникам, бесплатная пицца, роллы за 99 рублей "/>
        <HeadSection titleTXT={"Акции"} />
        <Grid container style={{padding: '0 20px'}}>
            {props.data.allContentfulSale.edges.map((item) => (
                <Grid key={item.node.id} item xs={12} sm={6} md={4} className={classes.item}>
                    <Link to={ item.node.slug !== "birthday-discounts" ? `/${item.node.slug}` : '/sale/'} style={{textDecoration: `none`, color: '#000'}}>
                    {/* <Link to={`/sale${item.node.slug}`} style={{textDecoration: `none`, color: '#000'}}> */}
                        <GatsbyImage
                            image={item.node.image.gatsbyImageData}
                            className={classes.imageSale}
                            alt={`Акция ${item.node.name}`} />
                        <Typography style={{marginTop: 8}} variant="h4">{item.node.name}</Typography>
                        <Typography style={{marginTop: 5}} dangerouslySetInnerHTML={{
                        __html: item.node.description.childMarkdownRemark.html }} variant="subtitle2" />
                    </Link>
                </Grid> ))} 
         </Grid> 
    </>
}

export default Sale

const useStyleSalePage = makeStyles(theme => ({
    imageSale: {
        cursor: `pointer`,
        borderRadius: `8px`,
        // [theme.breakpoints.down('md')]: {
            // maxWidth: `80vmax`
        // }
    },
    item: {
        padding: `0 20px 30px 0`
    }
}));

export const query = graphql `
    {
    allContentfulSale {
        edges {
          node {
            id
            description {
                childMarkdownRemark {
                  html
                }
              }
            slug
            name
            image {
                gatsbyImageData(
                placeholder: BLURRED, 
                formats: [WEBP, AUTO]
                  sizes:"(max-width: 800px) 360px, 100vw)"
              )
             }
          }
        }
      }
    }
`



