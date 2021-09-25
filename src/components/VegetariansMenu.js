import React from "react";
import CardsMenuPage from "./CardsMenuPage";
import HeadSection from "./HeadSection";
import { Grid } from "@mui/material";
import Seo from "./seo";

const SpecialMenu = ({ menu: { categoryName, products, iconImage} }) => {
  return (
    <>
      <Seo title={"Постное меню роллов, пиццы в Свисни Суши"} description={"Меню для вегетарианцев, постное меню. Овощные салаты, пицца Маргарита. Вкусные роллы"}/>
      <HeadSection titleTXT={categoryName}/>
      <Grid container justifyContent="center" itemScope itemType="http://schema.org/ItemList">
        <CardsMenuPage image={iconImage} titleCategory="Вегетарианское" slugCategogy="/zakyski" visibleItems={products} product={products} />
      </Grid>
      </>

  )

}

export default SpecialMenu;



