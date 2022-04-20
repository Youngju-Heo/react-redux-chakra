/* eslint-disable no-console */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "../index";
import { GisViewExtent } from "../../component/gis-comp/gis-common";

export interface StatusState {
  message: string;
  view: GisViewExtent;
}

const initialState: StatusState = {
  message: "",
  view: { center: [0, 0], centerSrc: [0, 0], rect: [0, 0, 0, 0], zoom: 0 },
};

export const statusSlice = createSlice({
  name: "status",
  initialState: initialState,
  reducers: {
    statusMessageUpdate: (state, action: PayloadAction<string>) => {
      console.log("update-message:", action.payload);
      state.message = action.payload;
    },
    statusMapLocation: (state, action: PayloadAction<GisViewExtent>) => {
      console.log("set-view-location:", action.payload);
      state.view = action.payload;
    },
  },
});

export const updateStatus = (msg: string): void => {
  store.dispatch(statusSlice.actions.statusMessageUpdate(msg));
};

export const { statusMessageUpdate, statusMapLocation } = statusSlice.actions;
export const selectStatus = (state: RootState) => state.status.message as string;

export default statusSlice.reducer;
