import React from "react"
import SEO from "./seo"
import Img from 'gatsby-image';
import {StylingInfo} from '../components/common/style'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import { Link } from 'gatsby';

const SetyItem = ({name, description, createdAt, image, count, weight, price}) => {

return (
    <section>
    <SEO title={name} />
    <StylingInfo>
    <div className="container"> 
        <h1>{name}</h1>
        <hr></hr>
        <Grid container>
        <Grid item xs={12} sm={6}>
            <Img style={{maxWidth: 400}} fluid={image} />
        </Grid>
        <Grid item xs={12} sm={5} style={{margin: `auto 0`}}>
            <p><b>Состав:</b> {description}</p>
            <p><b>Количество:</b> {count} шт</p>
            <p><b>Общий вес:</b> {weight} кг</p>
            <p><b>Цена</b> {price} руб</p>
        <Button 
            variant="outlined" 
            component={Link} 
            to="/sale" 
            size="large"
            endIcon={<ReplyIcon/>}
            style={{marginBottom: `50px`}}
            >Все акции</Button>
        </Grid>
        </Grid>
    </div>
    </StylingInfo>
    </section>
    )
}

export default SetyItem