import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const FrNotFoundPage = ({ data }) => {
  return (
    <Layout
      locale="fr"
      menuData={data.contentfulMenu}
      menuSubPages={data.contentfulMenuSubPages}
    >
      <Seo title="404: non trouvée" />
      <div
        style={{
          maxWidth: 600,
          margin: "auto",
        }}
      >
        <h1>Erreur 404</h1>
        <h2>Page non trouvée</h2>
        <p>Nous n'avons pas trouvé la page que vous recherchez.</p>
      </div>
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
    contentfulMenuSubPages: allContentfulPage(
      filter: { node_locale: { eq: "fr" } }
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

export default FrNotFoundPage
