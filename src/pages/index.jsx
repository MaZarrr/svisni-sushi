import React, {useEffect} from "react"
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import { graphql } from "gatsby";
import { Hidden, Typography } from "@mui/material";
// import Carousel from '../components/common/CarouselSvisni';
import Kombo from '../components/indexContent/combo/index'
import MenuCategory from "../components/indexContent/MenuCategory";
import RecommendedProducts from "../components/indexContent/recommended-products";

import Seo from "../components/seo";
import { connect } from "react-redux";
import { loadIndexItems } from "../reducers/app";
import ClipLoader from "react-spinners/ClipLoader";

import { useState } from "react";
import { sendRequest } from "../utils";
// капрусель
// const IndexPage = ({ data: { allNodePopulyarnyeBlyudaNovinki: { edges },
//   allNodeKomboRekomenduemye: { edges: komboItems }
// }}) => {

        const IndexPage = ({data: {
            allContentfulIndexRecomended, 
            allContentfulIndexKombo,
          },
          loadItems,
          indexProduct: { optionPage = {}, combo = [], recomendedProduct = [] },
        }) => {

        const [dataWall1, setDataWall1] = useState([]);
        const [dataWall2, setDataWall2] = useState([]);
        
        const classes = useStyleIndexPage();

        useEffect(() => {
          loadItems({combo: allContentfulIndexKombo, recomendedProduct: allContentfulIndexRecomended});
          async function fetchData() {
            const res = await sendRequest();
            const dataWall1 = res?.data?.data?.items.slice(0, 2) || [];
            const dataWall2 = res?.data?.data?.items.slice(2, 7) || [];
            setDataWall1(dataWall1);
            setDataWall2(dataWall2);
          } 
          fetchData();
          return () => fetchData();
        }, [])

        return (
          <section>
            <Seo title="Заказать суши, роллы c доставкой в Валуйки"
                 description="Доставка роллов, пиццы, wok, салатов, закусок в Валуйках. Наше меню порадует широким выбором блюд японской кухни. Заказ еды c 10 до 22:00"
                 pathname='/'
            />
            <Hidden smUp>
            <Typography style={{ marginLeft: '30px', textTransform: 'uppercase'}}
                              variant={"inherit"}
                              component={"h1"}>
                    Свисни Суши</Typography>
              <Typography 
              variant={"body2"}
              style={{textAlign: 'start', padding: '0 20px 0 30px',}}>Доставка суши, роллов, пиццы Валуйскому району с 10:00 до 22:00.
                  {/* <span style={{color: '#ff6b1a', textDecoration: "underline"}}> Валуйскому району</span> с 10:00 до 22:00.</Typography> */}
                  <span style={{color: '#ff6b1a', textDecoration: "underline"}}> Уразово и Валуйки</span></Typography>
              </Hidden>
              {/* <Carousel dataCarousel={allContentfulCarouselSiteImage}/> */}

              <Grid container style={{ minWidth: '100%' }} className={classes.root}>

                <Hidden smDown>
                  <Typography style={{ marginLeft: 30 }} className={classes.title}
                              variant={"inherit"}
                              component={"h1"}>
                    Свисни Суши в Уразово</Typography>
                    <Typography style={{marginLeft: 30}}
                              variant='subtitle2'>
                    Доставка суши, роллов, пиццы по <span style={{color: '#ff6b1a', textDecoration: "underline"}}>Валуйскому району</span> с 10:00 до 22:00.</Typography>
                </Hidden>

                { combo.length && recomendedProduct.length > 0 ? <>
                {/* Комбо */}
                <Kombo title={optionPage.titleCombo} product={combo}/>
                {/* Новинки/рекомендованые */}
                <RecommendedProducts title={optionPage.recomendedTitle} product={recomendedProduct} />
                {/* <Loader></Loader> */}
                
                {/* Меню категории */}
                <Hidden smUp>
                  <Grid container style={{ marginBottom: 20 }}>
                  <Typography sx={{
                    width: '100%',
                    textAlign: 'center',
                    // marginLeft: '25px', 
                    // margin: '0 0 0 50px'
                    }} variant={'h2'}>Меню</Typography>
                    <MenuCategory />
                  </Grid>
                </Hidden>
                </> : <div style={{ width: "100%", minHeight: '380px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}><ClipLoader size={150}/></div> }      
                            {/* Посты */}
                            <div>
                            <Typography sx={{
                    // margin: '30px 0 30px 20px',
                  width: '100%',
                  textAlign: 'center'
                }} variant={'h2'}></Typography>
                 
                </div>
              </Grid>


          </section>
        );
      }


      const mapDispatchToProps = {
        loadItems: loadIndexItems
      };
      const mapStateToProps = (state) => ({
        indexProduct: state.app.indexProduct,
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
            // textAlign: 'center',
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


      // export async function getServerData() {
      //   try {
      //     const res = await fetch(`https://svisniplatform.site/getWall`, {
      //       // const res = await fetch(`http://localhost:3333/getWall`, {
      //       method: 'POST',
      //       headers: {
      //           'Content-Type': 'application/json;charset=utf-8'
      //       },
      //       body: JSON.stringify( {
      //           count: 8
      //         })
      //     })
      
      //     if (!res.ok) {
      //       throw new Error(`Response failed`)
      //     }
      
      //     return {
      //       props: await res.json(),
      //     }
      //   } catch (error) {
      //     return {
      //       status: 500,
      //       headers: {},
      //       props: {}
      //     }
      //   }
      // }

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
