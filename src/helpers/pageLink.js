import React from "react"
import { Link } from "gatsby"

const createPath = page => {
  const path = page.parentPage
    ? page.parentPage.parentPage
      ? `/${page.node_locale.replace(/-[A-Z]*/, "")}/${
          page.parentPage.parentPage.slug
        }/${page.parentPage.slug}/${page.slug}/` // teriary page
      : `/${page.node_locale.replace(/-[A-Z]*/, "")}/${page.parentPage.slug}/${
          page.slug
        }/` // secondary page
    : `/${page.node_locale.replace(/-[A-Z]*/, "")}/${page.slug}/` // primary page

  return path
}

export const pageLink = (page, pathOnly = false) => {
  const path = createPath(page)

  return pathOnly ? path : <Link to={path}>{page.title}</Link>
}
