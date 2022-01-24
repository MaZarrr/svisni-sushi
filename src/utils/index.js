import MaskedInput from 'react-text-mask';
import React, {useState} from "react"

export function hasEntries(object) {
    if (!object) return false;
  
    return Object.entries(object).length > 0;
  }

  export const validateUserName = ({nameUser}) => {
    const nameValidate = /^[а-яё]{3,16}$/gi;
    const name = nameUser.trim().replace(/\s/g, "");
    return nameValidate.test(String(name).toLowerCase())
  };

  export const validateTextAria = ({comments}) => {
    const commentTextArea = comments.trim().replace(/\s/g, "")
    if(comments === '') {
      return true
    } else if(comments !== '') {
      return ((((((((((((((((((((((((((((((((((((((((/^[а-я_А-Я_0-9\-?()!,.ё:]{3,230}$/)))))))))))))))))))))))))))))))))))))))).test(commentTextArea.toLowerCase());
    }
  };

  export const validatePhone = ({phoneUser}) => {
    const phoneValidate =  /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/
    const phone = phoneUser.trim().replace(/\s/g, "")
    return phoneValidate.test(phone.toLowerCase())
  };

  export const validateDelivery = ({delivery, deliverySity}) => {
    if(delivery === "Доставка курьером" && deliverySity !== "Не выбрано" && deliverySity !== "") {
      return true
    } else if (delivery === "Самовывоз") {
      return true
    }

    return false
  };

  export function TextMaskPhone(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        mask={['+', /[7, 8]/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        guide={false}
      />
    );
  }