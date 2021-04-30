import React from "react"
import PropTypes from "prop-types"

const Hero = ({ locale, text, video }) => {
  const splitVideoUrl = video.split("v=")

  return (
    <div className="l-constrained-wide" style={{ marginBottom: "2rem" }}>
      <div className="flex-row">
        <div className="flex-column">
          <div className="video">
            <iframe
              src={`https://www.youtube.com/embed/${
                splitVideoUrl[1]
              }?cc_load_policy=1&controls=0&modestbranding=1${
                locale === "fr" && `&hl=fr`
              }`}
              title="Video, The Milieu Intérieur: understanding healthy human diversity"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              frameBorder="0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowFullScreen
            />
          </div>
        </div>
        <div className="flex-column">
          <div className="mission">
            <h1 style={{ fontFamily: "georgia, serif" }}>{text}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

Hero.propTypes = {
  locale: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
}

export default Hero
