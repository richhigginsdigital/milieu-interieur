import * as React from "react"
import PropTypes from "prop-types"

import { pageLink } from "../helpers/pageLink"

const SectionMenu = ({ pages }) => (
  <>
    <div class="section-menu">
      <nav>
        <ul>
          {pages.map(page => (
            <li>
              {pageLink(page.node)}

              {page.node.childPages && (
                <ul>
                  {page.node.childPages.map(subPage => (
                    <li>{pageLink(subPage.node)}</li>
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
