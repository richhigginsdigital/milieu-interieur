import * as React from "react"
import { graphql, Link } from "gatsby"

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

          <div className="l-constrained">
            <h2 className="h4">Publications</h2>
            <ul className="unformatted grid-publications">
              {data.allContentfulPublication.nodes.map((publication, index) =>
                publication.link ? (
                  <li key={index}>
                    <article>
                      <a className="card" href={publication.link}>
                        <h3>{publication.title}</h3>
                        <hr />
                        <p>
                          <strong>
                            Science - 07.13.2020 Hadjadj J, Yatim N, Barnabei L,
                            Corneau A, Boussier J, Smith N, Péré H, Charbit B,
                            Bondet V, Chenevier-Gobeaux C, Breillat P, Carlier
                            N, Gauzit R, Morbieu C, Pène F, Marin N, Roche N,
                            Szwebel TA, Merkling SH, Treluyer JM, Veyer D,
                            Mouthon L
                          </strong>
                        </p>
                        <p>
                          Coronavirus disease 2019 (COVID-19) is characterized
                          by distinct patterns of disease progression suggesting
                          diverse host immune responses. We performed an
                          integrated immune analysis on a cohort of 50 COVID-19
                          patients with various disease severity.
                        </p>
                        Read more >
                      </a>
                    </article>
                  </li>
                ) : (
                  <li key={index}>
                    <Link
                      className="card"
                      to={`/en/research/publications/${publication.slug}/`}
                    >
                      <h3>{publication.title}</h3>
                      <hr />
                      <p>
                        <strong>
                          Science - 07.13.2020 Hadjadj J, Yatim N, Barnabei L,
                          Corneau A, Boussier J, Smith N, Péré H, Charbit B,
                          Bondet V, Chenevier-Gobeaux C, Breillat P, Carlier N,
                          Gauzit R, Morbieu C, Pène F, Marin N, Roche N, Szwebel
                          TA, Merkling SH, Treluyer JM, Veyer D, Mouthon L
                        </strong>
                      </p>
                      <p>
                        Coronavirus disease 2019 (COVID-19) is characterized by
                        distinct patterns of disease progression suggesting
                        diverse host immune responses. We performed an
                        integrated immune analysis on a cohort of 50 COVID-19
                        patients with various disease severity.
                      </p>
                      Read more >
                    </Link>{" "}
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

          <div className="l-constrained">
            <h2 className="h4">Events</h2>
            <ul className="unformatted">
              {data.allContentfulEvent.nodes.map((event, index) => (
                <li key={index}>
                  <Link className="banner" to={`/en/events/${event.slug}/`}>
                    {event.title}
                  </Link>{" "}
                </li>
              ))}
            </ul>
            <div className="centered">
              <Link className="button" to="/en/events/">
                View all events
              </Link>
            </div>
          </div>

          <div className="l-constrained">
            <h2 className="h4">News</h2>
            <ul className="unformatted">
              <li>
                <a className="postcard" href="#">
                  [TO DO]
                </a>
              </li>
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
        date(formatString: "DD MMMM YYYY")
      }
    }
  }
`

export default EnIndexPage
