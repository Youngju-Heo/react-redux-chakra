import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

export const MainStatus = (props: { children?: React.ReactNode } & BoxProps): JSX.Element => {
  const { children, ...rest } = props;
  return (
    <Box h={10} bg="rgba(13,16,31,.3)" {...rest}>
      {!children ? undefined : children}
    </Box>
  );
};
