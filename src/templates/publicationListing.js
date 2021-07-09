import React from "react"
import { graphql, Link } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"

import Layout from "../components/layout"
import Seo from "../components/seo"

const PublicationListing = ({ data, location, pageContext }) => {
  const locale = pageContext.locale.replace(/-[A-Z]*/, "")

  return (
    <Layout
      locale={locale}
      menuData={data.contentfulMenu}
      menuSubPages={data.contentfulMenuSubPages}
      location={location}
    >
      <Seo title="Publications" lang={locale} />

      <div className="l-constrained-narrow">
        <nav className="breadcrumb">
          <p>
            {locale === "fr" ? "Partie de" : "Part of"}:{" "}
            <Link to={`/${locale}/research/`}>Research</Link>
          </p>
        </nav>
        <h1 className="article-heading">Publications</h1>
        <div>
          <nav>
            <ul className="unformatted">
              {data.allContentfulPublication.nodes.map((publication, index) =>
                publication.link ? (
                  <li className="card" key={index}>
                    <article>
                      <h3>{publication.title}</h3>
                      <hr />
                      <p>
                        <strong>
                          {publication.journal} - {publication.date}
                        </strong>
                      </p>
                      {renderRichText(publication.mainContent)}
                      <a href={publication.link}>Read more &gt;</a>
                    </article>
                  </li>
                ) : (
                  <li key={index}>
                    <Link
                      to={`/${locale}/research/publications/${publication.slug}/`}
                    >
                      {publication.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>

        <nav className="paging">
          <p>
            {pageContext.numPublications >
            pageContext.currentPage * pageContext.limit ? (
              <Link
                to={`/${locale}/research/publications/${
                  pageContext.currentPage + 1
                }/`}
              >
                Next
              </Link>
            ) : (
              pageContext.currentPage > 1 &&
              (pageContext.currentPage === 2 ? (
                <Link to={`/${locale}/research/publications/`}>Back</Link>
              ) : (
                <Link
                  to={`/${locale}/research/publications/${
                    pageContext.currentPage - 1
                  }/`}
                >
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
    allContentfulPublication(
      limit: $limit
      skip: $skip
      filter: { node_locale: { eq: $locale } }
      sort: { order: DESC, fields: date }
    ) {
      nodes {
        title
        slug
        link
        journal
        category
        mainContent {
          raw
        }
        date(formatString: "DD MMMM")
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

export default PublicationListing
