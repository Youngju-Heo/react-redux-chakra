/* eslint-disable */
import { extendTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const baseTheme = extendTheme({
  fonts: {
    heading: "Noto Sans KR",
    body: "Noto Sans KR",
  },
  styles: {
    global: (props: StyleFunctionProps | Record<string, unknown>) => ({
      body: {
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("white", "#3b3b3b")(props)
      }
    }),
  },
});

export default baseTheme;
