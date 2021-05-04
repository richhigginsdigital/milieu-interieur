import React, { useState } from "react"
import { ReactComponent as CopyIcon } from "../images/copy-icon.svg"

const CollaborateBanner = () => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText("milieuinterieur@pasteur.fr")
    setCopied(true)
  }

  return (
    <div
      style={{
        background: "#EB924A",
        overflow: "hidden",
        borderTop: "1px solid black",
        padding: "1.5rem 0",
      }}
    >
      <div className="l-constrained" style={{ position: "relative" }}>
        <h2>How to collaborate with us</h2>
        <p style={{ maxWidth: "680px" }}>
          Researchers can obtain access to the Milieu Intérieur data, biological
          samples and methodology by submitting a research proposal to:{" "}
          <span
            style={{
              background: "white",
              padding: "7px 24px",
              position: "absolute",
              right: 0,
              top: "2.5rem",
              border: "1px solid black",
              fontSize: "1rem",
            }}
          >
            milieuinterieur@pasteur.fr
            <span
              onClick={() => copyToClipboard()}
              title="Copy to clipboard"
              style={{
                cursor: "pointer",
                verticalAlign: "middle",
                marginLeft: ".5rem",
              }}
            >
              <CopyIcon />
            </span>
            {copied && (
              <span
                style={{ position: "absolute", right: 0, marginTop: "2rem" }}
              >
                copied to clipboard
              </span>
            )}
          </span>
        </p>
      </div>
    </div>
  )
}

export default CollaborateBanner
