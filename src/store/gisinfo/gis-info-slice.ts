import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BackgroundMapType, DefaultLocation, GisViewPosition } from "../../common/domain/gis-common";

export interface GisInfoState {
  moveTo: { center: number[]; zoom: number };
  background: BackgroundMapType;
}

const initialState: GisInfoState = {
  moveTo: {
    center: DefaultLocation,
    zoom: 15,
  },
  background: "kakao",
};

export const gisInfoSlice = createSlice({
  name: "gisInfo",
  initialState,
  reducers: {
    gisSetLocation: (state, action: PayloadAction<GisViewPosition>) => {
      state.moveTo.center = action.payload.center;
      state.moveTo.zoom = action.payload?.zoom || state.moveTo.zoom;
    },
    gisSetBackground: (state, action: PayloadAction<BackgroundMapType>) => {
      state.background = action.payload;
    },
  },
});

export const { gisSetLocation, gisSetBackground } = gisInfoSlice.actions;

export default gisInfoSlice.reducer;
