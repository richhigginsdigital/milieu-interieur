import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const FrIndexPage = ({ data }) => {
  return (
    <Layout locale="fr" menuData={data.contentfulMenu}>
      <Seo title="Home" lang="fr" />
      <h1 style={{ fontFamily: "georgia, serif" }}>
        Le projet Milieu Intérieur pose un regard inédit sur le système
        immunitaire humain en examinant les facteurs génétiques et
        environnementaux contribuant à la variabilité des réponses immunitaires.
      </h1>
      <p>[+ homepage content modules]</p>
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
