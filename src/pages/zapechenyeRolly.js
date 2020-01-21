
import React from "react"
import SEO from "../components/seo"
import styled  from 'styled-components';

const ZapechenyeRollySection = styled.section `
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

const zapechenyeRolly = () => {

return (
    <section>
    <SEO title="Запеченые роллы" />
    <ZapechenyeRollySection>
    <div className="container">
        <h1>Запеченые роллы</h1>
    </div>
    </ZapechenyeRollySection>
    </section>
    )
}

export default zapechenyeRolly