import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { ReactComponent as ArrowIcon } from "../images/arrow-icon.svg"

const NewsListing = ({ data, location, pageContext }) => {
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
        <h1 className="h4">{locale === "fr" ? "Nouvelles" : "News"}</h1>
        <div className="section-menu">
          <nav>
            <ul>
              {data.allContentfulNews.nodes.map((news, index) =>
                news.link ? (
                  <li key={index}>
                    <Link to={`/${locale}/news/${news.slug}/`}>
                      <span>{news.title}</span>
                      <ArrowIcon />
                    </Link>
                  </li>
                ) : (
                  <li key={index}>
                    <a href={news.link}>
                      <span>{news.title}</span>
                      <ArrowIcon />
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>

        <nav className="paging">
          <p>
            {pageContext.numNews >
            pageContext.currentPage * pageContext.limit ? (
              <Link to={`/${locale}/news/${pageContext.currentPage + 1}/`}>
                Next
              </Link>
            ) : (
              pageContext.currentPage > 1 &&
              (pageContext.currentPage === 2 ? (
                <Link to={`/${locale}/news/`}>Back</Link>
              ) : (
                <Link to={`/${locale}/news/${pageContext.currentPage - 1}/`}>
                  Back
                </Link>
              ))
            )}
          </p>
        </nav>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($locale: String!, $skip: Int!, $limit: Int!) {
    allContentfulNews(
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

export default NewsListing
