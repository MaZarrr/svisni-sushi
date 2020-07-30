import React from 'react'
import GatsbyImage from "gatsby-image";
import '../sass/features-section.css'

export default ({ featureBackground }) => (

    <div className="features-section">
        {/*<GatsbyImage fixed={featureBackground}>*/}
        <div className="columns-wrapper">
            <div className="column">
            {/*icon goes here*/}
            <p>Доставка</p>

            <p>Бесплатная доставка от 500р. Сумма бесплатной доставки может быть изменена в зависимости от удалённости адрема</p>
            </div>

            <div className="column">
                <i className="fas fa-car"></i>
                <p>Доставка</p>

                <p>Бесплатная доставка суши, роллов и пиццы от 500р. Осуществляем доставку в Валуйки и по Валуйскому району.
                    Сумма бесплатной доставки может быть изменена в зависимости от удалённости адрема</p>
            </div>

            <div className="column">
                <i className="fas fa-map-marker-alt"></i>
                <p>Всегда рядом</p>

                <p>Готовим для любой компании, выгодно и вкусно. Находимся в поселке Уразово по адресу улица 3-го Интернационала,
                    дом 48а. Время приёма заказов на доставку и с собой с 10:00 до 22:00</p>
            </div>

            <div className="column">
                <i className="fas fa-spray-can"></i>
                <p>Гарантируем чистоту</p>

                <p>Каждые 60 минут производится влажная уборка столов, пола и подсобных помещений. Самовывоз – заказ оформляется по телефону или на сайте,
                    Вы приезжаете в магазин ко времени готовности и просто забираете заказ, без ожидания в зале</p>
            </div>
        </div>
        {/*</GatsbyImage>*/}
    </div>
)