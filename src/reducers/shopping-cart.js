import * as R from 'ramda'
import {createReducer, createAction} from "redux-act";
import {remove} from "ramda";
import {dec} from "ramda";

export const addedToCart = createAction('SET_ADDED_TO_CART')
const removeFromCart = createAction('SET_REMOVE_FROM_CART')
const allRemoveFromCart = createAction('ALL_SET_REMOVE_FROM_CART')

const pizzaSize = createAction('PRODUCT_RAZMER')
export const pizzaCart = createAction('SIZE_CART')

export const addedIngrideents = createAction('ADDED_TO_INGRIREENT')
// export const removeIngrideents = createAction('REMOVE_INGRIREENT')

export const ingrideentPlus = createAction('INGRIDEENT_PLUS')
export const ingrideentMinus = createAction('INGRIREENT_MINUS')
export const checker = createAction('CHECKED_INGRIDEENT_PIZZA')

const addedPribor = createAction('PALOCHKI_ADDED')
const addedSaleRoll = createAction('ADD_SALE_ROLL')
const addedSalePizza = createAction('ADD_SALE_PIZZA')
const deletePizzaDarom = createAction('DEL_PIZZA_DAROM')
const deleteRollSale = createAction('DEL_ROLL_SALE')

// =====
const updateCartItems = (cartItems, item, idx) => {
    // обновлуние уже существующего элемсента в корзине
    if(item.count === 0) {
        return [ // удаление элемента из массива
            ...cartItems.slice(0, idx), // все элементы до нужного
            ...cartItems.slice(idx + 1), // все элементы после нужного
        ]
    }

    if(idx === -1) { // добавление элеиента к концу массива
        return R.append(item, cartItems)
    }

    return R.update(idx, item, cartItems)
}

// const updateCartItem = (setу, item = {}, quantity, priceRadio = setу.price) => { // добавление в корзину
//
//     const sizePizza = R.defaultTo({[setу.slug]: true}, setу.size)
//     const pricePizza = R.defaultTo(setу.price, setу.priceDef)
//     console.log("sety", setу)
//     const { id = setу.id,
//         count = 0,
//         name = setу.name,
//         total = 0,
//         image = setу.image.fluid,
//         size = sizePizza,
//         priceDef = pricePizza,
//         price33 = setу.priceIn33cm,
//         pribor = 0,
//     } = item
//
//     return {
//         id,
//         name,
//         price33,
//         pribor,
//         radioPrice: price33,
//         priceDef,
//         radioValue: priceRadio,
//         contentful_id: setу.contentful_id,
//         size,
//         slug: setу.slug,
//         image: {...image},
//         count: count + quantity,
//         total: priceRadio > priceDef ? total + quantity * price33 : total + quantity * priceDef
//     }
// }

const updateCartItem = (setу, item = {}, quantity, priceRadio = setу.price) => { // добавление в корзину

    const sizePizza = R.defaultTo({[setу.slug]: true}, setу.size)
    const pricePizza = R.defaultTo(setу.price, setу.priceDef)
    console.log("setyShopping46", setу)
    const {
        id = setу.id,
        count = 0,
        name = setу.name,
        total = 0,
        sostav = setу.sostav,
        // sostav,
        ingrideents = setу.ingrideents,
        image = setу.image.fluid,
        size = sizePizza,
        priceDef = pricePizza,
        price33 = setу.priceIn33cm,
        pribor = 0,
        } = item
    console.log("priceRadio", priceRadio)
    console.log("total", total)
    console.log("priceDef97", priceDef)
    return {
        id,
        name,
        price33,
        pribor,
        radioPrice: price33,
        priceDef,
        ingrideents,
        sostav,
        radioValue: priceRadio,
        contentful_id: setу.contentful_id,
        size,
        slug: setу.slug,
        image: {...image},
        count: count + quantity,
        // total: priceRadio > priceDef ? total + quantity * price33 : total + quantity * priceRadio
        total: priceRadio > priceDef ? total + quantity * price33 : total + quantity * priceDef
    }
}

const updateOder = (state, setId, quantity, priceRadioPizza, categoryName) => {
    const {cartItems} = state
    const sety = categoryName.find((productCategory) => productCategory.id === setId);
    const itemIndex = cartItems.findIndex(({id}) => id === setId);
    const item = cartItems[itemIndex];
    // console.log("sety117updateOrder", sety);
    // console.log("categoryName118updateOrder", categoryName)

    // const ss = Object.keys(sety.size)
    // console.log(ss)
    // const rr = ss[0] === Object.keys(sety.size)[0]
    // console.log(rr)
    //
    // console.log(cartItems)
    const totalPrice = R.compose(
        R.sum,
        R.pluck('total')
    )(cartItems);
    console.log("priceRadioPizza", priceRadioPizza)
    const newItem = updateCartItem(sety, item, quantity, priceRadioPizza);
    return {
        orderTotal: priceRadioPizza > (sety.price || item.priceDef) ? totalPrice + priceRadioPizza * quantity : totalPrice + (sety.price || item.priceDef) * quantity,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
    };

}

// action func
export const addedCart = (data) => (dispatch) => dispatch(addedToCart(data))

export const removeCart = (data) => (dispatch) => dispatch(removeFromCart(data))

export const allRemoveCart = (data) => (dispatch) => dispatch(allRemoveFromCart(data))

export const pizzaSized = (data) => (dispatch) => dispatch(pizzaSize(data))
// export const sizePizzaCart = (data) => (dispatch) => dispatch(pizzaCart(data))

export const addPribor = (count) => (dispatch) => {
    // const {shoppingCart: {palochkiTotal}} = getStore()
    // const priborTotal = palochkiTotal >= 2 ? palochkiTotal + parseInt(count) : palochkiTotal * 1 + 1
    dispatch(addedPribor(count))
}

export const saleRoll = (objRoll) => async (dispatch) => {
    await dispatch(addedSaleRoll(objRoll))
}
export const salePizza = (objPizza) => async (dispatch) => await dispatch(addedSalePizza(objPizza))
export const deletePizza = (id) => (dispatch) => dispatch(deletePizzaDarom(id))
export const deleteRoll = (id) => (dispatch) => dispatch(deleteRollSale(id))
export const addedIngrideent = ({id, sostav, name, ingrideents, check, path = null, pizzaIng}) => (dispatch, getStore) => {
    console.log(getStore())
    const {app: {productPizza}, shoppingCart: {newPizza}} = getStore()
    console.log(newPizza)
    const ingrideent = ingrideents.find((el) => el.title === name)
    const ingrideentIndex = sostav.findIndex((el) => el.id === ingrideent.id)
    if(ingrideentIndex === -1) {
        dispatch(ingrideentPlus({id, path, pizzaIng, add: ingrideent.plus, name, check, ingrideents, sostav, productPizza: newPizza}))
    } else {
        const ingrideentSostav = remove(ingrideentIndex, 1, sostav)
        dispatch(ingrideentMinus({id, path, pizzaIng, decrice: ingrideent.plus, name, check, ingrideentSostav, ingrideents, productPizza}))
    }
}

const initialState = {
    cartItems: [],
    orderTotal: 0,
    palochkiTotal: 0,
    newPizza: null
    };

export default createReducer({
    [addedToCart]: (state, {id, radioValue, product}) => {
        const res = updateOder(state, id, 1, radioValue, product)
        // const pizzaNew = R.defaultTo(product, state.newPizza)
        console.log(product)
        console.log(state.newPizza)
        // console.log(state)
        return {...state, cartItems: res.cartItems, orderTotal: res.orderTotal}},
    [removeFromCart]: (state, data) => {
        const {cartItems, orderTotal} = updateOder(state, data.id, -1, data.radioValue, data.product)
        return { ...state, cartItems, orderTotal }
    },
    [allRemoveFromCart]: (state, data) => {
        const item = state.cartItems.find((el) => el.id === data.id)
        const {cartItems, orderTotal} = updateOder(state, data.id, -item.count, data.radioValue, data.product)
        return { ...state, cartItems, orderTotal}
    },
    [pizzaSize]: (state, {id, price, product, size}) => {

        const pizza = product.find((pizzaId) => pizzaId.id === id);
        const itemIndexPizza = state.cartItems.findIndex((data) => data.id === id)
        const itemPizza = state.cartItems[itemIndexPizza]

        const updateItemPizza = R.update(itemIndexPizza, {
            ...pizza,
            radioValue: parseInt(price) * 1,
            size: {[size]: true},
            count: itemPizza.count,
            total: itemPizza.count * parseInt(price)
        })(state.cartItems)

        const totalPrice = R.compose(
            R.sum,
            R.pluck('total')
        )(updateItemPizza)

        return {
            ...state,
            orderTotal: totalPrice,
            cartItems: updateItemPizza
        }
    },

    [pizzaCart]: (state, {id, productPizza, total, priceDef, size, mass}) => {
        const pizzaProduct = R.defaultTo(productPizza, state.newPizza)
        const pizza = pizzaProduct.find((pizzaId) => pizzaId.id === id);
        const itemIndexPizza = pizzaProduct.findIndex((data) => data.id === id)
        // console.log("pizzaCartSize188", pizza)
        // console.log("priceDefShoppingPizzaSizeCarts189", priceDef)
        // console.log("totalSizeCart190", total)
        // console.log("priceDefSizeCart191", priceDef)
        const updateItemPizza = R.update(itemIndexPizza, {
           ...pizza,
            // id: pizza.id,
            price: total,
            priceDef,
            // priceIn33cm: pizza.priceIn33cm,
            // price33: pizza.priceIn33cm,
            size: {[size]: true},
            slug: pizza.slug,
            mass,
            contentful_id: pizza.contentful_id
        })(pizzaProduct)
        // console.log("updateItemPizzaSizeCart199", updateItemPizza)
        return {
            ...state,
            newPizza: updateItemPizza
            }
    },

    [addedPribor]: (state, count) => {
        const priborTotal = state.palochkiTotal > 1 ? state.palochkiTotal + parseInt(count) : state.palochkiTotal * 1 + 1
        return {
            ...state,
            palochkiTotal: priborTotal
        }
    },
    [addedSaleRoll]: (state, objRoll) => {
       return {
           ...state,
           orderTotal: state.orderTotal + objRoll.radioValue,
           cartItems: R.append({
               ...objRoll,
               // id: `${objRoll.id}saleRoll`,
               priceSale: 0,
               textRollSale: "Филадельфия за 79!"
           }, state.cartItems)
       }
    },
    [addedSalePizza]: (state, objPizza) => {
        return {
            ...state,
            cartItems: R.append({
                ...objPizza,
                pizzaSale: true,
                textPizza: "Бесплатная пицца!",
                count: 0
            }, state.cartItems)
        }
    },
    [deletePizzaDarom]: (state, id) => {
        const pizzaDaromIndex = state.cartItems.findIndex((el) => el.id === id)
        return {
            ...state,
            cartItems: R.remove(pizzaDaromIndex, 1, state.cartItems)
        }
    },
    [deleteRollSale]: (state, id) => {
        const rollSaleIndex = state.cartItems.findIndex((el) => el.id === id)
        return {
            ...state,
            orderTotal: state.orderTotal - 79,
            cartItems: R.remove(rollSaleIndex, 1, state.cartItems)
        }
    },

    [addedIngrideents]: (state) => ({...state}),

    [ingrideentPlus]: (state, {path, pizzaIng, id, add, name, check, ingrideents, sostav, productPizza}) => {
        const pizza = pizzaIng.find((pizza) => pizza.id === id);
        const itemIndexPizza = pizzaIng.findIndex((data) => data.id === id)

        // установка чекбоксов
        const checker = ingrideents.find((el) => el.title === name)
        const indexIngrideent = ingrideents.findIndex((el) => el.title === name)
        const updateCheck = R.update(indexIngrideent, {
            ...checker,
            [name]: check
        })(ingrideents)

        // добавление в состав
        const updateIngrideents = R.append(checker, sostav)
        // обновление пиццы в массиве и в path pizza
        const updateItemPizza = R.update(itemIndexPizza, {
            ...pizza,
            price: pizza.price + add,
            priceIn33cm: pizza.priceIn33cm + add,
            priceDef: pizza.price + add,
            ingrideents: updateCheck,
            sostav: updateIngrideents
        })(pizzaIng);

        // обновление пиццы в корзине
        if(path) {
            const pizzaz = pizzaIng.find((pizza) => pizza.id === id);
            const itemIndexPizzaz = pizzaIng.findIndex((data) => data.id === id)
            console.log("else331", pizzaz)
            const updateItem = R.update(itemIndexPizzaz, {
                ...pizzaz,
                priceDef: pizzaz.count > 1 ? pizzaz.priceDef + add * pizzaz.count : pizzaz.priceDef + add,
                price33: pizzaz.count > 1 ? pizzaz.price33 + add * pizzaz.count : pizzaz.price33 + add,
                total: pizzaz.count > 1 ? pizzaz.total + add * pizzaz.count : pizzaz.total + add,
                ingrideents: updateCheck,
                sostav: updateIngrideents,
            })(state.cartItems);

            // productPizza из getStore() массив newPizza
            const pizzaNew = productPizza.find((pizza) => pizza.id === id);
            const itemIndexNewPizza = productPizza.findIndex((data) => data.id === id);
            // price: 438
            // priceDef: 333
            // priceIn33cm: 438
            // обновление масства newPizza когда я нахожусь в корзине
            const newPizzaUpdate = R.update(itemIndexNewPizza, {
                ...pizzaNew,
                priceDef: pizzaNew.price + add,
                priceIn33cm: pizzaNew.priceIn33cm + add,
                price: pizzaNew.price + add,
                ingrideents: updateCheck,
                sostav: updateIngrideents
            })(productPizza);
            return {
                ...state,
                cartItems: updateItem,
                newPizza: newPizzaUpdate
            }
        }

        // проверяю что возвращаю
        // если корзина пустая то просто изменяю массив newPizza
        // в остальных случаях обновляю и массив cartItems(корзину) и array newPizza
        if(R.isEmpty(state.cartItems)) {
            return {
                ...state,
                newPizza: updateItemPizza,
            }
         } else {
            const pizzazz = state.cartItems.find((pizza) => pizza.id === id);
            const itemIndexPizzazz = state.cartItems.findIndex((data) => data.id === id)
            console.log("else373", pizzazz)
            const updateItem = R.update(itemIndexPizzazz, {
                ...pizzazz,
                priceDef: pizzazz.count > 1 ? pizzazz.priceDef + add * pizzazz.count : pizzazz.priceDef + add,
                price33: pizzazz.count > 1 ? pizzazz.price33 + add * pizzazz.count : pizzazz.price33 + add,
                ingrideents: updateCheck,
                sostav: updateIngrideents,
                total: pizzazz.count > 1 ? pizzazz.total + add * pizzazz.count : pizzazz.total + add
            })(state.cartItems);
            return {
                ...state,
                newPizza: updateItemPizza,
                cartItems: updateItem,
            }
        }

    },
    [ingrideentMinus]: (state, {path, pizzaIng, id, decrice, name, check, ingrideentSostav, ingrideents, productPizza} ) => {
        const pizza = pizzaIng.find((pizza) => pizza.id === id);
        const itemIndexPizza = pizzaIng.findIndex((data) => data.id === id)

        const checker = ingrideents.find((el) => el.title === name)
        const indexIngrideent = ingrideents.findIndex((el) => el.title === name)
        const updateCheck = R.update(indexIngrideent, {
            ...checker,
            [name]: check
        })(ingrideents)

        const updateItemPizza = R.update(itemIndexPizza, {
            ...pizza,
            price: pizza.price - decrice,
            priceIn33cm: pizza.priceIn33cm - decrice,
            priceDef: pizza.price - decrice,
            ingrideents: updateCheck,
            sostav: ingrideentSostav
        })(pizzaIng)

        if(path) {
            const pizzaz = state.cartItems.find((pizza) => pizza.id === id);
            const itemIndexPizzaz = state.cartItems.findIndex((data) => data.id === id)
            const updateItem = R.update(itemIndexPizzaz, {
                ...pizzaz,
                priceDef: pizzaz.count > 1 ? pizzaz.priceDef - decrice * pizzaz.count : pizzaz.priceDef - decrice,
                price33: pizzaz.count > 1 ? pizzaz.price33 - decrice * pizzaz.count : pizzaz.price33 - decrice,
                total: pizzaz.count > 1 ? pizzaz.total - decrice * pizzaz.count : pizzaz.total - decrice,
                ingrideents: updateCheck,
                sostav: ingrideentSostav,
            })(state.cartItems);

            const pizzaNew = state.newPizza.find((pizza) => pizza.id === id);
            const itemIndexNewPizza = state.newPizza.findIndex((data) => data.id === id);

            const newPizzaUpdate = R.update(itemIndexNewPizza, {
                ...pizzaNew,
                priceDef: pizzaNew.priceDef - decrice,
                priceIn33cm: pizzaNew.priceIn33cm - decrice,
                price: pizzaNew.priceDef - decrice,
                ingrideents: updateCheck,
                sostav: ingrideentSostav
            })(productPizza);
            return {
                ...state,
                cartItems: updateItem,
                newPizza: newPizzaUpdate
            }
        }

        if(R.isEmpty(state.cartItems)) {
        return {
            ...state,
            newPizza: updateItemPizza,
        }
    } else {
            const pizzazz = state.cartItems.find((pizza) => pizza.id === id);
            const itemIndexPizzazz = state.cartItems.findIndex((data) => data.id === id)
            const updateItem = R.update(itemIndexPizzazz, {
                ...pizzazz,
                priceDef: pizzazz.priceDef - decrice,
                price33: pizzazz.price33 - decrice,
                ingrideents: updateCheck,
                sostav: ingrideentSostav,
                total: pizzazz.total - decrice
            })(state.cartItems);
            return {
                ...state,
                newPizza: updateItemPizza,
                cartItems: updateItem,
            }
        }
},

    [checker]: (state, {name, checked}) => {
        return {
            checked: {[name]: checked}
        }
    }
}, initialState)





