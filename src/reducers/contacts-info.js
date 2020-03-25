import {createAction, createReducer} from "redux-act";

export const userName = createAction('SET_USER_NAME')
export const userPhone = createAction('SET_USER_PHONE')
export const userCity = createAction('SET_USER_CITY')
export const userAdres = createAction('SET_USER_ADRESS')
export const userHome = createAction('SET_USER_HOME')
export const userEntrance = createAction('SET_USER_ENTRANCE')
export const userLevel = createAction('SET_USER_LEVEL')
export const userDoorPass = createAction('SET_USER_DOOR_PASS')
export const userTimeDelivery = createAction('SET_TIME_DELIVERY')
export const userDateDelivery = createAction('SET_DATE_DELIVERY')

export const setNameUser = (name) => (dispatch) => dispatch(userName(name))
export const setPhoneUser = (phone) => (dispatch) => dispatch(userPhone(phone))
export const setCityUser = (city) => (dispatch) => dispatch(userCity(city))
export const setAdresUser = (adres) => (dispatch) => dispatch(userAdres(adres))
export const setHomeUser = (home) => (dispatch) => dispatch(userHome(home))
export const setEnhanceUser = (enhance) => (dispatch) => dispatch(userEntrance(enhance))
export const setLavelUser = (level) => (dispatch) => dispatch(userLevel(level))
export const setDoorUser = (door) => (dispatch) => dispatch(userDoorPass(door))
export const setTimeDeliveryUser = (time) => (dispatch) => dispatch(userTimeDelivery(time))
export const setDateDeliveryUser = (date) => (dispatch) => dispatch(userDateDelivery(date))

const initialState = {
    nameUser: '',
    phoneUser: '',
    deliverySity: '',
    deliveryAdress: '',
    homeNumber: '',
    entranceNumber: '',
    levelNumber: '',
    doorPassword: '',
    timeDelivery: '',
    dateDelivery: ''
}

export default createReducer({
    [userName]: (state, nameUser) => ({...state, nameUser}),
    [userPhone]: (state, phoneUser) => ({...state, phoneUser}),
    [userCity]: (state, deliverySity) => ({...state, deliverySity}),
    [userAdres]: (state, deliveryAdress) => ({...state, deliveryAdress}),
    [userHome]: (state, homeNumber) => ({...state, homeNumber}),
    [userEntrance]: (state, entranceNumber) => ({...state, entranceNumber}),
    [userLevel]: (state, levelNumber) => ({...state, levelNumber}),
    [userDoorPass]: (state, doorPassword) => ({...state, doorPassword}),
    [userTimeDelivery]: (state, timeDelivery) => ({...state, timeDelivery}),
    [userDateDelivery]: (state, dateDelivery) => ({...state, dateDelivery})
    }, initialState)












// const contactUser = (state, action) => {
//
//     if(state === undefined) {
//         return {
//             nameUser: '',
//             phoneUser: '',
//             deliverySity: '',
//             deliveryAdress: '',
//             homeNumber: '',
//             entranceNumber: '',
//             levelNumber: '',
//             doorPassword: '',
//             timeDelivery: '',
//             dateDelivery: ''
//           };
//     }
//
//     switch (action.type) {
//
//         case 'SET_USER_NAME':
//             return {
//                 nameUser: action.payload,
//                 phoneUser: state.contacts.phoneUser,
//                 deliverySity: state.contacts.deliverySity,
//                 deliveryAdress: state.contacts.deliveryAdress,
//                 homeNumber: state.contacts.homeNumber,
//                 entranceNumber: state.contacts.entranceNumber,
//                 levelNumber: state.contacts.levelNumber,
//                 doorPassword: state.contacts.doorPassword
//             };
//
//             case 'SET_USER_PHONE':
//             return {
//                 nameUser: state.contacts.nameUser,
//                 phoneUser: action.payload,
//                 deliverySity: state.contacts.deliverySity,
//                 deliveryAdress: state.contacts.deliveryAdress,
//                 homeNumber: state.contacts.homeNumber,
//                 entranceNumber: state.contacts.entranceNumber,
//                 levelNumber: state.contacts.levelNumber,
//                 doorPassword: state.contacts.doorPassword
//             };
//             case 'SET_USER_CITY':
//                 return {
//                     nameUser: state.contacts.nameUser,
//                     phoneUser: state.contacts.phoneUser,
//                     deliverySity: action.payload,
//                     deliveryAdress: state.contacts.deliveryAdress,
//                     homeNumber: state.contacts.homeNumber,
//                     entranceNumber: state.contacts.entranceNumber,
//                     levelNumber: state.contacts.levelNumber,
//                     doorPassword: state.contacts.doorPassword
//                 };
//             case 'SET_USER_ADRESS':
//                 return {
//                     nameUser: state.contacts.nameUser,
//                     phoneUser: state.contacts.phoneUser,
//                     deliverySity: state.contacts.deliverySity,
//                     deliveryAdress: action.payload,
//                     homeNumber: state.contacts.homeNumber,
//                     entranceNumber: state.contacts.entranceNumber,
//                     levelNumber: state.contacts.levelNumber,
//                     doorPassword: state.contacts.doorPassword
//                     };
//             case 'SET_USER_HOME':
//                 return {
//                     nameUser: state.contacts.nameUser,
//                     phoneUser: state.contacts.phoneUser,
//                     deliverySity: state.contacts.deliverySity,
//                     deliveryAdress: state.contacts.deliveryAdress,
//                     homeNumber: action.payload,
//                     entranceNumber: state.contacts.entranceNumber,
//                     levelNumber: state.contacts.levelNumber,
//                     doorPassword: state.contacts.doorPassword
//                 };
//             case 'SET_USER_ENTRANCE':
//                 return {
//                     nameUser: state.contacts.nameUser,
//                     phoneUser: state.contacts.phoneUser,
//                     deliverySity: state.contacts.deliverySity,
//                     deliveryAdress: state.contacts.deliveryAdress,
//                     homeNumber: state.contacts.homeNumber,
//                     entranceNumber: action.payload,
//                     levelNumber: state.contacts.levelNumber,
//                     doorPassword: state.contacts.doorPassword
//                 };
//             case 'SET_USER_LEVEL':
//                 return {
//                     nameUser: state.contacts.nameUser,
//                     phoneUser: state.contacts.phoneUser,
//                     deliverySity: state.contacts.deliverySity,
//                     deliveryAdress: state.contacts.deliveryAdress,
//                     homeNumber: state.contacts.homeNumber,
//                     entranceNumber:  state.contacts.entranceNumber,
//                     levelNumber: action.payload,
//                     doorPassword: state.contacts.doorPassword
//                 };
//             case 'SET_USER_DOOR_PASS':
//                 return {
//                     nameUser: state.contacts.nameUser,
//                     phoneUser: state.contacts.phoneUser,
//                     deliverySity: state.contacts.deliverySity,
//                     deliveryAdress: state.contacts.deliveryAdress,
//                     homeNumber: state.contacts.homeNumber,
//                     entranceNumber: state.contacts.entranceNumber,
//                     levelNumber: state.contacts.levelNumber,
//                     doorPassword: action.payload
//                 };
//               case 'SET_TIME_DELIVERY':
//               return {
//                   nameUser: state.contacts.nameUser,
//                   phoneUser: state.contacts.phoneUser,
//                   deliverySity: state.contacts.deliverySity,
//                   deliveryAdress: state.contacts.deliveryAdress,
//                   homeNumber: state.contacts.homeNumber,
//                   entranceNumber: state.contacts.entranceNumber,
//                   levelNumber: state.contacts.levelNumber,
//                   doorPassword: state.contacts.doorPassword,
//                   dateDelivery: state.contacts.dateDelivery,
//                   timeDelivery: action.payload
//               };
//             case 'SET_DATE_DELIVERY':
//             return {
//                 nameUser: state.contacts.nameUser,
//                 phoneUser: state.contacts.phoneUser,
//                 deliverySity: state.contacts.deliverySity,
//                 deliveryAdress: state.contacts.deliveryAdress,
//                 homeNumber: state.contacts.homeNumber,
//                 entranceNumber: state.contacts.entranceNumber,
//                 levelNumber: state.contacts.levelNumber,
//                 doorPassword: state.contacts.doorPassword,
//                 dateDelivery: action.payload,
//                 timeDelivery: state.contacts.timeDelivery
//             };
//
//         default:
//             return state.contacts
//         }
// }
//
// export default contactUser