import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import moment from "moment";
import "moment/locale/ko";

import "react-perfect-scrollbar/dist/css/styles.css";
import "@fontsource/noto-sans-kr/400.css";
import baseTheme from "./base-theme";
import store from "./store";
import { App } from "./app";
import * as serviceWorker from "./service-worker";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { MapProjection } from "./component/geoutil/map-projection";

moment.locale("ko");
proj4.defs("EPSG:5179", MapProjection.baroHdProj);
proj4.defs("EPSG:5181", MapProjection.kakaoProj);
register(proj4);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.StrictMode>
        <ChakraProvider theme={baseTheme}>
          <App />
        </ChakraProvider>
      </React.StrictMode>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
