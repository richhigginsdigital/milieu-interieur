import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header
    style={{
      marginBottom: `1.45rem`,
      textAlign: `center`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <div className="h1" style={{ margin: 0, fontWeight: "normal" }}>
        <Link
          to="/en/"
          style={{
            color: `hsla(0, 0%, 0%, 0.8)`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
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
