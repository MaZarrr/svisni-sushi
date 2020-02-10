import React from "react"
import SEO from "../components/seo"
import styled  from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Kontakty = styled.section `
     .container {
         margin: 20px 0 0 30px;
         padding: 0;
         width: 90%;
     }
     h1 {
        font-family: 'Neucha', cursive;
        font-style: normal;
        font-weight: 900;
    }
 
    @media screen and (max-width: 768px) {
       .container {
        margin: 20px 0 0 30px;
        padding: 0;
       
    }
      .container h1 {
        font-size: 7vw;
    }
    }
` 

const adresikontakty = () => {

return (
    <>
    <SEO title="Адрес и контакты" />
    <section>
    <Kontakty>
    <div className="container">
        <h1>Адрес и контакты</h1>
    </div>
    <Grid container xs={12} justify="space-around">
    <Grid item xs={11} sm={6} style={{border: `1px solid lightgrey`, padding: `10px`}}>
    <iframe 
        title="frameMap"
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae5afe408e842285d3190098da0f22e3fe919c5fe14946fbe0b85c30d3fd71989&amp;source=constructor" 
        width="100%" 
        height="400" 
        frameborder="0"/>
    </Grid>
    
    <Grid item xs={11} sm={5}  style={{margin: `auto 0 auto 25px`}}>
        <Typography variant="h5">Режим работы</Typography>
        <p>c 10.00 до 22.00</p>
        <Typography variant="h5">Телефон</Typography>
        <p>+7(904)094-92-22</p>
        <Typography variant="h5">Адрес</Typography>
        <p>3Интернационала д.48а, Уразово</p>
        <Typography variant="caption">ИП Беженова Татьяна Викторовна</Typography>
        <p variant="caption"> ОРГНИП 318527500073350</p>
      </Grid>    
    </Grid>
    </Kontakty>
    </section>
    </>
    )
}

export default adresikontakty