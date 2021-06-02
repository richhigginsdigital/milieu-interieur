import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const EnNotFoundPage = ({ data }) => {
  return (
    <Layout locale="en" menuData={data.contentfulMenu}>
      <Seo title="404: Not found" />
      <div
        style={{
          maxWidth: 600,
          margin: "auto",
        }}
      >
        <h1>Error 404</h1>
        <h2>Page not found</h2>
        <p>We did not find the page you’re looking for.</p>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulMenu(title: { eq: "Main menu" }, node_locale: { eq: "en-US" }) {
      pages {
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

export default EnNotFoundPage
