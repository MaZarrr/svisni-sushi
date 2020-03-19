import React from "react"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import "../components/sass/index.css"
import Img from 'gatsby-image';
import Grid from '@material-ui/core/Grid';
import { useStyleIndexPage } from "../components/common/style";
import loadable from '@loadable/component'

const Card = loadable(() => import('../components/Card'))
const CarouselSvisni = loadable(() => import('../components/common/CarouselSvisni'))

const IndexPage = (props) => {
  const classes = useStyleIndexPage()
  const [dataIndex, setDataIndex] = React.useState([])

  React.useEffect(() => {
    const dataIndex = async () => {
     return await props.data.allContentfulHomePageImageMenu.edges
    }

    dataIndex()
    .then((data) => setDataIndex(data))
  }, [props.data.allContentfulHomePageImageMenu.edges])

return (
  <section>
  <SEO title="Доставка еды на дом в Валуйки. Заказать суши, пиццу c 10 до 22.00" />
   <CarouselSvisni />
    <div className="title_home">
    <h1>Свежая и разнообразная кухня</h1>
    </div>
      <Grid item xs={12} className={classes.root}>
        <Card />
      </Grid>
      <Grid container className={classes.menuPc}>  
      {dataIndex.map(({node: homeMenu}) => (
        <Grid item xs={6} sm={4} key={homeMenu.id} >  
          <div className="cart_item">
          <Link to={`/${homeMenu.slug}`}>
          <div className="cart_title">
            <h3><b>{homeMenu.category}</b></h3> 
          </div>
          <Img fluid={homeMenu.image.fluid} className="cart_img" imgStyle={{maxWidth: 300}} />
          </Link>
          </div>
     </Grid>
      ))}
    </Grid>
  </section>
  )
}

export default IndexPage

export const query = graphql `
{
  allContentfulHomePageImageMenu(sort: {fields: desc}) {
    edges {
      node {
        id
        slug
        category
        desc
        image {
          fluid(maxWidth: 300) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
}
`
