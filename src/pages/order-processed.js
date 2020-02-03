import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from 'gatsby';

export default (props) =>{ 
return (
    <Grid container xs direction="column" alignItems="center">
        <Typography variant="h1" style={{marginTop: `70px`}}>
        <Box fontFamily="Neucha" fontWeight={900} fontSize={46} >
            Ваш заказ оформлен!
        </Box>
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary" style={{marginTop: `50px`, marginBottom: `69px`}}>
            Перейти на главную
        </Button>
    </Grid>
    )
}