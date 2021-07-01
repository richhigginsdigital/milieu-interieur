import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Hero from "../components/hero"
import FundingAgencyLogos from "../components/fundingAgencyLogos"
import ConsortiumLinks from "../components/consortiumLinks"

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
            <h2>Consortium members</h2>
            <ConsortiumLinks links={data.contentfulHomepage.consortiumLinks} />
          </div>

          <div className="l-constrained">
            <h2>Funding agencies</h2>
            <FundingAgencyLogos
              logos={data.contentfulHomepage.fundingAgencyLogos}
            />
          </div>

          <div className="l-constrained">
            <h2>Publications</h2>
            <ul>
              {data.allContentfulPublication.nodes.map((publication, index) =>
                publication.link ? (
                  <li key={index}>
                    <a href={publication.link}>{publication.title}</a> (card
                    style)
                  </li>
                ) : (
                  <li key={index}>
                    <Link to={`/en/research/publications/${publication.slug}/`}>
                      {publication.title}
                    </Link>{" "}
                    (card style)
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="l-constrained">
            <h2>Events</h2>
            <ul>
              {data.allContentfulEvent.nodes.map((event, index) => (
                <li key={index}>
                  <Link to={`/en/events/${event.slug}/`}>{event.title}</Link>{" "}
                  (banner style)
                </li>
              ))}
            </ul>
          </div>

          <div className="l-constrained">
            <h2>News</h2>
            <ul>
              <li>[TO DO] (postcard style)</li>
            </ul>
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
      fundingAgencyLogos {
        gatsbyImageData(height: 74, placeholder: BLURRED)
        description
      }
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
