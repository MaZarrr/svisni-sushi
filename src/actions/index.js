const producSetsLoad = (newProduct) => {
    return {
        type: 'PRODUCT_LOADED',
        payload: newProduct
      }
};

const onRazmer = (idPizza, value) => {
    return {
        type: 'PRODUCT_RAZMER',
        payload: { 
            id: idPizza,
            value: value
        }
            
      }
};

const productRequested = () => {
    return {
        type: 'PRODUCT_REQUESTED'
      }
};

const productError = (error) => {
    return {
        type: 'PRODUCT_ERROR',
        payload: error
      }
};

const setAddedToCart = (setId, radioValue) => {
    return {
        type: 'SET_ADDED_TO_CART',
        payload: {
            id: setId,
            radioValue     
        } 
    
      }
};
const addedPalochki = (int) => {
    return {
        type: 'PALOCHKI_ADDED',
        payload: int
      }
};

const setRemoveFromCart = (setId, radioValue) => {
    return {
        type: 'SET_REMOVE_FROM_CART',
        payload: {
            id: setId,
            radioValue     
        } 
      }
};

const allSetRemoveFromCart = (setId, radioValue) => {
    return {
        type: 'ALL_SET_REMOVE_FROM_CART',
        payload: {
            id: setId,
            radioValue     
        } 
      }
};
const setName = (valueNameUser) => {
    return {
        type: 'SET_USER_NAME',
        payload: valueNameUser
      }
};

const setPhone = (valuePhoneUser) => {
    return {
        type: 'SET_USER_PHONE',
        payload: valuePhoneUser
      }
};

const setSity = (valueSity) => {
    return {
        type: 'SET_USER_CITY',
        payload: valueSity
      }
};

const setAdress = (valueAdress) => {
    return {
        type: 'SET_USER_ADRESS',
        payload: valueAdress
      }
};

const setHome = (valueHome) => {
    return {
        type: 'SET_USER_HOME',
        payload: valueHome
      }
};

const setEntrance = (valueEntrance) => {
    return {
        type: 'SET_USER_ENTRANCE',
        payload: valueEntrance
      }
};

const setLevel = (valueLevel) => {
    return {
        type: 'SET_USER_LEVEL',
        payload: valueLevel
      }
};

const setDoor = (valueDoor) => {
    return {
        type: 'SET_USER_DOOR_PASS',
        payload: valueDoor
      }
}; 


export {
    producSetsLoad,
    productRequested,
    productError,
    setAddedToCart,
    setRemoveFromCart,
    allSetRemoveFromCart,
    onRazmer,
    addedPalochki,
    setName, setPhone, setEntrance, setLevel, setDoor, setSity, setAdress, setHome
}





// const producPizzaLoad = (newProductPizza) => {
//     return {
//         type: 'PRODUCT_LOADED_PIZZA',
//         payload: newProductPizza
//       }
// };


// const onRadioChangePrice = (priceChange, inputName) => {
//     return {
//         type: 'PRICE_PIZZA_CHENGED',
//         payload: {
//             eName: inputName,
//             eValue: priceChange
//         } 
        
//     }
// }