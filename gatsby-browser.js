
// import wrapWithProvider from "./wrap-with-provider"
// const ErrorBoundary = require('./src/components/error-boundary/error-boundary'); 
const createStore  = require('./src/state/createStore').default
const { Provider } = require('react-redux'); 
const React = require('react');
const Layout = require('./src/components/layout').default

exports.wrapPageElement = ({element, props}) => {
    return <Layout {...props}>{element}</Layout>
}

exports.wrapRootElement = ({element}) => {
    return (
        <Provider store={createStore}>
            {element}
        </Provider>
        )
    }


// export default ({ element }) => {


// }

// export const wrapRootElement = wrapWithProvider