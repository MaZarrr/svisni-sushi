import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled  from 'styled-components';

const Delivery = styled.section `
    font-family: 'Neucha', cursive;
    font-weight: 500;
    h1 {
        font-family: 'Neucha', cursive;
        font-style: normal;
        font-weight: 900;
    }
    .container {
        margin: 20px 0 0 20px;
        padding: 0;
        width: 90%;
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

const dostavkaioplata = () => {

return (
    <>
    <SEO title="Доставка и оплата" />
    <Layout>
    <Delivery>
    <div className="container">
    <article>
        <header>
            <h1>Доставка и оплата</h1>
        </header>
        <div>
            <p className="text">
            <b>Доставка осуществляется курьерами, которые доставят Ваш заказ в удобное для Вас место и время. </b> <br/>
            <b>Условия заказа и доставки: </b> 
            <br></br>
                • Заказ осуществляется у наших операторов по номерам телефонов или у нас на сайте
            <br></br>
            <b>п.Уразово</b>
            <br></br>
                366-233, +7(904)094-92-22 
            <br></br><br></br>
                • Минимальная сумма заказа для бесплатной доставки составляет 500 ₽. точную стоимость доставки уточняйте
                у оператора.
            <br></br> <br></br>
                • Время доставки 60–80мин. Скорость доставки напрямую зависит от ситуаций на дорогах, погодных 
                условий и времени суток. Надеемся на понимание с Вашей стороны. <br></br><br></br>
                • Приём заказов и доставка осуществляется с 10:00 до 22.00, в субботу с 11:00 до 23.00
                <br></br> <br></br>
                • Оплата курьеру - наличный расчёт или безналичный расчёт с оплатой у нас на сайте. 
            </p>
        </div>
		

    </article>
    </div>
    </Delivery>
    </Layout>
    </>
    
    )
}

export default dostavkaioplata

      

