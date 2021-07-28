import * as React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Location } from "@reach/router"

import CookieBanner from "./cookieBanner"
import Header from "./header"
import Menu from "./menu"
import CollaborateBanner from "./collaborateBanner"
import Shapes from "./shapes"
import { pageLink } from "../helpers/pageLink"
import anrLogo from "../images/anr-40h.png"
import iALogo from "../images/investir-lavenir-40h.png"
import { ReactComponent as Pasteurlogo } from "../images/institut-pasteur.svg"

import "./layout.css"

const Layout = ({
  children,
  locale,
  sectionSlug,
  menuData,
  menuSubPages,
  type,
}) => {
  return (
    <Location>
      {({ location }) => (
        <div
          className={`l-outer-wrapper ${
            type !== "article" && `l-outer-wrapper-blue`
          }`}
        >
          <CookieBanner />

          {type === "home" && <Shapes />}

          <div className="l-header-wrapper">
            <Header locale={locale} />

            <div
              className="l-constrained-wide"
              style={{ position: "relative" }}
            >
              <Menu
                locale={locale}
                sectionSlug={sectionSlug}
                data={menuData}
                subPages={menuSubPages}
              />
            </div>
          </div>

          <main>{children}</main>

          <div>
            <CollaborateBanner locale={locale} />
          </div>

          <div style={{ background: "#2C4258", overflow: "hidden" }}>
            <div className="l-constrained-wide">
              <footer
                style={{
                  paddingTop: `1rem`,
                }}
              >
                <nav>
                  <ul className="footer-nav">
                    {process.env.GATSBY_HIDE_MENU !== "true" &&
                      menuData.pages.map((page, index) => (
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

                          {menuSubPages && (
                            <ul>
                              {menuSubPages.nodes
                                .filter(subPage => subPage.parentPage)
                                .filter(
                                  subPage =>
                                    subPage.parentPage.slug === page.slug
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
                  </ul>
                </nav>

                <p className="footer-copyright">
                  <span className="footer-copyright-logos">
                    <img src={anrLogo} height="40" alt="" />
                    <img src={iALogo} height="40" alt="" />
                    <Pasteurlogo />
                  </span>
                  Copyright {new Date().getFullYear()} Millieuinterieur.fr |
                  Pasteur.fr
                </p>
              </footer>
            </div>
          </div>
        </div>
      )}
    </Location>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
}

export default Layout
