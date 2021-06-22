import React from "react"
import { graphql, Link } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { GatsbyImage } from "gatsby-plugin-image"

import { pageLink } from "../helpers/pageLink"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Page = ({ data, location, pageContext }) => {
  const locale = pageContext.locale.replace(/-[A-Z]*/, "")

  return (
    <Layout
      locale={locale}
      menuData={data.contentfulMenu}
      menuSubPages={data.contentfulMenuSubPages}
      location={location}
      type="article"
    >
      <Seo
        description={
          data.contentfulEvent.metaDescription &&
          data.contentfulEvent.metaDescription.metaDescription
        }
        title={data.contentfulEvent.title}
        lang={locale}
      />

      <div className="l-constrained-narrow">
        <nav style={{ marginBottom: "39px" }}>
          <p>
            {locale === "fr" ? "Partie de" : "Part of"}:{" "}
            <Link to={`/${locale}/events/`}>
              {locale === "fr" ? "Événements" : "Events"}
            </Link>
          </p>
        </nav>

        <h1 className="article-heading">{data.contentfulEvent.title}</h1>

        <p style={{ marginBottom: "2rem" }}>
          Date: {data.contentfulEvent.date}
        </p>

        {data.contentfulEvent.mainContent &&
          renderRichText(data.contentfulEvent.mainContent, {
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
            },
          })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $locale: String!) {
    contentfulEvent(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      id
      title
      slug
      date(formatString: "DD MMMM YYYY")
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
            title
            node_locale
            parentPage {
              slug
              parentPage {
                slug
              }
            }
          }
        }
      }
      metaDescription {
        metaDescription
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
