import React from "react"
import SEO from "./seo"
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import {StylingInfo} from '../components/common/style'
import {Container} from "@material-ui/core";
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';

const SaleItem = ({image, md, name, path }) => {

    return (
        <StylingInfo>
        <SEO title={`Акция ${name}`}
             description={`Акции и скидки, подробнее на сайте. Воспользоввться акцией ${name}`}
             noindex={true}
             pathname="/sale"/>
        <Container>
        <h1>{name}</h1>
                <Img className="imgSale" style={{borderRadius: 12, maxWidth: 500}} fluid={image} />
                <div style={{maxWidth: `90%`}} dangerouslySetInnerHTML={{__html: md.childMarkdownRemark.html}} />
                <div className="mb-5">
            <Button variant="contained"
                component={Link}
                to="/sale"
                endIcon={<ReplyIcon color={"action"}/>}
                style={{margin: `10px 0 10px 0`}}>Все акции</Button>
            { path !== "/pizza-happy/" &&
            <Button variant="contained"
                    component={Link}
                    to="/dostavka-i-oplata"
                    endIcon={<LocalTaxiIcon color={"action"}/>}
                    style={{margin: `0 0 0 0`}}>Доставка</Button>
            }
                </div>
        </Container>
        </StylingInfo>
        )};

        export default SaleItem