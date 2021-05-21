import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Location } from "@reach/router"
import "./menu.css"
import LanguageMenu from "./languageMenu"
//import Search from "./search"
import { pageLink } from "../helpers/pageLink"
import { ReactComponent as MenuIcon } from "../images/menu-icon.svg"

const Menu = ({ locale, sectionSlug, data }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    menuOpen ? setMenuOpen(false) : setMenuOpen(true)
  }

  return (
    <Location>
      {({ location }) => (
        <nav className="menu">
          <button
            onClick={() => {
              toggleMenu()
            }}
            aria-expanded={menuOpen}
            aria-controls="menu"
            style={{ textAlign: "right" }}
          >
            <span style={{ float: "left" }}>Menu</span>{" "}
            <MenuIcon style={{ marginBottom: "-2px" }} />
          </button>

          <div id="menu" className={menuOpen ? undefined : `hidden`}>
            <ul>
              {process.env.GATSBY_HIDE_MENU !== "true" &&
                data.pages.map(page => (
                  <li>
                    <Link
                      className={
                        location.pathname.match(`/${page.slug}/`)
                          ? "selected"
                          : ""
                      }
                      to={pageLink(page, true)}
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}

              {/*<li>
          <Search locale={locale} />
        </li>*/}
            </ul>

            <LanguageMenu locale={locale} />
          </div>
        </nav>
      )}
    </Location>
  )
}

Menu.propTypes = {
  locale: PropTypes.string.isRequired,
  sectionSlug: PropTypes.string,
}

export default Menu
