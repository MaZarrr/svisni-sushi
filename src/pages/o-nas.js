import React, { useEffect, useState } from "react"
import Seo from "../components/seo"
import {Link}  from 'gatsby';
import HeadSection from "../components/HeadSection"
import WallNews from "../components/WallNews";
import { Typography } from "@mui/material";
import { sendRequest } from "../utils";

const Onas = () => {
  
  // const [dataWall1, setDataWall1] = useState([]);
  // const [dataWall2, setDataWall2] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await sendRequest();
  //     const dataWall1 = res?.data?.data?.items.slice(0, 2) || [];
  //     const dataWall2 = res?.data?.data?.items.slice(2, 7) || [];
  //     setDataWall1(dataWall1);
  //     setDataWall2(dataWall2);
  //   } 
  //   fetchData();
  //   return () => fetchData();
  // }, [])

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
            {/* <>
                <Typography style={{fontSize: 18, textAlign: 'center'}} variant='body1'>Последние новости</Typography>
                <WallNews data={dataWall1} />
            </> */}
            Наше отличие от других доставок - безупречный сервис и внимательный персонал, а главное, незабываемый вкус в
            каждом ролле. Наши повара контролируют качество всех продуктов, которые будут доставлены нашим клиентам. 
            Мы строго следим за свежестью ингредиентов и можем смело утверждать, что наши роллы не только вкусные но и 
            полезные. Японские блюда в нашем исполнении наделят ваш организм всеми необходимыми витаминами и
            микроэлементами.&nbsp;
            <br></br><br></br>
              Мы - те, кто удивит вас изысканной подачей блюд и незабываемым вкусом. <b>Забронировать столик по телефону +79040949222.</b>
            </p>
            {/* <>
                <Typography style={{fontSize: 18, textAlign: 'center'}} variant='body1'>Последние новости</Typography>
                <WallNews data={dataWall2} />
            </> */}
            Доставка блюд по Валуйскому району с 10:00 до 22:00. Без перерывов и выходных.
        </div>
</>
    )
}

export default Onas


