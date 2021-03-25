import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import "./menu.css"
import Search from "./search"

const Menu = ({ locale, sectionSlug }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    menuOpen ? setMenuOpen(false) : setMenuOpen(true)
  }

  return (
    <nav className="menu">
      <button
        onClick={() => {
          toggleMenu()
        }}
        aria-expanded={menuOpen}
        aria-controls="menu"
      >
        Menu
      </button>
      <ul id="menu" className={menuOpen ? undefined : `hidden`}>
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
        <li>
          <Search locale={locale} />
        </li>
      </ul>
    </nav>
  )
}

Menu.propTypes = {
  locale: PropTypes.string.isRequired,
  sectionSlug: PropTypes.string.isRequired,
}

export default Menu
