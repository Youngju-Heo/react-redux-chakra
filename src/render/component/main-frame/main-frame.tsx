import React from "react";
import { BoxProps, Flex } from "@chakra-ui/react";

export const MainFrame = (props: { children?: React.ReactNode } & BoxProps): JSX.Element => {
  const { children, ...rest } = props;
  return (
    <Flex flexGrow={1} h="100%" overflow="hidden" {...rest}>
      {!children ? undefined : children}
    </Flex>
  );
};
