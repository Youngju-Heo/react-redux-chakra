import React from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  decrement,
  decrementAsync,
  increment,
  incrementAsync,
  incrementByAmount,
} from "../store/counter/counter-slice";

export const Counter = (): JSX.Element => {
  const count = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <Box>
      <HStack spacing="1">
        <Button aria-label="Double Increment value" onClick={() => dispatch(incrementByAmount(2))}>
          Double Increment
        </Button>
        <Button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Button aria-label="Async Increment Value" onClick={() => incrementAsync(30)}>
          Async Increment
        </Button>
      </HStack>
      <br />
      <span>{count.value}</span>
      <br />
      <HStack spacing={1}>
        <Button aria-label="Decrement value" onClick={() => dispatch(incrementByAmount(-2))}>
          Double Decrement
        </Button>
        <Button aria-label="Double Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
        <Button aria-label="Async Decrement value" onClick={() => decrementAsync(30)}>
          Async Decrement
        </Button>
      </HStack>
    </Box>
  );
};
