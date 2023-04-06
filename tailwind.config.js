// Uncomment this if you need some values from the default theme
const defaultTheme = require("tailwindcss/defaultTheme");
const { mapObject } = require("./utils/helpers");

module.exports = {
  purge: false,
  important: true,
  theme: {
    screens: mapObject(
      require("./config/tailwind/breakpoints"),
      (size) => `${size}px`
    ),
    fontSize: require("./config/tailwind/fontSize"),
    fontFamily: {
      lato: ["Lato", ...defaultTheme.fontFamily.sans],
      ubuntu: ["Ubuntu", ...defaultTheme.fontFamily.sans]
    },
    spacing: require("./config/tailwind/spacing"),
    boxShadow: require("./config/tailwind/boxShadow"),
    extend: {
      screens: {
        // https://medium.com/@ferie/detect-a-touch-device-with-only-css-9f8e30fa1134
        fine: { raw: "(hover: hover) and (any-pointer: fine)" }
      },
      colors: {
        transparent: "transparent",
        inherit: "inherit"
      },
      zIndex: {
        1: "1",
        "-1": "-1",
        2: "2",
        100: "100",
        max: "9999"
      },
      height: {
        "75vh": "75vh",
        "50vh": "50vh",
        "1/2": "50%",
        none: "none"
      },
      width: {
        "75vw": "75vw",
        "50vw": "50vw",
        none: "none"
      },
      minWidth: (theme) => theme("width"),
      maxWidth: (theme) => theme("width"),
      minHeight: (theme) => theme("height"),
      maxHeight: (theme) => theme("height"),
      borderRadius: {
        lg: "0.625rem",
        xl: "1.25rem",
        xxl: "2rem"
      },
      transitionProperty: {
        height: "height",
        "max-height": "max-height"
      },
      backgroundColor: {
        inherit: "inherit"
      },
      // Since we use shitty OptinMonster we can't use animations with default names
      keyframes: {
        "tw-pulse": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 }
        }
      },
      animation: {
        "tw-pulse": "tw-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      },
      margin: {
        "-1/4": "-25%"
      }
    }
  },
  corePlugins: {
    container: false
  },
  variants: {
    display: ["responsive", "first", "last"],
    margin: ["responsive", "first", "last"],
    borderWidth: ["responsive", "first", "last"],
    borderRadius: ["responsive", "first", "last"]
  },
  plugins: [
    require("./theme.config"),
    require("./config/tailwind/plugins/helpers")
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
  // experimental: {
  //   applyComplexClasses: true
  // }
};
