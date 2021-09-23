import React from "react";
import KomboContent from "./KomboContent";
import KomboMobileContent from "./KomboMobileContent";
import styled from '@emotion/styled'
import Grid from "@mui/material/Grid";
import { Hidden } from "@mui/material";

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
  width: 100%;
  padding-bottom: 20px;
  @media (max-width: 600px) {
    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 0; 
  }
`

const ComboProduct = ({ product }) => {

  return <>
    <Title>Собери свой суши сет</Title>
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