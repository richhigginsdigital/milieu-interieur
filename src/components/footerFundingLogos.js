import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const FooterFundingLogos = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulHomepage(
        title: { eq: "Homepage" }
        node_locale: { eq: "en-US" }
      ) {
        fundingAgencyLogos {
          title
          description
          gatsbyImageData(height: 40, layout: FIXED, placeholder: NONE)
        }
      }
    }
  `)

  const logos =
    (data.contentfulHomepage && data.contentfulHomepage.fundingAgencyLogos) ||
    []

  return logos.map(
    (logo, index) =>
      logo &&
      logo.gatsbyImageData && (
        <GatsbyImage
          key={index}
          className="footer-funding-logo"
          alt={logo.description || logo.title || ""}
          image={logo.gatsbyImageData}
        />
      )
  )
}

export default FooterFundingLogos
