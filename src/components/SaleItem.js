import React from "react"
import SEO from "./seo"
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import {StylingInfo} from '../components/common/style'

const SaleItem = ({image, md, name }) => {
    // const title = md.name || md.frontmatter.name
    // const infoSale = md === undefined ? <p>{md.description}</p> : <div dangerouslySetInnerHTML={{__html: md.html}} />

    return (
        <StylingInfo>
        <SEO title={`Акция ${name}`}
             description={`Акции и скидки, подробнее на сайте. Воспользоввться акцией ${name}`}
             noindex={true}
             pathname="/sale"/>
        <div className="container">
        <h1>{name}</h1>
        {/*{ loading === false ?*/}
        {/*    <div>*/}
                <Img style={{maxWidth: 1280, marginTop: 30}} fluid={image} />
                <div dangerouslySetInnerHTML={{__html: md.childMarkdownRemark.html}} />
            <Button variant="outlined"
                component={Link}
                to="/sale"
                size="large"
                endIcon={<ReplyIcon/>}
                style={{margin: `10px 0 40px 10px`}}>Все акции</Button>
            {/*</div> : <Spinner/> }*/}
            </div>
        </StylingInfo>
        )}

        export default SaleItem