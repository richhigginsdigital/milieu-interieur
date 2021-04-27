import * as React from "react"
import PropTypes from "prop-types"

import { pageLink } from "../helpers/pageLink"

const SectionMenu = ({ pages }) => (
  <>
    <div class="section-menu">
      <nav>
        <ul>
          {pages.map(page => (
            <li style={{ marginBottom: ".725rem" }}>
              {pageLink(page.node)}

              {page.node.childPages && (
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
