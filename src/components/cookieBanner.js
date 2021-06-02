import * as React from "react"
import CookieConsent from "react-cookie-consent"

const CookieBanner = () => (
  <CookieConsent
    location="bottom"
    buttonText="That's ok"
    declineButtonText="No thanks"
    cookieName="gatsby-gdpr-google-analytics"
    enableDeclineButton
    style={{ background: "#30293e" }}
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
      We'd like to set Google Analytics cookies to help us to improve our
      website by collecting and reporting information on how you use it.
    </div>
  </CookieConsent>
)

export default CookieBanner
