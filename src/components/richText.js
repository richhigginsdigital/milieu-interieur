import React from "react"
import { Link } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { GatsbyImage } from "gatsby-plugin-image"

import { pageLink } from "../helpers/pageLink"
import Video from "./video"

const RichText = ({ data }) => {
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, "") // Trim - from end of text
  }
  return renderRichText(data, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        return (
          <figure>
            {node.data.target.gatsbyImageData && (
              <GatsbyImage
                alt={node.data.target.description}
                image={node.data.target.gatsbyImageData}
              />
            )}
          </figure>
        )
      },
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        return node.data.target ? (
          <Link to={pageLink(node.data.target, true)}>{children}</Link>
        ) : (
          children
        )
      },
      [INLINES.ASSET_HYPERLINK]: (node, children) => {
        return <a href={node.data.target.file.url}>{children}</a>
      },
      [BLOCKS.EMBEDDED_ENTRY]: node => {
        return node.data.target.__typename === "ContentfulHeroImage" ? (
          <div className="hero-image">
            <figure>
              {node.data.target.image &&
                node.data.target.image.gatsbyImageData && (
                  <GatsbyImage
                    alt={node.data.target.image.description}
                    image={node.data.target.image.gatsbyImageData}
                  />
                )}
              <figcaption>{node.data.target.image.description}</figcaption>
            </figure>
          </div>
        ) : node.data.target.__typename === "ContentfulGridImageAndText" ? (
          <div className="grid-image">
            <figure>
              {node.data.target.image &&
                node.data.target.image.gatsbyImageData && (
                  <GatsbyImage
                    alt={node.data.target.image.description}
                    image={node.data.target.image.gatsbyImageData}
                  />
                )}
            </figure>
            <div>
              {node.data.target.text &&
                renderRichText(node.data.target.text, {
                  renderNode: {
                    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
                      return node.data.target ? (
                        <Link to={pageLink(node.data.target, true)}>
                          {children}
                        </Link>
                      ) : (
                        children
                      )
                    },
                    [INLINES.ASSET_HYPERLINK]: (node, children) => {
                      return <a href={node.data.target.file.url}>{children}</a>
                    },
                  },
                })}
            </div>
          </div>
        ) : node.data.target.__typename === "ContentfulHeroVideo" ? (
          <Video video={node.data.target} />
        ) : (
          <div className="highlight">
            {node.data.target.text &&
              renderRichText(node.data.target.text, {
                renderNode: {
                  [INLINES.ENTRY_HYPERLINK]: (node, children) => {
                    return node.data.target ? (
                      <Link to={pageLink(node.data.target, true)}>
                        {children}
                      </Link>
                    ) : (
                      children
                    )
                  },
                  [INLINES.ASSET_HYPERLINK]: (node, children) => {
                    return <a href={node.data.target.file.url}>{children}</a>
                  },
                },
              })}
          </div>
        )
      },
      [BLOCKS.HEADING_2]: node => (
        <h2 id={slugify(node.content[0].value)}>{node.content[0].value} </h2>
      ),
      [BLOCKS.HEADING_3]: node => (
        <h3 id={slugify(node.content[0].value)}>{node.content[0].value} </h3>
      ),
    },
    renderText: text =>
      text.split("\n").flatMap((text, i) => [i > 0 && <br key={i} />, text]),
  })
}

export default RichText
