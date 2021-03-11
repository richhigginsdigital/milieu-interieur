import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const EnIndexPage = () => (
  <Layout locale="en">
    <SEO title="Home" />
    <h1>A big bold project overview statement</h1>
    <p>
      Providing insight into the core of human diversity by dissecting the
      interplay between genetics and environment and their impact on the immune
      system.
    </p>
  </Layout>
)

export default EnIndexPage