import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { ReactComponent as CopyIcon } from "../images/copy-icon.svg"
import "./collaborateBanner.css"

const CollaborateBanner = ({ locale, layout }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = event => {
    event.target.select()
    navigator.clipboard.writeText("milieuinterieur@pasteur.fr")
    setCopied(true)
  }

  return (
    <div className="collaborate-banner">
      <div className="l-constrained">
        {locale === "fr" ? (
          <>
            <h2>
              Accéder aux données et échantillons Milieu Intérieur
              Milieu Intérieur
            </h2>

            <p>
              Les données et les échantillons fournis par la cohorte Milieu
              Intérieur ont été utilisés dans plusieurs études qui ont permis
              d'accroître nos connaissances sur les réponses immunitaires.
            </p>
          </>
        ) : (
          <>
            <h2>How to collaborate with&nbsp;us</h2>
            <p>
              Researchers can obtain access to the Milieu Intérieur data,
              biological samples and methodology by submitting a research
              proposal to:
            </p>
          </>
        )}

        <div className="copy-button">
          <label
            htmlFor="copylink"
            title={
              locale === "fr"
                ? "Copié dans le presse-papier"
                : "Copied to clipboard"
            }
          >
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
          <div>
            {copied &&
              (locale === "fr"
                ? "Copié dans le presse-papier"
                : "Copied to clipboard")}
          </div>
        </div>

        <p>
          <Link to={`/${locale}/about-us/collaborations/`}>
            {locale === "fr"
              ? `Collaborations actuelles`
              : `Current collaborations`}
          </Link>
        </p>
      </div>
    </div>
  )
}

CollaborateBanner.propTypes = {
  locale: PropTypes.string.isRequired,
}

export default CollaborateBanner
