import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import RichText from "../components/richText"

const Page = ({ data, location, pageContext }) => {
  const locale = pageContext.locale.replace(/-[A-Z]*/, "")

  return (
    <Layout
      locale={locale}
      menuData={data.contentfulMenu}
      menuSubPages={data.contentfulMenuSubPages}
      location={location}
      type="article"
    >
      <Seo
        description={
          data.contentfulNews.metaDescription &&
          data.contentfulNews.metaDescription.metaDescription
        }
        title={data.contentfulNews.title}
        lang={locale}
        socialImage={
          data.contentfulNews.image &&
          data.contentfulNews.image.gatsbyImageData &&
          data.contentfulNews.image.gatsbyImageData.images.fallback.src +
            `&fit=crop`
        }
      />

      <div className="l-constrained-narrow">
        <nav className="breadcrumb">
          <p>
            {locale === "fr" ? "Partie de" : "Part of"}:{" "}
            <Link to={`/${locale}/news/`}>
              {locale === "fr" ? "Nouvelles" : "News"}
            </Link>
          </p>
        </nav>

        <h1 className="article-heading">{data.contentfulNews.title}</h1>

        <p style={{ marginBottom: "2rem" }}>Date: {data.contentfulNews.date}</p>

        {data.contentfulNews.mainContent && (
          <RichText data={data.contentfulNews.mainContent} />
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $locale: String!) {
    contentfulNews(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      id
      title
      slug
      date(formatString: "DD MMMM YYYY")
      image {
        gatsbyImageData(width: 1200, height: 1200)
      }
      mainContent {
        raw
        references {
          ... on ContentfulAsset {
            __typename
            contentful_id
            gatsbyImageData(placeholder: BLURRED)
            description
            file {
              url
            }
          }
          ... on ContentfulPage {
            __typename
            contentful_id
            slug
            title
            node_locale
            parentPage {
              slug
              parentPage {
                slug
              }
            }
          }
          ... on ContentfulNews {
            __typename
            contentful_id
            slug
            title
            node_locale
          }
          ... on ContentfulHighlightText {
            __typename
            contentful_id
            text {
              raw
              references {
                ... on ContentfulPage {
                  __typename
                  contentful_id
                  slug
                  title
                  node_locale
                  parentPage {
                    slug
                    parentPage {
                      slug
                    }
                  }
                }
              }
            }
          }
          ... on ContentfulHeroImage {
            __typename
            contentful_id
            image {
              gatsbyImageData(width: 962)
              description
            }
          }
          ... on ContentfulHeroVideo {
            __typename
            contentful_id
            title
            url
            caption {
              caption
            }
          }
          ... on ContentfulGridImageAndText {
            __typename
            contentful_id
            image {
              gatsbyImageData(width: 377)
              description
            }
            text {
              raw
              references {
                ... on ContentfulPage {
                  __typename
                  contentful_id
                  slug
                  title
                  node_locale
                  parentPage {
                    slug
                    parentPage {
                      slug
                    }
                  }
                }
                ... on ContentfulAsset {
                  __typename
                  contentful_id
                  file {
                    url
                  }
                }
              }
            }
          }
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
