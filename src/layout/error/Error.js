import React from 'react'
import { Helmet } from 'react-helmet'

const Error = ({ title, h1, h3, children }) => (
  <div>
    <Helmet>
      <title>{title}</title>
      <body className="gray-bg" />
    </Helmet>

    <div className="middle-box text-center animated fadeInDown">
      <h1>{h1}</h1>
      <h3 className="font-bold">{h3}</h3>

      <div className="error-desc">{children}</div>
    </div>
  </div>
)

export default Error
