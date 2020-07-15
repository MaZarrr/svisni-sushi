import React from "react"
import SEO from "../components/seo"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { StylingInfo } from '../components/common/style';
// import {graphql, useStaticQuery} from "gatsby";
// import GatsbyImage from "gatsby-image";

import {Container} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import PhoneIphoneOutlinedIcon from '@material-ui/icons/PhoneIphoneOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import IconButton from '@material-ui/core/IconButton';


const Adresikontakty = () => {
    // const data = useStaticQuery(graphql`
    //     query {
    //         placeholderImage: file(relativePath: { eq: "adres.jpg" }) {
    //             childImageSharp {
    //                 fluid(maxWidth: 1400) {
    //                     ...GatsbyImageSharpFluid
    //                 }
    //             }
    //         }
    //     }
    // `);
return (
    <>
    <SEO title="Адрес и контакты" 
    description="Ждем вас в гости по адресу улица 3-го Интернационала д.48а, Уразово. Телефон 8(904)094-92-22. Меню на сайте"/>

    <StylingInfo>
    <Container>
        <h1>Адрес и контакты</h1>
       <Divider/>
    <Grid container itemScope itemType="https://schema.org/Organization">
        <Grid item xs={12} sm={6}>
            <div className="d-flex align-items-center mt-2">
                <div>
                    <IconButton aria-label="add an alarm">
                        <AccessTimeOutlinedIcon color={"secondary"} fontSize={"large"}/>
                    </IconButton>
                </div>
                <div className="ml-1">
                    <Typography className="mt-2" variant="h5">Режим работы</Typography>
                    <Typography variant={"subtitle1"}>С 10:00 до 22:00</Typography>
                </div>
            </div>

            <div className="d-flex align-items-center mt-2">
                <div>
                    <IconButton aria-label="phone">
                        <PhoneIphoneOutlinedIcon color={"secondary"} fontSize={"large"}/>
                    </IconButton>
                </div>
                <div className="ml-1">
                    <Typography className="mt-2" variant="h5">Телефон</Typography>
                    <Typography variant={"subtitle1"}>
                        <a itemProp="telephone" href="tel:+79040949222">+7(904)094-92-22</a>
                    </Typography>
                </div>
            </div>

            <div className="d-flex align-items-center mt-2">
                <div>
                    <IconButton>
                        <LocationOnOutlinedIcon color={"secondary"} fontSize={"large"}/>
                    </IconButton>
                </div>
                <div className="ml-1">
                    <Typography className="mt-2" variant="h5">Адрес</Typography>
                    <Typography className="w-75" variant={"subtitle1"}><span itemProp="streetAddress">Улица 3-го Интернационала, дом 48а,</span><span itemProp="addressLocality"> Уразово, Валуйский район</span></Typography>
                </div>
            </div>



            <div className="mt-4 ml-4">
                <Typography variant="caption">ИП Беженова Татьяна Викторовна</Typography>
                <p variant="caption"> ОРГНИП 318312300012678</p>
            </div>
        </Grid>

        <Grid item xs={12} sm={6} style={{marginBottom: `50px`}}>
                <iframe title="locationSvisniSushi" className="map" src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=70396123059"
                        frameBorder="0"></iframe>
        </Grid>
    </Grid>
    </Container>
    </StylingInfo>
    </>
    )
};

export default Adresikontakty