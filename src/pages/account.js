import { Grid, Typography } from "@material-ui/core";
import React from "react"
import AccountTabs from "../components/AccountTabs";
// import AuthPortal from "../components/auth/Auth-Portal";
// import Layout from "../components/layout"


const Account = () => {
    // заказы
    // промокоды
    // адреса
    // настройки
    return (
        // <AuthPortal/>
        <Grid container style={{marginTop: 70}}>
            <Typography> 
                Привет, Виталий
            </Typography>
            <Typography> 
                +7(941)123-33-44
            </Typography>
            <AccountTabs />
        </Grid>
    )

}

export default Account;