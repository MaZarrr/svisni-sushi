import React from 'react'
import Layout from './src/components/layout'
import theme from './src/theme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";

export const wrapPageElement = ({ element, props }) => {
  return (
     <Layout {...props}>{element}</Layout>
  );
 };

export const wrapRootElement = ({ element }) => {
 return (
   <StyledEngineProvider>
    {/* window.VK.Widgets.CommunityMessages("vk_community_messages", 20003922) */}
   <ThemeProvider theme={theme}>
    <CssBaseline/>
        {element}
    </ThemeProvider>
   </StyledEngineProvider>
 );
};

export const onRenderBody = ({ setHeadComponents }) => {
      setHeadComponents([
        <meta key="verify-yandex" name="yandex-verification" content="03d6b3314a4738ee" />,
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
            <script 
              key="vk-pixel-svisni"
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `
                var _tmr = window._tmr || (window._tmr = []);
                _tmr.push({id: "3163265", type: "pageView", start: (new Date()).getTime()});
                (function (d, w, id) {
                  if (d.getElementById(id)) return;
                  var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
                  ts.src = "https://top-fwz1.mail.ru/js/code.js";
                  var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
                  if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
                })(document, window, "tmr-code");
                `
              }}
            />
      ])}












      
      // setPreBodyComponents([
      //   <div key='vk-talk-container' id="vk_community_messages"></div>,
      //   <script key='vk-talk' type="text/javascript"
      //   dangerouslySetInnerHTML={{
      //     __html: `
      //         VK.Widgets.CommunityMessages("vk_community_messages", 161250465);
      //     `
      //   }}/>
      // ]),
      // setPostBodyComponents([
      //   <script key="vk-api" type="text/javascript"
      //   dangerouslySetInnerHTML={{
      //     __html: `
      //     VK.init({
      //       apiId: 7311665
      //     });`
      //   }}/>,
      //   <div key='vk-talk-container' id="vk_community_messages"></div>,
      //   <script key='vk-talk' type="text/javascript"
      //   dangerouslySetInnerHTML={{
      //     __html: `
      //         VK.Widgets.CommunityMessages("vk_community_messages", 161250465);
      //     `
      //   }}/>
      // ])

        // <script type="text/javascript"
        // dangerouslySetInnerHTML={{
        //   __html: `
        //   VK.Widgets.CommunityMessages("vk_community_messages", 127607773);
        //   `
        // }}/>
    //     <script key="talk-me" type='text/javascript'
    //     dangerouslySetInnerHTML={{
    //       __html: `
    //          (function(d, w, m) {
    //           window.supportAPIMethod = m;
    //           var s = d.createElement('script');
    //           s.type ='text/javascript'; s.id = 'supportScript'; s.charset = 'utf-8';
    //           s.async = true;
    //           var id = '226d519661c50fd5e16477daf16d89eb';
    //           s.src = 'https://lcab.talk-me.ru/support/support.js?h='+id;
    //           var sc = d.getElementsByTagName('script')[0];
    //           w[m] = w[m] || function() { (w[m].q = w[m].q || []).push(arguments); };
    //           if (sc) sc.parentNode.insertBefore(s, sc);
    //           else d.documentElement.firstChild.appendChild(s);
    //         })(document, window, 'TalkMe');
    //       `
    //   }}
    // />
