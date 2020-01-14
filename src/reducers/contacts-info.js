const contactUser = (state, action) => {
  
    if(state === undefined) {
        return {
            nameUser: '',
            phoneUser: '',
            deliverySity: '',
            deliveryAdress: '',
            homeNumber: '',
            entranceNumber: '',
            levelNumber: '',
            doorPassword: ''
          };
    }

    switch (action.type) {

        case 'SET_USER_NAME':
            return {
                nameUser: action.payload,
                phoneUser: state.contacts.phoneUser,
                deliverySity: state.contacts.deliverySity,
                deliveryAdress: state.contacts.deliveryAdress,
                homeNumber: state.contacts.homeNumber,
                entranceNumber: state.contacts.entranceNumber,
                levelNumber: state.contacts.levelNumber,
                doorPassword: state.contacts.doorPassword
            };

            case 'SET_USER_PHONE':
            return {
                nameUser: state.contacts.nameUser,
                phoneUser: action.payload,
                deliverySity: state.contacts.deliverySity,
                deliveryAdress: state.contacts.deliveryAdress,
                homeNumber: state.contacts.homeNumber,
                entranceNumber: state.contacts.entranceNumber,
                levelNumber: state.contacts.levelNumber,
                doorPassword: state.contacts.doorPassword
            };
            case 'SET_USER_CITY':
                return {
                    nameUser: state.contacts.nameUser,
                    phoneUser: state.contacts.phoneUser,
                    deliverySity: action.payload,
                    deliveryAdress: state.contacts.deliveryAdress,
                    homeNumber: state.contacts.homeNumber,
                    entranceNumber: state.contacts.entranceNumber,
                    levelNumber: state.contacts.levelNumber,
                    doorPassword: state.contacts.doorPassword
                };
            case 'SET_USER_ADRESS':
                return {
                    nameUser: state.contacts.nameUser,
                    phoneUser: state.contacts.phoneUser,
                    deliverySity: state.contacts.deliverySity,
                    deliveryAdress: action.payload,
                    homeNumber: state.contacts.homeNumber,
                    entranceNumber: state.contacts.entranceNumber,
                    levelNumber: state.contacts.levelNumber,
                    doorPassword: state.contacts.doorPassword
                    };
            case 'SET_USER_HOME':
                return {
                    nameUser: state.contacts.nameUser,
                    phoneUser: state.contacts.phoneUser,
                    deliverySity: state.contacts.deliverySity,
                    deliveryAdress: state.contacts.deliveryAdress,
                    homeNumber: action.payload,
                    entranceNumber: state.contacts.entranceNumber,
                    levelNumber: state.contacts.levelNumber,
                    doorPassword: state.contacts.doorPassword
                };
            case 'SET_USER_ENTRANCE':
                return {
                    nameUser: state.contacts.nameUser,
                    phoneUser: state.contacts.phoneUser,
                    deliverySity: state.contacts.deliverySity,
                    deliveryAdress: state.contacts.deliveryAdress,
                    homeNumber: state.contacts.homeNumber,
                    entranceNumber: action.payload,
                    levelNumber: state.contacts.levelNumber,
                    doorPassword: state.contacts.doorPassword
                };
            case 'SET_USER_LEVEL':
                return {
                    nameUser: state.contacts.nameUser,
                    phoneUser: state.contacts.phoneUser,
                    deliverySity: state.contacts.deliverySity,
                    deliveryAdress: state.contacts.deliveryAdress,
                    homeNumber: state.contacts.homeNumber,
                    entranceNumber:  state.contacts.entranceNumber,
                    levelNumber: action.payload,
                    doorPassword: state.contacts.doorPassword
                };
            case 'SET_USER_DOOR_PASS':
                return {
                    nameUser: state.contacts.nameUser,
                    phoneUser: state.contacts.phoneUser,
                    deliverySity: state.contacts.deliverySity,
                    deliveryAdress: state.contacts.deliveryAdress,
                    homeNumber: state.contacts.homeNumber,
                    entranceNumber: state.contacts.entranceNumber,
                    levelNumber: state.contacts.levelNumber,
                    doorPassword: action.payload
                };

        default:
            return state.contacts
        }        
}

export default contactUser