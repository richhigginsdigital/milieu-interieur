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

import Header from "./header"
import "./layout.css"

const Layout = ({ children, locale }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
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
          <Link to="/en/" title="English version">
            EN
          </Link>
        ) : (
          <Link to="/fr/" title="Version française">
            FR
          </Link>
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
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          <nav>
            <ul style={{ listStyle: "none", margin: "1em 0" }}>
              <li style={{ display: "inline", marginRight: "1em" }}>
                <Link to={`/${locale}/contact-us/`}>Contact us</Link>
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
