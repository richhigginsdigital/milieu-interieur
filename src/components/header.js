import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import MilieuInterieurlogo from "../images/milieu-interieur.svg"
import Pasteurlogo from "../images/institut-pasteur.svg"

const Header = ({ siteTitle }) => (
  <header>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1184,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <div>
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
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
