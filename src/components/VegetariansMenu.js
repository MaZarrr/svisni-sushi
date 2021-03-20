import React from "react";
import { graphql } from "gatsby";
import CardsMenuPage from "./CardsMenuPage";
import HeadSection from "./HeadSection";
import { Grid } from "@material-ui/core";


const VegetariansMenu = ({ menu }) => {
  return (
    <>
      <HeadSection titleTXT="Постное/веган меню"/>
      <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
        <CardsMenuPage image={{}} titleCategory="Пост/Вег" slugCategogy="/zakyski" visibleItems={menu} product={menu} />
      </Grid>
      </>

  )

}

export default VegetariansMenu;

