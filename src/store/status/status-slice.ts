/* eslint-disable no-console */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "../index";

export interface statusState {
  message: string;
}

const initialState: statusState = {
  message: "",
};

export const statusSlice = createSlice({
  name: "status",
  initialState: initialState,
  reducers: {
    updateMessage: (state, action: PayloadAction<string>) => {
      console.log("update-message:", action.payload);
      state.message = action.payload;
    },
  },
});

export const updateStatus = (msg: string): void => {
  store.dispatch(statusSlice.actions.updateMessage(msg));
};

export const selectStatus = (state: RootState) => state.status.message as string;

export default statusSlice.reducer;
