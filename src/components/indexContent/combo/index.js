import React from "react";
import KomboContent from "./KomboContent";
import KomboMobileContent from "./KomboMobileContent";
import Grid from "@mui/material/Grid";
import { Hidden, Typography } from "@mui/material";

const ComboProduct = ({ title, product }) => {
  return <div>
   <Typography sx={{
     margin: '30px 0 30px 30px'
     }} variant={'h2'}>{title}</Typography>
    {/*Комбо компьютер*/}
    <Hidden smDown>
      <Grid container justifyContent={"space-between"} style={{ width: `100%`, marginBottom: '50px' }}>
        <KomboContent product={product} />
      </Grid>
    </Hidden>

    {/* Комбо телефон */}
    <Hidden smUp> <KomboMobileContent product={product} /> </Hidden>
  </div>;
}

export default ComboProduct