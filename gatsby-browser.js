import React from "react";
import Layout from './src/components/layout'
import theme from './src/theme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import ReactDOM from 'react-dom'

export const wrapPageElement = ({ element, props }) => {
  return (
    <Layout {...props}>{element}</Layout>
  );
};

export const wrapRootElement = ({ element }) => {
    return (
      <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          {element}
      </ThemeProvider>
      </StyledEngineProvider>
    )
}


// function anchorScroll(location){
//   // Check for location so build does not fail
//   if (location && location.hash) {
//   console.log(location);

//     setTimeout(() => {
//       // document.querySelector(${location.hash}).scrollIntoView({ behavior: 'smooth', block: 'start' });
//       const item = document.querySelector(`${location.hash}`).offsetTop;
//       const mainNavHeight = document.querySelector('header').offsetHeight;
//       window.scrollTo({top: item - mainNavHeight, left: 0});
//     }, 0);
//   }
// }

// export const onRouteUpdate = ({location}) => {
//   anchorScroll(location);
//   return true;
// };


export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  setTimeout(() => {
    const currentPosition = getSavedScrollPosition(location)
    // const currentPosition = getSavedScrollPosition(location, location.state.key)
    const queriedPosition = getSavedScrollPosition({ pathname: `/sety` })
    console.log("getSavedScrollPosition", getSavedScrollPosition);
    console.log("currentPosition", currentPosition);
    console.log("queriedPosition ", queriedPosition);
    console.log("location ", location);
    window.scrollTo(...(currentPosition || [0, 0]))
    // anchorScroll(location)
    return false
  }, 0)

}


export const onServiceWorkerUpdateReady = () => {
    window.location.reload()
}


// export const onServiceWorkerUpdateReady = () => {
//   const answer = window.confirm(
//     `Приложение Свисни суши было обновлено. `+
//     `Перезагрузить, чтобы отобразить последнюю версию?`
//   )
//   if (answer === true) {
//     window.location.reload()
//   }
// }


// export const onClientEntry = () => {
//   window.VK.Widgets.CommunityMessages("vk_community_messages", 161250465);
// }

// export const replaceHydrateFunction = () => {
//   return (element, container, callback) => {
//     console.log("rendering!");
//     ReactDOM.render(element, container, callback);
//     // ReactDOM.hydrate(element, container, callback);
//   };
// };
