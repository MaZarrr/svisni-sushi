import { Grid, Typography } from "@mui/material";
import React from "react"
import AccountTabs from "../components/AccountTabs";
import AuthPortal from "../components/auth/Auth-Portal";


const Account = () => {
    // заказы
    // промокоды
    // адреса
    // настройки
    return (
        <div>
        {/*<AuthPortal/>*/}
        <Grid container direction={"column"}>
            <Typography variant={"subtitle1"}>
                Привет, Виталий
            </Typography>
            <Typography variant={"subtitle2"} sx={{paddingTop: '10px'}}>
                +7(941)123-33-44
            </Typography>
        </Grid>
        <AccountTabs />
        </div>
    )

}

export default Account;