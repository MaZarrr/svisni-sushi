import React from "react";
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
          {element}
      </ThemeProvider>
      </StyledEngineProvider>
    )
}

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Приложение Свисни суши было обновлено. `+
    `Перезагрузить, чтобы отобразить последнюю версию?`
  )
  if (answer === true) {
    window.location.reload()
  }
}


// export const onClientEntry = () => {
//   window.VK.Widgets.CommunityMessages("vk_community_messages", 161250465);
// }

// export const replaceHydrateFunction = () => {
//   return (element, container, callback) => {
//     console.log("rendering!");
//     // ReactDOM.render(element, container, callback);
//     ReactDOM.hydrate(element, container, callback);
//   };
// };
