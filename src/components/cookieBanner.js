import * as React from "react"
import CookieConsent from "react-cookie-consent"

const CookieBanner = ({ locale }) => (
  <CookieConsent
    location="bottom"
    buttonText={locale === "fr" ? "C'est bon" : "That's ok"}
    declineButtonText={locale === "fr" ? "Non merci" : "No thanks"}
    cookieName="gatsby-gdpr-google-analytics"
    enableDeclineButton
    style={{ background: "#2C4258" }}
    buttonStyle={{
      color: "#30293e",
      background: "white",
      margin: "0 0 1rem 1rem",
    }}
    declineButtonStyle={{
      color: "#30293e",
      background: "#eb924a",
      margin: "0 1rem",
    }}
    flipButtons
  >
    <div style={{ margin: "-15px", padding: "1rem" }}>
      {locale === "fr"
        ? "Nous souhaitons installer des cookies Google Analytics pour nous aider à améliorer notre site web en collectant et en rapportant des informations sur la façon dont vous l'utilisez."
        : "We'd like to set Google Analytics cookies to help us to improve our website by collecting and reporting information on how you use it."}
    </div>
  </CookieConsent>
)

export default CookieBanner
