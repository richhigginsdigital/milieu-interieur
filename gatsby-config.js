require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const RichTextRenderer = require("@contentful/rich-text-plain-text-renderer")

const myQuery = `{
  pages: allContentfulPage {
    nodes {
      objectID:id
      title
      slug
      parentPage {
        slug
        parentPage {
          slug
        }
      }
      mainContent{
        raw
      }
      node_locale
      updatedAt
    }
  }
}`

const queries = [
  {
    query: myQuery,
    transformer: ({ data }) => {
      return data.pages.nodes.map(node => {
        if (node.mainContent) {
          node.mainContent = RichTextRenderer.documentToPlainTextString(
            JSON.parse(node.mainContent.raw)
          )
        }
        return node
      })
    }, // optional
    //    indexName: "index name to target", // overrides main index name, optional
    //    settings: {
    // optional, any index settings
    // Note: by supplying settings, you will overwrite all existing settings on the index
    //    },
    //    matchFields: ["slug", "modified"], // Array<String> overrides main match fields, optional
  },
]

module.exports = {
  siteMetadata: {
    title: `Milieu Intérieur`,
    description: `The Milieu Intérieur project provides insight into the core of human diversity by dissecting the interplay between genetics and environment and their impact on the immune system.`,
    author: `@institutpasteur`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icons: [],
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID, // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-google-analytics", // default
          anonymize: true, // default
          allowAdFeatures: false, // default
        },
        /*        googleTagManager: {
          trackingId: 'YOUR_GOOGLE_TAG_MANAGER_TRACKING_ID', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-tagmanager', // default
          dataLayerName: 'dataLayer', // default
        },
        facebookPixel: {
          pixelId: 'YOUR_FACEBOOK_PIXEL_ID', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-facebook-pixel', // default
        },*/
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ["production", "development"],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        // Use Admin API key without GATSBY_ prefix, so that the key isn't exposed in the application
        // Tip: use Search API key with GATSBY_ prefix to access the service from within components
        apiKey: process.env.ALGOLIA_WRITE_API_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME, // for all queries
        queries,
        chunkSize: 10000, // default: 1000
        settings: {
          attributesToSnippet: ["mainContent"],
          snippetEllipsisText: "…",
          attributesForFaceting: ["node_locale"],
        },
        enablePartialUpdates: false, // default: false
        matchFields: ["updatedAt"], // Array<String> default: ['modified']
        concurrentQueries: false, // default: true
        skipIndexing: false, // default: false, useful for e.g. preview deploys or local development
      },
    },
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-svgr`,
      options: {
        svgoConfig: {
          plugins: [
            { removeViewBox: false }, // always keep the viewBox please, ta
            { prefixClassNames: false },
            { prefixIds: false },
          ],
        },
      },
    },
  ],
  // your existing config
  flags: {
    FAST_REFRESH: true,
  },
}
