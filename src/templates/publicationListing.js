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
      <Seo title={pageContext.category} lang={locale} />

      <div className="l-constrained-narrow">
        <nav className="breadcrumb">
          <p>
            {locale === "fr" ? "Partie de" : "Part of"}:{" "}
            <Link to={`/${locale}/research/`}>Research</Link>
          </p>
        </nav>
        <h1 className="article-heading">Publications</h1>

        <ul className="unformatted">
          <li>
            <Link
              className="button"
              to={`/${locale}/research/publications/lead/`}
            >
              {pageContext.category === "Milieu Intérieur lead publications" ? (
                <strong>Milieu Intérieur lead publications</strong>
              ) : (
                <>Milieu Intérieur lead publications</>
              )}
            </Link>
          </li>
          <li style={{ marginTop: ".5rem" }}>
            <Link
              className="button"
              to={`/${locale}/research/publications/supported/`}
            >
              {pageContext.category ===
              "Milieu Intérieur supported publications" ? (
                <strong>Milieu Intérieur supported publications</strong>
              ) : (
                <>Milieu Intérieur supported publications</>
              )}
            </Link>
          </li>
          <li style={{ marginTop: ".5rem" }}>
            <Link
              className="button"
              to={`/${locale}/research/publications/data/`}
            >
              {pageContext.category ===
              "Publications using Milieu Intérieur data" ? (
                <strong>Publications using Milieu Intérieur data</strong>
              ) : (
                <>Publications using Milieu Intérieur data</>
              )}
            </Link>
          </li>
        </ul>

        <div>
          <nav>
            <ul className="unformatted">
              {data.allContentfulPublication.nodes.map((publication, index) =>
                publication.link ? (
                  <li className="card" key={index}>
                    <article>
                      {/*
                        TODO - use a `tag` style(?)
                        <div style={{ fontSize: "1rem" }}>{publication.category}</div>
                      */}
                      <h2>{publication.title}</h2>
                      <hr />
                      {publication.authors &&
                        renderRichText(publication.authors)}
                      <p>
                        <strong>{publication.journal}</strong>

                        {publication.dateAndPage && (
                          <>
                            <br />
                            {publication.dateAndPage.dateAndPage}
                          </>
                        )}
                      </p>

                      <a href={publication.link}>Read more &gt;</a>
                    </article>
                  </li>
                ) : (
                  <li key={index}>
                    <article>
                      <h2>{publication.title}</h2>
                      <hr />
                      {publication.authors &&
                        renderRichText(publication.authors)}
                      <p>
                        <strong>{publication.journal}</strong>

                        {publication.dateAndPage && (
                          <>
                            <br />
                            {publication.dateAndPage.dateAndPage}
                          </>
                        )}
                      </p>

                      <Link
                        to={`/${locale}/research/publications/${publication.slug}/`}
                      >
                        Read more &gt;
                      </Link>
                    </article>
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
  query($locale: String!, $skip: Int!, $limit: Int!, $category: String!) {
    allContentfulPublication(
      limit: $limit
      skip: $skip
      filter: { node_locale: { eq: $locale }, category: { eq: $category } }
      sort: { order: DESC, fields: date }
    ) {
      nodes {
        title
        slug
        link
        journal
        category
        authors {
          raw
        }
        category
        dateAndPage {
          dateAndPage
        }
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
