import React from "react"
import SEO from "../components/seo"
import "../components/sass/index.css"
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import CardIndex from "../components/Card";
import CarouselSvisni from "../components/common/CarouselSvisni"

const useStyleIndexPage = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: `100%`,
        marginBottom: 70
    }
}));

const IndexPage = () => {

  const classes = useStyleIndexPage();

return (
  <section>
  <SEO title="Заказать любимые суши и роллы c доставкой в Валуйки"
  description="Бесплатная доставка суши, роллов, пиццы и воков в Валуйках.
  Наше меню суши порадует широким выбором и низкими ценами. Заказ еды c 10 до 22:00"/>

   <CarouselSvisni />
          <Grid item xs={12} className={classes.root}>
              <CardIndex />
          </Grid>
  </section>
  )
}

export default IndexPage
