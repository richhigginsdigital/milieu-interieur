import React from "react"
import { graphql, Link } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { GatsbyImage } from "gatsby-plugin-image"

import { pageLink } from "../helpers/pageLink"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = ({ data, pageContext }) => {
  const locale = pageContext.locale.replace(/-[A-Z]*/, "")

  return (
    <Layout locale={locale}>
      <small style={{ position: "absolute", top: 0 }}>
        sectionSlug:{pageContext.sectionSlug}, parentSlug:
        {pageContext.parentSlug}
      </small>
      <SEO title={data.contentfulPage.title} lang={locale} />
      <div>Section navigation</div>
      <nav>
        <ul>
          {data.menuPages.edges.map(page => (
            <li>
              {pageLink(page.node)}

              {page.node.slug === pageContext.parentSlug && (
                <ul>
                  {data.menuSubPages.edges.map(page => (
                    <li>{pageLink(page.node)}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {data.contentfulPage.parentPage.parentPage && (
        <>Part of: {pageLink(data.contentfulPage.parentPage)}</>
      )}

      <h1>{data.contentfulPage.title}</h1>
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
          redirectPage {
            slug
            parentPage {
              slug
              parentPage {
                slug
              }
            }
            node_locale
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
          redirectPage {
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
