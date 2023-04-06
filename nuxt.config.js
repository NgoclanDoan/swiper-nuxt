const { tinycolor } = require("@ctrl/tinycolor");
const colors = require(`./config/tailwind/colors.json`);

let customProperties = {
  "--opacity-variant-25": "0.25",
  "--opacity-variant-50": "0.5",
  "--opacity-variant-75": "0.75",
  "--color-transparent": "0,0,0"
};
for (const key in colors) {
  customProperties[`--color-${key}`] = Object.values(
    tinycolor(colors[key]).toRgb()
  )
    .slice(0, -1)
    .join(",");
}

export default {
  /*
   ** Headers of the page
   ** Doc: https://vue-meta.nuxtjs.org/api/#metainfo-properties
   */
  head: {
    title: "Nuxt - Swiper.js integration example",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Official Nuxt.js starter for CodeSandBox"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Global CSS
   ** Doc: https://nuxtjs.org/api/configuration-css
   */
  css: ["assets/styles/index"],

  /*
   ** Plugins to load before mounting the App
   ** Doc: https://nuxtjs.org/guide/plugins
   */
  plugins: ["./plugins/global"],

  /*
   ** Nuxt.js modules
   ** Doc: https://nuxtjs.org/guide/modules
   */
  modules: [
    // Doc: https://http.nuxtjs.org
    "@nuxt/http",
    // TODO: Remove it if you want to eject from codeSandbox
    "./codesandbox",
    "@nuxtjs/svg-sprite"
  ],

  buildModules: ["nuxt-purgecss"],

  /*
   ** HTTP module configuration
   */
  http: {
    // See https://http.nuxtjs.org/api/#options
  },

  /*
   ** Build configuration
   ** Doc: https://nuxtjs.org/api/configuration-build
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    babel: {
      plugins: [
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator"
        // 'babel-plugin-dynamic-import-polyfill'
      ]
    },
    postcss: {
      // Allows the use of single line comments
      // in .pscss and .vue files
      parser: "postcss-comment",
      plugins: {
        "postcss-import": {},
        tailwindcss: {},
        "postcss-nested": {},
        "postcss-hexrgba": {},
        "postcss-custom-properties": {
          importFrom: [{ customProperties }]
        },
        autoprefixer: {}
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true
        }
      }
    },
    transpile: ["swiper"]
  },
  purgeCSS: {
    mode: "postcss",
    whitelist: ["svg-defs"],
    whitelistPatterns: [/^(w-\D)\w+/, /^v-lazy-/, /^swiper/, /^svg-icon/]
  },
  svgSprite: {
    input: `~/assets/icons`,
    output: "~/assets/sprite",
    publicPath: "/_nuxt/",
    iconsPath: false,
    elementClass: "svg-icon"
  }
};
