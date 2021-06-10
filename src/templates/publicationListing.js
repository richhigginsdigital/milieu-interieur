import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Page = ({ data, location, pageContext }) => {
  const locale = pageContext.locale.replace(/-[A-Z]*/, "")

  return (
    <Layout
      locale={locale}
      menuData={data.contentfulMenu}
      menuSubPages={data.contentfulMenuSubPages}
      location={location}
    >
      <Seo
        /*
        description={
          data.contentfulEvent.metaDescription &&
          data.contentfulEvent.metaDescription.metaDescription
        }*/
        title="Publications"
        lang={locale}
      />

      <div className="l-constrained-narrow">
        <h1 style={{ textAlign: "center" }}>Publications</h1>
        <div className="section-menu">
          <nav>
            <ul>
              {data.allContentfulPublication.nodes.map((publication, index) =>
                publication.link ? (
                  <li key={index}>
                    <a href={publication.link}>{publication.title}</a>
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

        <nav style={{ textAlign: "center" }}>
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
            ) : pageContext.currentPage === 2 ? (
              <Link to={`/${locale}/research/publications/`}>Back</Link>
            ) : (
              <Link
                to={`/${locale}/research/publications/${
                  pageContext.currentPage - 1
                }/`}
              >
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

export default Page
