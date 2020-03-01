import React from "react"
import { Provider } from "react-redux"
import store from "./src/state/createStore"

export default ({ element }) => {

  return (
  <Provider store={store}>
      {element}
  </Provider>
  )
}


// const showAvailableMembers = () => {
// const liJsx = []

//   product.map(({node: productSets}) => {

//   const {id, name, slug, description, price, weight, count, image: {fluid} } = productSets

//    liJsx.push(
//     <Grid item xs={12} sm={6} md={3} key={id}>
//     <Card className={classes.card}>
//       <CardHeader
//       classes={{title: classes.title}}
//         avatar={
//           <Avatar className={classes.avatar}>
//            <Img style={{width: 50}} fluid={image.fluid} />
//           </Avatar>
//         }
//         title="Сет"
//         subheader={name}
//       />
//       <CardMedia 
//         className={classes.media}
//         title={name}
//       > 
//       <Img fluid={fluid} />
//       </CardMedia> 

//       <CardContent>
//         <Typography className={classes.deckript} variant="caption" color="textSecondary" component="p">
//         {description}
//         </Typography>
//         <Typography component="div" variant="overline" classes={{overline: classes.overline}}>
//         <b><p>{weight}кг</p></b>
//         <b><p>{count}шт</p></b>
//         </Typography>
//        <p>{`${price}₽`}</p>
//       </CardContent>

//       <CardActions disableSpacing>
//         <Button
//           variant="contained"
//           color="secondary"
//           className={classes.button}
//           startIcon={<ShoppingBasketIcon />}
//           onClick={()=> setAddedToCart(id)}
//       >
//         Хочу
//       </Button>
//       <Button
//       component={Link}
//       to={`/sety/${slug}`}
//       variant="contained"
//       color="secondary"
//       className={classes.buttonInfo}
//       >
//         Подробнее
//       </Button>
//       </CardActions>
//     </Card>
//     </Grid>
//     )}) 
//     updateLustJsx(liJsx)
//   }


//   if(!listJsx) {
//     showAvailableMembers();
//   }
//              console.log(listJsx);