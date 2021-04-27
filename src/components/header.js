import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

//import MilieuInterieurlogo from "../images/milieu-interieur.svg"
//import Pasteurlogo from "../images/institut-pasteur.svg"
import { ReactComponent as MilieuInterieurlogo } from "../images/milieu-interieur.svg"
import { ReactComponent as Pasteurlogo } from "../images/institut-pasteur.svg"

const Header = ({ siteTitle }) => (
  <header>
    <div className="l-constrained-wide">
      <div>
        <Link
          title="Go to Milieu Intérieur home page"
          to="/en/"
          style={{ display: "inline-block" }}
        >
          <MilieuInterieurlogo style={{ marginRight: ".5rem" }} />
          <Pasteurlogo style={{ marginLeft: ".5rem" }} />
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
