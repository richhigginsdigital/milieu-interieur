import * as React from "react"
import { graphql, Link } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Hero from "../components/hero"
import ConsortiumLogos from "../components/consortiumLogos"
import CollaborateBanner from "../components/collaborateBanner"

const FrIndexPage = ({ data }) => {
  return (
    <Layout
      locale="fr"
      menuData={data.contentfulMenu}
      menuSubPages={data.contentfulMenuSubPages}
      type="home"
    >
      <Seo
        title="Milieu Intérieur"
        lang="fr"
        description={
          data.contentfulHomepage.missionStatement &&
          data.contentfulHomepage.missionStatement.missionStatement
        }
      />
      <Hero
        locale="fr"
        text={data.contentfulHomepage.missionStatement.missionStatement}
        video={data.contentfulHomepage.videoUrl}
      />

      <div className="l-constrained" style={{ marginBottom: "2rem" }}>
        <h2>Membres du consortium</h2>

        <ConsortiumLogos logos={data.contentfulHomepage.consortiumLogos} />
      </div>

      <div className="l-constrained" style={{ marginBottom: "4rem" }}>
        <CollaborateBanner locale="fr" />
      </div>

      {
        // start homepage listings
      }
      <div className="l-constrained" style={{ marginBottom: "4rem" }}>
        <h2 className="h4">Publications</h2>
        <ul className="unformatted grid-publications">
          {data.allContentfulPublication.nodes.map((publication, index) =>
            publication.link ? (
              <li className="card" key={index}>
                <article>
                  <h3 className="h2">{publication.title}</h3>
                  <hr />
                  {publication.authors && renderRichText(publication.authors)}
                  <p>
                    <strong>{publication.journal}</strong>

                    {publication.dateAndPage && (
                      <>
                        <br />
                        {publication.dateAndPage.dateAndPage}
                      </>
                    )}
                  </p>

                  <a href={publication.link}>Lire la suite &gt;</a>
                </article>
              </li>
            ) : (
              <li className="card" key={index}>
                <article>
                  <h3 className="h2">{publication.title}</h3>
                  <hr />
                  {publication.authors && renderRichText(publication.authors)}
                  <p>
                    <strong>{publication.journal}</strong>

                    {publication.dateAndPage && (
                      <>
                        <br />
                        {publication.dateAndPage.dateAndPage}
                      </>
                    )}
                  </p>

                  <Link to={`/fr/research/publications/${publication.slug}/`}>
                    Lire la suite &gt;
                  </Link>
                </article>
              </li>
            )
          )}
        </ul>
        <div className="centered">
          <Link className="button" to="/fr/research/publications/lead/">
            Voir tous les voir tous les publications
          </Link>
        </div>
      </div>

      <div className="l-constrained" style={{ marginBottom: "4rem" }}>
        <h2 className="h4">Événements</h2>
        <ul className="unformatted">
          {data.allContentfulEvent.nodes.map((event, index) => (
            <li className="banner" key={index}>
              <span className="banner-date h2">{event.date}</span>
              <span className="banner-main">
                <span className="banner-category">{event.category}</span>
                <Link className="h3" to={`/fr/events/${event.slug}/`}>
                  {event.title}
                </Link>
                <span className="banner-location">{event.location}</span>
              </span>
              <span className="banner-image">{/* TODO image */}</span>
            </li>
          ))}
        </ul>
        <div className="centered">
          <Link className="button" to="/fr/events/">
            Voir tous les événements
          </Link>
        </div>
      </div>

      <div className="l-constrained" style={{ marginBottom: "4rem" }}>
        <h2 className="h4">Nouvelles</h2>
        <ul className="unformatted">
          {data.allContentfulNews.nodes.map((news, index) => (
            <li className="postcard">
              <article>
                <h3 className="h2">{news.title}</h3>
                {news.image.gatsbyImageData && (
                  <GatsbyImage
                    alt={news.image.description}
                    image={news.image.gatsbyImageData}
                  />
                )}
                <div className="postcard-grid">
                  {news.cardText && renderRichText(news.cardText)}
                </div>

                {news.link ? (
                  <a className="postcard-link" href={news.link}>
                    Lire la suite &gt;
                  </a>
                ) : (
                  <Link className="postcard-link" to={`/fr/news/${news.slug}/`}>
                    Lire la suite &gt;
                  </Link>
                )}
              </article>
            </li>
          ))}
        </ul>

        <div className="centered">
          <Link className="button" to="/fr/news/">
            Voir toutes les actualités
          </Link>
        </div>
      </div>

      {
        // end homepage listings
      }
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulHomepage(title: { eq: "Homepage" }, node_locale: { eq: "fr" }) {
      missionStatement {
        missionStatement
      }
      videoUrl
      consortiumLogos {
        gatsbyImageData(height: 74, placeholder: BLURRED)
        description
      }
      fundingAgencyLogos {
        gatsbyImageData(height: 74, placeholder: BLURRED)
        description
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
    allContentfulPublication(
      filter: { node_locale: { eq: "fr" } }
      sort: { order: DESC, fields: createdAt }
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
        category
        location
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
          gatsbyImageData(width: 898, placeholder: BLURRED)
        }
      }
    }
  }
`

export default FrIndexPage
