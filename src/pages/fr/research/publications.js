import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../../../components/layout"
import Seo from "../../../components/seo"

import { ReactComponent as ArrowIcon } from "../../../images/arrow-icon.svg"

const publicationPage = ({ data, location }) => (
  <Layout
    locale="fr"
    menuData={data.contentfulMenu}
    menuSubPages={data.contentfulMenuSubPages}
    socialLinks={data.allContentfulSocialLink}
    location={location}
  >
    <Seo title="Publications" lang="fr" />
    <div className="l-constrained-narrow">
      <nav className="breadcrumb">
        <p>
          Partie de: <Link to={`/fr/research/`}>Research</Link>
        </p>
      </nav>

      <h1 className="article-heading">Publications</h1>

      <div className="section-menu">
        <nav>
          <ul>
            <li key="lead">
              <Link to={`/fr/research/publications/lead/`}>
                <span>Principales publications du Milieu Intérieur</span>
                <ArrowIcon />
              </Link>
            </li>
            <li key="supported">
              <Link to={`/fr/research/publications/supported/`}>
                <span>Publications soutenues par Milieu Intérieur</span>
                <ArrowIcon />
              </Link>
            </li>
            <li key="data">
              <Link to={`/fr/research/publications/data/`}>
                <span>
                  Publications utilisant les données du Milieu Intérieur
                </span>
                <ArrowIcon />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </Layout>
)

export const query = graphql`
  query {
    contentfulHomepage(title: { eq: "Homepage" }, node_locale: { eq: "fr" }) {
      missionStatement {
        missionStatement
      }
      videoUrl
      consortiumLinks {
        title
        url
        image {
          gatsbyImageData(height: 74, placeholder: BLURRED)
          description
        }
      }
    }
    contentfulMenu(title: { eq: "Main menu" }, node_locale: { eq: "fr" }) {
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
      filter: { node_locale: { eq: "fr" } }
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
    allContentfulSocialLink(filter: { node_locale: { eq: "fr" } }) {
      nodes {
        title
        url
      }
    }
    allContentfulPublication(
      filter: { node_locale: { eq: "fr" } }
      sort: { order: DESC, fields: date }
      limit: 2
    ) {
      nodes {
        slug
        title
        node_locale
        link
        authors {
          raw
        }
        journal
        dateAndPage {
          dateAndPage
        }
      }
    }
    allContentfulEvent(
      filter: { node_locale: { eq: "fr" } }
      sort: { order: DESC, fields: date }
      limit: 3
    ) {
      nodes {
        slug
        title
        node_locale
        date(formatString: "DD MMMM")
        endDate(formatString: "DD MMMM")
        category
        location
        link
        image {
          description
          gatsbyImageData(height: 49, placeholder: BLURRED)
        }
      }
    }
    allContentfulNews(
      filter: { node_locale: { eq: "fr" } }
      sort: { order: DESC, fields: date }
      limit: 3
    ) {
      nodes {
        id
        title
        slug
        #        link
        cardText {
          raw
        }
        image {
          gatsbyImageData(width: 431, placeholder: BLURRED)
        }
      }
    }
  }
`
export default publicationPage
