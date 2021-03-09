import React from "react"
import { graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS } from "@contentful/rich-text-types"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = ({ data }) => (
  <Layout>
    <SEO title={data.contentfulPage.title} />
    <h1>{data.contentfulPage.title}</h1>
    {renderRichText(data.contentfulPage.mainContent, {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: node => {
          return <GatsbyImage image={node.data.target.gatsbyImageData} />
        },
      },
    })}
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      id
      title
      slug
      mainContent {
        raw
        references {
          ... on ContentfulAsset {
            __typename
            contentful_id
            gatsbyImageData(width: 920)
          }
        }
      }
    }
  }
`

export default Page
