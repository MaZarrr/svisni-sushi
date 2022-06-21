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

    const SetyTeamplate = ({ data: {contentfulProducts}, addedToCart, isSale }) => {

        const product = {
            id: contentfulProducts.id,
            name: contentfulProducts.fieldName,
            price: contentfulProducts.fieldPriceProduct,
            description: contentfulProducts.fieldDescriptionProduct, 
            weight: contentfulProducts.fieldWeight,
            count: contentfulProducts.fieldCount,
            image: contentfulProducts.image
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

//     query ($slug: String!) {
//        contentfulProduct
export const query = graphql ` 
query QuerySetyItem($slug: String!) {
  contentfulProducts(fieldSlugItem: {eq: $slug}) {
        fieldName
        fieldSlugItem
        fieldVariant
        fieldWeight
        fieldWeightLarge
        fieldWeightSmall
        id
        fieldSlug
        fieldPriceProduct
        fieldPrivate
        fieldPriceLarge
        fieldIsWok
        fieldIsPizza
        fieldIsEditKombo
        fieldDescriptionProduct
        fieldCount
        fieldPriceLanchTime
        fieldPriceNotSale
        contentful_id
        image {
        	gatsbyImageData(
            placeholder: BLURRED, 
            formats: [WEBP, AUTO]
          	sizes:"(max-width: 360px) 360px, 100vw)"
          )
    }
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