import React from "react"
import { graphql, Link } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { GatsbyImage } from "gatsby-plugin-image"

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

        <nav>
          <ul className="unformatted">
            {data.allContentfulNews.nodes.map((news, index) => (
              <li className="postcard">
                <article>
                  <div className="postcard-grid">
                    <div>
                      {news.image && news.image.gatsbyImageData && (
                        <GatsbyImage
                          alt={news.image.description}
                          image={news.image.gatsbyImageData}
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="h2" style={{ marginTop: 0 }}>
                        {news.title}
                      </h3>
                      {news.cardText && renderRichText(news.cardText)}

                      {news.link ? (
                        <a className="postcard-link" href={news.link}>
                          Read more &gt;
                        </a>
                      ) : (
                        <Link
                          className="postcard-link"
                          to={`/en/news/${news.slug}/`}
                        >
                          Read more &gt;
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </nav>

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
        id
        title
        slug
        cardText {
          raw
        }
        image {
          gatsbyImageData(width: 431, placeholder: BLURRED)
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

export default NewsListing
