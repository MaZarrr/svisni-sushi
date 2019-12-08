import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled  from 'styled-components';
import MenuSite from './../components/common/MenuSite';


const PizzaSection = styled.section `
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

const pizza = () => {

return (
    <Layout>
    <SEO title="Пицца" />
    <MenuSite />
    <PizzaSection>
    <div className="container">
        <h1>Пицца</h1>
    </div>
    </PizzaSection>
    </Layout>
    )
}

export default pizza


