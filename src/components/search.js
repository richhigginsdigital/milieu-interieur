import React /*, { useState }*/ from "react"
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

const Search = ({ locale }) => {
  //  const [searchOpen, setSearchOpen] = useState(false)
  //  const toggleOverlay = () => {
  //    searchOpen ? setSearchOpen(false) : setSearchOpen(true)
  //  }

  return typeof window !== "undefined" ? (
    <>
      <div className="search">
        <InstantSearch
          indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
          searchClient={searchClient}
        >
          <Configure
            filters={`node_locale:${locale === "en" ? `en-US` : locale}`}
          />
          <SearchBox
            //            onFocus={event => toggleOverlay()}
            translations={{
              placeholder: locale === "en" ? "Search" : "Rechercher",
            }}
          />
          <Content />
        </InstantSearch>
      </div>
      {/*<div className={searchOpen ? `overlay` : `overlay hidden`} />*/}
    </>
  ) : (
    <div className="search">
      <form
        className="ais-SearchBox-form"
        method="get"
        action="https://www.google.co.uk/search"
      >
        <input
          className="ais-SearchBox-input"
          placeholder="Search"
          type="search"
          name="q"
        />
        <input
          type="hidden"
          name="as_sitesearch"
          value="www.milieuinterieur.fr"
        />
        <button
          className="ais-SearchBox-submit"
          type="submit"
          title="Submit your search query."
        >
          <svg
            class="ais-SearchBox-submitIcon"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 40 40"
          >
            <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default Search
