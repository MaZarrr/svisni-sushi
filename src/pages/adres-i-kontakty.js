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
        <Grid item xs={12} sm={6}>
            <div style={{paddingLeft: 30}}>
        <Typography variant="h5">Режим работы</Typography>
        <p>c 10.00 до 22.00</p>
        <Typography variant="h5">Телефон</Typography>
        <p itemProp ="telephone">+7(904)094-92-22</p>
        <Typography variant="h5">Адрес</Typography>
            <p><span itemProp="streetAddress">3Интернационала д.48а,</span><span itemProp="addressLocality">Уразово, Валуйский район</span></p>
            </div>
            </Grid>

        <Grid item xs={12} sm={6} style={{marginBottom: 50}}>
            <GatsbyImage style={{maxWidth: 500, borderRadius: 15}} fluid={data.placeholderImage.childImageSharp.fluid} alt="Адрес Свисни Суши"/>
            <div style={{padding: `30px 0 0 30px`}}>
            <Typography  variant="caption">ИП Беженова Татьяна Викторовна</Typography>
            <p variant="caption"> ОРГНИП 318312300012678</p>
                </div>
        </Grid>

    </Grid>
    </StylingInfo>
    </>
    )
}

export default Adresikontakty