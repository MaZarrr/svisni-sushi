import React from "react"
import SEO from "../components/seo"
import {Link}  from 'gatsby';
import { StylingInfo } from '../components/common/style';


const onas = () => {

return (
    <>
    <SEO title="Узнай больше о компании"
    description="Мы готовим роллы, суши, пиццу для наших клиентов. Узнай подробнее о Свисни Суши на сайте"
    />
    <StylingInfo>
    <div className="container">
            <h1>О нас</h1>
		<div className="text">
          <hr></hr>
            <p>
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
    </div>
</StylingInfo>
</>
    )
}

export default onas


