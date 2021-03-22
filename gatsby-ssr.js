//const React = require("react")
//const Layout = require("./src/components/layout")

// Adds a class name to the body element
exports.onRenderBody = ({ setBodyAttributes }, pluginOptions) => {
  setBodyAttributes({
    className: "js",
  })
}

// Wraps every page in a component
//exports.wrapPageElement = ({ element, props }) => {
//  return <Layout {...props}>{element}</Layout>
//}
