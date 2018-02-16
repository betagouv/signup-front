import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Header from './header'
import Footer from './footer'

const Page = ({children}) => (
  <div>
    <div>
      <Head>
        <title>Api Particulier</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link href='https://rawgit.com/etalab/template.data.gouv.fr/master/template.css' rel='stylesheet' />
      </Head>
    </div>
    <div><Header /></div>
    { children }
    <div><Footer /></div>
  </div>
)

Page.propTypes = {
  children: PropTypes.node.isRequired
}

export default Page
