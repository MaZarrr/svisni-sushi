import React, {useState, useEffect} from 'react'
import {graphql} from 'gatsby';
import Spinner from  "../components/spinner/spinner"
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import SaleItem from "../components/SaleItem";

const SaleTeamplate = ({data: {contentfulProductSale: {image, name,
    detailedDescription} }}) => {

    const [load, setLoad] = useState(true)
    const [mdr, setMdr] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const mdRemark = await detailedDescription
            setMdr(mdRemark)
            // setMdr({contentfulProductSale: {detailedDescription: undefined}})
            setLoad(false)
        }
        fetchData()
    }, [image, detailedDescription])

    return (
        // <StylingInfo>
        //     <SEO title={`Акция ${name}`}
        //          description={`Акции и скидки, подробнее на сайте. Воспользоввться акцией ${name}`}
        //          noindex={true}
        //          pathname="/sale"/>
        //     <div className="container">
                <ErrorBoundary>
                    { load === false ?
                    <SaleItem
                        name={name}
                        image={image.fluid}
                        md={mdr}
                        // loading={load}
                    /> : <Spinner/> }
                </ErrorBoundary>

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
