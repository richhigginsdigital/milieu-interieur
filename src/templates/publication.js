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
          data.contentfulPublication.metaDescription &&
          data.contentfulPublication.metaDescription.metaDescription
        }
        title={data.contentfulPublication.title}
        lang={locale}
      />

      <div className="l-constrained-narrow">
        <nav className="breadcrumb">
          <p>
            {locale === "fr" ? "Partie de" : "Part of"}:{" "}
            <Link to={`/${locale}/research/publications/`}>Publications</Link>
          </p>
        </nav>

        <h1 className="article-heading">{data.contentfulPublication.title}</h1>

        {data.contentfulPublication.authors &&
          renderRichText(data.contentfulPublication.authors, {
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

        <p>{data.contentfulPublication.dateAndPage.dateAndPage}</p>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $locale: String!) {
    contentfulPublication(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      id
      title
      slug
      authors {
        raw
      }
      metaDescription {
        metaDescription
      }
      dateAndPage {
        dateAndPage
      }
      journal
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
