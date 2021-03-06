import React from 'react'
import Layout from './src/components/layout'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import montserratBold from "./src/assets/Montserrat-ExtraBold.woff2";
import montserratMedium from "./src/assets/Montserrat-Medium.woff2";
import theme from './src/theme';

export const wrapPageElement = ({ element, props }) => {
  return (
     <Layout {...props}>{element}</Layout>
  );
 };

export const wrapRootElement = ({ element }) => {
 return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {element}
  </ThemeProvider>
 );
};

export const onRenderBody = ({ setHeadComponents }) => {
      setHeadComponents([
        <link
          key="font-medium"
          rel="preload"
          href={montserratMedium}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />,
        <link
          key="font-bold"
          rel="preload"
          href={montserratBold}
          type="font/woff2"
          as="font"
          crossOrigin="anonymous"
        />,
        <script
            key="vk-retargeting"
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
            <script key="talk-me" type='text/javascript'
              dangerouslySetInnerHTML={{
                __html: `
                   (function(d, w, m) {
                    window.supportAPIMethod = m;
                    var s = d.createElement('script');
                    s.type ='text/javascript'; s.id = 'supportScript'; s.charset = 'utf-8';
                    s.async = true;
                    var id = '226d519661c50fd5e16477daf16d89eb';
                    s.src = 'https://lcab.talk-me.ru/support/support.js?h='+id;
                    var sc = d.getElementsByTagName('script')[0];
                    w[m] = w[m] || function() { (w[m].q = w[m].q || []).push(arguments); };
                    if (sc) sc.parentNode.insertBefore(s, sc);
                    else d.documentElement.firstChild.appendChild(s);
                  })(document, window, 'TalkMe');
                `
            }}
          />
      ])
};

