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

          {
            // start homepage listings
          }

          <div className="l-constrained" style={{ marginBottom: "4rem" }}>
            <h2 className="h4">Publications</h2>
            <ul className="unformatted grid-publications">
              {data.allContentfulPublication.nodes.map((publication, index) => (
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

                    <a href={publication.link}>Read more &gt;</a>
                  </article>
                </li>
              ))}
            </ul>
            <div className="centered">
              <Link className="button" to="/en/research/publications/lead/">
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
                    <a href={event.link}>{event.title}</a>
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

            <div className="centered">
              <Link className="button" to="/en/news/">
                View all news
              </Link>
            </div>
          </div>

          {
            // end homepage listings
          }
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
        link
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

export default EnIndexPage
