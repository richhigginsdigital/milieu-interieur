import React from "react"
//import { Link } from "gatsby"
/*import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom"
import { connectStateResults } from "react-instantsearch/connectors"
import "./search.css"
*/

/*
const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
)

const Hit = ({ hit }) => {
  let path = `/${hit.slug}/` // default, a section index page

  if (hit.section) {
    if (hit.section.slug === "/") {
      // root section
      if (hit.slug === "") {
        path = `/` // home page
      } else {
        path = `/${hit.slug}/` // root page
      }
    } else {
      path = `/${hit.section.slug}/${hit.slug}/` // standard page
    }
  }

  return hit.section ? (
    <Link className="hit" to={path}>
      <strong>
        <Highlight attribute="title" hit={hit} />
      </strong>
      <br />
      <Snippet attribute="mainContent" hit={hit} />
    </Link>
  ) : (
    <Link className="hit" to={path}>
      <strong>
        <Highlight attribute="title" hit={hit} />
      </strong>
      <br />
      Section index page.
    </Link>
  )
}

const Content = connectStateResults(({ searchState, searchResults }) => {
  const hasQuery = searchState && searchState.query

  return hasQuery ? (
    <div style={{ overflow: "hidden" }}>
      <Hits hitComponent={Hit} />
      <PoweredBy />
    </div>
  ) : (
    <></>
  )
})
*/

const Search = ({ locale }) => (
  /*typeof window !== "undefined" ? (
    <InstantSearch
      indexName={process.env.GATSBY_ALGOLIA_INDEX}
      searchClient={searchClient}
    >
      <SearchBox
        translations={{ placeholder: "Search the Readability Guidelines" }}
      />
      <Content />
    </InstantSearch>
  ) : (*/

  // fallback google search
  <div className="search">
    <form
      method="get"
      action="https://www.google.com/webhp?q=site:www.milieuinterieur.fr"
    >
      <input placeholder="Search" type="search" name="q" />
      <input type="hidden" name="sitesearch" value="www.milieuinterieur.fr" />
      <button type="submit" title="Submit your search query.">
        Submit
      </button>
    </form>
  </div>
)
// )

export default Search
