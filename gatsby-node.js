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
      path: `/${page.slug}/`,
      component: pageTemplate,
      context: {
        slug: page.slug,
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
