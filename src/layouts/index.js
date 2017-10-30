import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Header from "./header.js"

import "./index.css"

const TemplateWrapper = ({ children }) => (
    <div>
        <Helmet>
            <title>Search Recipes and Manage Pantry - Recipe Shelf</title>
            <meta name="description" content="Recipe Shelf" />
            <meta
                name="keywords"
                content="cooking,recipe,vegetarian,healthy,easy,dinner,lunch,breakfast"
            />
        </Helmet>
        <Header />
        <div
            style={{
                margin: "0 auto",
                maxWidth: 960,
                padding: "0px 1.0875rem 1.45rem",
                paddingTop: 0
            }}
        >
            {children()}
        </div>
    </div>
)

TemplateWrapper.propTypes = {
    children: PropTypes.func
}

export default TemplateWrapper
