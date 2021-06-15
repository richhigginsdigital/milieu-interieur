import * as React from "react"
import { ReactComponent as Ellipse } from "../images/ellipse.svg"

const shapes = () => (
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
)

export default shapes
