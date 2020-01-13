import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled  from 'styled-components';
import {Link}  from 'gatsby';


const Onas = styled.section `
    .container {
        margin: 20px 0 0 20px;
        padding: 0;
        width: 90%;
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
    @media screen and (max-width: 768px) {
        .container {
        margin: 5vh 0 0 3vw;
        padding: 0;
       
    }
      .container h1 {
        font-size: 7vw;
    }
}
` 

const onas = () => {

return (
    <>
    <SEO title="О нас" />
    <Layout>
    <Onas>
    <div className="container">
    <article>
        <header>
            <h1>О нас</h1>
        </header>
		<div className="text">
            <img src="" alt="Свисни Суши Бар" />
            <p>
            <br></br>
            Svisni Sushi - это профессиональная служба доставки блюд японской кухни в п.Уразово 
            Мы предлагаем своим покупателям превосходные суши, готовим вкусные салаты и <Link to="/pizza"><b>пиццу</b></Link>, а также предоставляем напитки от 
            аших партнеров.
            <br></br><br></br>
            Наше отличие от других доставок - безупречный сервис и внимательный персонал, а главное, незабываемый вкус в
            каждом ролле. Наши повара контролируют качество всех продуктов, которые будут доставлены нашим клиентам. 
            Мы строго следим за свежестью ингредиентов и можем смело утверждать, что наши роллы не только вкусные но и 
            полезные. Японские блюда в нашем исполнении  наделят ваш организм всеми необходимыми витаминами и
            микроэлементами.&nbsp;
            <br></br><br></br>
            Наше меню представляет собой идеальное соотношение цены и качества. Мы готовим наши суши согласно 
            традиционным рецептам Японской кухни, которые были тщательно выверены и прошли проверку временем и выбором 
            наших клиентов. Мы - те, кто удивит вас изысканной подачей блюд и незабываемым вкусом.
            </p>
        </div>
    </article>
    </div>
</Onas>
</Layout>
    </>
    
    )
}

export default onas


