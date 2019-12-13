import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled  from 'styled-components';
import MenuSite from '../components/common/MenuSite';
import { graphql, Link } from "gatsby";
// import Img from 'gatsby-image';
import Img from 'gatsby-image';


const SetySection = styled.section `
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0 auto;
    padding: 0;
    width: 100vw;

    .container {
        margin: 50px auto 50px 50px;
        padding: 0;
        border-bottom: 1px solid grey;
    }
    .container h1 {
        /* font-size: 5vw; */
    }
    header h2 {
        font-size: 18px;
        text-align: center;
    }
    .descript{
        text-align: center;
        font-size: 14px;
        height: 45px;
        /* max-height: 30px; */
    }

   a header h2 {
       text-decoration: none;
       list-style: none;
       color: black;
   }

    ul.d {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
        /* position: relative; */
        /* height: 100px; */
    }
    p b {
        font-size: 22px;
    }
    li {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .conainer_product {
        /* box-shadow: 0px 5px 20px -1px rgba(0, 0, 255, .2);
        border-radius: 5px; */
        width: 400px;
        display: flex;
        justify-content: center;
        /* align-items: space-around; */
        margin-bottom: 50px;
    }
    article {
        display: flex;
        justify-content: center;
        /* min-height: 400px; */
    }
    .img_fluid {
        width: 300px;
        text-align: center;
        margin: 0 auto;
    }

    .container_cart {
        height: 150px;
        margin: 0;
        padding: 0;
    }

    @media screen and (max-width: 768px) {
   

}
` 
// const LayoutSection = styled(Layout) `
//     background: red;
// `

const sety = ({data: {allContentfulProduct: {edges}}}) => {
// console.log(edges)

return (
    <Layout>
    <SEO title="Сеты" />
    <MenuSite />
    <SetySection>
    <div className="container"> 
        <h1>Сеты</h1>
    </div>
    {edges.map(({node: productSets}) => {
        const {id, name, slug, description, price, image: {fluid} } = productSets
        return (
        <div key={id} className="conainer_product"> 
            <article>
                <div>
                <Link to={`/sety/${slug}`}> 
                    <div className="img_fluid">
                        <Img style={{maxWidth: 300, height: 300}}
                        fluid={fluid}></Img>
                    </div>
                <header>
                    <h2>{name}</h2>
                </header>
                </Link>
                <ul className="container_cart">
                    <p className="descript">{description}</p>
                <ul className="d">
                    <p><b>{price}</b> РУБ.</p>
                    <button className="btn btn-success"><i class="fas fa-shopping-cart"></i></button>
                </ul>
                </ul>
                </div>
            </article>
        </div>
    )})}
  
    </SetySection>
    </Layout>
    )
}

export default sety

export const query = graphql `
    {
        allContentfulProduct {
          edges {
            node {
                id
              slug
              name
              price
              description
              image {
                  fluid(maxWidth: 400) {
                    ...GatsbyContentfulFluid_tracedSVG
                  }
              }
              }
            }
          }
        }
    `
