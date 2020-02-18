import React from "react"
import SEO from "./seo"
import styled  from 'styled-components';
import Img from 'gatsby-image';
import Card from './Card';
import { Link } from 'gatsby';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';

const SetySection = styled.section `
    font-family: 'Comfortaa', cursive;
    font-weight: 500;

    .container {
        margin: 20px 0 0 30px;
        padding: 0;
        width: 90%;
    }

    h1 {
        font-family: 'Neucha', cursive;
        font-style: normal;
        font-weight: 900;
    }
    h3 {
        font-family: 'Neucha', cursive;
        font-style: normal;
        font-weight: 900;
    }
    h2 {
        font-family: 'Neucha', cursive;
        font-style: normal;
        font-weight: 900;
    }
   @media screen and (max-width: 768px) {
    .container {
        margin: 10px 0 0 6vw;
        padding: 0;
       
    }
      .container h1 {
        font-size: 7vw;
    }
}
` 

const PizzaItem = ({image, name, description, location}) => {

    return (
        <>
        <SEO title="Акция" />
        <SetySection>
        <div className="container"> 
        <h1>{name}</h1>
        <Img style={{maxWidth: 1280}} fluid={image} />
        <p style={{margin: `20px 0 40px 0`}}>{description}</p>
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
        style={{margin: `30px 0 30px 25px`}}>Все акции</Button>
        </SetySection>
        </>
        )
}

export default PizzaItem