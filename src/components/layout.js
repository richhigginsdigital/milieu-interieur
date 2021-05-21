/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import CookieBanner from "./cookieBanner"
import Header from "./header"
import Menu from "./menu"
import CollaborateBanner from "./collaborateBanner"

import "./layout.css"

import MilieuInterieurlogo from "../images/milieu-interieur.svg"
import Pasteurlogo from "../images/institut-pasteur.svg"
import { ReactComponent as Ellipse } from "../images/ellipse.svg"

const Layout = ({ children, locale, sectionSlug, menuData }) => {
  return (
    <div className="l-outer-wrapper">
      <CookieBanner />

      <span
        style={{
          color: "#C1D7EE",
          position: "absolute",
          top: "-150px",
          left: "50%",
          zIndex: "-1",
          marginLeft: "-236px", // 1184 - 404
        }}
      >
        <Ellipse />
      </span>
      <span
        style={{
          color: "#D8E6F4",
          position: "absolute",
          top: "102px",
          zIndex: "-2",
          left: "50%",
          marginLeft: "-914px", // 1184 - 270
        }}
      >
        <Ellipse />
      </span>

      <div
        style={{
          background: "white",
          borderBottom: "1px solid black",
        }}
      >
        <Header locale={locale} />

        <div className="l-constrained-wide" style={{ position: "relative" }}>
          <Menu locale={locale} sectionSlug={sectionSlug} data={menuData} />
        </div>
      </div>

      <main>{children}</main>

      <div>
        <CollaborateBanner locale={locale} />
      </div>

      <div style={{ background: "#2C4258", overflow: "hidden" }}>
        <div className="l-constrained">
          <footer
            style={{
              paddingTop: `1rem`,
            }}
          >
            {/*<nav>
              <ul style={{ listStyle: "none", margin: "1em 0" }}>
                <li style={{ display: "inline" }}>
                  <Link to={`/${locale}/privacy-policy/`}>Privacy policy</Link>
                </li>
              </ul>
            </nav>*/}

            <p style={{ color: "white", fontSize: "1rem" }}>
              Copyright {new Date().getFullYear()} Millieuinterieur.fr |
              Pasteur.fr
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
