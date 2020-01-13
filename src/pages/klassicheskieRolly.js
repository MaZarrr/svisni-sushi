import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled  from 'styled-components';

const KlassicheskieRollySection = styled.section `
    .container {
        margin: 8vmax 0 0 2.5vw;
        padding: 0;
    }
    .container h1 {
        font-size: 5vw;
    }

    @media screen and (max-width: 768px) {
        .container {
        margin: 0 0 0 3vw;
        padding: 0;
    }

}
` 

const klassicheskieRolly = () => {

    return (
        <Layout>
        <SEO title="Классические роллы" />
        <KlassicheskieRollySection>
        <div className="container">
            <h1>Классические роллы</h1>
        </div>
        </KlassicheskieRollySection>
        </Layout>
        )
    }
    
    export default klassicheskieRolly
