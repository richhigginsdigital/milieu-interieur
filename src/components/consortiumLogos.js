import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const ConsortiumLogos = ({ logos }) => (
  <ul className="grid-logos">
    {logos.map(logo => (
      <li>
        <GatsbyImage alt={logo.description} image={logo.gatsbyImageData} />
      </li>
    ))}
  </ul>
)

export default ConsortiumLogos
