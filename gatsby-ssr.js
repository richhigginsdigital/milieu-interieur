const React = require("react")

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const headComponents = [
    <script
      dangerouslySetInnerHTML={{
        __html: `document.getElementsByTagName('html')[0].className += 'js';`,
      }}
    />,
  ]
  setHeadComponents(headComponents)
}
