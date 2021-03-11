import React from "react"
import { graphql, Link } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = ({ data, pageContext }) => {
  const locale = pageContext.locale.replace(/-[A-Z]*/, "")
  return (
    <Layout locale={locale}>
      <SEO title={data.contentfulPage.title} lang={locale} />
      <h1>{data.contentfulPage.title}</h1>
      {renderRichText(data.contentfulPage.mainContent, {
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
  query($slug: String!, $locale: String!) {
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
  }
`

export default Page
