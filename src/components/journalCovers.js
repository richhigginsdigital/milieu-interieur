import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const JournalCovers = ({ covers }) => {
  if (!covers || covers.length === 0) return null

  return (
    <ul className="unformatted grid-journal-covers">
      {covers.map(
        (cover, index) =>
          cover &&
          cover.gatsbyImageData && (
            <li key={index}>
              <GatsbyImage
                alt={cover.description || cover.title || ""}
                image={cover.gatsbyImageData}
              />
            </li>
          )
      )}
    </ul>
  )
}

export default JournalCovers
