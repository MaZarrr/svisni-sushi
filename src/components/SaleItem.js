import React from "react"
import SEO from "./seo"
import Img from 'gatsby-image';
import Card from './Card';
import { Link } from 'gatsby';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import {StylingInfo} from '../components/common/style'

const PizzaItem = ({image, name, description, location}) => {

    return (
        <>
        <SEO title={name} />
        <StylingInfo>
        <div className="container"> 
        <h1>{name}</h1>
        <Img style={{maxWidth: 1280}} fluid={image} />
            <p style={{margin: `20px 0 1px 0`}}>{description}</p>
            <p style={{marginTop: 20}}><b>{location.pathname === "/sale/pizza-free" && "При добавлении в корзину 3 пиццы вам будет предложено добавить " +
            "пиццу Салями бесплатно"}</b></p>
            <p style={{marginTop: 20}}><b>{location.pathname === "/sale/filadelfia-sale" && "При добавлении в корзину любых роллов не менее чем на 785 рублей " +
            "вам будет предложено купить роллы Филадельфия one за 79 рублей"}</b></p>
        </div>

        <div>
         {location.pathname === "/sale/sale-food" ?
            <Card />  : null
        }
        </div>
        <Button 
            variant="outlined"
            component={Link}
            to="/sale"
            size="large"
            endIcon={<ReplyIcon/>}
            style={{margin: `8px 0 40px 25px`}}>Все акции</Button>
        </StylingInfo>
        </>
        )
}

export default PizzaItem