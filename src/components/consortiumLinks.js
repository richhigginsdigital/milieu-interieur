import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const ConsortiumLinks = ({ links }) => (
  <ul className="grid-logos">
    {links.map((link, index) => (
      <li key={index}>
        {link.url ? (
          <a href={link.url}>
            {link.image.gatsbyImageData && (
              <GatsbyImage
                alt={link.image.description}
                image={link.image.gatsbyImageData}
              />
            )}
          </a>
        ) : (
          link.image.gatsbyImageData && (
            <GatsbyImage
              alt={link.image.description}
              image={link.image.gatsbyImageData}
            />
          )
        )}
      </li>
    ))}
  </ul>
)

export default ConsortiumLinks
