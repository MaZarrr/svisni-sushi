import React, {useEffect} from "react"
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import { graphql } from "gatsby";
import { Hidden, Typography } from "@mui/material";
// import Carousel from '../components/common/CarouselSvisni';
// import Kombo from '../components/indexContent/combo/index'
import MenuCategory from "../components/indexContent/MenuCategory";
import RecommendedProducts from "../components/indexContent/recommended-products";

import Seo from "../components/seo";
import { connect } from "react-redux";
import { loadIndexItems } from "../reducers/app";
// import ClipLoader from "react-spinners/ClipLoader";

        const IndexPage = ({data: {
            allContentfulIndexRecomended, 
            allContentfulIndexKombo,
          },
          loadItems, adressDelivery = "",
          indexProduct: { optionPage = {}, combo = [], recomendedProduct = [] },
        }) => {

        const classes = useStyleIndexPage();
          console.log("adressDelivery2", adressDelivery);
        useEffect(() => {
          loadItems({combo: allContentfulIndexKombo, recomendedProduct: allContentfulIndexRecomended});
        }, [])

        return (
          <section>
            <Seo title="Заказать суши, роллы c доставкой в Валуйки"
                 description="Доставка роллов, пиццы, wok, салатов, закусок в Валуйках. Наше меню порадует широким выбором блюд японской кухни. Заказ еды c 10 до 22:00"
                 pathname='/'
            />
            <Hidden smUp>
            <Typography style={{ textAlign: 'center', textTransform: 'uppercase'}}
                              variant={"inherit"}
                              component={"h1"} >
                    Свисни Суши</Typography>
              <Typography 
              variant={"body2"}
              style={{textAlign: 'center', padding: '0 6px 0 6px'}}>Доставка суши, роллов, пиццы <br></br> по Валуйскому району с {adressDelivery === "Валуйки" ? "11:00 до 22:00"  : "10:00 до 22:00"}. <br></br>
                  {/* <span style={{color: '#ff6b1a', textDecoration: "underline"}}> Валуйскому району</span> с 10:00 до 22:00.</Typography> */}
                  <span style={{color: '#ff6b1a', textDecoration: "underline"}}> {adressDelivery === "Валуйки" ? " Ваш пункт заказа: Валуйки, ул.Толстого 16/2."  : " Ваш пункт заказа: Уразово, ул.Красная Площадь 30А."}</span></Typography>
              </Hidden>
              {/* <Carousel dataCarousel={allContentfulCarouselSiteImage}/> */}

              <Grid container style={{ minWidth: '100%' }} className={classes.root}>
                <Hidden smDown>
                  <Typography textAlign={'center'} className={classes.title}
                              variant={"inherit"}
                              component={"h1"}>
                    Свисни Суши</Typography>
                    <Typography textAlign={'center'} width={'100%'} variant='subtitle2'>
                    Доставка суши, роллов, пиццы по <span style={{color: '#ff6b1a', textDecoration: "underline"}}>Валуйскому району</span> с {adressDelivery === "Валуйки" ? "11:00 до 22:00"  : "10:00 до 22:00"}.</Typography>
                    <span style={{color: '#ff6b1a', textAlign: 'center', width: '100%', textDecoration: "underline"}}> {adressDelivery === "Валуйки" ? " Ваш пункт заказа: Валуйки, ул.Толстого 16/2."  : " Ваш пункт заказа: Уразово, ул.Красная Площадь 30А."}</span>
                </Hidden>

                  {/* Меню категории */}
                  {/* <Hidden smUp> */}
                  <Grid container style={{ marginBottom: 20 }}>
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

              <Typography padding={2} variant={'h3'}>Заказать суши в Валуйках</Typography>
              <Typography padding={2} variant={'subtitle2'}>
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
