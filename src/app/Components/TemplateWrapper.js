import React from "react"
import PropTypes from "prop-types"

import Header from "./Header"

import "./TemplateWrapper.css"

const TemplateWrapper = ({ children }) => (
  <div>
    <div>
      <title>Search Recipes and Manage Pantry - Recipe Shelf</title>
      <meta name="description" content="Recipe Shelf" />
      <meta
        name="keywords"
        content="cooking,recipe,vegetarian,healthy,easy,dinner,lunch,breakfast"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="apple-mobile-web-app-title" content="Recipe Shelf" />
      <meta name="application-name" content="Recipe Shelf" />
      <meta name="theme-color" content="#000000" />
    </div>
    <Header />
    <div
      style={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "0px 1.0875rem 1.45rem",
        paddingTop: 0
      }}
    >
      CHILDREN SHOULD BE HERE
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
