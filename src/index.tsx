import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import moment from "moment";
import "moment/locale/ko";

import "@fontsource/noto-sans-kr/400.css";
import baseTheme from "./base-theme";
import store from "./store";
import { App } from "./app";
import * as serviceWorker from "./service-worker";

moment.locale("ko");

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ChakraProvider theme={baseTheme}>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
