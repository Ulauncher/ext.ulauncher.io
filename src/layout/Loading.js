import React from 'react'
import { Helmet } from 'react-helmet'

const Loading = () => (
  <div>
    <Helmet>
      <body className="gray-bg" />
      <title>Loading...</title>
    </Helmet>

    <div className="middle-box text-center animated fadeInDown">
      <h3>Loading...</h3>
    </div>
  </div>
)

export default Loading
