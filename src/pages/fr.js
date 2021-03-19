import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const EnIndexPage = () => (
  <Layout locale="fr">
    <SEO title="Home" lang="fr" />
    <h1 style={{fontFamily: 'georgia, serif'}}>Le projet Milieu Intérieur pose un regard inédit sur le système immunitaire humain en examinant les facteurs génétiques et environnementaux contribuant à la variabilité des réponses immunitaires.</h1>
    <p>[+ homepage content modules]</p>
  </Layout>
)

export default EnIndexPage
