import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import Img from 'gatsby-image';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Logo from "../images/logoPN.png"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from "gatsby"
import Spinner from './spinner/spinner'
import {useStyleCardIndexPage} from "./common/style";
import {productLoaded} from "../reducers/app";
import {addedToCart} from "../reducers/shopping-cart";

const AvatarWrapp = styled(Avatar) `
background: ${props => props.color};
`

const RecipeReviewCard = ({product, dispatch}) => {

  const classes = useStyleCardIndexPage()
  const [expanded, setExpanded] = React.useState({nameCart: false});
  const [load, setLoad] = React.useState(true)

  const {allContentfulHomePageCarts: {edges}} = useStaticQuery(graphql `
  {
  allContentfulHomePageCarts {
    edges {
      node {
        id
        name
        price
        count
        slug
        variant
        contentful_id
        image {
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
  }
  `)

  useEffect(() => {
    dispatch(productLoaded(edges))
    setLoad(false)
  }, [edges, dispatch])

  const handleExpandClick = (id) => {
    setExpanded({[id]: !expanded[id]});
  };

  return (
    <>
    <div className={classes.root}>
    { !load ? product.map((homeProduct) => (
      <Card key={homeProduct.id} className={classes.card}>
      <CardHeader
      classes={{title: classes.title}}
        avatar={
           <AvatarWrapp alt="Sushi" src={Logo}
              className={classes.avatar}
              classes={{img: classes.img}}
              color={homeProduct.color}>
          </AvatarWrapp>}
        title={homeProduct.variant}
        subheader={homeProduct.name}/>
      <CardMedia 
        className={classes.media}
        title={homeProduct.name}
        component={Link}
        to={`/${homeProduct.slug}`}
      > <Img fluid={homeProduct.image.fluid} />
      </CardMedia>
      <CardActions disableSpacing>
        <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<ShoppingBasketIcon />}
        onClick={() => dispatch(addedToCart({id: homeProduct.id, productPrice: homeProduct.price, product}))}>
        Хочу!
      </Button>

        <IconButton
          id={homeProduct.contentful_id}
          className={clsx(classes.expand, {
          [classes.expandOpen]: expanded[homeProduct.contentful_id],
          })}
          onClick={() => handleExpandClick(homeProduct.contentful_id)}
          aria-expanded={expanded[homeProduct.contentful_id]}
          aria-label="show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded[homeProduct.contentful_id]} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          <span role="img" aria-label="ok">😉</span>Тебе нужно знать что:
          </Typography>
          <ul style={{ listStyle: `none`, margin: 0, padding: `8px 0 0 0`}}>
              <li><span role="img" aria-label="ok"></span><p>{`Цена: ${homeProduct.price}₽`}</p></li>
            <li><span role="img" aria-label="ok">✅</span>Есть бесплатная доставка!</li>
            <li><span role="img" aria-label="ok">✅</span>Заказать можно с 10:00 до 22:00</li>
            <li><span role="img" aria-label="ok">✅</span>Готовим с любовью для каждого от Svisni-Sushi</li>
          </ul>
        </CardContent>
      </Collapse>

    </Card>
    )) : <Spinner />}
    </div>
     </>
  );

}

const mapStateToProps = (state) => ({
  product: state.app.product
})

export default connect(mapStateToProps, null)(RecipeReviewCard)

