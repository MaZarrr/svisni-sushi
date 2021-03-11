import * as R from 'ramda'
import uniqid from 'uniqid'
import {createReducer, createAction} from "redux-act";

export const addedToCart = createAction('SET_ADDED_TO_CART');
const removeFromCart = createAction('SET_REMOVE_FROM_CART');
const allRemoveFromCart = createAction('ALL_SET_REMOVE_FROM_CART');

const pizzaSize = createAction('PRODUCT_RAZMER');
export const pizzaCart = createAction('SIZE_CART');

export const addedIngrideents = createAction('ADDED_TO_INGRIREENT');
export const ingrideentPlus = createAction('INGRIDEENT_PLUS');
export const ingrideentMinus = createAction('INGRIREENT_MINUS');
export const checker = createAction('CHECKED_INGRIDEENT_PIZZA');

export const checkedWok = createAction('CHECKED_WOK');

const addedPribor = createAction('PALOCHKI_ADDED');
const addedSaleRoll = createAction('ADD_SALE_ROLL');
const addedSalePizza = createAction('ADD_SALE_PIZZA');
const deletePizzaDarom = createAction('DEL_PIZZA_DAROM');
const deleteRollSale = createAction('DEL_ROLL_SALE');

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

    if(!R.isNil(item.priceIn33cm) && cartItems[idx].price !== item.price) {
        const newItem = R.merge(item, {id: uniqid(), count: 1, total: item.price});
        return R.append(newItem, cartItems)
    }

    if(!R.isNil(item.descriptionWok) && item.descriptionWok !== cartItems[idx].descriptionWok) {
        const newItem = R.merge(item, {id: uniqid(), count: 1, total: item.price});
        return R.append(newItem, cartItems)
    }

    if(!R.isNil(item.edit) && item.description !== cartItems[idx].description) {
        const newItem = R.merge(item, {id: uniqid(), count: 1, total: item.price});
        return R.append(newItem, cartItems)
    }

    return R.update(idx, item, cartItems)
};

const updateCartItem = (setу, item = {}, quantity, priceRadio = setу.price) => { // добавление в корзину

    const sizePizza = R.defaultTo({[setу.slug]: true}, setу.size);
    const pricePizza = R.defaultTo(setу.price, setу.priceDef);
    const {
        id = setу.id,
        count = 0,
        name = setу.name,
        total = 0,
        image = setу.image.gatsbyImageData,
        priceDef = pricePizza,
        priceIn33cm = setу.priceIn33cm,
        pribor = 0,
    } = item;

    // добавление пиццы
    if (!R.isNil(setу.priceIn33cm)) {
        const descriptionIngrideents = R.pluck('nameI', setу.sostav).join(", ");
        return {
            id,
            name,
            priceIn33cm: setу.priceIn33cm,
            priceDef: pricePizza,
            ingrideents: setу.ingrideents,
            sostav: setу.sostav,
            price: priceRadio,
            description: setу.description,
            productSize: R.isNil(setу.size) ? "Маленькая" : Object.keys(setу.size).toString() === setу.slug ? "Маленькая" : "Большая",
            descriptionIngrideents,
            contentful_id: setу.contentful_id,
            size: sizePizza,
            slug: setу.slug,
            image: {...image},
            count: count + quantity,
            total: priceRadio > priceDef ? total + quantity * priceIn33cm : total + quantity * priceDef
        }
    }

    // добавление вока // setу.private - это sety.wok только в CMS в каждом товаре.
    // нужно для def вока. Проверка, действительно добавлен вок или нет
    if (setу.private === false || setу.wok === true) {
        const wok = R.isNil(setу.wok) ? true : setу.wok;
        const descriptionWok = R.isNil(setу.descriptionWok) ? "Удон" : setу.descriptionWok;
        return {
            id,
            name,
            pribor,
            wok,
            descriptionWok,
            priceDef: pricePizza,
            price: priceRadio,
            description: setу.description,
            slug: setу.slug,
            image: {...image},
            count: count + quantity,
            total: total + quantity * priceDef
        }
    }

    // Добавление всех остальных товаров
    return {
        id,
        name,
        pribor,
        priceDef: pricePizza,
        edit: setу.edit,
        price: priceRadio,
        description: setу.description,
        slug: setу.slug,
        image: {...image},
        count: count + quantity,
        total: total + quantity * priceDef
    };
};

const updateOder = (state, setId, quantity, priceRadioPizza, categoryName) => {
    const {cartItems} = state;
    const sety = categoryName.find((productCategory) => productCategory.id === setId);
    const itemIndex = cartItems.findIndex(({id}) => id === setId);
    const item = cartItems[itemIndex];

    const totalPrice = R.compose(
        R.sum,
        R.pluck('total')
    )(cartItems);
    const newItem = updateCartItem(sety, item, quantity, priceRadioPizza);
    return {
        orderTotal: priceRadioPizza > (sety.price || item.priceDef) ? totalPrice + priceRadioPizza * quantity : totalPrice + (sety.price || item.priceDef) * quantity,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
    };

};

// action func
export const addedCart = (data) => (dispatch) => dispatch(addedToCart(data));

export const removeCart = (data) => (dispatch) => dispatch(removeFromCart(data));

export const allRemoveCart = (data) => (dispatch) => dispatch(allRemoveFromCart(data));

export const pizzaSized = (data) => (dispatch) => dispatch(pizzaSize(data));

export const addPribor = (count) => (dispatch) => {
    // const {shoppingCart: {palochkiTotal}} = getStore()
    // const priborTotal = palochkiTotal >= 2 ? palochkiTotal + parseInt(count) : palochkiTotal * 1 + 1
    dispatch(addedPribor(count))
};

export const saleRoll = (objRoll) => async (dispatch) => {
    await dispatch(addedSaleRoll(objRoll))
};
export const salePizza = (objPizza) => async (dispatch) => await dispatch(addedSalePizza(objPizza))
export const deletePizza = (id) => (dispatch) => dispatch(deletePizzaDarom(id))
export const deleteRoll = (id) => (dispatch) => dispatch(deleteRollSale(id))
export const addedIngrideent = ({id, sostav, name, ingrideents, check, path = null, pizzaIng}) => (dispatch, getStore) => {
    const {app: {productPizza}, shoppingCart: {newPizza}} = getStore();
    const ingrideent = ingrideents.find((el) => el.title === name)
    const ingrideentIndex = sostav.findIndex((el) => el.id === ingrideent.id)
    if(ingrideentIndex === -1) {
        dispatch(ingrideentPlus({id, path, pizzaIng, add: ingrideent.plus, name, check, ingrideents, sostav, productPizza: newPizza, defaultPizza: productPizza}))
    } else {
        const ingrideentSostav = R.remove(ingrideentIndex, 1, sostav)
        dispatch(ingrideentMinus({id, path, pizzaIng, decrice: ingrideent.plus, name, check, ingrideentSostav, ingrideents, productPizza}))
    }
};
// export const pizzaCardsPage = (data) => (dispatch, getState) => {
//     const {app: {productPizza}} = getState();
//     dispatch(pizzaCart({data, productPizza}))
// };

const initialState = {
    cartItems: typeof window !== `undefined` ? R.isNil(JSON.parse(localStorage.getItem('basketProduct'))) ? [] : JSON.parse(localStorage.getItem('basketProduct')).cartItems : [],
    orderTotal: typeof window !== `undefined` ? R.isNil(JSON.parse(localStorage.getItem('basketProduct'))) ? 0 : JSON.parse(localStorage.getItem('basketProduct')).orderTotal : 0,
    palochkiTotal: 0,
    newPizza: null,
    newWok: null
};

export default createReducer({
    [addedToCart]: (state, {id, price, product}) => {
        const res = updateOder(state, id, 1, price, product);
        if (typeof window !== `undefined`) {
            localStorage.setItem('basketProduct', JSON.stringify(res));
            const storageBasket = JSON.parse(localStorage.getItem('basketProduct'));
            return {...state, cartItems: storageBasket.cartItems, orderTotal: storageBasket.orderTotal}
        }
    },
    [removeFromCart]: (state, {id, price, product}) => {
        const {cartItems, orderTotal} = updateOder(state, id, -1, price, product);
        if (typeof window !== `undefined`) {
            localStorage.setItem('basketProduct', JSON.stringify({orderTotal, cartItems}));
            const storageBasket = JSON.parse(localStorage.getItem('basketProduct'));
            return { ...state, cartItems: storageBasket.cartItems, orderTotal: storageBasket.orderTotal }
        }
    },
    [allRemoveFromCart]: (state, {id, price, product}) => {
        const item = state.cartItems.find((el) => el.id === id);
        const {cartItems, orderTotal} = updateOder(state, id, -item.count, price, product);
        if (typeof window !== `undefined`) {
            localStorage.setItem('basketProduct', JSON.stringify({orderTotal, cartItems}));
            const storageBasket = JSON.parse(localStorage.getItem('basketProduct'));
            return {...state, cartItems: storageBasket.cartItems, orderTotal: storageBasket.orderTotal}
        }
    },
    [pizzaSize]: (state, {id, price, product, size}) => {
        const pizza = product.find((pizzaId) => pizzaId.id === id);
        const itemIndexPizza = state.cartItems.findIndex((data) => data.id === id);
        const itemPizza = state.cartItems[itemIndexPizza];

        const updateItemPizza = R.update(itemIndexPizza, {
            ...pizza,
            price: parseInt(price) * 1, // передача цены пиццы большая или маленькая
            size: {[size]: true},
            count: itemPizza.count,
            productSize: size === pizza.slug ? "Маленькая" : "Большая",
            total: itemPizza.count * parseInt(price)
        })(state.cartItems);

        const totalPrice = R.compose(
            R.sum,
            R.pluck('total')
        )(updateItemPizza);

        return {
            ...state,
            orderTotal: totalPrice,
            cartItems: updateItemPizza
        }
    },

    [pizzaCart]: (state, {id, productPizza, total, priceDef, size, mass}) => {
        if(id === undefined) {
            const pizza = productPizza.map(({node: el}) => {
                return {
                    ...el,
                    sostav: [],
                    ingrideents: [
                        {
                            id: 1,
                            nameI: " зелень",
                            value: 29,
                            minus: -29,
                            plus: 29,
                            zelen : false,
                            title: "zelen"
                        },
                        {
                            id: 2,
                            nameI: "лук фри",
                            lyk: false,
                            value: 29,
                            minus: -29,
                            plus: 29,
                            title: "lyk"
                        },
                        {
                            id: 3,
                            nameI: "барбекю соус",
                            barbeky : false,
                            value: 29,
                            minus: -29,
                            plus: 29,
                            title: "barbeky"
                        },
                        {
                            id: 4,
                            nameI: "ананас",
                            value: 39,
                            minus: -39,
                            plus: 39,
                            ananas : false,
                            title: "ananas",
                        },
                        {
                            id: 5,
                            nameI: "фирменный соус",
                            firmsoys : false,
                            value: 39,
                            minus: -39,
                            plus: 39,
                            title: "firmsoys"
                        },
                        {
                            id: 6,
                            nameI: "болгарский перец",
                            bolgarskiy : false,
                            value: 39,
                            minus: -39,
                            plus: 39,
                            title: "bolgarskiy"
                        },
                        {
                            id: 7,
                            nameI: "шампиньоны",
                            shampinien : false,
                            value: 39,
                            minus: -39,
                            plus: 39,
                            title: "shampinien"
                        },
                        {
                            id: 8,
                            nameI: "помидор",
                            pomidor : false,
                            value: 39,
                            minus: -39,
                            plus: 39,
                            title: "pomidor"
                        },
                        {
                            id: 9,
                            nameI: "куриное филе",
                            kuricha : false,
                            value: 39,
                            minus: -39,
                            plus: 39,
                            title: "kuricha"
                        },
                        {
                            id: 10,
                            nameI: "свинина",
                            svinina: false,
                            value: 49,
                            minus: -49,
                            plus: 49,
                            title: "svinina"
                        },
                        {
                            id: 11,
                            nameI: "пепперони",
                            pepperoni: false,
                            value: 49,
                            minus: -49,
                            plus: 49,
                            title: "pepperoni"
                        },
                        {
                            id: 12,
                            nameI: "морепродукты",
                            moreproduct : false,
                            value: 49,
                            minus: -49,
                            plus: 49,
                            title: "moreproduct"
                        },
                        {
                            id: 13,
                            nameI: "сыр Пармезан",
                            parmezan: false,
                            value: 49,
                            minus: -49,
                            plus: 49,
                            title: "parmezan"
                        },
                        {
                            id: 14,
                            nameI: "сыр «Моцарелла»",
                            mozarella: false,
                            value: 49,
                            minus: -49,
                            plus: 49,
                            title: "mozarella"
                        },
                        {
                            id: 15,
                            nameI: "ветчина",
                            vetchina : false,
                            value: 49,
                            minus: -49,
                            plus: 49,
                            title: "vetchina"
                        }]}});
            return {
                ...state,
                newPizza: pizza
            }
        }
        const pizzaProduct = R.defaultTo(productPizza, state.newPizza);
        const pizza = pizzaProduct.find((pizzaId) => pizzaId.id === id);
        const itemIndexPizza = pizzaProduct.findIndex((data) => data.id === id);

        const updateItemPizza = R.update(itemIndexPizza, {
            ...pizza,
            price: total,
            priceDef,
            size: {[size]: true},
            slug: pizza.slug,
            mass,
            contentful_id: pizza.contentful_id
        })(pizzaProduct);
        return {
            ...state,
            newPizza: updateItemPizza
        }
    },

    [addedPribor]: (state, count) => {
        const priborTotal = state.palochkiTotal > 1 ? state.palochkiTotal + parseInt(count) : state.palochkiTotal * 1 + 1;
        return {
            ...state,
            palochkiTotal: priborTotal
        }
    },
    [addedSaleRoll]: (state, objRoll) => {
        return {
            ...state,
            orderTotal: state.orderTotal + objRoll.price,
            cartItems: R.append({
                ...objRoll,
                id: uniqid(),
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
                count: 1
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

    [ingrideentPlus]: (state, {path, pizzaIng, id, add, name, check, ingrideents, sostav}) => {
        const pizza = pizzaIng.find((pizza) => pizza.id === id);
        const itemIndexPizza = pizzaIng.findIndex((data) => data.id === id);
        // установка чекбоксов
        const checker = ingrideents.find((el) => el.title === name);
        const indexIngrideent = ingrideents.findIndex((el) => el.title === name);
        const updateCheck = R.update(indexIngrideent, {
            ...checker,
            [name]: check
        })(ingrideents);
        // добавление в состав
        const updateIngrideents = R.append(checker, sostav);
        // обновление пиццы в массиве и в path pizza
        const updateItemPizza = R.update(itemIndexPizza, {
            ...pizza,
            price: pizza.price + add,
            ingrideentButtonStyle: R.length(updateIngrideents) > 0 ? true : false,
            priceIn33cm: pizza.priceIn33cm + add,
            priceDef: R.isNil(pizza.priceDef) ? pizza.price + add : pizza.priceDef + add,
            ingrideents: updateCheck,
            sostav: updateIngrideents
        })(pizzaIng);

        // обновление пиццы в корзине
        if(path === '/korzina/') {
            const pizzaz = pizzaIng.find((pizza) => pizza.id === id);
            const itemIndexPizzaz = pizzaIng.findIndex((data) => data.id === id)

            const descriptionIngrideents = R.pluck('nameI', updateIngrideents).join(", ");
            const updateItem = R.update(itemIndexPizzaz, {
                ...pizzaz,
                priceDef: R.isNil(pizzaz.priceDef) ? pizzaz.price + add : pizzaz.priceDef + add,
                priceIn33cm: pizzaz.priceIn33cm + add,
                price: pizzaz.price + add,
                descriptionIngrideents,
                total: pizzaz.count > 1 ? pizzaz.total + add * pizzaz.count : pizzaz.total + add,
                ingrideents: updateCheck,
                sostav: updateIngrideents,
            })(state.cartItems);

            // productPizza из getStore() массив newPizza
            // const pizz = R.defaultTo(defaultPizza, productPizza);
            // const pizzaNew = pizz.find((pizza) => pizza.id === id);
            // const itemIndexNewPizza = pizz.findIndex((data) => data.id === id);
            // // обновление масства newPizza когда я нахожусь в корзине
            // const newPizzaUpdate = R.update(itemIndexNewPizza, {
            //     ...pizzaNew,
            //     priceDef: pizzaNew.price + add,
            //     priceIn33cm: pizzaNew.priceIn33cm + add,
            //     price: pizzaNew.price + add,
            //     ingrideents: updateCheck,
            //     sostav: updateIngrideents
            // })(pizz);

            const totalPrice = R.compose(
                R.sum,
                R.pluck('total')
            )(updateItem);

            return {
                ...state,
                orderTotal: totalPrice,
                cartItems: updateItem
                // newPizza: newPizzaUpdate
            }
        }

        // проверяю что возвращаю
        // если корзина пустая то просто изменяю массив newPizza
        // в остальных случаях обновляю и массив cartItems(корзину) и array newPizza
        if(R.isEmpty(state.cartItems) || path === '/pizza/') {
            return {
                ...state,
                newPizza: updateItemPizza,
            }
        } else {
            const pizzazz = state.cartItems.find((pizza) => pizza.id === id);
            const itemIndexPizzazz = state.cartItems.findIndex((data) => data.id === id);
            const updateItem = R.update(itemIndexPizzazz, {
                ...pizzazz,
                priceDef: R.isNil(pizzazz.priceDef) ? pizzazz.price + add : pizzazz.priceDef + add,
                priceIn33cm: pizzazz.priceIn33cm + add,
                // price: pizzazz.count > 1 ? pizzazz.price + add * pizzazz.count : pizzazz.price + add,
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
    [ingrideentMinus]: (state, {path, pizzaIng, id, decrice, name, check, ingrideentSostav, ingrideents} ) => {
        const pizza = pizzaIng.find((pizza) => pizza.id === id);
        const itemIndexPizza = pizzaIng.findIndex((data) => data.id === id);

        const checker = ingrideents.find((el) => el.title === name);
        const indexIngrideent = ingrideents.findIndex((el) => el.title === name);
        const updateCheck = R.update(indexIngrideent, {
            ...checker,
            [name]: check
        })(ingrideents);

        const updateItemPizza = R.update(itemIndexPizza, {
            ...pizza,
            price: pizza.price - decrice,
            priceIn33cm: pizza.priceIn33cm - decrice,
            ingrideentButtonStyle: R.length(ingrideentSostav) > 0 ? true : false,
            priceDef: R.isNil(pizza.price) ? pizza.price - decrice : pizza.priceDef - decrice,
            ingrideents: updateCheck,
            sostav: ingrideentSostav
        })(pizzaIng);

        if(path === '/korzina/') {
            const pizzaz = pizzaIng.find((pizza) => pizza.id === id);
            const itemIndexPizzaz = pizzaIng.findIndex((data) => data.id === id);
            const descriptionIngrideents = R.pluck('nameI', ingrideentSostav).join(", ");
            const updateItem = R.update(itemIndexPizzaz, {
                ...pizzaz,
                descriptionIngrideents,
                priceDef: R.isNil(pizzaz.priceDef) ? pizzaz.price - decrice : pizzaz.priceDef - decrice,
                priceIn33cm: pizzaz.priceIn33cm - decrice,
                total: pizzaz.count > 1 ? pizzaz.total - decrice * pizzaz.count : pizzaz.total - decrice,
                ingrideents: updateCheck,
                sostav: ingrideentSostav,
            })(state.cartItems);
            const totalPrice = R.compose(
                R.sum,
                R.pluck('total')
            )(updateItem);

            return {
                ...state,
                orderTotal: totalPrice,
                cartItems: updateItem
            }
        }

        if(R.isEmpty(state.cartItems) || path === '/pizza/') {
            return {
                ...state,
                newPizza: updateItemPizza,
            }
        } else {
            const pizzazz = state.cartItems.find((pizza) => pizza.id === id);
            const itemIndexPizzazz = state.cartItems.findIndex((data) => data.id === id);
            const updateItem = R.update(itemIndexPizzazz, {
                ...pizzazz,
                priceDef: R.isNil(pizzazz.priceDef) ? pizzazz.price - decrice : pizzazz.priceDef - decrice,
                priceIn33cm: pizzazz.priceIn33cm - decrice,
                ingrideents: updateCheck,
                sostav: ingrideentSostav,
                total: pizzazz.count > 1 ? pizzazz.total - decrice * pizzazz.count : pizzazz.total - decrice
            })(state.cartItems);
            return {
                ...state,
                newPizza: updateItemPizza,
                cartItems: updateItem,
            }
        }
    },

    [checkedWok]: (state, {id, variant, productWok}) => {
        const wok = productWok.find((el) => el.id === id);
        const wokIndex = productWok.findIndex((el) => el.id === id)
        const newProductsWok = R.update(wokIndex, {
            ...wok,
            descriptionWok: variant,
            wok: true
        })(productWok)
        return {
            ...state,
            newWok: newProductsWok,
        }
    },
    [checker]: (state, {name, checked}) => {
        return {
            checked: {[name]: checked}
        }
    }
}, initialState)
