import React from "react"
import { Link } from "gatsby"
import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  Snippet,
  PoweredBy,
  Configure,
} from "react-instantsearch-dom"
import { connectStateResults } from "react-instantsearch/connectors"
import "instantsearch.css/themes/reset.css"
import "instantsearch.css/themes/satellite.css"
import "./search.css"

import { pageLink } from "../helpers/pageLink"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
)

const Hit = ({ hit }) => {
  return hit.parentPage ? (
    <Link className="hit" to={pageLink(hit, true)}>
      <strong>
        <Highlight attribute="title" hit={hit} />
      </strong>
      <br />
      <Snippet attribute="mainContent" hit={hit} />
    </Link>
  ) : (
    <Link className="hit" to={pageLink(hit, true)}>
      <strong>
        <Highlight attribute="title" hit={hit} />
      </strong>
      <br />
      Section index page.
    </Link>
  )
}

const Content = connectStateResults(({ searchState }) => {
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

const Search = ({ locale }) =>
  typeof window !== "undefined" ? (
    <div className="search">
      <InstantSearch
        indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
        searchClient={searchClient}
      >
        <Configure
          filters={`node_locale:${locale === "en" ? `en-US` : locale}`}
        />
        <SearchBox
          //onClick={event => {
          //console.log(event.currentTarget)
          // trigger any UI stuff here - e.g. scroll to top, focused search modal etc...
          //}}
          translations={{
            placeholder: locale === "en" ? "Search" : "Rechercher",
          }}
        />
        <Content />
      </InstantSearch>
    </div>
  ) : (
    // non js fallback search on google
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

export default Search
