import React from "react"
import { graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ComponentName = ({ data }) => (
  <Layout>
    <SEO title={data.contentfulPage.title} />
    <h1>{data.contentfulPage.title}</h1>
    {renderRichText(data.contentfulPage.mainContent, {})}
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
      }
    }
  }
`

export default ComponentName
