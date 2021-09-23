import { makeStyles, Grid, Paper } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme =>({
    paper: {
        border: `2rem solid ${theme.palette.secondary.main}`,
        width: '50rem',
        height: '40rem',
        borderRadius: 0
    },
    inner: {
        height: '40rem',
        width: '100%',
        border: `2rem solid ${theme.palette.primary.main}`
    }
}))

const AuthPortal= (props) => {

    const classes = useStyles()

    return (
        <Grid container justifyContent="center">
            <Grid item>
                <Paper elevation={6} classes={{root: classes.paper}}>
                    <Grid container direction="column" alignItems='center' classes={{root: classes.inner}}>
sdsdsd
                    </Grid>
                </Paper>

            </Grid>
        </Grid>
    )
}


export default AuthPortal;