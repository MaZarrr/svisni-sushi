import React, { useState } from 'react';
import { connect } from 'react-redux';
import Img from 'gatsby-image';
import { useStaticQuery, graphql, Link } from "gatsby"
import {useStyleCardIndexPage} from "./common/style";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ItemsCarousel from 'react-items-carousel';
import Grid from "@material-ui/core/Grid";
import {Hidden} from "@material-ui/core";

const RecipeReviewCard = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const {allContentfulContentIndex: {edges}, allContentfulHomePageImageMenu: {edges: menu}} = useStaticQuery(graphql `
    {
      allContentfulContentIndex {
        edges {
          node {
            combos {
              id
              name
              price
              slug
              description
              image {
                fluid(maxWidth: 300) {
                  ...GatsbyContentfulFluid
                }
              }
            }
          }
        }
      }
      allContentfulHomePageImageMenu(sort: {fields: desc}) {
        edges {
          node {
            id
            slug
            category
            desc
            image {
              fluid(maxWidth: 300) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  `);
  const classes = useStyleCardIndexPage();

  return (
      <div className={`mt-4 ${classes.root}`}>
        <Typography className={classes.titleIndex} variant={"h2"}>Собери свой комбо набор из пиццы, суши и роллов</Typography>
       <Typography variant={'button'}>
         <Link to={"/kombo"}>Все комбо</Link>
       </Typography>

        {/*Карусель комбо телефон*/}
        <Hidden smUp>
        <div style={{maxWidth: `100%`, margin: `0 auto`}}>
          <ItemsCarousel
              infiniteLoop={false}
              gutter={12}
              activePosition={'center'}
              chevronWidth={60}
              disableSwipe={false}
              alwaysShowChevrons={false}
              numberOfCards={1}
              slidesToScroll={1}
              outsideChevron={false}
              showSlither={true}
              firstAndLastGutter={true}
              activeItemIndex={activeItemIndex}
              requestToChangeActive={value => setActiveItemIndex(value)}
          >
          { edges[0].node.combos.map((homeProduct) => (
              <Card key={homeProduct.id} className={classes.cardCombo}>
                <CardMedia
                    className={classes.media}
                    title={homeProduct.name}>
                  <Img fluid={homeProduct.image.fluid} alt={homeProduct.name} />
                </CardMedia>
                <CardContent>
                  <Typography variant={"h6"}>{homeProduct.name}</Typography>
                  <Typography variant={"subtitle1"}>{homeProduct.description}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Button
                      variant="contained"
                      className={classes.buttonCombo}
                      component={Link}
                      to={`/kombo/${homeProduct.slug}`}>
                    Выбрать
                  </Button>
                    <Typography style={{fontSize: 22}} className="ml-auto mr-2" variant={"body1"}>{homeProduct.price} ₽</Typography>
                </CardActions>

              </Card>
          ))}
          </ItemsCarousel>
        </div>
        </Hidden>

        {/*Комбо компьютер*/}
        <Hidden xsDown>
         <Grid container style={{width: `85%`}}>
           { edges[0].node.combos.map((homeProduct) => (
               <Grid key={homeProduct.id} item sm={6} md={4} style={{width: `300px`}}>
               <Card className={classes.cardComboPc}>
                 <CardMedia
                     className={classes.media}
                     title={homeProduct.name}>
                   <Img fluid={homeProduct.image.fluid} alt={homeProduct.name} />
                 </CardMedia>
                 <CardContent>
                   <Typography style={{fontSize: 18}} variant={"h6"}>{homeProduct.name}</Typography>
                   <Typography style={{fontSize: 14}} variant={"subtitle1"}>{homeProduct.description}</Typography>
                 </CardContent>
                 <CardActions disableSpacing>
                   <Button
                       variant="contained"
                       className={classes.buttonCombo}
                       component={Link}
                       to={`/kombo/${homeProduct.slug}`}>
                     Выбрать
                   </Button>
                     <Typography style={{fontSize: 22}} className="ml-auto mr-2" variant={"body1"}>{homeProduct.price} ₽</Typography>
                 </CardActions>
               </Card>
               </Grid>
           ))}
         </Grid>
        </Hidden>

        {/*Меню выбор*/}
        <Grid container className="mt-4">
          <Typography className={classes.titleIndex}
            variant={"h2"}>Заказывайте роллы, суши и пиццу с доставкой</Typography>
          {menu.map(({node: homeMenu}) => (
              <Grid item xs={6} sm={4} key={homeMenu.id} >
                <div className="cart_item">
                  <Link to={`/${homeMenu.slug}`}>
                    <div className="cart_title">
                        <h3><b>{homeMenu.category}</b></h3>
                    </div>
                    <Img fluid={homeMenu.image.fluid} className="cart_img" imgStyle={{maxWidth: 300}} />
                  </Link>
                </div>
              </Grid>
          ))}
        </Grid>

      </div>
  );

};

const mapStateToProps = (state) => ({
  product: state.app.product
});

export default connect(mapStateToProps, null)(RecipeReviewCard)






















// useEffect(() => {
//   dispatch(productLoaded(edges))
// }, [edges, dispatch])

//   const [expanded, setExpanded] = React.useState({nameCart: false});
//   const [load, setLoad] = React.useState(true)

//   // const handleExpandClick = (id) => {
//   //   setExpanded({[id]: !expanded[id]});
//   // };
//
//   return (
//       <>
//         <div className={classes.root}>
//           { !load ? product.map((homeProduct) => (
//               <Card key={homeProduct.id} className={classes.card}>
//                 <CardHeader
//                     classes={{title: classes.title}}
//                     avatar={
//                       <AvatarWrapp alt="Sushi" src={Logo}
//                                    className={classes.avatar}
//                                    classes={{img: classes.img}}
//                                    color={homeProduct.color}>
//                       </AvatarWrapp>}
//                     // title={homeProduct.variant}
//                     subheader={homeProduct.name}/>
//                 <CardMedia
//                     className={classes.media}
//                     title={homeProduct.name}
//                     component={Link}
//                     to={`/${homeProduct.slug}`}
//                 > <Img fluid={homeProduct.image.fluid} />
//                 </CardMedia>
//                 <CardActions disableSpacing>
//                   <Button
//                       variant="contained"
//                       color="secondary"
//                       className={classes.button}
//                       startIcon={<ShoppingBasketIcon />}
//                       component={Link}
//                       to="/kombo"
//                       onClick={() => dispatch(addedToCart({id: homeProduct.id, productPrice: homeProduct.price, product}))}
//                       // onClick={() => dispatch(addedToCart({id: homeProduct.id, productPrice: homeProduct.price, product}))}
//                   >
//                     Хочу!
//                   </Button>
//
//                   {/*<IconButton*/}
//                   {/*  id={homeProduct.contentful_id}*/}
//                   {/*  className={clsx(classes.expand, {*/}
//                   {/*  [classes.expandOpen]: expanded[homeProduct.contentful_id],*/}
//                   {/*  })}*/}
//                   {/*  onClick={() => handleExpandClick(homeProduct.contentful_id)}*/}
//                   {/*  aria-expanded={expanded[homeProduct.contentful_id]}*/}
//                   {/*  aria-label="show more">*/}
//                   {/*  <ExpandMoreIcon />*/}
//                   {/*</IconButton>*/}
//                 </CardActions>
//                 {/*<Collapse in={expanded[homeProduct.contentful_id]} timeout="auto" unmountOnExit>*/}
//                 <CardContent>
//                   {/*<Typography paragraph>*/}
//                   {/*<span role="img" aria-label="ok">😉</span>Тебе нужно знать что:*/}
//                   {/*</Typography>*/}
//                   {/*<ul style={{ listStyle: `none`, margin: 0, padding: `8px 0 0 0`}}>*/}
//                   {/*    <li><span role="img" aria-label="ok"></span><p>{`Цена: ${homeProduct.price}₽`}</p></li>*/}
//                   {/*  <li><span role="img" aria-label="ok">✅</span>Есть бесплатная доставка!</li>*/}
//                   {/*  <li><span role="img" aria-label="ok">✅</span>Заказать можно с 10:00 до 22:00</li>*/}
//                   {/*  <li><span role="img" aria-label="ok">✅</span>Готовим с любовью для каждого от Svisni-Sushi</li>*/}
//                   {/*</ul>*/}
//                 </CardContent>
//                 {/*</Collapse>*/}
//
//               </Card>
//           )) : <Spinner />}
//         </div>
//       </>
//   );
//
// }
//
// const mapStateToProps = (state) => ({
//   product: state.app.product
// })
//
// export default connect(mapStateToProps, null)(RecipeReviewCard)


