import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import Color from "@/constants/Color";

const breakpoints = {
  sm: "23.5em",
  md: "60em",
  lg: "90em",
  xl: "120em",
};

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  colors: {
    secound: {
      0: "#14CABC",
    },
    green: {
      0: "#14CABC",
    },
    primary: {
      0: "#276EF3",
      dark: {
        10: "#2767c6",
        20: "#225BAF",
        40: "#1a4483",
        60: "#112e58",
        80: "#09172c",
      },
      light: {
        10: "#4090df",
        20: "#558ee2",
        40: "#80aae9",
        60: "#aac7f1",
        80: "#d5e3f8",
      },
      hover: "#225BAF",
      border: "#215baf",
    },
    secondary1: {
      0: "#655bee",
      hover: "#5149be",
    },
    secondary2: {
      0: "#14cabc",
      hover: "#0fa296",
    },

    error: "#fa9096",
    success: "#46ada7",
    waring: "#f6925a",

    neutral: {
      header: "#171D33",
      body: "#30384B",
      subhead: "#8A97AB",
      subbody: "#B2BAC8",
      lineDisable: "#D7DDE5",
      bg: "#ECF1F4",
      border: "#ECEDEF",
    },

    orange: {
      50: "#ffe7e1",
      100: "#ffbfb5",
      200: "#f99787",
      300: "#f46e57",
      400: "#f04629",
      500: "#d62d0f",
      600: "#a8220b",
      700: "#781706",
      800: "#4a0b01",
      900: "#200100",
    },
    spaceblue: {
      50: "#e1efff",
      100: "#b4ceff",
      200: "#84aefb",
      300: "#548df7",
      400: "#266df3",
      500: "#0c54d9",
      600: "#0441aa",
      700: "#002e7b",
      800: "#001c4c",
      900: "#00091f",
    },
  },
  components: {
    Modal: {
      baseStyle: (props: any) => ({
        dialog: {
          bg: mode("white", "#161925")(props),
        },
      }),
    },
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  breakpoints,

  styles: {
    global: (props: any) => ({
      body: {
        color: mode("#262626", "white")(props),
        overflowX: "hidden",
        bg: mode("#FBFBFC", "#1E1E1E")(props),
        // background: "primary.0",
        // backgroundImage: "linear-gradient(90deg, #2c72db 0%, #6a98de 100%)",
        // backgroundImage: "/assets/images/bg.svg",
        // color: mode("gray.800", "whiteAlpha.900")(props),
        lineHeight: "base",
        backgroundPosition: "0 -10vh",
        backgroundRepeat: "no-repeat",
        justifyContent: "center",
        backgroundSize: "cover",
        // backgroundPosition: "center",
      },
      ".text-primary": {
        color: mode(Color.PRIMARY_LIGHT, Color.PRIAMRY_DARK)(props),
      },
      "text-white": {
        color: mode(Color.PRIAMRY_DARK, Color.PRIAMRY_DARK)(props),
      },
      ".text-normal": {
        color: mode(Color.NORMAL_LIGHT, Color.NORMAL_DARK)(props),
      },
      ".home-title": {
        fontWeight: 900,
        fontSize: home_h1,
      },
      ".home-subtitle": {
        fontWeight: 900,
        fontSize: home_h2,
      },
      ".home-h3": {
        fontWeight: 900,
        fontSize: home_h3,
      },
      ".btn-launch-app": {},
      ".community-box": {
        color: mode(Color.NORMAL_LIGHT, Color.NORMAL_DARK)(props),
        bg: mode("#ffffff", "#222d3b")(props),

        borderRadius: "10px",
        border: "2px solid rgba(0, 0, 0, 0.05)",
      },
      ".portfolio-box": {
        color: mode(Color.NORMAL_LIGHT, Color.NORMAL_DARK)(props),
        bg: mode("#ffffff", "#222d3b")(props),
        textAlign: "center",
        borderRadius: "10px",
        border: "2px solid rgba(0, 0, 0, 0.05)",
      },
      ".community-icon": {
        paddingBottom: "15px",
      },
      ".pool-logo": {
        top: -30,
        right: -34,
        position: "absolute",
        zIndex: 1,
        width: 150,
      },
    }),
  },
});

const home_h1 = { base: "24px", md: "40", lg: "70" };
const home_h2 = { base: "20px", md: "30", lg: "60" };
const home_h3 = { base: "18px", md: "26px", lg: "36px" };

export default theme;
