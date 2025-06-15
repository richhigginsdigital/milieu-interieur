import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { ReactComponent as CopyIcon } from "../images/copy-icon.svg"
import "./collaborateBanner.css"

const CollaborateBanner = ({ locale, layout }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = event => {
    event.target.select()
    navigator.clipboard.writeText("https://redcap.pasteur.fr/surveys/?s=ND8TP8MDD3")
    setCopied(true)
  }

  return (
    <div className="collaborate-banner">
      <div className="l-constrained">
        {locale === "fr" ? (
          <>
            <h2>
              Accéder aux données et échantillons 
              Milieu Intérieur
            </h2>

            <p>
              Les chercheuses et chercheurs peuvent demander accès aux données et/ou échantillons Milieu Intérieur en remplissant le formulaire :
               
              Plus de 70 projets utilisant les données Milieu Intérieur ont été acceptés, contribuant à accroître nos connaissances sur la variation immunitaire humaine et ses déterminant:
            </p>
          </>
        ) : (
          <>
            <h2>How to access Milieu Intérieur data/samples</h2>
            <p>
              Researchers can request access to the Milieu Intérieur data
              and/or biological samples by filling 
              the Data Access Request Form
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
            value="redcap Form here"
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
              ? `Projets acceptés`
              : `Accepted projects`}
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
