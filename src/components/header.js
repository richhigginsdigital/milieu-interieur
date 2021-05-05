import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import LanguageMenu from "./languageMenu"
import "./header.css"

import { ReactComponent as MilieuInterieurlogo } from "../images/milieu-interieur.svg"
import { ReactComponent as Pasteurlogo } from "../images/institut-pasteur.svg"

const Header = ({ locale }) => (
  <header>
    <div className="l-constrained-wide">
      <LanguageMenu locale={locale} />
      <div className="logos">
        <Link
          title={
            locale === "fr"
              ? "Aller à la page d'accueil de Milieu Intérieur"
              : "Go to Milieu Intérieur home page"
          }
          to={locale === "fr" ? "/fr/" : "/en/"}
        >
          <MilieuInterieurlogo />
          <Pasteurlogo />
        </Link>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  locale: PropTypes.string.isRequired,
}

export default Header
