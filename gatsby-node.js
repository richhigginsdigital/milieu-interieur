require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

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
const createContentfulEventPages = (pages, createPage) => {
  const pageTemplate = require.resolve("./src/templates/event.js")

  pages.forEach(page => {
    const path = `/${page.node_locale.replace(/-[A-Z]*/, "")}/events/${
      page.slug
    }/`

    createPage({
      path: path,
      component: pageTemplate,
      context: {
        slug: page.slug,
        locale: page.node_locale,
      },
    })
  })
}

const createContentfulPages = (pages, createPage) => {
  const pageTemplate = require.resolve("./src/templates/page.js")
  pages.forEach(page => {
    const path = page.parentPage
      ? page.parentPage.parentPage
        ? `/${page.node_locale.replace(/-[A-Z]*/, "")}/${
            page.parentPage.parentPage.slug
          }/${page.parentPage.slug}/${page.slug}/` // teriary page
        : `/${page.node_locale.replace(/-[A-Z]*/, "")}/${
            page.parentPage.slug
          }/${page.slug}/` // secondary page
      : `/${page.node_locale.replace(/-[A-Z]*/, "")}/${page.slug}/` // primary page

    const parentSlug = page.parentPage
      ? page.parentPage.parentPage
        ? page.parentPage.slug
        : page.slug
      : null

    const sectionSlug = page.parentPage
      ? page.parentPage.parentPage
        ? page.parentPage.parentPage.slug
        : page.parentPage.slug
      : page.slug

    createPage({
      path: path,
      component: pageTemplate,
      context: {
        slug: page.slug,
        locale: page.node_locale,
        parentSlug: parentSlug,
        sectionSlug: sectionSlug,
      },
    })
  })
}

const createPreviewPages = (pages, createPage) => {
  const pageTemplate = require.resolve("./src/templates/page.js")
  pages.forEach(page => {
    const path = `/preview/${page.node_locale.replace(/-[A-Z]*/, "")}/${
      page.slug
    }/` // primary page

    const parentSlug = page.parentPage
      ? page.parentPage.parentPage
        ? page.parentPage.slug
        : page.slug
      : null

    const sectionSlug = page.parentPage
      ? page.parentPage.parentPage
        ? page.parentPage.parentPage.slug
        : page.parentPage.slug
      : page.slug

    createPage({
      path: path,
      component: pageTemplate,
      context: {
        slug: page.slug,
        locale: page.node_locale,
        parentSlug: parentSlug,
        sectionSlug: sectionSlug,
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
          parentPage {
            slug
            parentPage {
              slug
            }
          }
        }
      }
      allContentfulEvent {
        nodes {
          slug
          node_locale
        }
      }
    }
  `)

  if (result.errors) {
    console.log(result.errors)
  } else {
    const { createPage } = actions
    createContentfulPages(result.data.allContentfulPage.nodes, createPage)
    createContentfulEventPages(result.data.allContentfulEvent.nodes, createPage)

    if (process.env.CONTENTFUL_HOST === "preview.contentful.com")
      createPreviewPages(result.data.allContentfulPage.nodes, createPage)
  }
}

const onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (process.env.GATSBY_HOLDING_PAGE === "true") {
    if (page.path === "/fr/") deletePage(page)
  } else {
    if (page.path.match(/^\/[a-z]{2}\/404\/$/)) {
      const oldPage = { ...page }
      // Get the language code from the path, and match all paths
      // starting with this code (apart from other valid paths)
      const langCode = page.path.split(`/`)[1]
      page.matchPath = `/${langCode}/*`
      // Recreate the modified page
      deletePage(oldPage)
      createPage(page)
    }
  }
}

module.exports =
  process.env.GATSBY_HOLDING_PAGE === "true"
    ? { onCreatePage }
    : { createPages, onCreatePage }
