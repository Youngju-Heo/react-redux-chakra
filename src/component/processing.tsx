import React from "react";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";

export const Processing = (props: { message?: string }): JSX.Element => {
  return (
    <Box w="100%" h="100%">
      <Center w="100%" h="100%">
        <Box>
          <Center>
            <Spinner thickness="4px" speed="1s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Center>
          <Center>
            <Text fontSize="lg">{props.message || "진행 중입니다"}</Text>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};
