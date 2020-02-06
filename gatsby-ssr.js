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

exports.onRenderBody = ({
        setPreBodyComponents,
        setPostBodyComponents
    }) => {
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
        }}/>
    ])

// setPostBodyComponents([
// <script type="text/javascript"
//  dangerouslySetInnerHTML={{
//          __html: `

//             VK.init({
//                 apiId: 7263178,
//                 onlyWidgets: true
//             })
//     `
//             }} />
// ])
}
    //         <script type="text/javascript">
    //            dangerouslySetInnerHTML={{

   

    //     dangerouslySetInnerHTML={{
    //     __html: `

    //         #chatra:not(.chatra--expanded) {
    //         visibility: hidden !important;
    //         opacity: 0 !important;
    //         pointer-events: none;
    //     }
    //     @media screen and (min-width: 778px) {
    //        #chatra {
    //         display: block;
    //         }
    //     }
    // `
    //     }}/>,


        // window.ChatraSetup = {
        //     mode: 'frame',
        //     injectTo: 'chatra-wrapper'
        // };
// Chatra('setColors', {
//     buttonText: '#f5f5f5',
//     buttonBg: '#5ece1a',
//     clientBubbleBg: '#e7ffd1', 
//     agentBubbleBg: '#deffff' 
// });

        
// <script

// dangerouslySetInnerHTML={{
// __html: `

// `
// }}/>,