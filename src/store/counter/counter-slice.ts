import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "../index";
import { AwaitTimeout } from "../../common/await-timeout";

export interface counterState {
  value: number;
}

const initialState: counterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const incrementAsync = (amount: number) => {
  setTimeout(() => {
    store.dispatch(incrementByAmount(amount));
  }, 3000);
};

export const decrementAsync = (amount: number) => {
  const execute = async () => {
    await AwaitTimeout(3000);
    store.dispatch(incrementByAmount(-amount));
  };

  // eslint-disable-next-line no-console
  execute().catch((event) => console.error(event));
};

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
