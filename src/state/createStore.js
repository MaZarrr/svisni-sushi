import { createStore } from "redux"
import reducer from './../reducers';

const store = createStore(reducer)
export default store


// const createStore = () => reduxCreateStore(reducer, initialState)

// import { createStore as reduxCreateStore } from "redux"


// const reducer = (state, action) => {
//     switch (action.type) {
//                 case  'PRODUCT_LOADED':
//                 return {
//                     product: action.payload
//                 };
//                 default:
//                     return state;
//             }
//   }

// const initialState = {
//     product:  []
// };

// const createStore = () => reduxCreateStore(reducer, initialState)
// export default createStore

