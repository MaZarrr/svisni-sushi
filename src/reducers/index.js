import updateSetList from './set-list';
import updateShoppingCart from './shopping-cart';
import contactUser from './contacts-info';

  const reducer = (state, action) => {
  
    if(action.type === 'PALOCHKI_ADDED') {
      return {
        palochkiTotal: state.palochkiTotal >= 1 ? state.palochkiTotal + parseInt(action.payload) : state.palochkiTotal * 1 + 1,
        setList: updateSetList(state, action),
        shoppingCart: updateShoppingCart(state, action),
        contacts: contactUser(state, action)
      }
    }
      return {
          setList: updateSetList(state, action),
          shoppingCart: updateShoppingCart(state, action),
          palochkiTotal: 1,
          contacts: contactUser(state, action) 
      }
    };

    export default reducer