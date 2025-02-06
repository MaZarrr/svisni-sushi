import React from "react"
import Seo from "../components/seo"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import IconButton from '@mui/material/IconButton';
import styled from '@emotion/styled'
// import { YMaps } from 'react-yandex-maps';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { YMaps } from '@pbe/react-yandex-maps';


import Map from '../components/MapContent'
import HeadSection from "../components/HeadSection"
import LayoutLontainer from "../containers/layout-container";

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 30px 0;
    @media (max-width: 768px) {
      display: block;
      margin: 20px 0;
    }
    .item-info {
        .item {
            @media (max-width: 600px) {
            display: none; 
        }
        }
    }
`

const FooterBlock = styled.div`
        margin-top: 10px;
        margin-bottom: 50px;
        text-align: center;
`

const Adresikontakty = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
      console.log("value", value);
    };

return <>
    <Seo title="Адрес и контакты" 
    description="Ждем вас в гости по адресу улица Красная Площадь 30А, Уразово. Телефон 8(904)094-92-22. График 10:00-22:00"/>

    <LayoutLontainer>
    <HeadSection titleTXT={"Адрес и контакты"} />
    <Grid container itemScope itemType="https://schema.org/Organization">
    <Grid item xs={12}>
        <Container  style={{
            display: "flex",
            flexDirection: 'column'
        }}>
        <Tabs centered variant='fullWidth' 
            value={value}
            
            onChange={handleChange}
            aria-label="icon position tabs example"
            >
            
            <Tab sx={{
                background: value === 0 ? "#AD66D5" : "lightgrey",
                "&.Mui-selected": { color: "white" }, 
                fontWeight: value === 0 ? "bold" : "normal", // Делаем активный таб жирным
                transition: "0.3s", // Плавное изменение стилей
            }}
            icon={<FmdGoodIcon />} label="г.Валуйки, ул.Толстого 16/2" />
            <Tab sx={{
                background: value === 1 ? "#AD66D5" : "lightgrey",
                "&.Mui-selected": { color: "white" }, 
                fontWeight: value === 1 ? "bold" : "normal",
                transition: "0.3s",
            }} 
                
                icon={<FmdGoodIcon />} iconPosition="start" label="п.Уразово, ул.Красная Площадь 30А" />
        </Tabs>
        <Box sx={(theme) => ({
             display: 'flex', 
             justifyContent: 'space-around',
             [theme.breakpoints.down('sm')] : {
                flexDirection: 'column'
             }
        })} >
        <div className="item-info">
        <div className="item">
            <IconButton aria-label="add an alarm" size="large">
                <AccessTimeOutlinedIcon color={"secondary"} fontSize={"large"}/>
            </IconButton>
        </div>
        <div>
            <Typography variant="body1">Режим работы:</Typography>
            { value === 0 ? <> 
                <Typography variant={"subtitle2"}>с 11:00 до 22:00</Typography>
            </> : <>
                <Typography variant={"subtitle2"}>с 10:00 до 22:00</Typography>
            </>
            }
        </div>
        </div>
            <div className="item-info">
            <div className="item">
                <IconButton aria-label="phone" size="large">
                    <PhoneIphoneOutlinedIcon color={"secondary"} fontSize={"large"}/>
                </IconButton>
            </div>
            <div>
                <Typography variant="body1">Телефон</Typography>
                { value === 0 ? <> 
                    <Typography variant={"subtitle2"}>
                    <a itemProp="telephone" href="tel:+79517601736">г.Валуйки <span style={{color: 'blue' }}>+7(951)760-17-36</span></a>
                </Typography>
                </> : <>
                <Typography variant={"subtitle2"}>
                    <a itemProp="telephone" href="tel:+79040949222">п.Уразово <span style={{color: 'blue' }}>+7 904 094-92-22</span></a>
                </Typography>
                </> }
            </div>
        </div>
            <div className="item-info">
            <div className="item">
                <IconButton size="large">
                    <LocationOnOutlinedIcon color={"secondary"} fontSize={"large"}/>
                </IconButton>
            </div>
            <div>
                <Typography variant="body1">Адрес:</Typography>
                { value === 0 ? <>
                    <Typography variant={"subtitle2"}><span itemProp="streetAddress">г.Валуйки, ул.Толстого 16/2</span><span itemProp="addressLocality"></span></Typography>
                
                </> : <>
                    <Typography variant={"subtitle2"}><span itemProp="streetAddress">п.Уразово, ул.Красная Площадь 30А</span><span itemProp="addressLocality"></span></Typography>
                </> }
            </div>
        </div>
        </Box>
        </Container>
        <YMaps>
            <Map value={value} />,
        </YMaps>
        <FooterBlock>
            <Typography variant="subtitle2">ИП Беженова Татьяна Викторовна</Typography>
            <Typography variant="subtitle2"> ОРГНИП 318312300012678</Typography>
        </FooterBlock>
    </Grid>

</Grid>
</LayoutLontainer>
</>
};

export default Adresikontakty