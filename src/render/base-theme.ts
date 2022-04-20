/* eslint-disable */
import { extendTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const baseTheme = extendTheme({
  colors: {
    initialColorMode: 'dark',
    brand: {
      darkBg: "#464545",
      lightBg: "#CBD5E0",
      fg: "#EDF2F7",
      darkTitleBg: "#ffffff20",
      lightTitleBg: "#00000020",
      darkBoxBg: "#ffffff10",
      lightBoxBg: "#00000010",
      darkWarning: "#cbae1e",
      lightWarning: "#ECC94B",
      darkError: "#ff1010",
      lightError: "#FC8181",
      darkNormal: "#007a00",
      lightNormal: "#03a903",
    },
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
  components: {
    Button: {
      baseStyle: {
        fontWeight: "normal",
      }
    }
  },
  variants: {
    "vert-menu": {
      mt: 0,
    },
  },
});

export default baseTheme;
