import {createAction, createReducer} from "redux-act";

const userName = createAction('SET_USER_NAME')
const userPhone = createAction('SET_USER_PHONE')
const userCity = createAction('SET_USER_CITY')
const userAdres = createAction('SET_USER_ADRESS')
const userHome = createAction('SET_USER_HOME')
const userEntrance = createAction('SET_USER_ENTRANCE')
const userTimeDelivery = createAction('SET_TIME_DELIVERY')
const userDateDelivery = createAction('SET_DATE_DELIVERY')
const userComments = createAction('SET_COMMENT_USER')
const userApartmentNum = createAction('SET_APARTAMENT_USER')
// const userLevel = createAction('SET_USER_LEVEL')
// const userDoorPass = createAction('SET_USER_DOOR_PASS')

export const setNameUser = (name) => (dispatch) => dispatch(userName(name))
export const setPhoneUser = (phone) => (dispatch) => dispatch(userPhone(phone))
export const setCityUser = (city) => (dispatch) => dispatch(userCity(city))
export const setAdresUser = (adres) => (dispatch) => dispatch(userAdres(adres))
export const setHomeUser = (home) => (dispatch) => dispatch(userHome(home))
export const setEnhanceUser = (enhance) => (dispatch) => dispatch(userEntrance(enhance))
export const setTimeDeliveryUser = (time) => (dispatch) => dispatch(userTimeDelivery(time))
export const setDateDeliveryUser = (date) => (dispatch) => dispatch(userDateDelivery(date))
export const userCommentsFunc = (comments) => (dispatch) => dispatch(userComments(comments))
export const userApartment = (apartment) => (dispatch) => dispatch(userApartmentNum(apartment))
// export const setLavelUser = (level) => (dispatch) => dispatch(userLevel(level))
// export const setDoorUser = (door) => (dispatch) => dispatch(userDoorPass(door))

const initialState = {
    nameUser: '',
    phoneUser: '',
    deliverySity: '',
    deliveryAdress: '',
    homeNumber: '',
    entranceNumber: '',
    timeDelivery: '',
    dateDelivery: '',
    comments: '',
    apartment: ''
    // levelNumber: '',
    // doorPassword: '',
};

export default createReducer({
    [userName]: (state, nameUser) => ({...state, nameUser}),
    [userPhone]: (state, phoneUser) => ({...state, phoneUser}),
    [userCity]: (state, deliverySity) => ({...state, deliverySity}),
    [userAdres]: (state, deliveryAdress) => ({...state, deliveryAdress}),
    [userHome]: (state, homeNumber) => ({...state, homeNumber}),
    [userEntrance]: (state, entranceNumber) => ({...state, entranceNumber}),
    [userTimeDelivery]: (state, timeDelivery) => ({...state, timeDelivery}),
    [userDateDelivery]: (state, dateDelivery) => ({...state, dateDelivery}),
    [userComments]: (state, comments) => ({...state, comments}),
    [userApartmentNum]: (state, apartment) => (({...state, apartment}))
    // [userLevel]: (state, levelNumber) => ({...state, levelNumber}),
    // [userDoorPass]: (state, doorPassword) => ({...state, doorPassword}),
    }, initialState)
