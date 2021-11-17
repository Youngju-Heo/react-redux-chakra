import React from "react";
import { Box, Center, Flex, FlexProps } from "@chakra-ui/react";
import { VertMenu } from "./vert-menu";
import { MdHelpOutline } from "react-icons/md";

export const LeftSide = (props: { children?: React.ReactNode } & FlexProps): JSX.Element => {
  const { children, ...rest } = props;

  return (
    <Flex flexDirection="column" w="80px" boxShadow="lg" {...rest}>
      <Box flexGrow={1} h="100px">
        <VertMenu>{!children ? undefined : children}</VertMenu>
      </Box>

      <Center h="50px">
        <MdHelpOutline size="30px" />
      </Center>
    </Flex>
  );
};
