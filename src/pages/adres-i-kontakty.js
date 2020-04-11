import React from "react"
import SEO from "../components/seo"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { StylingInfo } from '../components/common/style';

const adresikontakty = () => {

return (
    <>
    <SEO title="Адрес и контакты" 
    description="Ждем вас в гости по адресу улица 3-го Интернационала д.48а, Уразово. Телефон 8(904)094-92-22. Меню на сайте"
    />
    <StylingInfo>

    <div className="container">
    <h1>Адрес и контакты</h1>
    </div>

    <hr></hr>
    <Grid container itemscope itemtype="https://schema.org/Organization">
        <Grid item xs={11} sm={5}  style={{margin: `auto 0 auto 25px`}}>
        <Typography variant="h5">Режим работы</Typography>
        <p>c 10.00 до 22.00</p>
        <Typography variant="h5">Телефон</Typography>
        <p itemprop ="telephone">+7(904)094-92-22</p>
        <Typography variant="h5">Адрес</Typography>
            <p><span itemprop="streetAddress">3Интернационала д.48а,</span><span itemprop="addressLocality">Уразово, Валуйский район</span></p>
        <Typography variant="caption">ИП Беженова Татьяна Викторовна</Typography>
        <p variant="caption"> ОРГНИП 318312300012678</p>
      </Grid> 
    </Grid>
    </StylingInfo>
    </>
    )
}

export default adresikontakty