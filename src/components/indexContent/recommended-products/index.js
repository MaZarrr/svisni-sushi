import React from "react";
import SelectionContent from "./SelectionContent";
import SelectionContentMobile from "./SelectionContentMobile";
import Hidden from "@mui/material/Hidden";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const RecommendedProducts = ({ title, product }) => {
  return <>
   <Typography sx={{
     marginLeft: '25px', 
     margin: '0 0 20px 50px'
     }} variant={'h2'}>{title}</Typography>
    <Hidden smUp>
      <SelectionContentMobile product={product} />
    </Hidden>
    <Hidden smDown>
    <Grid container justifyContent={"space-between"} style={{width: `100%`, marginBottom: 50}}>
        <SelectionContent product={product} />
    </Grid>
    </Hidden>
  </>;
}

export default RecommendedProducts;