import React, {useState, useEffect} from 'react'
import {graphql, Link} from 'gatsby';
import {StylingInfo} from "../components/common/style";
import SEO from "../components/seo";
import Img from "gatsby-image";
import Button from "@material-ui/core/Button";
import ReplyIcon from "@material-ui/icons/Reply";
import Spinner from  "../components/spinner/spinner"

const SaleTeamplate = ({data: {contentfulProductSale: {image, name,
    detailedDescription: {childMarkdownRemark: md}} }}) => {

    const [load, setLoad] = useState(true)
    const [mdr, setMdr] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const mdRemark = await md
            setMdr({mdRemark, image})
            setLoad(false)
        }
        fetchData()
    }, [image, md])

    return (
        <StylingInfo>
            <SEO title={`Акция ${name}`}
                 description={`Акции и скидки, подробнее на сайте. Воспользоввться акцией ${name}`}
                 noindex={true}
                 pathname="/sale"/>
            <div className="container">
                <h1>{name}</h1>

                { load === false ?
                    <div>
                        <Img style={{maxWidth: 1280, marginTop: 30}} fluid={mdr.image.fluid} />
                        {/*<p>{mdr.description}</p>*/}
                    {/*<div className="col-12 mt-4">*/}
                        <div className="col-12 mt-4" dangerouslySetInnerHTML={{__html: mdr.mdRemark.html}} />
                    {/*</div>*/}
                <Button variant="outlined"
                        component={Link}
                        to="/sale"
                        size="large"
                        endIcon={<ReplyIcon/>}
                        style={{margin: `10px 0 40px 10px`}}>Все акции</Button>
                </div> : <Spinner/>
                    }
                </div>
        </StylingInfo>
    )
}
export default SaleTeamplate

export const pageQuery = graphql `
    query PageSale ($slug: String!) {
        contentfulProductSale(slug: {eq: $slug}) {
            description
            id
            name
            slug
            image {
                fluid(maxWidth: 1280) {
                    ...GatsbyContentfulFluid
                }
            }
            detailedDescription {
                childMarkdownRemark {
                    html
                    frontmatter {
                        name
                    }
                }
            }
        }
    }
`




// class SaleTeamplate extends Component {
//
//     state = {
//         mdr: null,
//         load: true,
//         hasError: false
//     }
//
//      componentDidMount() {
//         this.setState({
//             load: false,
//             mdr: {contentfulProductSale: {detailedDescription: undefined}}
//         })
//     }
//
//     componentDidCatch(error, errorInfo) {
//         if(this.state.mdr) {
//             this.setState({hasError: true})
//         }
//     }
//
//     reload = () => window.location.reload()
//
//     // componentDidUpdate(prevProps, prevState, snapshot) {
//     //     if(prevProps.mdr !== this.props.mdr) {
//     //         this.setState({mdr: this.props.data})
//     //     }
//     // }
//
//     render() {
//         // console.log(this.state)
//         // console.log(this.props)
//         const {mdr, hasError} = this.state
//         // {contentfulProductSale: {detailedDescription: {childMarkdownRemark}},
//         //     description, name, image }
//     if(hasError) {
//       return (
//           <StylingInfo>
//           <div className="d-flex flex-column items-center" >
//               <div style={{margin: `20% auto 0 auto`}}>
//           <Typography variant={`h5`}>Упс! Проблемы с интернетом...</Typography>
//               <Button style={{margin: `8px 0 8px 0 `}} variant="contained" color="primary" onClick={this.reload}>
//                   Оффлай версия
//               </Button>
//               </div>
//           </div>
//           </StylingInfo>
//         )
//     }
//
//     if(mdr === null) {
//         return <Spinner/>
//     }
//         return (
//             <SaleItem
//                 // image={mdr.contentfulProductSale.image.fluid}
//                 md={mdr.contentfulProductSale.detailedDescription}
//             />
//
//         )
//     }
// }
