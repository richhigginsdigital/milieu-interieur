import React from "react"
import { graphql, Link } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = ({ data, pageContext }) => {
  const locale = pageContext.locale.replace(/-[A-Z]*/, "")

  // TODO loop through allContentfulSectionMenu making
  // subpages into properties for nested map() iteration
  // something like {...pages[{title:'this page', slug:'this-page', subpages:[{'this page', slug:'this-page'}, {'this page', slug:'this-page'}]}

  return (
    <Layout locale={locale}>
      <SEO title={data.contentfulPage.title} lang={locale} />

      {/*<nav>
        <ul>
          {data.allContentfulSectionMenu.edges[0].node.pages.map(page => {
            return (
              <>
                {page.redirectTo ? (
                  <li>
                    <Link
                      to={`/${locale}/${page.redirectTo.parentPage.slug}/${page.redirectTo.slug}/`}
                    >
                      {page.title}
                    </Link>
                  </li>
                ) : page.parentPage ? (
                  // handle sublist open/closing
                  <ul>
                    <li>
                      <Link
                        to={`/${locale}/${page.parentPage.slug}/${page.slug}/`}
                      >
                        {page.title}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <li>
                    <Link
                      style={{ fontWeight: "bold" }}
                      to={`/${locale}/${page.slug}/`}
                    >
                      {page.title}
                    </Link>
                  </li>
                )}
              </>
            )
          })}
        </ul>
      </nav>*/}
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
  query($slug: String!, $locale: String!, $section: String) {
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
    }
    allContentfulSectionMenu(
      filter: { title: { eq: $section }, node_locale: { eq: $locale } }
    ) {
      edges {
        node {
          id
          node_locale
          pages {
            ... on ContentfulPage {
              slug
              title
              redirectTo {
                slug
                parentPage {
                  slug
                }
              }
            }
            ... on ContentfulSubPage {
              slug
              title
              parentPage {
                slug
              }
            }
          }
        }
      }
    }
  }
`

export default Page
