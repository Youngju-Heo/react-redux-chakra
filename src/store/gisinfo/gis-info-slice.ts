import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BackgroundMapType, GisViewPosition } from "../../common/domain/gis-common";

export interface GisInfoState {
  gisPosition: { center: number[]; zoom: number };
  background: BackgroundMapType;
}

const initialState: GisInfoState = {
  gisPosition: {
    center: [126.8915302, 37.4858711],
    zoom: 15,
  },
  background: "kakao",
};

export const gisInfoSlice = createSlice({
  name: "gisInfo",
  initialState,
  reducers: {
    gisSetLocation: (state, action: PayloadAction<GisViewPosition>) => {
      state.gisPosition.center = action.payload.center;
      state.gisPosition.zoom = action.payload?.zoom || state.gisPosition.zoom;
    },
    gisSetBackground: (state, action: PayloadAction<BackgroundMapType>) => {
      state.background = action.payload;
    },
  },
});

export const { gisSetLocation, gisSetBackground } = gisInfoSlice.actions;

export default gisInfoSlice.reducer;
