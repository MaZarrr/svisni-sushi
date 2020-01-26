// import wrapWithProvider from "./wrap-with-provider"
const createStore = require('./src/state/createStore').default
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

exports.onRenderBody = (
    { setPreBodyComponents }
   
  ) => {
    setPreBodyComponents([
        <script
        dangerouslySetInnerHTML={{
        __html: `
        (function(d, w, c) {
            w.ChatraID = 'ShmYgm6KLaFn3wbcz';
            var s = d.createElement('script');
            w[c] = w[c] || function() {
                (w[c].q = w[c].q || []).push(arguments);
            };
            s.async = true;
            s.src = 'https://call.chatra.io/chatra.js';
            if (d.head) d.head.appendChild(s);
        })(document, window, 'Chatra');
    `
    }}
/>
    ])
}

    // let args = []
	// for (let i in pluginOptions) {
	// 	if (i === 'plugins') continue
	// 	let opt = pluginOptions[i]
	// 	if (Array.isArray(opt)) {
	// 		opt = opt.join(`,`)
	// 	}
	// 	args.push(`${i}=${opt}`)
	// }
	// if (args.length) {
	// 	args = `?${args.join(`&`)}`
	// }
	// else {
	// 	args = ``
	// }
	// setPostBodyComponents([
	// 	<script
	// 		key='polyfill-io'
	// 		src={`https://cdn.polyfill.io/v3/polyfill.min.js${args}`}
	// 	/>
	// ])


// import wrapWithProvider from "./wrap-with-provider"
// export const wrapRootElement = wrapWithProvider