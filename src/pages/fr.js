import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Hero from "../components/hero"
import ConsortiumLogos from "../components/consortiumLogos"

const FrIndexPage = ({ data }) => {
  return (
    <Layout locale="fr" menuData={data.contentfulMenu}>
      <Seo title="Home" lang="fr" />
      <Hero
        locale="fr"
        text={data.contentfulHomepage.missionStatement.missionStatement}
        video={data.contentfulHomepage.videoUrl}
      />

      <div className="l-constrained" style={{ marginBottom: "2rem" }}>
        <h2>Membres du consortium</h2>

        <ConsortiumLogos logos={data.contentfulHomepage.consortiumLogos} />

        {
          //<h2>Publications</h2>
          //<h2>Events</h2>
        }
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulHomepage(title: { eq: "Homepage" }, node_locale: { eq: "fr" }) {
      missionStatement {
        missionStatement
      }
      videoUrl
      consortiumLogos {
        gatsbyImageData(width: 104, placeholder: BLURRED)
        description
      }
    }
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
