import React, { useState } from "react"
import { ReactComponent as CopyIcon } from "../images/copy-icon.svg"
import "./collaborateBanner.css"

const CollaborateBanner = () => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = event => {
    event.target.select()
    navigator.clipboard.writeText("milieuinterieur@pasteur.fr")
    setCopied(true)
  }

  return (
    <div className="collaborate-banner">
      <div className="l-constrained">
        <h2>How to collaborate with us</h2>
        <p>
          Researchers can obtain access to the Milieu Intérieur data, biological
          samples and methodology by submitting a research proposal to:{" "}
        </p>
        <div className="copy-button">
          <label htmlFor="copylink" title="Copy to clipboard">
            <CopyIcon />
          </label>
          <input
            type="text"
            readOnly={true}
            value="milieuinterieur@pasteur.fr"
            onClick={copyToClipboard}
            onBlur={() => setCopied(false)}
            id="copylink"
          ></input>
          <div>{copied && "Copied to clipboard"}</div>
        </div>
      </div>
    </div>
  )
}

export default CollaborateBanner
