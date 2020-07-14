import React from "react"
import SEO from "../components/seo"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { StylingInfo } from '../components/common/style';
import {graphql, useStaticQuery} from "gatsby";
import GatsbyImage from "gatsby-image";
import {Container} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const Adresikontakty = () => {

    const data = useStaticQuery(graphql`
        query {
            placeholderImage: file(relativePath: { eq: "adres.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1400) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

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
        <Typography className="mt-2" variant="h5">Режим работы</Typography>
        <Typography variant={"subtitle2"}>С 10:00 до 22:00</Typography>
        <Typography className="mt-2" variant="h5">Телефон</Typography>
            <Typography variant={"subtitle2"}>
                <a itemProp="telephone" href="tel:+79040949222">+7(904)094-92-22</a>
            </Typography>
        <Typography className="mt-2" variant="h5">Адрес</Typography>
            <Typography variant={"subtitle2"}><span itemProp="streetAddress">Улица 3-го Интернационала, дом 48а,</span><span itemProp="addressLocality"> Уразово, Валуйский район</span></Typography>

            <div className="mt-4">
                <Typography variant="caption">ИП Беженова Татьяна Викторовна</Typography>
                <p variant="caption"> ОРГНИП 318312300012678</p>
            </div>
        </Grid>

        <Grid item xs={12} sm={6} style={{marginBottom: `50px`}}>
            <div className="map">
                <GatsbyImage fluid={data.placeholderImage.childImageSharp.fluid} alt="Адрес Свисни Суши"/>

                {/*<iframe*/}
                {/*    src="https://yandex.ru/map-widget/v1/?um=constructor%3A5890352ad60fb8387e1c5fd4bb4b006f6a978ed56444d0b0ec143b5caffa6608&amp;source=constructor"*/}
                {/*    frameBorder="0"*/}
                {/*    className="map"*/}
                {/*    title="frameMapping">*/}
                {/*</iframe>*/}

            </div>
        </Grid>
    </Grid>
    </Container>
    </StylingInfo>
    </>
    )
}

export default Adresikontakty