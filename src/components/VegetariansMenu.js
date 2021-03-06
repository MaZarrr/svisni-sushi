import React from "react";
import CardsMenuPage from "./CardsMenuPage";
import HeadSection from "./HeadSection";
import { Grid } from "@material-ui/core";
import SEO from "./seo";

const SpecialMenu = ({ menu: { categoryName, products, iconImage} }) => {
  return (
    <>
      <SEO title={"Постное меню роллов, пиццы в Свисни Суши"} description={"Меню для вегетарианцев, постное меню. Овощные салаты, пицца Маргарита. Вкусные роллы"}/>
      <HeadSection titleTXT={categoryName}/>
      <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
        <CardsMenuPage image={iconImage} titleCategory="Пост/Вег" slugCategogy="/zakyski" visibleItems={products} product={products} />
      </Grid>
      </>

  )

}

export default SpecialMenu;



