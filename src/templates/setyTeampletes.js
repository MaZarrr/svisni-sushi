import React from 'react'
import { connect } from 'react-redux';
import {addedCart} from "../reducers/shopping-cart";
import * as R from 'ramda'
import { graphql } from 'gatsby'
import ProductItem from '../components/SetyItem'

// const ProductTeamplate = ({ data: { contentfulProduct,
//     allContentfulProductHotRolly: {edges: hotRolls}, allContentfulProductSlognyeRolly: {edges: brandedRolls},
//     allContentfulProductKlassika: {edges: smallRoll}, allContentfulProductSushi: {edges: sushi},
//     allContentfulProductGunkan: {edges: gunkan},
// }, addedToCart, isSale }) => {

    const SetyTeamplate = ({ data: {nodeBlyudaMenyu}, addedToCart, isSale }) => {
        console.log("allNodeBlyudaMenyu__", nodeBlyudaMenyu);
        const product = {
            id: nodeBlyudaMenyu.id,
            name: nodeBlyudaMenyu.field_name,
            price: nodeBlyudaMenyu.field_price_product,
            description: nodeBlyudaMenyu.field_description, 
            weight: nodeBlyudaMenyu.field_weight,
            count: nodeBlyudaMenyu.field_count,
            image: nodeBlyudaMenyu.relationships.field_image_product.localFile.childImageSharp
        }
//     const product = hotRolls.concat(brandedRolls, smallRoll, sushi, gunkan);
//     const nameProduct = contentfulProduct.description.toLowerCase().split(', ');
//     const kitProduct = product.filter(({node: item}) => {
//       return R.contains(item.name.toLowerCase(), nameProduct)
//     });

 return  (
     <>
    <ProductItem
        name={product.name}
        price={product.price}
        // price={isSale && contentfulProduct.lanch ? contentfulProduct.lanchprice : contentfulProduct.price}
        description={product.description}
        // createdAt={contentfulProduct.createdAt}
        weight={product.weight}
        count={product.count}
        back={"/sety/"}
        image={product.image}
        // kitProduct={kitProduct}
        added={() => addedToCart({id: product.id, price: null,
            product: [{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    count: product.count,
                    image: product.image
                    // price: isSale && contentfulProduct.lanch ? contentfulProduct.lanchprice : contentfulProduct.price,
                    }]}
                )}
            > </ProductItem>
        </>
    )};





const mapStateToProps = (state) => ({
     isSale: state.filters.isSale
});

const mapDispatchToProps = (dispatch) => ({
    addedToCart: (id, price, product) => dispatch(addedCart(id, price, product))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetyTeamplate)


export const query = graphql ` 
query QuerySetyItem($slug: String) {
  nodeBlyudaMenyu(field_slug_item: {eq: $slug}) {
        field_name
        field_price_lanch_time
        field_price_not_sale
        field_price_product
        field_private
        field_slug
        field_variant
        id
        field_weight
        relationships {
          field_image_product {
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
              }
            }
          }
        }
        field_is_pizza
        field_is_lanchtime
        field_description_product
        field_count
        field_price_large
        field_slug_item
        field_weight_large
        field_weight_small
      }
    }
`



// export const query = graphql ` 
//     query ($slug: String!) {
//        contentfulProduct(slug: {eq: $slug}) {
//            id
//             slug
//             name
//             price
//             weight
//             lanchprice
//             lanch
//             defaultPrice
//             count
//             description
//              image {
//                 gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//             }
//         }
//         allContentfulProductHotRolly {
//             edges {
//                 node {
//                     id
//                     name
//                     description
//                     count
//                     image {
//                       gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 }
//             }
//         }
//         allContentfulProductSlognyeRolly {
//             edges {
//                 node {
//                     id
//                     name
//                     description
//                     count
//                     image {
//                       gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 }
//             }
//         }
//         allContentfulProductSushi {
//             edges {
//                 node {
//                     id
//                     name
//                     count
//                     description
//                     price
//                     image {
//                       gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 }
//             }
//        }
//         allContentfulProductKlassika {
//             edges {
//                 node {
//                     id
//                     name
//                     price
//                     description
//                     count
//                     image {
//                       gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 }
//             }
//         }
//         allContentfulProductGunkan {
//             edges {
//                 node {
//                     id
//                     name
//                     count
//                     description
//                     price
//                     weight
//                     image {
//                     gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 }
//             }
//         }
//     }
//  `

// // "dotenv": "^8.2.0"