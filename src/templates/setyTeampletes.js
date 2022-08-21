import React from 'react'
import { connect } from 'react-redux';
import { addedCart } from "../reducers/shopping-cart";
import { graphql } from 'gatsby';
import ProductItem from '../components/SetyItem';
import * as R from 'ramda';

// const ProductTeamplate = ({ data: { contentfulProduct,
//     allContentfulProductHotRolly: {edges: hotRolls}, allContentfulProductSlognyeRolly: {edges: brandedRolls},
//     allContentfulProductKlassika: {edges: smallRoll}, allContentfulProductSushi: {edges: sushi},
//     allContentfulProductGunkan: {edges: gunkan},
// }, addedToCart, isSale }) => {

        const SetyTeamplate = ({ data: { allContentfulProducts, contentfulProducts }, addedToCart, isSale }) => {
        const product = {
            id: contentfulProducts.id,
            name: contentfulProducts.fieldName,
            price: contentfulProducts.fieldPriceProduct,
            description: contentfulProducts.fieldDescriptionProduct, 
            weight: contentfulProducts.fieldWeight,
            count: contentfulProducts.fieldCount,
            image: contentfulProducts.image
        }
        
            // const products = hotRolls.concat(brandedRolls, smallRoll, sushi, gunkan);
            const nameProduct = product.description.toLowerCase().split(', ');
            const kitProduct = allContentfulProducts.edges.filter(({ node: item }) => {
              return R.contains(item.fieldName.toLowerCase(), nameProduct)
            });
            console.log("kitProduct__", kitProduct);
 return  (
     <>
    <ProductItem
        name={product.name}
        price={product.price}
        description={product.description}
        weight={product.weight}
        count={product.count}
        back={"/sety/"}
        image={product.image}
        kitProduct={kitProduct}
        // createdAt={contentfulProduct.createdAt}
        // price={isSale && contentfulProduct.lanch ? contentfulProduct.lanchprice : contentfulProduct.price}
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
    allContentfulProducts(
        filter: {fieldSlug: {in: ["hot-rolls", "branded-rolls", "small-rolls", "sushi", "gunkany"]}}
      ) {
        edges {
          node {
            id
            fieldName
            fieldCount
            fieldDescriptionProduct
            image {
                gatsbyImageData(
                placeholder: BLURRED, 
                formats: [WEBP, AUTO]
                  sizes:"(max-width: 800px) 360px, 100vw)"
              )
        }
          }
        }
      }
      contentfulProducts(fieldSlugItem: {eq: $slug}) {
        fieldName
        fieldSlugItem
        fieldWeight
        id
        fieldSlug
        fieldPriceProduct
        fieldDescriptionProduct
        fieldCount
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