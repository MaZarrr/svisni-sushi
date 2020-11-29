import React from "react"
import SEO from "./seo"
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import HeadSection from "./HeadSection"
import styled from 'styled-components';

const MetterContent = styled.div `
  max-width: 90%; 
  padding-left: 15px;
  .info-block {
    border-left: 2px solid #c75050;
    }

  }

`

const SaleItem = ({image, md, name, path }) => {

    return (
      <>
      <SEO title={`Акция ${name}`}
             description={`Акции и скидки, подробнее на сайте. Воспользоввться акцией ${name}`}
             noindex={true}
             pathname="/sale"/>
          <HeadSection titleTXT={name} />
                <Img style={{borderRadius: 12, maxWidth: `45vmax`, marginLeft: 15}} fluid={image} />
                <MetterContent dangerouslySetInnerHTML={{__html: md.childMarkdownRemark.html}} />
                <div style={{paddingLeft: 15}}>
            <Button variant="contained"
                component={Link}
                to="/sale"
                endIcon={<ReplyIcon color={"action"}/>}
                style={{margin: `10px 0`}}>Все акции</Button>
            { path !== "/pizza-happy/" &&
            <Button variant="contained"
                    component={Link}
                    to="/dostavka-i-oplata"
                    endIcon={<LocalTaxiIcon color={"action"}/>}
                    style={{margin: 0}}>Доставка</Button> }
      </div>
  </>
)};

export default SaleItem