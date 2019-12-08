import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled  from 'styled-components';
import MenuSite from './../components/common/MenuSite';

const Kontakty = styled.section `
    .container {
        margin: 8vmax 0 0 3vw;
        padding: 0;
    }
 
    @media screen and (max-width: 768px) {
        .container {
        margin: 0 0 0 3vw;
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
    <Layout>
    <MenuSite />
    <Kontakty>
    <div className="container">
        <h1>Адрес и контакты</h1>
    </div>
    </Kontakty>
    </Layout>
    </>
    
    )
}

export default adresikontakty