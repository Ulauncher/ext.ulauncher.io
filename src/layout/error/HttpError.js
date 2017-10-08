import React from 'react'
import { Link } from 'react-router-dom'
import Error from './Error'

const HttpError = ({ error }) => {
  const { status, description } = error
  return (
    <Error title={String(status)} h1={status} h3="An error occurred">
      <p>{description || 'Connection error'}</p>
      <p style={{ paddingTop: '30px' }}>
        <Link to="/">← Return to the website</Link>
      </p>
    </Error>
  )
}

export default HttpError
