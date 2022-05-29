import React from "react";
import KomboContent from "./KomboContent";
import KomboMobileContent from "./KomboMobileContent";
import Grid from "@mui/material/Grid";
import { Hidden, Typography } from "@mui/material";

const ComboProduct = ({ product }) => {
  return <>
    <Typography sx={{
      marginLeft: '25px', 
      margin: '20px 0 20px 50px',
      paddingRight: '20px'
      }} variant={'h2'}>Собери свой набор из пиццы, суши, роллов</Typography>
    {/*Комбо компьютер*/}
    <Hidden smDown>
      <Grid container justifyContent={"space-between"} style={{ width: `100%`, marginBottom: 50 }}>
        <KomboContent product={product} />
      </Grid>
    </Hidden>

    {/* Комбо телефон */}
    <Hidden smUp> <KomboMobileContent product={product} /> </Hidden>
  </>;
}

export default ComboProduct