import { createSelector } from 'reselect'

const loadingStatus = (state) => state.app.loading;
const categories = (state) => state.filters.category;
const product = (state, isPizzas) => !isPizzas ? state.app.product : state.shoppingCart.newPizza === null ? state.app.productPizza : state.shoppingCart.newPizza;

const isSaleLanch = (state) => state.filters.isSale;

export const productList = createSelector(
    categories,
    product,
    isSaleLanch,
    (category, product, isLanch) => {

    if(category){
        return product.filter(({filter = category}) => {
            return filter.toLowerCase().split(", ").includes(category.toLowerCase())})
    }

    if(isLanch) {
        const productLanch = product.filter((el) => el.lanch === true);
        const productNotLanch = product.filter((el) => !el.lanch);
        const updateProdLanch = productLanch.map(el => {
           return {
               ...el,
               price: el.lanchprice
           }
        });

        const updateItemsProduct = updateProdLanch.concat(productNotLanch);

        return updateItemsProduct
    }

    return product
});
//

export const checkedLoading = createSelector(
  loadingStatus,
  loading => loading
)




















// export const productList = (state, isPizzas = false) => {
//     const category = state.filters.category;
//     // const product = !isPizzas ? state.app.product: state.app.productPizza;
//     const newPizzas = state.shoppingCart.newPizza;
//     const product = !isPizzas ? state.app.product : newPizzas === null ? state.app.productPizza : newPizzas
//     if(category && newPizzas === null) {
//         return product.filter(({filter = category}) => {
//             return filter.toLowerCase().split(", ").includes(category.toLowerCase())})
//     }
//     else if(newPizzas !== null) {
//         console.log("newPizzas", state.app.productPizza)
//         return state.app.productPizza
//         // return state.app.productPizza.filter(({filter = category}) => {
//         //     return filter.toLowerCase().split(", ").includes(category.toLowerCase())})
//     }
//
//     return product
// };





//
// import * as R from "ramda";
// import {defaultTo} from "ramda";
// import reselect from 'reselect'
//
// export const productList = (state, isPizzas = false) => {
//     const category = state.filters.category;
//     let newPizzas = state.shoppingCart.newPizza;
//     const productPizza = state.app.productPizza;
//     const pizza = defaultTo(productPizza, newPizzas)
//     const product = !isPizzas ? state.app.product : newPizzas === null ? productPizza : newPizzas
//     console.log("newPizzas", newPizzas)
//     console.log("product", product)
//     console.log("productPizza", productPizza)
//     // console.log("pizza", pizza)
//     if(category && isPizzas){
//         console.log(category)
//             return pizza.filter(({filter = category}) => {
//                 return filter.toLowerCase().split(", ").includes(category.toLowerCase())})
//         }
//     return product
// };