import React from "react";
import { Flex, FlexProps, Center, Spacer } from "@chakra-ui/react";
import { useAppSelector } from "../../store/hooks";
import { TimeWidget } from "../time-widget";

export const MainStatus = (props: FlexProps): JSX.Element => {
  const message = useAppSelector((state) => state.status.message);

  return (
    <Flex p={2} h={10} w="100%" bg="rgba(13,16,31,.3)" {...props}>
      <Center>{message}</Center>
      <Spacer />
      <Center>
        <TimeWidget />
      </Center>
    </Flex>
  );
};
