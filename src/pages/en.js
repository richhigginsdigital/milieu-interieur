import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const EnIndexPage = () => (
  <Layout locale="en">
    <SEO title="Home" />

    {process.env.GATSBY_HOLDING_PAGE ? (
      <div
        style={{
          maxWidth: 600,
          margin: "auto",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>Milieu Intérieur Project</h1>
        </div>

        <p>
          We are currently developing a new website for The Milieu Intérieur
          Project.
        </p>

        <p>
          To contact us please{" "}
          <a href="mailto:milieuinterieur@pasteur.fr?subject=milieuinterieur%40pasteur.fr">
            send an email
          </a>
          .
        </p>
      </div>
    ) : (
      <>
        <h1 style={{ fontFamily: "georgia, serif" }}>
          The Milieu Intérieur project takes an unprecedented look at the human
          immune system by examining the genetic and environmental factors
          contributing to the variability of immune responses.
        </h1>

        <p>[+ homepage content modules]</p>
      </>
    )}
  </Layout>
)

export default EnIndexPage
