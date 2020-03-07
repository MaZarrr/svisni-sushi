import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from 'gatsby';

// export default ({location}) => {
export default () => {

return (
    <Grid container direction="column" style={{paddingLeft: 30, maxWidth: `90%`}}>
        <Typography variant="h1" style={{marginTop: `70px`}}>
         <Box fontFamily="Oswald" fontWeight={500} fontSize={36} style={{textAlign: `start`, marginBottom: 20}}>
           Ваш заказ успешно оформлен!
        </Box>
          <Box fontFamily="Comfortaa" fontWeight={400} fontSize={20} style={{textAlign: `start`, marginBottom: 20}}>
            Информация о вашем заказе передана на кухню.
        </Box>
       
        <Box fontFamily="Comfortaa" fontWeight={400} fontSize={20} style={{textAlign: `start`}}>
           Вам могут перезвонить по номеру телефона для подтверждения и уточнения заказа.<br></br>
        <br></br>
            Спасибо что выбираете Свисни Sushi!
        </Box>
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary" style={{marginTop: `40px`, marginBottom: `69px`, maxWidth: 300}}>
            Перейти на главную
        </Button>
    </Grid>
    )
}
      