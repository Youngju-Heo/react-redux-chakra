import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GisViewPosition {
  center: number[];
  zoom?: number;
}

export interface GisInfoState {
  gisPosition: { center: number[]; zoom: number };
}

const initialState: GisInfoState = {
  gisPosition: {
    center: [126.8915302, 37.4858711],
    zoom: 15,
  },
};

export const gisInfoSlice = createSlice({
  name: "gisInfo",
  initialState,
  reducers: {
    gisSetLocation: (state, action: PayloadAction<GisViewPosition>) => {
      state.gisPosition.center = action.payload.center;
      state.gisPosition.zoom = action.payload?.zoom || state.gisPosition.zoom;
    },
  },
});

export const { gisSetLocation } = gisInfoSlice.actions;

export default gisInfoSlice.reducer;
