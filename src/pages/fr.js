import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Hero from "../components/hero"

const FrIndexPage = ({ data }) => {
  return (
    <Layout locale="fr" menuData={data.contentfulMenu}>
      <Seo title="Home" lang="fr" />
      <Hero locale="fr" />
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulMenu(title: { eq: "Main menu" }, node_locale: { eq: "fr" }) {
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

export default FrIndexPage
