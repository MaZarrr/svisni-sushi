import React, {useEffect, useState} from "react"
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import { graphql } from "gatsby";
import { Hidden, Typography } from "@mui/material";

// import Carousel from '../components/common/CarouselSvisni';
import Kombo from '../components/indexContent/combo/index'
import MenuCategory from "../components/indexContent/MenuCategory";
import RecommendedProducts from "../components/indexContent/recommended-products";

import Seo from "../components/seo";
// капрусель
// const IndexPage = ({ data: { allNodePopulyarnyeBlyudaNovinki: { edges },
//   allNodeKomboRekomenduemye: { edges: komboItems }
// }}) => {

  const IndexPage = ({data: {allContentfulIndexRecomended: {edges}, allContentfulIndexKombo: {edges: allCombo}}}) => {

        const [indexProduct, setIndexProduct] = useState(true)
        const [komboProducts, setKomboProducts] = useState(true)
        const [optionPage, setOptionsPage] = useState({})

        const classes = useStyleIndexPage();

        useEffect(() => {
          const transformData = edges[0].node.recomendedProduct.map(( node ) => {
            return {
              id: node.id,
              name: node.fieldName,
              price: node.fieldPriceProduct,
              slug: node.fieldSlug,
              slugItem: node.fieldSlugItem,
              description: node.fieldDescriptionProduct,
              image: node.image
            }
          })
  
            
        const kombos = allCombo[0].node.kombo.map((node) => {
          return {
            id: node.id,
            name: node.fieldName,
            price: node.fieldPriceProduct,
            slug: node.fieldSlug,
            slugItem: node.fieldSlugItem,
            description: node.fieldDescriptionProduct,
            image: node.image,
            isEdit: node.fieldIsEditKombo,
          }
      })
   
      setKomboProducts(kombos)
      setIndexProduct(transformData)
      setOptionsPage({titleCombo: allCombo[0].node.title, rekomendedTitle: edges[0].node.title})
        }, [edges, allCombo])

        return (
          <section>
            <Seo title="Заказать суши, роллы c доставкой в Валуйки"
                 description="Доставка роллов, пиццы, wok, салатов, закусок в Валуйках. 
                      Наше меню порадует широким выбором блюд японской кухни. Заказ еды c 10 до 22:00"/>
            <Hidden smUp>
            <Typography 
            variant={"body2"}
            style={{textAlign: 'center'}}>Доставка роллов и пиццы
                <span style={{color: '#ff6b1a', textDecoration: "underline"}}> Уразово и Валуйки</span></Typography>
            </Hidden>
            {/* <Carousel dataCarousel={allContentfulCarouselSiteImage}/> */}

              <Grid container className={classes.root}>

                <Hidden smDown>
                  <Typography className={classes.title}
                              variant={"inherit"}
                              component={"h1"}>
                    Свисни Суши в Уразово</Typography>
                </Hidden>
                {/* { !loadingSpinner ? <> */}
                {/* Комбо */}
                <Kombo title={optionPage.titleCombo} product={komboProducts}/>
                {/* Новинки/рекомендованые */}
                <RecommendedProducts title={optionPage.rekomendedTitle} product={indexProduct} />
                {/* </> : <SpinnerNew /> } */}
                {/* Меню категории */}
                <Hidden smUp>
                  <Grid container style={{ marginBottom: 20 }}>
                    <MenuCategory />
                  </Grid>
                </Hidden>
      
              </Grid>
          </section>
        );
      }

export default IndexPage

const useStyleIndexPage = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: `95%`,
        margin: `auto`
    },
    title: {
        fontWeight: 900,
        marginBottom: 30,
        marginTop: 30,
        textAlign: 'center',
        width: `100%`,
        textTransform: `uppercase`,
        fontSize: 34,
        [theme.breakpoints.down('475')]: {
            fontSize: 24,
            letterSpacing: `-1px`,
            margin: `20px 0 0 0`
        }
    }
}));

export const query = graphql `
{
  allContentfulIndexRecomended {
    edges {
      node {
        title
        recomendedProduct {
          id
          fieldName
          fieldSlug
          fieldDescriptionProduct
          fieldPriceProduct
          fieldSlugItem
          image {
            gatsbyImageData(
              placeholder: BLURRED, 
              formats: [WEBP, AUTO]
              sizes:"(max-width: 360px) 360px, 100vw)"
            )
          }
        }
      }
    }
  }
  allContentfulIndexKombo {
    edges {
      node {
        title
        kombo {
          id
          fieldName
          fieldSlug
          fieldDescriptionProduct
          fieldPriceProduct
          fieldSlugItem
          fieldIsEditKombo
          image {
            gatsbyImageData(
              placeholder: BLURRED, 
              formats: [WEBP, AUTO]
              sizes:"(max-width: 360px) 360px, 100vw)"
            )
          }
        }
      }
    }
  }
}
`

// export const query = graphql `
// {
//   allNodeKomboRekomenduemye {
//     edges {
//       node {
//         relationships {
//           field_items {
//             id
//             field_is_edit_kombo
//             field_price_product
//             field_name
//             field_description_product
//             field_slug
//             field_slug_item
//             relationships {
//               field_image_product {
//                 localFile {
//                   childrenImageSharp {
//                     gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//   allNodePopulyarnyeBlyudaNovinki {
//     edges {
//       node {
//         title
//         relationships {
//           field_recommended_product {
//             field_name
//             field_is_wok
//             field_is_pizza
//             field_price_lanch_time
//             field_slug
//             field_weight
//             id
//             field_description_product
//             field_price_product
//             field_slug_item
//             field_variant
//             relationships {
//               field_image_product {
//                 localFile {
//                   childrenImageSharp {
//                     gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `
// // export const query = graphql `
// // {  
// //     allContentfulContentIndex {
// //         edges {
// //         node {
// //           combos {
// //           id
// //           description
// //           name
// //           __typename
// //           price
// //           slug
// //           image {
// //             gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
// //           }
// //         }
// //         new {
// //           __typename
// //           ... on Node {
// //             ... on ContentfulProduct {
// //               id
// //               name
// //               price
// //               slug
// //               description
// //               image {
// //                gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
// //               }
// //             }
// //             ... on ContentfulProductPizza {
// //               id
// //               name
// //               __typename
// //               price
// //               pricePizzaLarge
// //               slug
// //               description
// //               image {
// //                 gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
// //               }
// //             }
// //             ... on ContentfulProductSlognyeRolly {
// //               id
// //               name
// //               description
// //               __typename
// //               price
// //               image {
// //                gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
// //               }
// //             }
// //             ... on ContentfulProductHotRolly {
// //               id
// //               name
// //               __typename
// //               description
// //               price
// //               image {
// //                  gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
// //               }
// //             }
// //             ... on ContentfulProductKombo {
// //               id
// //               name
// //               __typename
// //               count
// //               description
// //               price
// //               image {
// //                 gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
// //               }
// //             }
// //           ... on ContentfulProductSalat {
// //             id
// //             name
// //             __typename
// //             price
// //             description
// //             weight
// //             __typename
// //             image {
// //                  gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
// //             }
// //           }
// //           ... on ContentfulProductZakuski {
// //             id
// //             name
// //             __typename
// //             price
// //             description
// //             weight
// //             __typename
// //             image {
// //                  gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }
// // }
// // allContentfulCarouselSiteImage {
// //     edges {
// //         node {
// //             id
// //             slug
// //             nameAkcii
// //             imgCarouselPc {
// //               gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
// //             }
// //         }
// //       }
// //     }
// // }
// // `