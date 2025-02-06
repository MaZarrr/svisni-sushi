import React, {useEffect, useState, useRef } from "react"
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import { graphql } from "gatsby";
import { Button, Container, Hidden, Typography, Box } from "@mui/material";
// import Carousel from '../components/common/CarouselSvisni';
// import Kombo from '../components/indexContent/combo/index'
import MenuCategory from "../components/indexContent/MenuCategory";
import RecommendedProducts from "../components/indexContent/recommended-products";

import Seo from "../components/seo";
import { connect } from "react-redux";
import { loadIndexItems } from "../reducers/app";
import ReactInstaStories from "react-insta-stories";
import '../components/container-stories.css'
import StoryWithIndicator from "../components/common/IndicatorStore";
// import ClipLoader from "react-spinners/ClipLoader";

    const IndexPage = ({data: {
          allContentfulIndexRecomended, 
          allContentfulIndexKombo,
        },
        loadItems, adressDelivery = "",
        indexProduct: { optionPage = {}, combo = [], recomendedProduct = [] },
      }) => {
        const [stories, setStories] = useState([])
        const [duration, setDuration] = useState({ isStart: false, id: null, duration: null })
        const [stores, setStores] = useState({ open: false, id: null })
        const classes = useStyleIndexPage();
        const interval = useRef(null); // Ссылка для хранения интервала
          console.log("adressDelivery2", adressDelivery);

        useEffect(async () => {

          // async function getStories() {
          //   const res = await fetch('http://192.168.1.3:2023/getStaticStories', { cache: "no-cache" });
          //   const stories = await res.json();
          //   const stories_items = stories.data.data?.items[0];
          //   console.log('stories_stories_items', stories_items);
          //   let stores = [];
          //   stories_items.forEach((storie) => {
          //     const isPhoto = storie.type === 'photo' ? true : false;
          //     if(isPhoto) {
          //       // stores.push(storie.photo.sizes[1].url);
          //       stores.push(
          //         {
          //           id: storie.id,
          //           url: storie.photo.sizes[5].url,
          //           duration: 3000, // ignored
          //           type: 'photo',
          //           ...(storie?.link && { link: storie.link.url }), // Добавляем ключ, только если storie.link существует
          //           preview: storie.photo.sizes[4].url
          //         },
          //       )
          //     }
          //       //  else {
          //       //   stores.push(storie.video.image[3].url);
          //       //   stores.push(
          //       //     {
          //       //       url: storie.video.files.mp4_480,
          //       //       duration: 3000, // ignored
          //       //       type: 'video',
          //       //     },
          //       //   )                
          //       // }

          //     }) 
          //   setStories(stores)
          //   console.log('transform', stories);
          // }
          // getStories();
          loadItems({ combo: allContentfulIndexKombo, recomendedProduct: allContentfulIndexRecomended });
        }, [])

        useEffect(() => {
          const body = document.querySelector('body');
          if(stores.open) {
            body.style.overflowY = "hidden";
          } else {
            body.style.overflowY = "auto";
          }
        }, [stores.open])

        function setDataStores({ open, id }) {
          clearInterval(interval.current); // Очистить предыдущий интервал, если есть

          if (!open) {
            setStores({ open: false, id: null }); // Закрыть и сбросить состояние
            return;
          }

          setStores({ open, id }); // Установить новое состояние
          let idx = stories.findIndex((store) => store.id === id); // Найти начальный индекс

          interval.current = setInterval(() => {
            idx += 1; // Увеличиваем индекс
            if (idx >= stories.length) { // Проверяем, не вышли ли за пределы массива
              clearInterval(interval.current); // Останавливаем интервал
              setStores({ open: false, id: null }); // Закрываем и сбрасываем состояние
              return;
            }
            setStores({ open: true, id: stories[idx].id }); // Обновляем текущую историю
          }, 3500);
        }

        return (
          <section>
            <Seo title="Заказать суши, роллы c доставкой в Валуйки"
                 description="Доставка роллов, пиццы, wok, салатов, закусок в Валуйках. Наше меню порадует широким выбором блюд японской кухни. Заказ еды c 10 до 22:00"
                 pathname='/'
            />
                  <Hidden smDown>
                  <Typography textAlign={'center'} className={classes.title}
                              variant={"inherit"}
                              component={"h1"}>
                    Свисни Суши</Typography>
                    <Typography textAlign={'center'} width={'100%'} variant='subtitle2'>
                    Доставка суши, роллов, пиццы по <span style={{color: '#ff6b1a', textDecoration: "underline"}}>Валуйскому району</span> с {adressDelivery === "Валуйки" ? "11:00 до 22:00"  : "10:00 до 22:00"}.</Typography>
                    <Typography textAlign={'center'} width={'100%'} variant='subtitle2'><div style={{color: '#ff6b1a', width: '100%', textDecoration: "underline"}}> {adressDelivery === "Валуйки" ? " Вы выбрали пункт заказа: Валуйки, ул.Толстого 16/2."  : " Ваш пункт заказа: Уразово, ул.Красная Площадь 30А."}</div></Typography> 
                </Hidden>
            <Hidden smUp>
            <Typography style={{ textAlign: 'center', textTransform: 'uppercase'}} variant={"inherit"} component={"h1"} >
                    Свисни Суши</Typography>
              <Typography 
                  variant={"body2"}
                  style={{textAlign: 'center', padding: '0 6px 0 6px'}}>Доставка суши, роллов, пиццы <br></br> по Валуйскому району с {adressDelivery === "Валуйки" ? "11:00 до 22:00"  : "10:00 до 22:00"}. <br></br>
                  {/* <span style={{color: '#ff6b1a', textDecoration: "underline"}}> Валуйскому району</span> с 10:00 до 22:00.</Typography> */}
                  <span style={{color: '#ff6b1a', textDecoration: "underline"}}> {adressDelivery === "Валуйки" ? " Ваш пункт заказа: Валуйки, ул.Толстого 16/2."  : " Ваш пункт заказа: Уразово, ул.Красная Площадь 30А."}</span></Typography>
              </Hidden>
              {/* <Carousel dataCarousel={allContentfulCarouselSiteImage}/> */}
          
              {/* <Box sx={{
                background: '#fefefe',
                borderRadius: '10px 0 0 10px',
                marginLeft: '20px',
                border: '1px solid lightgrey',
                my: 2,
              }}> */}
              {/* <Typography sx={{ fontSize: '1.5rem', textAlign: 'center', mt: 3 }} variant="body1">Истории</Typography>
              <Container maxWidth={"xl"}
                sx={{
                  display: 'flex',
                  justifyItems: 'center',
                  gap: 2,
                  overflowX: 'auto',
                  my: 3,
                  scrollbarWidth: 'thin', // Для Firefox
                  scrollbarColor: '#9c3333 #f1f1f1', // Для Firefox
                  '&::-webkit-scrollbar': {
                    height: '8px', // Высота горизонтального скролла
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1', // Цвет фона скроллбара
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#888', // Цвет ползунка
                    borderRadius: '4px', // Закругление ползунка
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555', // Цвет ползунка при наведении
                  },
                }}
              >
                { stories.map((storie) => (
                      <div key={storie.id} style={{
                        left: 0,
                        top: 0,
                        width: '100%',
                        borderRadius: '5px',
                        zIndex: 1000,
                      }}>
                        <img src={storie.preview} 
                          onClick={() => setDataStores({ open: true, id: storie.id })}
                          width={'100%'} 
                          style={{ minWidth: 200, boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
                          borderRadius: '5px',
                          height: '95%' }} 
                          height={400} 
                          sizes={"((min-width: 50em) and (max-width: 60em)) 50em"} />
                      </div>
                ))}
              </Container> */}

              {/* <Container>
                <>
                  <div onClick={(e) => {
                    if(e.target.tagName !== 'IMG') {
                      setDataStores({ open: false, id: null })
                    }
                  }}
                >
                  { stores.open && stories.map((storie) => {
                    const findStore = stores.id === storie.id;
                    return (
                      <>
                      { findStore && <div style={{
                        position: 'absolute',
                        left:0,
                        top: window.scrollY,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'black',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)', // Прозрачность фона через rgba
                        justifyItems: 'center',
                        alignContent: 'center',
                        zIndex: 2000,
                        overflowY: 'hidden'
                      }}>
                      <StoryWithIndicator storie={storie} setDataStores={setDataStores} onStoryEnd={() => {}} />
                    </div>
                  }
                </>
                  )})}
                </div>
                </> 
              </Container>
              </Box> */}


              <Grid container style={{ minWidth: '100%' }} className={classes.root}>
                {/* <Hidden smDown>
                  <Typography textAlign={'center'} className={classes.title}
                              variant={"inherit"}
                              component={"h1"}>
                    Свисни Суши</Typography>
                    <Typography textAlign={'center'} width={'100%'} variant='subtitle2'>
                    Доставка суши, роллов, пиццы по <span style={{color: '#ff6b1a', textDecoration: "underline"}}>Валуйскому району</span> с {adressDelivery === "Валуйки" ? "11:00 до 22:00"  : "10:00 до 22:00"}.</Typography>
                    <span style={{color: '#ff6b1a', textAlign: 'center', width: '100%', textDecoration: "underline"}}> {adressDelivery === "Валуйки" ? " Ваш пункт заказа: Валуйки, ул.Толстого 16/2."  : " Ваш пункт заказа: Уразово, ул.Красная Площадь 30А."}</span>
                </Hidden> */}

                  {/* Меню категории */}
                  {/* <Hidden smUp> */}
                <Grid container style={{ marginBottom: 20 }}>
                    <Typography textAlign={"center"} sx={{ width: '100%',  fontSize: '1.5rem', mt: 5 }} variant="body1">Категории меню</Typography>
                    <MenuCategory />
                </Grid>
                {/* </Hidden> */}
                {/* { combo.length && recomendedProduct.length > 0 ? <> */}
                {/* Комбо */}
                {/* <Kombo title={optionPage.titleCombo} product={combo}/> */}
                {/* Новинки/рекомендованые */}
                <RecommendedProducts title={optionPage.recomendedTitle} product={recomendedProduct} />
                {/* <Loader></Loader> */}
                
                {/* </> : <div style={{ width: "100%", minHeight: '380px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}><ClipLoader size={150}/></div> }       */}
                            {/* Посты */}
                            {/* <div> */}
                            {/* <Typography sx={{ */}
                    {/* // margin: '30px 0 30px 20px', */}
                  {/* width: '100%', */}
                  {/* textAlign: 'center' */}
                {/* }} variant={'h2'}></Typography> */}
                 
                {/* </div> */}
              </Grid>
              <Typography textAlign={"center"} sx={{ width: '100%',  fontSize: '1.5rem', mt: 2 }} variant="body1">Заказать суши в Валуйках</Typography>
              <Typography padding={2} sx={{ mb: 5}} variant={'subtitle2'}>
                Ресторан “Свисни Суши” предлагает своим клиентам самые вкусные суши с доставкой на дом, приготовленные по классическим и адаптированным к европейской аудитории рецептам, а также собственным наработкам наших поваров. Мы ценим время наших клиентов, поэтому вы можете заказать суши с доставкой на дом или в офис.
                <ul>
                  В нашем меню более 20 видов суши:
                  <li>Классические с сырым лососем, тунцом, окунем.</li>
                  <li>Экзотические с тигровой креветкой, мидиями.</li>
                  <li> Пикантные с копченым лососем, угрем.</li>
                </ul>

                В меню также представлены гунканы: с начинкой из красной икры и тобико, а также феликсы, где японский майонез сочетается с рыбой, морепродуктами, угрем. Любители острых блюд могут купить суши с соусом спайси. Популярные начинки — копченая курица, снежный краб, креветки, тунец, мидии, лосось и окунь.

              </Typography>
          </section>
        );
      }


      const mapDispatchToProps = {
        loadItems: loadIndexItems,
      };
      const mapStateToProps = (state) => ({
        indexProduct: state.app.indexProduct,
        adressDelivery: state.app.userSettings?.adressDelivery,
      });
      
      
      export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)

      const useStyleIndexPage = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            width: `100% !important`, 
            margin: `auto`
        },
        title: {
            fontWeight: 900,
            marginBottom: 30,
            marginTop: 30,
            width: `100%`,
            textTransform: `uppercase`,
            fontSize: 34,
            [theme.breakpoints.down('475')]: {
                fontSize: 24,
                letterSpacing: `-1px`,
                margin: `20px 0 0 0`
            }
        }
      }));

export const query = graphql `
{
  allContentfulIndexRecomended {
    edges {
      node {
        title
        recomendedProduct {
          id
          fieldName
          fieldSlug
          fieldDescriptionProduct
          fieldPriceProduct
          fieldSlugItem
          image {
            gatsbyImageData(
              placeholder: BLURRED, 
              formats: [WEBP, AUTO]
              sizes:"(max-width: 360px) 360px, 100vw)"
            )
          }
        }
      }
    }
  }
  allContentfulIndexKombo {
    edges {
      node {
        title
        kombo {
          id
          fieldName
          fieldSlug
          fieldDescriptionProduct
          fieldPriceProduct
          fieldSlugItem
          fieldIsEditKombo
          image {
            gatsbyImageData(
              placeholder: BLURRED, 
              formats: [WEBP, AUTO]
              sizes:"(max-width: 360px) 360px, 100vw)"
            )
          }
        }
      }
    }
  }
}
`
