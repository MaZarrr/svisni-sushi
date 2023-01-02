import React from "react"
import Seo from "../components/seo"
import {Link}  from 'gatsby';
import HeadSection from "../components/HeadSection"
import WallNews from "../components/WallNews";
import { Typography } from "@mui/material";

const onas = ({ serverData }) => {
  const dataWall1 = serverData?.data?.data?.items.slice(0, 2) || [];
  const dataWall2 = serverData?.data?.data?.items.slice(2, 6) || [];

return (
    <>
    <Seo title="Узнай больше о компании"
    description="Мы готовим роллы, суши, пиццу для наших клиентов. Узнай подробнее о Свисни Суши на сайте"
    />
    <HeadSection titleTXT={"О нас"} />
		<div style={{padding: `5px 30px 10px 30px`, fontSize: 14}}>
            <p style={{ fontSize: 14 }}>
            Свисни Суши — первый ресторан японской кухни в Уразово. Присутствует служба доставки блюд японской, итальянской и европейской кухни по Валуйскому району.
            Мы предлагаем своим покупателям превосходные суши, роллы, готовим вкусные салаты и <Link to="/pizza"><b>пиццу</b></Link>, а также предоставляем напитки от 
            наших партнеров.
            <br></br><br></br>
            <>
                <Typography style={{fontSize: 18, textAlign: 'center'}} variant='body1'>Последние новости</Typography>
                { serverData.data.ok && <WallNews data={dataWall1} />}
            </>
            Наше отличие от других доставок - безупречный сервис и внимательный персонал, а главное, незабываемый вкус в
            каждом ролле. Наши повара контролируют качество всех продуктов, которые будут доставлены нашим клиентам. 
            Мы строго следим за свежестью ингредиентов и можем смело утверждать, что наши роллы не только вкусные но и 
            полезные. Японские блюда в нашем исполнении наделят ваш организм всеми необходимыми витаминами и
            микроэлементами.&nbsp;
            <br></br><br></br>
              Мы - те, кто удивит вас изысканной подачей блюд и незабываемым вкусом. <b>Забронировать столик по телефону +79040949222.</b>
            </p>
            <>
                <Typography style={{fontSize: 18, textAlign: 'center'}} variant='body1'>Последние новости</Typography>
                { serverData.data.ok && <WallNews data={dataWall2} />}
            </>
            Доставка блюд по Валуйскому району с 10:00 до 22:00. Без перерывов и выходных.
        </div>
</>
    )
}

export async function getServerData() {
    try {
      const res = await fetch(`https://svisniplatform.site/getWall`, {
      // const res = await fetch(`http://localhost:3333/getWall`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify( {
            count: 5
          })
      })
  
      if (!res.ok) {
        throw new Error(`Response failed`)
      }
  
      return {
        props: await res.json(),
      }
    } catch (error) {
      return {
        status: 500,
        headers: {},
        props: {}
      }
    }
  }

export default onas


