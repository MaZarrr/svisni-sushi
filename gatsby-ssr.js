const createStore = require('./src/state/createStore').default;
const { Provider } = require('react-redux'); 
const React = require('react');
const Layout = require('./src/components/layout').default;

exports.wrapPageElement = ({element, props}) => {
    return <Layout {...props}>{element}</Layout>
};

exports.wrapRootElement = ({element, props}) => {
    return (
        <Provider store={createStore}>
            {/*<Layout {...props}>*/}
                {element}
            {/*</Layout>*/}
        </Provider>
        )
};

exports.onRenderBody = ({
        setPreBodyComponents, setHeadComponents
     }) => {
     setPreBodyComponents([
        <script
            key={1}
            dangerouslySetInnerHTML={{
         __html: `
(function () {
    window['yandexChatWidgetCallback'] = function() {
        try {
            window.yandexChatWidget = new Ya.ChatWidget({
                guid: '02c1500f-bc2c-401d-957d-e332c8c69b28',
                buttonText: 'Напишите нам',
                title: 'Чат',
                theme: 'light',
                collapsedDesktop: 'hover',
                collapsedTouch: 'always'
            });
        } catch(e) { }
    };
    var n = document.getElementsByTagName('script')[0],
        s = document.createElement('script');
    s.async = true;
    s.charset = 'UTF-8';
    s.src = 'https://yastatic.net/s3/chat/widget.js';
    n.parentNode.insertBefore(s, n);
})();
        `
         }}/>
     ])
    setHeadComponents([
        <script
            key={2}
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: `
                !function(){
                var t=document.createElement("script");
                t.type="text/javascript",
                t.async=!0,
                t.src="https://vk.com/js/api/openapi.js?168",
                t.onload=function(){
                    VK.Retargeting.Init("VK-RTRG-493440-aoKed"),
                    VK.Retargeting.Hit()
                    }, document.head.appendChild(t)}();
                `
            }}/>,
            <script
            key={3}
            dangerouslySetInnerHTML={{
                __html: `
                        !function(f,b,e,v,n,t,s)
                         {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                    n.queue=[];t=b.createElement(e);t.async=!0;
                                    t.src=v;s=b.getElementsByTagName(e)[0];
                                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                                    'https://connect.facebook.net/en_US/fbevents.js');
                                    fbq('init', '556942991882505');
                                    fbq('track', 'PageView');
                            `
            }}
            />
    ])
 }
   