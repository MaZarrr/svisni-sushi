import React from "react"
import SEO from "./seo"
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import {StylingInfo} from '../components/common/style'

const SaleItem = ({image, name, markDeckription}) => {

    return (
        <StylingInfo>
        <SEO title={`Акция ${name}`}
             description={`Акции и скидки, подробнее на сайте. Воспользоввться акцией ${name}`}
             noindex={true}
             pathname="/sale"/>
        <div className="container">
        <h1>{name}</h1>
        <Img style={{maxWidth: 1280, marginTop: 30}} fluid={image} />
            <div className="col-md-12 col-12 mt-4">
                <div dangerouslySetInnerHTML={{__html: markDeckription.html}} />
            </div>

        <Button variant="outlined"
                component={Link}
                to="/sale"
                size="large"
                endIcon={<ReplyIcon/>}
                style={{margin: `10px 0 40px 10px`}}>Все акции</Button>
        </div>
        </StylingInfo>
        )
}

export default SaleItem