import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

const NotFoundPage = () => (
  <div>
    <Helmet>
      <title>Not Found - Recipe Shelf</title>
    </Helmet>
    <h1>Oh no, you are lost!</h1>
    <h2>Try the following links instead:</h2>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/collections/'>Collections</Link>
      </li>
      <li>
        <Link to='/cuisines/'>Cuisines</Link>
      </li>
    </ul>
  </div>
)

export default NotFoundPage
