const path = require("path")
const fs = require("fs-extra")

const envPath = `.env.${process.env.NODE_ENV}`

require("dotenv").config({ path: envPath })

const drupalSourceUrl = process.env.GATSBY_DRUPAL_API_ROOT
const drupalUserName = process.env.GATSBY_DRUPAL_API_USER_NAME
const drupalUserPass = process.env.GATSBY_DRUPAL_API_USER_PASS
const fastBuild = process.env.GATSBY_FASTBUILD || false

module.exports = {
  siteMetadata: {
    title: "Elke Haarer",
    description: "Artist living in Nürnberg, Germany",
  },
  plugins: [
    {
      resolve: "gatsby-source-drupal",
      options: {
        baseUrl: drupalSourceUrl,
        basicAuth: {
          username: drupalUserName,
          password: drupalUserPass,
        },
        // translation: true,
        // fastBuilds: fastBuild,
        concurrentFileRequests: 10,
      },
    },
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          "~src": "src",
          "~components": "src/components",
          "~pages": "src/pages",
          "~layouts": "src/layouts",
          "~theme": "src/theme",
          "~utils": "src/utils/utils.js",
        },
        extensions: ["js, jsx"],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: ["sen", "open sans"],
        display: "swap",
      },
    },
    {
      resolve: "gatsby-plugin-theme-switcher",
      options: {
        defaultLightTheme: "theme-default",
        defaultDarkTheme: "theme-yellow",
        // minify: true,
      },
    },
    // "gatsby-plugin-material-ui",
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/gatsby-icon.png", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-gatsby-cloud",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
