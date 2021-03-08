import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ComponentName = ({ data }) => (
  <Layout>
    <SEO title={data.contentfulPage.title} />
    <h1>{data.contentfulPage.title}</h1>
  </Layout>
)

// query($slug: String!, $sectionSlug: String!)

export const query = graphql`
  query($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      id
      title
      slug
    }
  }
`

export default ComponentName
