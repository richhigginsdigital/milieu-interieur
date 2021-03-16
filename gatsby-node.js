/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const createContentfulPages = (pages, createPage) => {
  const pageTemplate = require.resolve("./src/templates/page.js")
  pages.forEach(page => {
    createPage({
      path: `/${page.node_locale.replace(/-[A-Z]*/, "")}/${page.slug}/`,
      component: pageTemplate,
      context: {
        slug: page.slug,
        locale: page.node_locale,
        section: page.section,
      },
    })
  })
}

const createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      allContentfulPage {
        nodes {
          slug
          node_locale
          section
        }
      }
    }
  `)

  if (result.errors) {
    console.log(result.errors)
  } else {
    const { createPage } = actions
    createContentfulPages(result.data.allContentfulPage.nodes, createPage)
  }
}

module.exports = {
  createPages,
}
