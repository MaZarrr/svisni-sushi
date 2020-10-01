export const productList = (state) => {
    const category = state.filters.category;
    const product = state.app.product;

    if(category) {
        return product.filter(({filter = category}) => filter.toLowerCase() === category.toLowerCase())
    }

    return product
};