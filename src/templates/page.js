import React from "react"
import { graphql, Link } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { GatsbyImage } from "gatsby-plugin-image"

import { pageLink } from "../helpers/pageLink"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SectionMenu from "../components/sectionMenu"

const Page = ({ data, pageContext }) => {
  const locale = pageContext.locale.replace(/-[A-Z]*/, "")

  data.menuPages.edges.forEach((item, index) => {
    const childPages = data.allMenuSubPages.edges.filter(
      page => page.node.parentPage.slug === item.node.slug
    )
    data.menuPages.edges[index].node.childPages = childPages
  })

  const showSectionMenu =
    !data.contentfulPage.parentPage && data.menuPages.edges.length
      ? true
      : false

  return (
    <Layout locale={locale} sectionSlug={pageContext.sectionSlug}>
      <SEO title={data.contentfulPage.title} lang={locale} />

      <div style={{ maxWidth: "827px", margin: "auto" }}>
        {data.contentfulPage.parentPage && (
          <nav style={{ marginBottom: "39px", textAlign: "center" }}>
            Part of: {pageLink(data.contentfulPage.parentPage)}
          </nav>
        )}
        <h1 style={{ textAlign: "center" }}>{data.contentfulPage.title}</h1>

        {showSectionMenu && <SectionMenu pages={data.menuPages.edges} />}

        {data.contentfulPage.mainContent &&
          renderRichText(data.contentfulPage.mainContent, {
            renderNode: {
              [BLOCKS.EMBEDDED_ASSET]: node => {
                return (
                  <GatsbyImage
                    alt={node.data.target.description}
                    image={node.data.target.gatsbyImageData}
                  />
                )
              },
              [INLINES.ENTRY_HYPERLINK]: (node, children) => {
                const localePrefix =
                  node.data.target.node_locale === "fr" ? `fr` : `en`

                return (
                  <Link to={`/${localePrefix}/${node.data.target.slug}/`}>
                    {children[0]}
                  </Link>
                )
              },
            },
          })}

        {data.contentfulPage.slug === "publications" && (
          // Algolia instantsearch component
          <pre>&lt;Publications listing component /&gt;</pre>
        )}

        {data.contentfulPage.slug === "events" && (
          // Algolia instantsearch component
          <pre>&lt;Events listing component /&gt;</pre>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query(
    $slug: String!
    $locale: String!
    $parentSlug: String
    $sectionSlug: String
  ) {
    contentfulPage(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      id
      title
      slug
      mainContent {
        raw
        references {
          ... on ContentfulAsset {
            __typename
            contentful_id
            gatsbyImageData(width: 663, placeholder: BLURRED)
            description
          }
          ... on ContentfulPage {
            __typename
            contentful_id
            slug
            node_locale
          }
        }
      }
      parentPage {
        title
        slug
        node_locale
        parentPage {
          slug
        }
      }
    }
    menuPages: allContentfulPage(
      filter: {
        parentPage: { slug: { eq: $sectionSlug }, node_locale: { eq: $locale } }
      }
      sort: { order: ASC, fields: menuOrder }
    ) {
      edges {
        node {
          title
          slug
          parentPage {
            slug
          }
          node_locale
        }
      }
    }
    menuSubPages: allContentfulPage(
      filter: {
        parentPage: { slug: { eq: $parentSlug }, node_locale: { eq: $locale } }
      }
      sort: { order: ASC, fields: menuOrder }
    ) {
      edges {
        node {
          title
          slug
          parentPage {
            slug
            parentPage {
              slug
            }
          }
          node_locale
        }
      }
    }
    allMenuSubPages: allContentfulPage(
      filter: {
        parentPage: { parentPage: { slug: { eq: $sectionSlug } } }
        node_locale: { eq: $locale }
      }
      sort: { order: ASC, fields: menuOrder }
    ) {
      edges {
        node {
          id
          title
          slug
          parentPage {
            slug
            parentPage {
              slug
            }
          }
          node_locale
        }
      }
    }
  }
`

export default Page
