import React from "react";
import { Box, Center, Icon, Text } from "@chakra-ui/react";
import { MdSentimentDissatisfied as ShowIcon } from "react-icons/md";
import { useAppSelector } from "../store/hooks";
import { Location } from "history";

export const UnderConstruction = (): JSX.Element => {
  const location = useAppSelector((state) => state.router.location) as Location;
  return (
    <Box w="100%" h="100%">
      <Center w="100%" h="100%">
        <Box>
          <Center>
            <Icon as={ShowIcon} boxSize={40} />
          </Center>
          <Center>
            <Text fontSize="xl"> 링크: [{location.pathname}] </Text>
          </Center>
          <Center>
            <Text fontSize="xl"> 페이지가 없거나, 잘못된 호출입니다. </Text>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};
