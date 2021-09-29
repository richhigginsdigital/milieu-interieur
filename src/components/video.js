import * as React from "react"

const Video = ({ video, locale }) => {
  const splitVideoUrl = video.url.split("v=")
  return (
    <div className="hero-image">
      <figure>
        <div className="video">
          <iframe
            src={`https://www.youtube.com/embed/${
              splitVideoUrl[1]
            }?controls=0&modestbranding=1${locale === "fr" && `&hl=fr`}`}
            title={video.title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowFullScreen
          />
        </div>
        <figcaption>{video.caption && video.caption.caption}</figcaption>
      </figure>
    </div>
  )
}

export default Video
