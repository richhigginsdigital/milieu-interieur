import React from "react"
import PropTypes from "prop-types"

const Hero = ({ locale }) => (
  <div className="l-constrained-wide">
    <div className="flex-row">
      <div className="flex-column">
        <div className="video">
          <iframe
            src={`https://www.youtube.com/embed/IXlKElDJMc8?cc_load_policy=1&controls=0&modestbranding=1${
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
          <h1 style={{ fontFamily: "georgia, serif" }}>
            {locale === "fr" ? (
              <>
                Le projet Milieu Intérieur pose un regard inédit sur le système
                immunitaire humain en examinant les facteurs génétiques et
                environnementaux contribuant à la variabilité des réponses
                immunitaires.
              </>
            ) : (
              <>
                Milieu Intérieur project takes an unprecedented look at the
                human immune system by examining the genetic and environmental
                factors contributing to the variability of immune responses.
              </>
            )}
          </h1>
        </div>
      </div>
    </div>
  </div>
)

Hero.propTypes = {
  locale: PropTypes.string,
}

export default Hero
