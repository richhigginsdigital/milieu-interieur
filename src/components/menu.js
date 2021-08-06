import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Location } from "@reach/router"
import "./menu.css"
import LanguageMenu from "./languageMenu"
//import Search from "./search"
import { pageLink } from "../helpers/pageLink"
import { ReactComponent as MenuIcon } from "../images/menu-icon.svg"

const Menu = ({ locale, sectionSlug, data, subPages }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    menuOpen ? setMenuOpen(false) : setMenuOpen(true)
  }

  // TODO loop subpages, and group by parentPage for hover nav
  // (make a reusable function receiving a parentPage slug...)

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
                data.pages.map((page, index) => (
                  <li key={index}>
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

                    {subPages && (
                      <ul>
                        {subPages.nodes
                          .filter(subPage => subPage.parentPage)
                          .filter(
                            subPage => subPage.parentPage.slug === page.slug
                          )
                          .map((page, index) => (
                            <li key={index}>
                              <Link
                                to={`/${locale}/${page.parentPage.slug}/${page.slug}/`}
                              >
                                {page.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
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
