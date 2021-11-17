import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "../index";

export interface MenuLocation {
  path: string;
  param?: string;
}

const menuEqual = (a: MenuLocation, b: MenuLocation): boolean => {
  if (a.path !== b.path || a.param !== b.param) {
    return false;
  }

  return true;
};

export interface menuState {
  location: MenuLocation;
  history: MenuLocation[];
}

const initialState: menuState = {
  location: { path: "/" },
  history: [],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState: initialState,
  reducers: {
    menuPush: (state, action: PayloadAction<MenuLocation>) => {
      if (!menuEqual(state.location, action.payload)) {
        state.history.push(state.location);
        state.location = action.payload;
        while (state.history.length > 20) {
          state.history.pop();
        }
      }
    },
  },
});

export const menuPush = (path: string, param?: string) => {
  store.dispatch(menuSlice.actions.menuPush({ path: path.length == 0 ? "/" : path, param }));
};

export const menu = (state: RootState) => state.menu;

export default menuSlice.reducer;
