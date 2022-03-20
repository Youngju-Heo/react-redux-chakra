/* eslint-disable no-console */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "../index";
import { RView } from "rlayers/RMap";

export interface StatusState {
  message: string;
  view: RView;
}

const initialState: StatusState = {
  message: "",
  view: { center: [0, 0], zoom: 0 },
};

export const statusSlice = createSlice({
  name: "status",
  initialState: initialState,
  reducers: {
    setMessageUpdate: (state, action: PayloadAction<string>) => {
      console.log("update-message:", action.payload);
      state.message = action.payload;
    },
    setViewLocation: (state, action: PayloadAction<RView>) => {
      console.log("set-view-location:", action.payload);
      state.view = action.payload;
    },
  },
});

export const updateStatus = (msg: string): void => {
  store.dispatch(statusSlice.actions.setMessageUpdate(msg));
};

export const { setMessageUpdate, setViewLocation } = statusSlice.actions;
export const selectStatus = (state: RootState) => state.status.message as string;

export default statusSlice.reducer;
