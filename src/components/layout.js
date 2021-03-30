/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import CookieConsent from "react-cookie-consent"

//import { pageLink } from "../helpers/pageLink"
import Header from "./header"
import Menu from "./menu"
import "./layout.css"

import MilieuInterieurlogo from "../images/milieu-interieur.svg"
import Pasteurlogo from "../images/institut-pasteur.svg"

const Layout = ({ children, locale, sectionSlug }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return process.env.GATSBY_HOLDING_PAGE ? (
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
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="gatsby-gdpr-google-analytics"
        enableDeclineButton
      >
        We'd like to set Google Analytics cookies to help us to improve our
        website by collecting and reporting information on how you use it.
      </CookieConsent>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1em`,
          textAlign: "right",
        }}
      >
        {locale === "fr" ? (
          <>
            <Link to="/en/" title="English version">
              EN
            </Link>{" "}
            FR
          </>
        ) : (
          <>
            EN{" "}
            <Link to="/fr/" title="Version française">
              FR
            </Link>
          </>
        )}
      </div>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />

      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <Menu locale={locale} sectionSlug={sectionSlug} />
      </div>
      <hr />

      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          <nav>
            <ul style={{ listStyle: "none", margin: "1em 0" }}>
              <li style={{ display: "inline", marginRight: "1em" }}>
                <Link to={`/${locale}/about-us/contact-us/`}>Contact us</Link>
              </li>
              <li style={{ display: "inline" }}>
                <Link to={`/${locale}/privacy-policy/`}>Privacy policy</Link>
              </li>
            </ul>
          </nav>

          <p>© {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
