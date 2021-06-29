import React from "react"
import { graphql, Link } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { GatsbyImage } from "gatsby-plugin-image"

import { pageLink } from "../helpers/pageLink"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SectionMenu from "../components/sectionMenu"

const Page = ({ data, location, pageContext }) => {
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
    <Layout
      locale={locale}
      sectionSlug={pageContext.sectionSlug}
      menuData={data.contentfulMenu}
      menuSubPages={data.contentfulMenuSubPages}
      location={location}
      type={showSectionMenu ? "" : "article"}
    >
      <Seo
        description={
          data.contentfulPage.metaDescription &&
          data.contentfulPage.metaDescription.metaDescription
        }
        title={data.contentfulPage.title}
        lang={locale}
      />

      <div className="l-constrained-narrow">
        {data.contentfulPage.parentPage && (
          <nav style={{ marginBottom: "39px" }}>
            {process.env.GATSBY_HIDE_MENU === "true" ? (
              <p>
                {locale === "fr" ? (
                  <>
                    Retour: <Link to="/fr/">Page d'accueil</Link>
                  </>
                ) : (
                  <>
                    Back to: <Link to="/en/">Home page</Link>
                  </>
                )}
              </p>
            ) : (
              <p>
                {locale === "fr" ? "Partie de" : "Part of"}:{" "}
                {pageLink(data.contentfulPage.parentPage)}
              </p>
            )}
          </nav>
        )}
        <h1 className={showSectionMenu ? "h2" : "article-heading"}>
          {data.contentfulPage.title}
        </h1>

        {showSectionMenu && <SectionMenu pages={data.menuPages.edges} />}

        {data.contentfulPage.mainContent &&
          renderRichText(data.contentfulPage.mainContent, {
            renderNode: {
              [BLOCKS.EMBEDDED_ASSET]: node => {
                return (
                  <figure>
                    {node.data.target.gatsbyImageData && (
                      <GatsbyImage
                        alt={node.data.target.description}
                        image={node.data.target.gatsbyImageData}
                      />
                    )}
                  </figure>
                )
              },
              [INLINES.ENTRY_HYPERLINK]: (node, children) => {
                return pageLink(node.data.target)
              },
              [BLOCKS.EMBEDDED_ENTRY]: node => {
                // todo add some type checking here & returns for multiple types
                return (
                  <div
                    style={{
                      padding: "0 1rem",
                      border: "1px solid transparent",
                      background: "#f0f6fd",
                      margin: "0 0 1.25rem",
                    }}
                  >
                    {node.data.target.text &&
                      renderRichText(node.data.target.text)}
                  </div>
                )
              },
            },
            renderText: text =>
              text.split("\n").flatMap((text, i) => [i > 0 && <br />, text]),
          })}
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
            gatsbyImageData(placeholder: BLURRED)
            description
          }
          ... on ContentfulPage {
            __typename
            contentful_id
            slug
            title
            node_locale
            parentPage {
              slug
              parentPage {
                slug
              }
            }
          }
          ... on ContentfulHighlightText {
            __typename
            contentful_id
            text {
              raw
            }
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
      metaDescription {
        metaDescription
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
    contentfulMenu(title: { eq: "Main menu" }, node_locale: { eq: $locale }) {
      pages {
        title
        slug
        node_locale
        parentPage {
          slug
        }
      }
    }
    contentfulMenuSubPages: allContentfulPage(
      filter: { node_locale: { eq: $locale } }
      sort: { order: ASC, fields: menuOrder }
    ) {
      nodes {
        title
        slug
        node_locale
        parentPage {
          slug
        }
      }
    }
  }
`

export default Page
