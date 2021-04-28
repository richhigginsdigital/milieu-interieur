import * as React from "react"
import PropTypes from "prop-types"
import { Location } from "@reach/router"
import { Link } from "gatsby"

const LanguageMenu = ({ locale }) => {
  return (
    <Location>
      {({ location }) => {
        const MenuLink =
          locale === "fr"
            ? location.pathname.replace(/\/fr\//, "/en/")
            : location.pathname.replace(/\/en\//, "/fr/")
        return (
          <nav className="language-menu">
            {locale === "fr" ? (
              <>
                <Link to={MenuLink} title="English version">
                  EN
                </Link>{" "}
                <span>FR</span>
              </>
            ) : (
              <>
                <span>EN</span>{" "}
                <Link to={MenuLink} title="Version française">
                  FR
                </Link>
              </>
            )}
          </nav>
        )
      }}
    </Location>
  )
}

LanguageMenu.propTypes = {
  locale: PropTypes.string.isRequired,
}

export default LanguageMenu
