import React from 'react'
import { Helmet } from 'react-helmet'

export default class NotFound extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>404 &ndash; Page Not Found</title>
        </Helmet>

        <div className="middle-box text-center animated fadeInDown">
          <h1>404</h1>
          <h3 className="font-bold">Page Not Found</h3>

          <div className="error-desc">
            Sorry, but the page you are looking for has note been found. Try checking the URL for error, then hit the
            refresh button on your browser.
          </div>
        </div>
      </div>
    )
  }
}
