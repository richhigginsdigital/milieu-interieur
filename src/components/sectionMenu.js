import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { pageLink } from "../helpers/pageLink"
import { ReactComponent as ArrowIcon } from "../images/arrow-icon.svg"

import "./sectionMenu.css"

const SectionMenu = ({ pages }) => (
  <>
    <div class="section-menu">
      <nav>
        <ul>
          {pages.map(page => (
            <li>
              <Link to={pageLink(page.node, true)}>
                <span>{page.node.title}</span>
                <ArrowIcon />
              </Link>

              {page.node.childPages.length > 0 && (
                <ul style={{ marginTop: ".725rem" }}>
                  {page.node.childPages.map(subPage => (
                    <li style={{ marginBottom: ".725rem" }}>
                      {pageLink(subPage.node)}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </>
)

SectionMenu.propTypes = {
  pages: PropTypes.array.isRequired,
}

export default SectionMenu
