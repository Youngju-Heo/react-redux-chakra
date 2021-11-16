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
        bg: mode("white", "#3b3b3b")(props),
        transitionProperty: "background-color",
        transitionDuration: "normal",
        lineHeight: "base",
      },
      "*::placeholder": {
        color: mode("gray.400", "whiteAlpha.400")(props),
      },
      "*, *::before, &::after": {
        borderColor: mode("gray.200", "whiteAlpha.300")(props),
        wordWrap: "break-word",
      },
    }),
  },
});

export default baseTheme;
