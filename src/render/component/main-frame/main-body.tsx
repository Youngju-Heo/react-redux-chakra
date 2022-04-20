import React from "react";
import { Box, FlexProps } from "@chakra-ui/react";

export const MainBody = (props: { children?: React.ReactNode } & FlexProps): JSX.Element => {
  const { children, ...rest } = props;
  return (
    <Box h={100} flexGrow={1} {...rest}>
      {!children ? undefined : children}
    </Box>
  );
};
