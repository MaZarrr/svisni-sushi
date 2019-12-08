import React from "react"
import Layout from "./layout"
import SEO from "./seo"
import MenuSite from '../components/common/MenuSite';
import styled  from 'styled-components';
import Img from 'gatsby-image';

const SetySection = styled.section `
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

const SetyItem = ({name, description, createdAt, image}) => {

return (
    <Layout>
    <SEO title="Сеты" />
    <MenuSite />
    <SetySection>
    <div className="container"> 
        <h1>Сеты</h1>
    </div>
    
    <div>
        <h2>{name} - <span style={{color: '#ccc'}}></span>added on {createdAt}</h2>
        <p>{description}</p>
        <Img style={{maxWidth: 400}} fluid={image}></Img>
    </div>
    

    </SetySection>
    </Layout>
    )
}

export default SetyItem