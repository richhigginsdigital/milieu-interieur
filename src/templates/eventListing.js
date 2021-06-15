import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const EventListing = ({ data, location, pageContext }) => {
  const locale = pageContext.locale.replace(/-[A-Z]*/, "")

  return (
    <Layout
      locale={locale}
      menuData={data.contentfulMenu}
      menuSubPages={data.contentfulMenuSubPages}
      location={location}
    >
      <Seo title={locale === "fr" ? "Événements" : "Events"} lang={locale} />

      <div className="l-constrained-narrow">
        <h1 className="h2">{locale === "en" ? "Events" : "Événements"}</h1>
        <div className="section-menu">
          <nav>
            <ul>
              {data.allContentfulEvent.nodes.map((event, index) => (
                <li key={index}>
                  <Link to={`/${locale}/events/${event.slug}/`}>
                    {event.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <nav style={{ textAlign: "center" }}>
          <p>
            {pageContext.numEvents >
            pageContext.currentPage * pageContext.limit ? (
              <Link to={`/${locale}/events/${pageContext.currentPage + 1}/`}>
                Next
              </Link>
            ) : pageContext.currentPage === 2 ? (
              <Link to={`/${locale}/events/`}>Back</Link>
            ) : (
              <Link to={`/${locale}/events/${pageContext.currentPage - 1}/`}>
                Back
              </Link>
            )}
          </p>
        </nav>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($locale: String!, $skip: Int!, $limit: Int!) {
    allContentfulEvent(
      limit: $limit
      skip: $skip
      filter: { node_locale: { eq: $locale } }
      sort: { order: DESC, fields: date }
    ) {
      nodes {
        title
        slug
      }
    }
    contentfulMenu(title: { eq: "Main menu" }, node_locale: { eq: $locale }) {
      pages {
        title
        slug
        node_locale
        parentPage {
          slug
        }
      }
    }
    contentfulMenuSubPages: allContentfulPage(
      filter: { node_locale: { eq: $locale } }
      sort: { order: ASC, fields: menuOrder }
    ) {
      nodes {
        title
        slug
        node_locale
        parentPage {
          slug
        }
      }
    }
  }
`

export default EventListing
