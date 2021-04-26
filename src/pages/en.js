import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

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
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 1184,
              padding: `0 1.0875rem 1.45rem`,
            }}
          >
            <div className="flex-row">
              <div className="flex-column">
                <div className="video">
                  <iframe
                    src="https://www.youtube.com/embed/IXlKElDJMc8?cc_load_policy=1&controls=0&modestbranding=1"
                    title="Video, The Milieu Intérieur: understanding healthy human diversity"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    frameBorder="0"
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="flex-column">
                <div className="mission">
                  <h1 style={{ fontFamily: "georgia, serif" }}>
                    Milieu Intérieur project takes an unprecedented look at the
                    human immune system by examining the genetic and
                    environmental factors contributing to the variability of
                    immune responses.
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 982,
              padding: `0 1.0875rem 1.45rem`,
            }}
          >
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
