export const productList = (state, isPizzas = false) => {
    const category = state.filters.category;
    const product = !isPizzas ? state.app.product: state.app.productPizza;

    if(category) {
            return product.filter(({filter = category}) => {
                return filter.toLowerCase().split(", ").includes(category.toLowerCase())})
        }

    return product
};