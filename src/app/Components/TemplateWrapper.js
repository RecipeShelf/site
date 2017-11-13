import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './TemplateWrapper.css'

const Collections = () => {
  return (
    <div>
      <h1>Collections</h1>
      <p>This is a collection page</p>
    </div>
  )
}

const Cuisines = () => {
  return (
    <div>
      <h1>Cuisines</h1>
      <p>This is a cuisines page</p>
    </div>
  )
}


const TemplateWrapper = ({ children }) => (
  <div>
    <Router>
      <div>
        <title>Search Recipes and Manage Pantry - Recipe Shelf</title>
        <meta name='description' content='Recipe Shelf' />
        <meta
          name='keywords'
          content='cooking,recipe,vegetarian,healthy,easy,dinner,lunch,breakfast'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <link
          rel='mask-icon'
          href='/safari-pinned-tab.svg'
          color='#5bbad5'
        />
        <meta name='apple-mobile-web-app-title' content='Recipe Shelf' />
        <meta name='application-name' content='Recipe Shelf' />
        <meta name='theme-color' content='#000000' />
        <Header />
        <Route path="/collections" component={Collections}/>
        <Route path="/cuisines" component={Cuisines}/>
      </div>
    </Router>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
export { Collections, Cuisines }
