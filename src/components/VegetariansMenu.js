import React from "react";
import MenuList from "./MenuList";
import HeadSection from "./HeadSection";
import { Grid } from "@mui/material";
import Seo from "./seo";

const SpecialMenu = ({ menu: { categoryName, products, iconImage} }) => {
  return (
    <>
      <Seo title={"Постное меню роллов, пиццы в Свисни Суши"} description={"Меню для вегетарианцев, постное меню. Овощные салаты, пицца Маргарита. Вкусные роллы"}/>
      <HeadSection titleTXT={categoryName}/>
      <Grid container justifyContent="center" itemScope itemType="http://schema.org/ItemList">
        <MenuList image={iconImage} titleCategory="Вегетарианское" slugCategogy="/zakyski" visibleItems={products} product={products} />
      </Grid>
      </>

  )

}

export default SpecialMenu;



