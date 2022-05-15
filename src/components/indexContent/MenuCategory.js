import React from "react";
import Grid from "@mui/material/Grid";
import { Link } from "gatsby";
import Typography from "@mui/material/Typography";
import { StaticImage } from "gatsby-plugin-image";
import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import { hardPink, hardGrey} from "../../theme";
import { styled } from "@mui/system";

const TypographyStyle = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    textAlign: `center`,
    fontSize: `3vmin`
}))

const MenuCategory = () => {

  const classes = useStyleMenu();
  return (
    <div className={classes.root}>
      
      <Grid item xs={6} sm={4} className={classes.itemMenu}>
          <IconButton style={{ padding: `10px 0 10px 0` }} size="large">
            <Link style={{ textDecoration: `none`, color: "grey" }} to="/sety/">
              <div className={classes.cartTitle}>
                <TypographyStyle className={classes.menuTitle}>Сеты</TypographyStyle>
              </div>
              <div style={{ margin: `0 auto` }}>
                <StaticImage
                className={classes.image}
                  loading={"eager"}
                  placeholder="blurred"
                  src="../../images/setyMG.jpg"
                  alt="Наборы, суши сеты" />
              </div>
            </Link>
          </IconButton>
        </Grid>

      <Grid item xs={6} sm={4} className={classes.itemMenu}>
        <IconButton style={{ padding: `10px 0 10px 0` }} size="large">
          <Link style={{ textDecoration: `none`, color: "grey" }} to="/pizza/">
            <div className={classes.cartTitle}>
              <TypographyStyle className={classes.menuTitle}>Пицца</TypographyStyle>
            </div>
            <div style={{ margin: `0 auto` }}>
              <StaticImage
                className={classes.image}
                loading={"eager"}
                placeholder="blurred"
                src="../../images/pizzaG.jpg"
                alt="Пицца" />
            </div>
          </Link>
        </IconButton>
      </Grid>

      <Grid item xs={6} sm={4} className={classes.itemMenu}>
        <IconButton style={{ padding: `10px 0 10px 0` }} size="large">
          <Link style={{ textDecoration: `none`, color: "grey" }} to="/kombo/">
            <div className={classes.cartTitle}>
              <TypographyStyle className={classes.menuTitle}>Комбо</TypographyStyle>
            </div>
            <div style={{ margin: `0 auto` }}>
              <StaticImage
                className={classes.image}
                loading={"eager"}
                placeholder="blurred"
                src="../../images/komboG.jpg"
                alt="Комбо наборы" />
            </div>
          </Link>
        </IconButton>
      </Grid>

      <Grid item xs={6} sm={4} className={classes.itemMenu}>
        <IconButton style={{ padding: `10px 0 10px 0` }} size="large">
          <Link style={{ textDecoration: `none`, color: "grey" }} to="/hot-rolls/">
            <div className={classes.cartTitle}>
              <TypographyStyle className={classes.menuTitle}>Горячие роллы</TypographyStyle>
            </div>
            <div style={{ margin: `0 auto` }}>
              <StaticImage
                className={classes.image}
                loading={"eager"}
                placeholder="blurred"
                src="../../images/hotRG.jpg"
                alt="Горячие роллы" />
            </div>
          </Link>
        </IconButton>
      </Grid>

      <Grid item xs={6} sm={4} className={classes.itemMenu}>
        <IconButton style={{ padding: `10px 0 10px 0` }} size="large">
          <Link style={{ textDecoration: `none`, color: "grey" }} to="/branded-rolls/">
            <div className={classes.cartTitle}>
              <TypographyStyle className={classes.menuTitle}>Сложные роллы</TypographyStyle>
            </div>
            <div style={{ margin: `0 auto` }}>
              <StaticImage
                className={classes.image}
                placeholder="blurred"
                src="../../images/slogRG.jpg"
                alt="Сложные роллы" />
            </div>
          </Link>
        </IconButton>
      </Grid>

      <Grid item xs={6} sm={4} className={classes.itemMenu}>
        <IconButton style={{ padding: `10px 0 10px 0` }} size="large">
          <Link style={{ textDecoration: `none`, color: "grey" }} to="/wok/">
            <div className={classes.cartTitle}>
              <TypographyStyle className={classes.menuTitle}>Wok лапша</TypographyStyle>
            </div>
            <div style={{ margin: `0 auto` }}>
              <StaticImage
                className={classes.image}
                placeholder="blurred"
                src="../../images/wokG.jpg"
                alt="Лапша wok" />
            </div>
          </Link>
        </IconButton>
      </Grid>

      <Grid item xs={6} sm={4} className={classes.itemMenu}>
        <IconButton style={{ padding: `10px 0 10px 0` }} size="large">
          <Link style={{ textDecoration: `none`, color: "grey" }} to="/zakyski/">
            <div className={classes.cartTitle}>
              <TypographyStyle className={classes.menuTitle}>Закуски</TypographyStyle>
            </div>
            <div style={{ margin: `0 auto` }}>
              <StaticImage
                className={classes.image}
                placeholder="blurred"
                src="../../images/zakuskiS.jpg"
                alt="Закуски, бургер, мидии, палочки" />
            </div>
          </Link>
        </IconButton>
      </Grid>

      {/* <Grid item xs={6} sm={4} className={classes.itemMenu}>
        <IconButton style={{ padding: `10px 0 10px 0` }} size="large">
          <Link style={{ textDecoration: `none`, color: "grey" }} to="special-menu/vegetarian">
            <div className={classes.cartTitle}>
              <TypographyStyle className={classes.menuTitle}>Вегетарианское</TypographyStyle>
            </div>
            <div style={{ margin: `0 auto` }}>
              <StaticImage
                className={classes.image}
                loading={"eager"}
                placeholder="blurred"
                src="../../images/veganMenu.jpg"
                alt="Постное, вегетарианское меню" />
            </div>
          </Link>
        </IconButton>
      </Grid> */}

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
  image: {
    boxShadow: '-3px 6px 8px 0px rgba(34, 60, 80, 0.2)',
    borderRadius: '50% 20% / 10% 40%',
    border: `1px solid ${hardGrey}`,
  },
  itemMenu: {
    padding: `15px 25px 0 25px`
  },
  cartTitle: {
    position: `absolute`,
    bottom: `4vmin`,
    color: `#000`,
    borderRadius: '100px 100px 100px 100px',
    backgroundColor: "white",
    border: `1px solid ${hardPink}`,
    fontWeight: "bold",
    width: "100%",
    zIndex: 1000,
  },

});

// const itemsMenu = [
//   {
//     id: 1,
//     slug: "/sety/",
//     title: "Сеты",
//     imageSrc: "../../images/setyMG.jpg",
//     alt: "Наборы, суши сеты"
//   },
//   {
//     id: 2,
//     slug: "/pizza/",
//     title: "Пицца",
//     imageSrc: "../../images/pizzaG.jpg",
//     alt: "Пицца"
//   },
//   {
//     id: 3,
//     slug: "/kombo/",
//     title: "Комбо",
//     imageSrc: "../../images/komboG.jpg",
//     alt: "Комбо наборы"
//   },
//   {
//     id: 4,
//     slug: "/hot-rolls/",
//     title: "Горячие роллы",
//     imageSrc: "../../images/hotRG.jpg",
//     alt: "Горячие запечённые роллы"
//   },
//   {
//     id: 5,
//     slug: "/branded-rolls/",
//     title: "Сложные роллы",
//     imageSrc: "../../images/slogRG.jpg",
//     alt: "Сложные роллы"
//   },
//   {
//     id: 6,
//     slug: "/wok/",
//     title: "Wok лапша",
//     imageSrc: "../../images/wokG.jpg",
//     alt: "Лапша wok"
//   },
//   {
//     id: 7,
//     slug: "/zakyski/",
//     title: "Закуски",
//     imageSrc: "../../images/zakuskiS.jpg",
//     alt: "Закуски, бургер, мидии"
//   },
//   {
//     id: 8,
//     slug: "special-menu/vegetarian",
//     title: "Вегетарианское",
//     imageSrc: "../../images/veganMenu.jpg",
//     alt: "Постное, вегетарианское меню"
//   },
// ]