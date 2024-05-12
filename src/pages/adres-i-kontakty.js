import React from "react"
import Seo from "../components/seo"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import IconButton from '@mui/material/IconButton';
import styled from '@emotion/styled'
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

return <>
<Seo title="Адрес и контакты" 
description="Ждем вас в гости по адресу улица Красная Площадь 30А, Уразово. Телефон 8(904)094-92-22. График 10:00-22:00"/>

<HeadSection titleTXT={"Адрес и контакты"} />
<Grid container itemScope itemType="https://schema.org/Organization">
    <Grid item xs={12}>
        <Container>
            <div className="item-info">
            <div>
                <IconButton aria-label="add an alarm" size="large">
                    <AccessTimeOutlinedIcon color={"secondary"} fontSize={"large"}/>
                </IconButton>
            </div>
            <div>
                <Typography variant="subtitle1">Режим работы:</Typography>
                <Typography variant={"subtitle2"}>п.Уразово с 10:00 до 22:00</Typography>
                <Typography variant={"subtitle2"}>г.Валуйки с 11:00 до 22:00</Typography>
            </div>
        </div>
            <div className="item-info">
            <div>
                <IconButton aria-label="phone" size="large">
                    <PhoneIphoneOutlinedIcon color={"secondary"} fontSize={"large"}/>
                </IconButton>
            </div>
            <div>
                <Typography variant="subtitle1">Телефон</Typography>
                <Typography variant={"subtitle2"}>
                    <a itemProp="telephone" href="tel:+79040949222">п.Уразово <span style={{color: 'blue' }}>+7 904 094-92-22</span></a>
                </Typography>
                <Typography variant={"subtitle2"}>
                    <a itemProp="telephone" href="tel:+79524225422">г.Валуйки <span style={{color: 'blue' }}>+7 952 422-54-22</span></a>
                </Typography>
            </div>
        </div>
            <div className="item-info">
            <div>
                <IconButton size="large">
                    <LocationOnOutlinedIcon color={"secondary"} fontSize={"large"}/>
                </IconButton>
            </div>
            <div>
                <Typography variant="subtitle1">Адреса:</Typography>
                <Typography variant={"subtitle2"}><span itemProp="streetAddress">п.Уразово, ул.Красная Площадь 30А</span><span itemProp="addressLocality"></span></Typography>
                <Typography variant={"subtitle2"}><span itemProp="streetAddress">г.Валуйки, ул.Толстого 16/2</span><span itemProp="addressLocality"></span></Typography>
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
</>;
};

export default Adresikontakty