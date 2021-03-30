import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const EnIndexPage = () => (
  <Layout locale="en">
    <SEO title="Home" />

    {process.env.GATSBY_HOLDING_PAGE ? (
      <>
        <h1>Milieu Intérieur Project</h1>

        <p>
          We are currently redeveloping the Milieu Intérieur Project website.
        </p>

        <h2>Contact us</h2>

        <p>
          To contact us, please{" "}
          <a href="mailto:milieuinterieur@pasteur.fr?subject=milieuinterieur%40pasteur.fr">
            send us an email
          </a>
        </p>
      </>
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
