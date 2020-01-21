import React from "react"
import SEO from "../components/seo"
import styled  from 'styled-components';

const Kontakty = styled.section `
    .container {
        margin: 20px 0 0 20px;
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
    <section>
    <Kontakty>
    <div className="container">
        <h1>Адрес и контакты</h1>
    </div>
    </Kontakty>
    </section>
    </>
    
    )
}

export default adresikontakty