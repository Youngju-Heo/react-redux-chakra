import {extendTheme} from "@chakra-ui/react";

const baseTheme = extendTheme({
  initialColorMode: 'light',
  colorMode:"light",
  fonts: {
    heading: "Noto Sans KR",
    body: "Noto Sans KR",
  },
});

export default baseTheme;
