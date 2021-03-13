import React from "react"
import SEO from "../components/seo"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import PhoneIphoneOutlinedIcon from '@material-ui/icons/PhoneIphoneOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import IconButton from '@material-ui/core/IconButton';
import styled from "styled-components"
import { YMaps } from 'react-yandex-maps';


import Map from '../components/MapContent'
import HeadSection from "../components/HeadSection"

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 30px 0;
    @media (max-width: 768px) {
      display: block;
      margin: 20px 0;
    }
    .item-info {
        display: flex;
        align-items: center;
        margin-top: 10px;
    }
`

const FooterBlock = styled.div`
        margin-top: 50px;
        margin-bottom: 50px;
        text-align: center;
`

const Adresikontakty = () => {

return (
    <>
    <SEO title="Адрес и контакты" 
    description="Ждем вас в гости по адресу улица 3-го Интернационала д.48а, Уразово. Телефон 8(904)094-92-22. Меню на сайте"/>

    <HeadSection titleTXT={"Адрес и контакты"} />
    <Grid container itemScope itemType="https://schema.org/Organization">
        <Grid item xs={12}>
            <Container>
                <div className="item-info">
                <div>
                    <IconButton aria-label="add an alarm">
                        <AccessTimeOutlinedIcon color={"secondary"} fontSize={"large"}/>
                    </IconButton>
                </div>
                <div>
                    <Typography variant="h5">Режим работы</Typography>
                    <Typography variant={"subtitle1"}>С 10:00 до 22:00</Typography>
                </div>
            </div>
                <div className="item-info">
                <div>
                    <IconButton aria-label="phone">
                        <PhoneIphoneOutlinedIcon color={"secondary"} fontSize={"large"}/>
                    </IconButton>
                </div>
                <div>
                    <Typography variant="h5">Телефон</Typography>
                    <Typography variant={"subtitle1"}>
                        <a itemProp="telephone" href="tel:+79040949222">+7(904)094-92-22</a>
                    </Typography>
                </div>
            </div>
                <div className="item-info">
                <div>
                    <IconButton>
                        <LocationOnOutlinedIcon color={"secondary"} fontSize={"large"}/>
                    </IconButton>
                </div>
                <div>
                    <Typography className="mt-2" variant="h5">Адрес</Typography>
                    <Typography className="w-75" variant={"subtitle1"}><span itemProp="streetAddress">ул.3-го Интернационала, дом 48а,</span><span itemProp="addressLocality"> Уразово, Валуйский район</span></Typography>
                </div>
            </div>
            </Container>
            <YMaps>
                <Map />
            </YMaps>
            <FooterBlock>
                <Typography variant="body1">ИП Беженова Татьяна Викторовна</Typography>
                <Typography variant="body1"> ОРГНИП 318312300012678</Typography>
            </FooterBlock>
        </Grid>

    </Grid>
    </>
    )
};

export default Adresikontakty