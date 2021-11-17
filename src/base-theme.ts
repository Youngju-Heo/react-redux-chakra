/* eslint-disable */
import { extendTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const baseTheme = extendTheme({
  colors: {
    initialColorMode: 'dark',
  },
  fonts: {
    heading: "Noto Sans KR",
    body: "Noto Sans KR",
  },
  styles: {
    global: (props: StyleFunctionProps | Record<string, unknown>) => ({
      "html, body": {
        color: mode("gray.800", "#b1b1b1")(props),
        bg: mode("white", "#464545")(props),
        transitionProperty: "background-color",
        transitionDuration: "normal",
        lineHeight: "base",
        height: "100%",
        overflow: "hidden",
      },
      label: {
        m: 0,
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
  variants: {
    "vert-menu": {
      mt: 0,
    },
  },
});

export default baseTheme;
