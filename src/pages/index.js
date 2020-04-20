import React from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import "../components/sass/index.css"
import Grid from '@material-ui/core/Grid';
import loadable from '@loadable/component'
import {makeStyles} from "@material-ui/core/styles";
import Spinner from '../components/spinner/spinner'

const Card = loadable(() => import('../components/Card'), {
    fallback: <Spinner/>
})
const CarouselSvisni = loadable(() => import('../components/common/CarouselSvisni'), {
    fallback: <Spinner/>
})
const HomePageMenu = loadable(() => import('../components/common/HomePageMenu'), {
    fallback: <Spinner/>
    }
)

const useStyleIndexPage = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: `100%`,
        [theme.breakpoints.up('768')]: {
            display: 'none'
        }
    },
    menuPc: {
        maxWidth: 1368,
        marginTop: 40,
        [theme.breakpoints.down('768')]: {
            display: 'none',
        }
    }
}))

const IndexPage = (props) => {

  const [dataIndex, setDataIndex] = React.useState([])
  const classes = useStyleIndexPage();

  React.useEffect(() => {
    const dataIndex = async () => {
     return await props.data.allContentfulHomePageImageMenu.edges
    }
    dataIndex()
    .then((data) => setDataIndex(data))
  }, [props.data.allContentfulHomePageImageMenu.edges])

return (
  <section>
  <SEO title="Заказать любимые суши и роллы c доставкой в Валуйки"
  description="БЕСПЛАТНАЯ доставка суши, роллов, сетов, пиццы и воков в Валуйках.
  Наше меню порадует широким выбором, а также уникальными роллами, которых вы не найдете больше ни у кого!"
  />
   <CarouselSvisni />
    <div className="title_home">
    <h1>Заказывайте роллы, суши и пиццу с доставкой</h1>
    </div>
      <Grid item xs={12} className={classes.root}>
        <Card />
      </Grid>
      <Grid container className={classes.menuPc}>
            <HomePageMenu dataIndex={dataIndex}/>
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
