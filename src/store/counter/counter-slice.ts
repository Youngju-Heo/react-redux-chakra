import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import store, {RootState} from "../index";

export interface counterState {
    value: number
}

const initialState: counterState = {
    value: 0
}


export const counterSlice = createSlice({
    name: 'counter',
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
        }
    },
})

export const {increment, decrement, incrementByAmount} = counterSlice.actions;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const incrementAsync = (amount: number) => {
    setTimeout(() => {
        store.dispatch(incrementByAmount(amount));
    }, 1000);
}

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
