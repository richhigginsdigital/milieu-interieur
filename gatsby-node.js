require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

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

const createContentfulPublicationPages = (pages, createPage) => {
  const pageTemplate = require.resolve("./src/templates/publication.js")

  pages.forEach(page => {
    const path = `/${page.node_locale.replace(
      /-[A-Z]*/,
      ""
    )}/research/publications/${page.slug}/`

    if (!page.link) {
      createPage({
        path: path,
        component: pageTemplate,
        context: {
          slug: page.slug,
          locale: page.node_locale,
        },
      })
    }
  })
}

const createContentfulEventListPages = (pages, createPage) => {
  const pageTemplate = require.resolve("./src/templates/eventListing.js")
  const events = pages
  const eventsPerPage = 2
  const numEvents = Math.ceil(events.length / eventsPerPage)

  Array.from({ length: numEvents }).forEach((_, i) => {
    const locales = ["en-US", "fr"]

    locales.forEach(locale => {
      createPage({
        path:
          i === 0
            ? `/${locale.replace(/-US/, "")}/events/`
            : `/${locale.replace(/-US/, "")}/events/${i + 1}/`,
        component: pageTemplate,
        context: {
          limit: eventsPerPage,
          skip: i * eventsPerPage,
          numEvents,
          currentPage: i + 1,
          locale,
        },
      })
    })
  })
}

const createContentfulPublicationListPages = (pages, createPage) => {
  const pageTemplate = require.resolve("./src/templates/publicationListing.js")
  const publications = pages
  const publicationsPerPage = 2
  const numPublications = Math.ceil(publications.length / publicationsPerPage)

  Array.from({ length: numPublications }).forEach((_, i) => {
    const locales = ["en-US", "fr"]

    locales.forEach(locale => {
      createPage({
        path:
          i === 0
            ? `/${locale.replace(/-US/, "")}/research/publications/`
            : `/${locale.replace(/-US/, "")}/research/publications/${i + 1}/`,
        component: pageTemplate,
        context: {
          limit: publicationsPerPage,
          skip: i * publicationsPerPage,
          numPublications,
          currentPage: i + 1,
          locale,
        },
      })
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

    if (process.env.GATSBY_HIDE_MENU === "true") {
      if (page.slug === "collaborations") {
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
      }
    } else if (!page.slug.match(/events|publications/)) {
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
    }
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
      allContentfulPublication {
        nodes {
          slug
          node_locale
          link
        }
      }
    }
  `)

  if (result.errors) {
    console.log(result.errors)
  } else {
    const { createPage } = actions
    createContentfulPages(result.data.allContentfulPage.nodes, createPage)

    if (process.env.GATSBY_HIDE_MENU !== "true") {
      createContentfulEventPages(
        result.data.allContentfulEvent.nodes,
        createPage
      )
      createContentfulEventListPages(
        result.data.allContentfulEvent.nodes,
        createPage
      )
      createContentfulPublicationListPages(
        result.data.allContentfulPublication.nodes,
        createPage
      )

      createContentfulPublicationPages(
        result.data.allContentfulPublication.nodes,
        createPage
      )
    }

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
