import React from "react"
import Seo from "./seo"
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from 'gatsby';
import Button from '@mui/material/Button';
import ReplyIcon from '@mui/icons-material/Reply';
import HeadSection from "./HeadSection"
import styled from '@emotion/styled'
import Grid from "@mui/material/Grid"

const MetterContent = styled.div `
  max-width: 94%;
  margin: 20px 0 20px 10px;
  .info-block {
    blockquote {
      margin: 0;
    }
    max-width: 90%;
    p {
      font-size: 16px;
      @media (max-width: 475px) {
        font-size: 14px;
      }
    }
  }
  p {
    padding-left: 20px;
  }
  @media (max-width: 475px) {
    margin: 20px 0 20px 0;
  }
`
const ButtonGroupSale = styled.div `
  padding-left: 20px;
  margin: 0 0 30px 0;
  @media (min-width: 475px) {
    padding-left: 30px;;
  }
`
const ImageSale = styled(GatsbyImage) `
  margin-top: 20px;
  border-radius: 2px;
  max-width: 48vmax;
  margin-left: 20px;
  margin-right: 10px;
  @media (min-width: 475px) {
    margin-left: 30px;
  }
`

const SaleItem = ({ image, md, name, path, slug, textSlug}) => {
  return (
    <>
      <Seo title={`Акция ${name}`}
           description={`Акции и скидки, подробнее на сайте. Воспользоввться акцией ${name}`}
           noindex={true}
           pathname="/sale"/>
      <HeadSection titleTXT={name} />
      <Grid container>
        <Grid item xs={12} md={6}>
          <ImageSale image={image} alt={`Акция ${name}`} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MetterContent dangerouslySetInnerHTML={{__html: md.childMarkdownRemark.html}} />
          <ButtonGroupSale>
            <Button variant="contained"
                    component={Link}
                    color="inherit"
                    to="/sale"
                    endIcon={<ReplyIcon color={"action"}/>}
                    style={{margin: `10px 0`, fontSize: 12}}>Все акции</Button>
            { path !== "/pizza-happy/" &&
            <Button variant="contained"
                    component={Link}
                    to={`/${slug}/`}
                    style={{marginLeft: 10, backgroundColor: `orange`, fontSize: 12}}>{textSlug}</Button> }
          </ButtonGroupSale>
        </Grid>
      </Grid>
    </>
  )};
export default SaleItem