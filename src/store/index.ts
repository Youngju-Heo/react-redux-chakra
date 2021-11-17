import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counter-slice";
import menuReducer from "./menu/menu-slice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
