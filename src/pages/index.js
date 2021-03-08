import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h2>A big bold project overview statement</h2>
    <p>
      Providing insight into the core of human diversity by dissecting the
      interplay between genetics and environment and their impact on the immune
      system.
    </p>
  </Layout>
)

export default IndexPage
