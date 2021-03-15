import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "gatsby";
import Typography from "@material-ui/core/Typography";
import { GatsbyImage } from "gatsby-plugin-image";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
// import loadable from "@loadable/component";
// const IconButton = loadable(() => import('@material-ui/core/IconButton'), {
//   fallback: <div style={{height: 196}} />
// })

const MenuCategory = ({ menu }) => {
  const classes = useStyleMenu();
  return (
    <>
      {menu.map(({ node: homeMenu }) => (
        <Grid item xs={6} sm={4}
              className={classes.itemMenu}
              key={homeMenu.id}>
          <IconButton style={{ padding: `20px 0 10px 0` }}>
            <Link style={{ textDecoration: `none`, color: "grey" }} to={`/${homeMenu.slug}/`}>
              <div className={classes.cartTitle}>
                <Typography className={classes.menuTitle} variant={"h2"}>{homeMenu.category}</Typography>
              </div>
              <div style={{ margin: `0 auto` }}>
                <GatsbyImage
                  loading={"eager"}
                  image={homeMenu.image.gatsbyImageData}
                  style={{ width: `43vmin`, borderRadius: 10 }}
                  alt={homeMenu.category} />
              </div>
            </Link>
          </IconButton>
        </Grid>
      ))}
    </>
  );
}
export default MenuCategory

const useStyleMenu = makeStyles(theme => ({
  itemMenu: {
    display: "flex",
    justifyContent: "space-around"
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
}));