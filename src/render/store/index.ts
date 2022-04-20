/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { applyMiddleware, combineReducers, compose, createStore, Store } from "redux";
import counterReducer, { counterState } from "./counter/counter-slice";
import statusReducer, { StatusState } from "./status/status-slice";
import gisInfoReducer, { GisInfoState } from "./gisinfo/gis-info-slice";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

export interface ApplicationState {
  counter: counterState | undefined;
  status: StatusState | undefined;
  gisInfo: GisInfoState | undefined;
}

export const reducers = {
  counter: counterReducer,
  status: statusReducer,
  gisInfo: gisInfoReducer,
};

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href") as string;
export const history = createBrowserHistory({ basename: baseUrl });

const configureStore = (initialState?: ApplicationState): Store => {
  const middleware = [routerMiddleware(history)];

  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history),
  });

  const enhancers = [];
  const windowIfDefined = typeof window === "undefined" ? null : (window as any);
  if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));
};

const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
