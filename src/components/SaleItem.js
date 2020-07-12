import React from "react"
import SEO from "./seo"
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import {StylingInfo} from '../components/common/style'
import {Container} from "@material-ui/core";

const SaleItem = ({image, md, name }) => {

    return (
        <StylingInfo>
        <SEO title={`Акция ${name}`}
             description={`Акции и скидки, подробнее на сайте. Воспользоввться акцией ${name}`}
             noindex={true}
             pathname="/sale"/>
        <Container>
        <h1>{name}</h1>
            <hr></hr>
                <Img className="imgSale" style={{borderRadius: 12}} fluid={image} />
                <div dangerouslySetInnerHTML={{__html: md.childMarkdownRemark.html}} />
            <Button variant="outlined"
                component={Link}
                to="/sale"
                size="large"
                endIcon={<ReplyIcon/>}
                style={{margin: `10px 0 40px 10px`}}>Все акции</Button>
            </Container>
        </StylingInfo>
        )}

        export default SaleItem