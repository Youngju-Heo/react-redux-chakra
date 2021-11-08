import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {ChakraProvider} from "@chakra-ui/react";
import "moment/locale/ko";
import moment from "moment";

import baseTheme from "./base-theme";
import store from "./store";
import {App} from "./app";
import * as serviceWorker from "./service-worker";
import "@fontsource/noto-sans-kr/400.css";
import "./index.scss";

moment.locale("ko");

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ChakraProvider theme={baseTheme}>
      <App/>
      </ChakraProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
