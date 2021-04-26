import React, { useState } from "react"
import PropTypes from "prop-types"
import "./menu.css"
//import Search from "./search"
import { pageLink } from "../helpers/pageLink"

const Menu = ({ locale, sectionSlug, data }) => {
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
        {data.pages.map(page => (
          <li>{pageLink(page)}</li>
        ))}
        {/*<li>
          <Search locale={locale} />
        </li>*/}
      </ul>
    </nav>
  )
}

Menu.propTypes = {
  locale: PropTypes.string.isRequired,
  sectionSlug: PropTypes.string,
}

export default Menu
