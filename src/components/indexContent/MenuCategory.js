import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "gatsby";
import Typography from "@material-ui/core/Typography";
import { StaticImage } from "gatsby-plugin-image";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';

const MenuCategory = () => {

  const classes = useStyleMenu();
  return (
    <div className={classes.root}>
      
      <Grid item xs={6} sm={4} className={classes.itemMenu}>
          <IconButton style={{ padding: `10px 0 10px 0` }}>
            <Link style={{ textDecoration: `none`, color: "grey" }} to="/sety/">
              <div className={classes.cartTitle}>
                <Typography className={classes.menuTitle} variant={"h2"}>Сеты</Typography>
              </div>
              <div style={{ margin: `0 auto` }}>
                <StaticImage
                  loading={"eager"}
                  placeholder="blurred"
                  src="../../images/setyMG.jpg"
                  alt="Наборы, суши сеты" />
              </div>
            </Link>
          </IconButton>
        </Grid>

      <Grid item xs={6} sm={4} className={classes.itemMenu}>
        <IconButton style={{ padding: `10px 0 10px 0` }}>
          <Link style={{ textDecoration: `none`, color: "grey" }} to="/pizza/">
            <div className={classes.cartTitle}>
              <Typography className={classes.menuTitle} variant={"h2"}>Пицца</Typography>
            </div>
            <div style={{ margin: `0 auto` }}>
              <StaticImage
                loading={"eager"}
                placeholder="blurred"
                src="../../images/pizzaG.jpg"
                alt="Пицца" />
            </div>
          </Link>
        </IconButton>
      </Grid>

      <Grid item xs={6} sm={4} className={classes.itemMenu}>
        <IconButton style={{ padding: `10px 0 10px 0` }}>
          <Link style={{ textDecoration: `none`, color: "grey" }} to="/kombo/">
            <div className={classes.cartTitle}>
              <Typography className={classes.menuTitle} variant={"h2"}>Комбо</Typography>
            </div>
            <div style={{ margin: `0 auto` }}>
              <StaticImage
                loading={"eager"}
                placeholder="blurred"
                src="../../images/komboG.jpg"
                alt="Комбо наборы" />
            </div>
          </Link>
        </IconButton>
      </Grid>

      <Grid item xs={6} sm={4} className={classes.itemMenu}>
        <IconButton style={{ padding: `10px 0 10px 0` }}>
          <Link style={{ textDecoration: `none`, color: "grey" }} to="/hot-rolls/">
            <div className={classes.cartTitle}>
              <Typography className={classes.menuTitle} variant={"h2"}>Горячие роллы</Typography>
            </div>
            <div style={{ margin: `0 auto` }}>
              <StaticImage
                loading={"eager"}
                placeholder="blurred"
                src="../../images/hotRG.jpg"
                alt="Горячие роллы" />
            </div>
          </Link>
        </IconButton>
      </Grid>

      <Grid item xs={6} sm={4} className={classes.itemMenu}>
        <IconButton style={{ padding: `10px 0 10px 0` }}>
          <Link style={{ textDecoration: `none`, color: "grey" }} to="/branded-rolls/">
            <div className={classes.cartTitle}>
              <Typography className={classes.menuTitle} variant={"h2"}>Сложные роллы</Typography>
            </div>
            <div style={{ margin: `0 auto` }}>
              <StaticImage
                placeholder="blurred"
                src="../../images/slogRG.jpg"
                alt="Сложные роллы" />
            </div>
          </Link>
        </IconButton>
      </Grid>

      <Grid item xs={6} sm={4} className={classes.itemMenu}>
        <IconButton style={{ padding: `10px 0 10px 0` }}>
          <Link style={{ textDecoration: `none`, color: "grey" }} to="/wok/">
            <div className={classes.cartTitle}>
              <Typography className={classes.menuTitle} variant={"h2"}>Wok лапша</Typography>
            </div>
            <div style={{ margin: `0 auto` }}>
              <StaticImage
                placeholder="blurred"
                src="../../images/wokG.jpg"
                alt="Лапша wok" />
            </div>
          </Link>
        </IconButton>
      </Grid>

      <Grid item xs={6} sm={4} className={classes.itemMenu}>
        <IconButton style={{ padding: `10px 0 10px 0` }}>
          <Link style={{ textDecoration: `none`, color: "grey" }} to="/zakyski/">
            <div className={classes.cartTitle}>
              <Typography className={classes.menuTitle} variant={"h2"}>Закуски</Typography>
            </div>
            <div style={{ margin: `0 auto` }}>
              <StaticImage
                placeholder="blurred"
                src="../../images/zakuskiS.jpg"
                alt="Закуски, бургер, мидии, палочки" />
            </div>
          </Link>
        </IconButton>
      </Grid>

      <Grid item xs={6} sm={4} className={classes.itemMenu}>
        <IconButton style={{ padding: `10px 0 10px 0` }}>
          <Link style={{ textDecoration: `none`, color: "grey" }} to="special-menu/vegetarian">
            <div className={classes.cartTitle}>
              <Typography className={classes.menuTitle} variant={"h2"}>Пост\веган</Typography>
            </div>
            <div style={{ margin: `0 auto` }}>
              <StaticImage
                loading={"eager"}
                placeholder="blurred"
                src="../../images/veganMenu.jpg"
                alt="Постное, вегетарианское меню" />
            </div>
          </Link>
        </IconButton>
      </Grid>

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
    bottom: `7vmin`,
    color: `#000`,
    left: 10,
    zIndex: 1000
  },
  menuTitle: {
    fontWeight: 500,
    textAlign: `center`,
    padding: `10px 0 10px 0`,
    fontSize: `5vmin`,
  },
});