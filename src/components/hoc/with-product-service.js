// import { ProductServiceProvider } from "../../product-service-context";
import React, { Component } from 'react';
import { connect } from 'react-redux';


const withProductService = (WrappedComponent) =>  {
    // WrappedComponent = ProductServiceConsumer()(WrappedComponent);

    return className extends Component {
      render() {
        
        return (
        //   <ProductServiceProvider ass={["Язык русский"]}>
            <WrappedComponent {...this.props} dataProp={this.props.orderTotal} />
        //   </ProductServiceProvider>
        );
      }
    }
}
const mapStateToProps = ({ shoppingCart: {cartItems, orderTotal} }) => {
  return {cartItems, orderTotal};
}

export default connect(mapStateToProps)(withProductService);

// const withProductService = () => (Wrapper) => {
//     // const [context] = useContext(ProductContext)
//     return (props) => {
//         return (
//             <ProductServiceConsumer>
//                 {
//                     (productService) => {
//                         return (
//                             <Wrapper {...props} productService={productService}/>
//                             )
//                     } 
//                 }
//             </ProductServiceConsumer>
//         )}
//     }




