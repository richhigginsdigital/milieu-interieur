import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Hero from "../components/hero"
import ConsortiumLogos from "../components/consortiumLogos"
import FundingAgencyLogos from "../components/fundingAgencyLogos"

const EnIndexPage = ({ data }) => {
  return (
    <Layout
      locale="en"
      menuData={data.contentfulMenu}
      menuSubPages={data.contentfulMenuSubPages}
      type="home"
    >
      <Seo title="Home" />

      {process.env.GATSBY_HOLDING_PAGE === "true" ? (
        <div
          style={{
            maxWidth: 680,
            margin: "auto",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>Milieu Intérieur Project</h1>
          </div>

          <section>
            <p>
              We are currently developing a new website for The Milieu Intérieur
              Project.
            </p>

            <p>
              To contact us please send an email to milieuinterieur@pasteur.fr.
            </p>
          </section>

          <section lang="fr">
            <p>
              Nous sommes en train de développer un nouveau site web pour le
              projet Milieu Intérieur.
            </p>

            <p>
              Pour nous contacter, veuillez envoyer un courriel à
              milieuinterieur@pasteur.fr.
            </p>
          </section>
          <p>
            <small>Copyright 2021 Milieuinterieur.fr</small>
          </p>
        </div>
      ) : (
        <>
          <Hero
            locale="en"
            text={data.contentfulHomepage.missionStatement.missionStatement}
            video={data.contentfulHomepage.videoUrl}
          />
          <div className="l-constrained" style={{ marginBottom: "2rem" }}>
            <h2>Consortium members</h2>

            <ConsortiumLogos logos={data.contentfulHomepage.consortiumLogos} />

            {
              //<h2>Publications</h2>
              //<h2>Events</h2>
            }
          </div>

          <div className="l-constrained">
            <h2>Funding agencies</h2>

            <FundingAgencyLogos
              logos={data.contentfulHomepage.fundingAgencyLogos}
            />

            {
              //<h2>Publications</h2>
              //<h2>Events</h2>
            }
          </div>
        </>
      )}
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulHomepage(
      title: { eq: "Homepage" }
      node_locale: { eq: "en-US" }
    ) {
      missionStatement {
        missionStatement
      }
      videoUrl
      consortiumLogos {
        gatsbyImageData(height: 74, placeholder: BLURRED)
        description
      }
      fundingAgencyLogos {
        gatsbyImageData(height: 74, placeholder: BLURRED)
        description
      }
    }
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
    contentfulMenuSubPages: allContentfulPage(
      filter: { node_locale: { eq: "en-US" } }
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

export default EnIndexPage
