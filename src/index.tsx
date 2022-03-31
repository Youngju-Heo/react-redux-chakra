/* eslint-disable no-console */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import moment from "moment";
import "moment/locale/ko";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import "react-perfect-scrollbar/dist/css/styles.css";
import "@fontsource/noto-sans-kr/400.css";
import baseTheme from "./base-theme";
import store from "./store";
import App from "./app";
import * as serviceWorker from "./service-worker";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { MapProjection } from "./component/geoutil/map-projection";
import Keycloak from "keycloak-js";
import axios from "axios";
import { AuthClientError, AuthClientEvent } from "@react-keycloak/core";
import { Processing } from "./component/processing";

interface AuthCheckerState {
  keycloak?: Keycloak.KeycloakInstance;
  authorized: boolean;
}

moment.locale("ko");
proj4.defs("EPSG:5179", MapProjection.baroHdProj);
proj4.defs("EPSG:5181", MapProjection.kakaoProj);
register(proj4);

const AuthChecker = (): JSX.Element => {
  const [state, setState] = React.useState({ authorized: false } as AuthCheckerState);
  const initialize = async () => {
    if (!state.keycloak) {
      const res = await axios("./authenticate.json");
      setState({ ...state, keycloak: Keycloak(res.data as Keycloak.KeycloakConfig) });
    }
  };

  React.useEffect(() => {
    initialize().catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeycloakEvent = (event: AuthClientEvent, error?: AuthClientError) => {
    if (event === "onAuthSuccess") {
      setState({ ...state, authorized: true });
    } else if (event === "onAuthLogout") {
      setState({ ...state, authorized: false });
    }
    console.log(event, error);
  };

  // ReactKeycloakProvider: 로그인 인증 방법에 대하여 확인이 필요할 경우 아래 링크 참조 바라며, 로그인을 위해서는
  // initOptions: { onLoad: 'login-required' } 을 추가해야 한다.
  // 참조: https://www.keycloak.org/docs/latest/securing_apps/index.html#init-options
  return (
    <React.StrictMode>
      {state.keycloak ? (
        <ReactKeycloakProvider authClient={state.keycloak} onEvent={onKeycloakEvent}>
          <App />
        </ReactKeycloakProvider>
      ) : (
        <Processing />
      )}
    </React.StrictMode>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ChakraProvider theme={baseTheme}>
        <AuthChecker />
      </ChakraProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
