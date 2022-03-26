import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, gql, useReactiveVar } from "@apollo/client";
import useForm from "../utils/useForm";
import useLocalStorage from "../utils/useLocalStorage"
import { authTokenVar, isLoggedInVar } from "../apollo/client";
import { TOKENSTORAGE } from "./common/constants";
import { setUser } from '../reducers/app';
import { connect } from 'react-redux';
import useCheckTime from '../utils/useCheckTime';
import { Typography } from '@mui/material';
import { useMeLazy } from '../utils/useMeLazy';
import { navigate } from 'gatsby';
// import { TextMaskPhone } from '../utils';


const LOGIN_MUTATION = gql`
    mutation Login($loginInput: LoginInput!) {
        login(input: $loginInput) {
            ok
            token
            error
        }
    }
`;
const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
        createAccount(input: $createAccountInput) {
            ok
            error
        }
    }
`;
const BootstrapDialogTitle = (props) => {
const { children, onClose, ...other } = props;

return (
<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
    {children}
    {onClose ? (
    <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
        }}
    >
        <CloseIcon />
    </IconButton>
    ) : null}
</DialogTitle>
);
};

function DialogAuth({ isOpen, setOpenDialog, setUser, user, isAuth, navigateTo }) {
    // const [checkToken, setCheckToken] = useState(true);
    const isLoggedIn = useReactiveVar(isLoggedInVar)
    const [helpError, setHelpError] = useState("");
    const [checkForm, setCheckForm]= useState(false)
    const [value, handleChange, clearValueForm] = useForm();
    const [tokenStorage, setToken] = useLocalStorage(TOKENSTORAGE)
    const [getUser, { data: userData }] = useMeLazy()
    const [{ seconds, isTime }, startTimer]= useCheckTime(50, isLoggedIn)

    let myRef = {}

    console.log("user DIALOGS", user);
    console.log("data DIALOGS", data);
    
    const onCompletedLogin = (data) => {
        const { login: { ok, token, error } } = data;
        console.log("data onCompletedLogin", ok, token, error)
        if(ok && token){
            console.log("if(ok && token) true");
            setToken(token)
            authTokenVar(token)
            isLoggedInVar(true)
            getUser()
            handleClose()
            navigate(navigateTo)
        }
        console.log("userData onCompletedLogin2", userData)
        if(error) {
            setHelpError(error)
        }
    }
    const onCompletedCreateAccount = (data) => {
        const {createAccount: { ok, error }} = data
        if(ok) {
            setUser({phone: value?.phone})
            startTimer()
            console.log("data onCompleted", data);
            console.log("error onCompleted", error);
            // navigate gatsby || render new form
        }
    }
    const [loginMutation, { data: loginData}] = useMutation(
        LOGIN_MUTATION, {
        onCompleted: onCompletedLogin
    })
    console.log("loginData //", loginData);
    console.log("userData //", userData);
    const [createAccountMutation, { data, loading, error }]= useMutation(
        CREATE_ACCOUNT_MUTATION, {
        onCompleted: onCompletedCreateAccount
    })

    const sendKey = (e) => {
        // e.preventDefault();
        console.log("error---", error);
        console.log("data---", data);
        console.log("loading---", loading);
        // if(!loading){
            console.log("value onSubmit", value)
            const { phone } = value
            createAccountMutation({
              variables: {
              createAccountInput: {                    
                  phone: phone ? phone : user.phone,
                  role: "Client"
                  }
                }
            })
        // }
        // clearValueForm()
    }
    const onSubmitLogin = () => {
        // e.preventDefault();
        // if(!loading){
            console.log("value onSubmit", value)
            console.log("user onSubmit", user)
            const { code, phone } = value
            loginMutation({
                variables: {
                    loginInput: {
                        phone: phone ? phone : user.phone,
                        code: code ? code : user.code
                    }
                }
            });
        // }
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        // if(value?.code?.length )
        console.log("value.code.length", value?.code?.length);
        console.log("data?.createAccount?.ok", data?.createAccount?.ok);
        console.log("data?", data);
        if(data?.createAccount?.ok) {
            setCheckForm(true)
        }
        if(value?.code?.length === 5) {
            onSubmitLogin()
        }
        if(userData) {
            setUser(userData?.me)
        }
    }, [value.code, data?.createAccount?.ok, userData])
  return (
    <div>
    <Dialog open={isOpen}>

        <BootstrapDialogTitle 
            id="customized-dialog-title" 
            onClose={handleClose} />
   
        <DialogContent>
          <DialogContentText>
              {
                  !checkForm ?
                  "Введите номер, чтобы продолжить"
                  :
                  "Введите код из смс"
                }
            
          </DialogContentText>
          { !checkForm ? (
            <>
            <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Номер телефона"
                type="phone"
                fullWidth
                inputRef={myRef}
                value={value.phone || ""}
                onChange={handleChange}
                // InputProps={{inputComponent: TextMaskPhone}}
                // placeholder="Введите телефон"
                variant="standard"
                required={true}
                inputProps={{maxLength: 18, minLength: 10}}
                name="phone"
                helperText={data?.createAccount?.error} />
                {!isTime &&
                    <Typography variant='caption'>
                        Запросить код повторно через 00:{seconds}</Typography>
                    }
            </>
            ) : (
            <>
            <Typography 
                onClick={()=> setCheckForm(false)} 
                style={{color: '#ff6b1a', textDecoration: "underline"}} 
                variant='caption'>
                Изменить телефон: {user?.phone}
            </Typography>
              <TextField
                autoFocus
                margin="dense"
                id="code"
                label="Введите код"
                type="number"
                fullWidth
                value={value.code || ""}
                onChange={handleChange}
                variant="standard"
                inputRef={myRef}
                // required={true}
                // inputProps={{maxLength: 12, minLength: 5}}
                name="code"
                helperText={helpError} />
              {!isTime &&

              <Typography variant='caption'>
                  Запросить код повторно через 00:{seconds}</Typography>
              }
              </>
              )
            }
        </DialogContent>
        <DialogActions style={{display: 'flex', justifyContent: 'center'}}>

        <Button type="submit" 
        variant="contained" 
        disabled={isTime ? false : true }
        color='secondary' 
        onClick={() => {
            const validity = myRef.current.reportValidity()
            if(validity) {
                sendKey()
            }}}>
            Получить код</Button>
          
        </DialogActions>
        <DialogTitle>Нажимая на кнопку, вы даете согласие на обработку персональных данных</DialogTitle>
      </Dialog>
      </div>
  );
}

const mapDispatchToProps = {
    setUser
};

const mapStateToProps = (state) => ({
    user: state.app.user,
    isAuth: state.app.isAuth
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogAuth)