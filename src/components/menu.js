import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Search from "./search"

const Menu = ({ locale, sectionSlug }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    menuOpen ? setMenuOpen(false) : setMenuOpen(true)
  }

  return (
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0 1.0875rem 1.45rem`,
      }}
    >
      <nav>
        <button
          onClick={() => {
            toggleMenu()
          }}
          className="primary-nav-toggle"
        >
          Menu
        </button>
        <ul className={`primary-nav ${menuOpen ? `is-open` : ``}`}>
          <li>
            <Link
              className={sectionSlug === "about-us" ? "selected" : ""}
              to={`/${locale}/about-us/`}
            >
              About us
            </Link>
          </li>
          <li>
            <Link
              className={sectionSlug === "research" ? "selected" : ""}
              to={`/${locale}/research/`}
            >
              Research
            </Link>
          </li>
          <li>
            <Link
              className={
                sectionSlug === "technology-and-protocols" ? "selected" : ""
              }
              to={`/${locale}/technology-and-protocols/`}
            >
              Technology &amp; Protocols
            </Link>
          </li>
          <li>
            <Link
              className={sectionSlug === "data-exploration" ? "selected" : ""}
              to={`/${locale}/data-exploration/`}
            >
              Data Exploration
            </Link>
          </li>
          {/*<li><Search /></li>*/}
        </ul>
      </nav>
    </div>
  )
}

Menu.propTypes = {
  locale: PropTypes.string.isRequired,
  sectionSlug: PropTypes.string.isRequired,
}

export default Menu
