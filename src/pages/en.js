import * as React from "react"
import { graphql, Link } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Hero from "../components/hero"
import ConsortiumLinks from "../components/consortiumLinks"
import CollaborateBanner from "../components/collaborateBanner"

const EnIndexPage = ({ data }) => {
  return (
    <Layout
      locale="en"
      menuData={data.contentfulMenu}
      menuSubPages={data.contentfulMenuSubPages}
      type="home"
    >
      <Seo
        title="Milieu Intérieur"
        description={
          data.contentfulHomepage.missionStatement &&
          data.contentfulHomepage.missionStatement.missionStatement
        }
      />

      {process.env.GATSBY_HOLDING_PAGE === "true" ? (
        <div
          style={{
            maxWidth: 680,
            margin: "auto",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>Milieu Intérieur Project</h1>
          </div>

          <section>
            <p>
              We are currently developing a new website for The Milieu Intérieur
              Project.
            </p>

            <p>
              To contact us please send an email to milieuinterieur@pasteur.fr.
            </p>
          </section>

          <section lang="fr">
            <p>
              Nous sommes en train de développer un nouveau site web pour le
              projet Milieu Intérieur.
            </p>

            <p>
              Pour nous contacter, veuillez envoyer un courriel à
              milieuinterieur@pasteur.fr.
            </p>
          </section>
          <p>
            <small>Copyright 2021 Milieuinterieur.fr</small>
          </p>
        </div>
      ) : (
        <>
          <Hero
            locale="en"
            text={data.contentfulHomepage.missionStatement.missionStatement}
            video={data.contentfulHomepage.videoUrl}
          />
          <div className="l-constrained" style={{ marginBottom: "2rem" }}>
            <h2 className="h4">Consortium members</h2>
            <ConsortiumLinks links={data.contentfulHomepage.consortiumLinks} />
          </div>

          <div className="l-constrained" style={{ marginBottom: "4rem" }}>
            <CollaborateBanner locale="en" />
          </div>

          <div className="l-constrained" style={{ marginBottom: "4rem" }}>
            <h2 className="h4">Publications</h2>
            <ul className="unformatted grid-publications">
              {data.allContentfulPublication.nodes.map((publication, index) =>
                publication.link ? (
                  <li className="card" key={index}>
                    <article>
                      <h3 className="h2">{publication.title}</h3>
                      <hr />
                      <p>
                        <strong>
                          {publication.journal} - {publication.date}
                        </strong>
                      </p>
                      {publication.mainContent &&
                        renderRichText(publication.mainContent)}
                      <a href={publication.link}>Read more &gt;</a>
                    </article>
                  </li>
                ) : (
                  <li className="card" key={index}>
                    <article>
                      <h3 className="h2">{publication.title}</h3>
                      <hr />
                      <p>
                        <strong>
                          {publication.journal} - {publication.date}
                        </strong>
                      </p>
                      {publication.mainContent &&
                        renderRichText(publication.mainContent)}
                      <Link
                        to={`/en/research/publications/${publication.slug}/`}
                      >
                        Read more &gt;
                      </Link>
                    </article>
                  </li>
                )
              )}
            </ul>
            <div className="centered">
              <Link className="button" to="/en/research/publications/">
                View all publications
              </Link>
            </div>
          </div>

          <div className="l-constrained" style={{ marginBottom: "4rem" }}>
            <h2 className="h4">Events</h2>
            <ul className="unformatted">
              {data.allContentfulEvent.nodes.map((event, index) => (
                <li className="banner" key={index}>
                  <span className="banner-date h2">{event.date}</span>
                  <span className="banner-main">
                    <span className="banner-category">{event.category}</span>
                    <Link className="h3" to={`/en/events/${event.slug}/`}>
                      {event.title}
                    </Link>
                    <span className="banner-location">{event.location}</span>
                  </span>
                  <span className="banner-image">{/* TODO image */}</span>
                </li>
              ))}
            </ul>
            <div className="centered">
              <Link className="button" to="/en/events/">
                View all events
              </Link>
            </div>
          </div>

          <div className="l-constrained" style={{ marginBottom: "4rem" }}>
            <h2 className="h4">News</h2>
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

                    <a className="postcard-link" href={news.link}>
                      Read more &gt;
                    </a>
                  </article>
                </li>
              ))}
            </ul>
            <div className="centered">
              <Link className="button" to="/en/news/">
                View all news
              </Link>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulHomepage(
      title: { eq: "Homepage" }
      node_locale: { eq: "en-US" }
    ) {
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
    contentfulMenu(title: { eq: "Main menu" }, node_locale: { eq: "en-US" }) {
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
      filter: { node_locale: { eq: "en-US" } }
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
      filter: { node_locale: { eq: "en-US" } }
      sort: { order: DESC, fields: createdAt }
      limit: 2
    ) {
      nodes {
        slug
        title
        node_locale
        link
        journal
        date(formatString: "DD MMMM")
        mainContent {
          raw
        }
      }
    }
    allContentfulEvent(
      filter: { node_locale: { eq: "en-US" } }
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
      filter: { node_locale: { eq: "en-US" } }
      sort: { order: DESC, fields: date }
      limit: 3
    ) {
      nodes {
        id
        title
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

export default EnIndexPage
