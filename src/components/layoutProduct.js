import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby";
import { connect } from 'react-redux';
import Img from 'gatsby-image';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Grid } from "@material-ui/core";
import { useStylesCart } from '../components/common/style';

const LayoutProduct = ({children, category}) => {
    const classes = useStylesCart();
    return (
        <section className="section_cart">
        <div className="title">
            <h1 className={classes.titleH1}>{category}</h1>
        </div>
         <Grid container justify="center" classes={classes}>
        {children}
        </Grid>
        </section>
    )
}

export default LayoutProduct

