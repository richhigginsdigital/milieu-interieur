import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import LanguageMenu from "./languageMenu"
import "./header.css"

import { ReactComponent as MilieuInterieurlogo } from "../images/milieu-interieur.svg"
import { ReactComponent as Pasteurlogo } from "../images/institut-pasteur.svg"

const Header = ({ locale }) => (
  <header>
    <div
      className="l-constrained-wide"
      style={{ textAlign: "right", overflow: "hidden" }}
    >
      <LanguageMenu locale={locale} />
      <div style={{ float: "left" }}>
        <Link
          title={
            locale === "fr"
              ? "Aller à la page d'accueil de Milieu Intérieur"
              : "Go to Milieu Intérieur home page"
          }
          to={locale === "fr" ? "/fr/" : "/en/"}
          style={{ display: "inline-block" }}
        >
          <MilieuInterieurlogo
            style={{ paddingRight: "1.5rem", borderRight: "1px solid #30293e" }}
          />
          <Pasteurlogo style={{ marginLeft: "1.5rem" }} />
        </Link>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  locale: PropTypes.string.isRequired,
}

export default Header
