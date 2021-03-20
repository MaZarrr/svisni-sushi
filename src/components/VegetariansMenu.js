import React from "react";
import { graphql } from "gatsby";
import CardsMenuPage from "./CardsMenuPage";
import HeadSection from "./HeadSection";
import { Grid } from "@material-ui/core";
import SEO from "./seo";

const VegetariansMenu = ({ menu }) => {
  return (
    <>
      <SEO title={"Постное меню роллов, пиццы в Свисни Суши"} description={"Меню для вегетарианцев, постное меню. Овощные салаты, пицца Маргарита. Вкусные роллы"}/>
      <HeadSection titleTXT="Постное/веган меню"/>
      <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
        <CardsMenuPage image={{}} titleCategory="Пост/Вег" slugCategogy="/zakyski" visibleItems={menu} product={menu} />
      </Grid>
      </>

  )

}

export default VegetariansMenu;

