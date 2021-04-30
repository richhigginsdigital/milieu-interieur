import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const ConsortiumLogos = ({ logos }) => (
  <div className="grid-logos">
    {logos.map(logo => (
      <div>
        <GatsbyImage alt={logo.description} image={logo.gatsbyImageData} />
      </div>
    ))}
  </div>
)

export default ConsortiumLogos
