import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Hero from "../components/hero"

const EnIndexPage = ({ data }) => {
  return (
    <Layout locale="en" menuData={data.contentfulMenu}>
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
          <Hero locale="en" />
          <div className="l-constrained">
            <h2>Consortium members</h2>
            [grid of logos]
            <br />
            <br />
            <h2>Publications</h2>
            [latest publications]
            <br />
            <br />
            <h2>Events</h2>
            [latest publications]
            <br />
            <br />
            <h2>News</h2>
            [latest publications]
            <br />
            <br />
          </div>
        </>
      )}
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

export default EnIndexPage
