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

import "./layout.css"

import MilieuInterieurlogo from "../images/milieu-interieur.svg"
import Pasteurlogo from "../images/institut-pasteur.svg"
import { ReactComponent as EllipseLeft } from "../images/ellipse-left.svg"
import { ReactComponent as EllipseRight } from "../images/ellipse-right.svg"

const Layout = ({ children, locale, sectionSlug, menuData }) => {
  return process.env.GATSBY_HOLDING_PAGE === "true" ? (
    <>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1rem`,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Link
            title="Go to Milieu Intérieur home page"
            to="/en/"
            style={{ display: "block" }}
          >
            <img
              width="139"
              height="44"
              style={{ marginRight: ".5rem" }}
              src={MilieuInterieurlogo}
              alt="Milieu Intérieur project logo"
            />
            <img
              width="161"
              height="44"
              style={{ marginLeft: ".5rem" }}
              src={Pasteurlogo}
              alt="Institut Pasteur logo"
            />
          </Link>
        </div>
        <main>{children}</main>
      </div>
    </>
  ) : (
    <div className="l-outer-wrapper">
      <CookieBanner />

      <span
        style={{
          color: "#C1D7EE",
          position: "absolute",
          top: "0",
          left: "50%",
          zIndex: "-1",
          marginLeft: "-236px", // 876 - 404
        }}
      >
        <EllipseRight />
      </span>
      <span
        style={{
          color: "#D8E6F4",
          position: "absolute",
          top: "102px",
          zIndex: "-2",
          left: "50%",
          marginLeft: "-644px", // 914 - 270
        }}
      >
        <EllipseLeft />
      </span>

      <div
        style={{
          background: "white",
          borderBottom: "1px solid black",
          marginBottom: "2em",
        }}
      >
        <Header locale={locale} />

        <div className="l-constrained-wide">
          <Menu locale={locale} sectionSlug={sectionSlug} data={menuData} />
        </div>
      </div>

      <main>{children}</main>

      {/*<div
        style={{
          margin: `0 auto`,
          maxWidth: 1184,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          <nav>
            <ul style={{ listStyle: "none", margin: "1em 0" }}>
              <li style={{ display: "inline" }}>
                <Link to={`/${locale}/privacy-policy/`}>Privacy policy</Link>
              </li>
            </ul>
          </nav>

          <p>© {new Date().getFullYear()}</p>
        </footer>
        </div>*/}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
