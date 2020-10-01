const createStore  = require('./src/state/createStore').default;
const { Provider } = require('react-redux');
const React = require('react');
const Layout = require('./src/components/layout').default

exports.wrapPageElement = ({element, props}) => {
    return <Layout {...props}>{element}</Layout>
};

exports.wrapRootElement = ({element}) => {
    return (
        <Provider store={createStore}>
            {/*<Layout {...props}>*/}
            {element}
            {/*</Layout>*/}
        </Provider>
        )
    };

// import {clockSale} from "./src/reducers/shopping-cart";
// const {clockSale} = require('./src/reducers/shopping-cart').default

