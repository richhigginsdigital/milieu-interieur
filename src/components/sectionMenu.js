import * as React from "react"
import PropTypes from "prop-types"

import { pageLink } from "../helpers/pageLink"

import "./sectionMenu.css"

const SectionMenu = ({ pages }) => (
  <>
    <div class="section-menu">
      <nav>
        <ul>
          {pages.map(page => (
            <li>
              {pageLink(page.node)}

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
  page: PropTypes.object.isRequired,
}

export default SectionMenu
