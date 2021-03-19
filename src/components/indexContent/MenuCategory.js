import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link, useStaticQuery, graphql } from "gatsby";
import Typography from "@material-ui/core/Typography";
import { GatsbyImage } from "gatsby-plugin-image";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';

const MenuCategory = () => {

  const { allContentfulHomePageImageMenu: { edges: itemsCategory }} = useStaticQuery(graphql`
  query {
   allContentfulHomePageImageMenu {
            edges {
                node {
                    id
                    slug
                    category
                    desc
                    image {
                        gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
                    }
                }
            }
        }
  }
`)

  const classes = useStyleMenu();
  return (
    <div className={classes.root}>
      {itemsCategory.map(({ node: item }) => (
        <Grid item xs={6} sm={4}
              className={classes.itemMenu}
              key={item.id}>
          <IconButton style={{ padding: `10px 0 10px 0` }}>
            <Link style={{ textDecoration: `none`, color: "grey" }} to={`/${item.slug}/`}>
              <div className={classes.cartTitle}>
                <Typography className={classes.menuTitle} variant={"h2"}>{item.category}</Typography>
              </div>
              <div style={{ margin: `0 auto` }}>
                <GatsbyImage
                  loading={"eager"}
                  image={item.image.gatsbyImageData}
                  alt={item.category} />
              </div>
            </Link>
          </IconButton>
        </Grid>
      ))}
    </div>
  );
}
export default MenuCategory

const useStyleMenu = makeStyles({
  root: {
    margin: `0 auto`,
    display: `flex`,
    flexWrap: "wrap",
    alignItems: "baseline",
    borderRadius: `3px`
  },
  itemMenu: {
    padding: `5px`
  },
  cartTitle: {
    position: `absolute`,
    bottom: `0`,
    opacity: `90%`,
    borderRadius: 3,
    backgroundColor: "#303032",
    color: `#fff`,
    left: 0,
    width: `100%`,
    zIndex: 1000
  },
  menuTitle: {
    textAlign: `center`,
    padding: `10px 0 10px 0`,
    fontSize: `4vmin`,
  },
});