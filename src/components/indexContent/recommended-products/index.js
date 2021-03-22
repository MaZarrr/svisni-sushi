import React from "react";
import SelectionContent from "./SelectionContent";
import SelectionContentMobile from "./SelectionContentMobile";
import styled from "styled-components";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  width: 100%;
  padding-bottom: 20px;
  @media (max-width: 600px) {
    font-size: 22px;
    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 0; 
  }
`

const RecommendedProducts = ({ product }) => {

  return (
  <>
    <Title variant={"h2"}>Блюда которые понравятся каждому</Title>
    <Hidden smUp>
      <SelectionContentMobile product={product} />
    </Hidden>
    <Hidden xsDown>
    <Grid container justify={"space-between"} style={{width: `100%`, marginBottom: 50}}>
        <SelectionContent product={product} />
    </Grid>
    </Hidden>
  </>
  )
}

export default RecommendedProducts;