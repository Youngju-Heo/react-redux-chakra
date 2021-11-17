import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

export const RightSide = (props: { children?: React.ReactNode } & FlexProps): JSX.Element => {
  const { children, ...rest } = props;

  return (
    <Flex flexGrow={1} flexDirection="column" {...rest}>
      {!children ? undefined : children}
    </Flex>
  );
};
