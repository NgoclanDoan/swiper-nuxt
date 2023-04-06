const { ThemeBuilder, Theme } = require("tailwindcss-theming");

const mainTheme = new Theme()
  .colors({
    ...require("./config/tailwind/colors")
  })
  .opacityVariant("25", 0.25)
  .opacityVariant("50", 0.5)
  .opacityVariant("75", 0.75);

module.exports = new ThemeBuilder().default(mainTheme);
