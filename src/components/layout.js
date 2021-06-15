import * as React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Location } from "@reach/router"

import CookieBanner from "./cookieBanner"
import Header from "./header"
import Menu from "./menu"
import CollaborateBanner from "./collaborateBanner"
import { pageLink } from "../helpers/pageLink"

import "./layout.css"

import { ReactComponent as Ellipse } from "../images/ellipse.svg"

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
          className={
            type === "article"
              ? "l-outer-wrapper"
              : "l-outer-wrapper l-outer-wrapper-blue"
          }
        >
          <CookieBanner />

          {type === "home" && (
            <>
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
            </>
          )}
          <div
            style={{
              background: "white",
              borderBottom: "1px solid rgba(0,0,0,1)",
            }}
          >
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
            <div className="l-constrained">
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
      )}
    </Location>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
}

export default Layout
