import React from "react"
import SEO from "../components/seo"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { StylingInfo } from '../components/common/style';
import {graphql, useStaticQuery} from "gatsby";
import GatsbyImage from "gatsby-image";

const Adresikontakty = () => {

    const data = useStaticQuery(graphql`
        query {
            placeholderImage: file(relativePath: { eq: "adres.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 800) {
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
    <div className="container">
        <h1>Адрес и контакты</h1>
    </div>
        <hr></hr>
    <Grid container itemScope itemType="https://schema.org/Organization">
        <Grid item xs={12} sm={6} >
            <div style={{paddingLeft: 36}}>
        <Typography variant="h5">Режим работы</Typography>
        <p>С 10:00 до 22:00</p>
        <Typography variant="h5">Телефон</Typography>
            <a itemProp="telephone" href="tel:+79040949222">+7(904)094-92-22</a>
        <Typography variant="h5">Адрес</Typography>
            <p><span itemProp="streetAddress">Улица 3-го Интернационала, дом 48а,</span><span itemProp="addressLocality"> Уразово, Валуйский район</span></p>
            </div>
            </Grid>

        <Grid item xs={12} sm={6} style={{marginBottom: `50px`}}>
            <div style={{maxWidth: 400,  margin: `0 auto 0 auto`}}>
                <GatsbyImage style={{maxWidth: 450, maxHeight: 370, borderRadius: 18, border: `1.5px solid lightgrey`}}
                             fluid={data.placeholderImage.childImageSharp.fluid} alt="Адрес Свисни Суши"/>
                <div style={{padding: `30px 0 0 30px`}}>
                    <Typography  variant="caption">ИП Беженова Татьяна Викторовна</Typography>
                    <p variant="caption"> ОРГНИП 318312300012678</p>
                </div>
            </div>

        </Grid>

    </Grid>
    </StylingInfo>
    </>
    )
}

export default Adresikontakty