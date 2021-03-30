import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />

    <h1>Error 404</h1>
    <h2>Page not found</h2>
    <p>We did not find the page you’re looking for.</p>
    {process.env.GATSBY_HOLDING_PAGE && (
      <p>We are currently redeveloping the project website.</p>
    )}
  </Layout>
)

export default NotFoundPage
