import React from 'react'
import Layout from './Layout'
import Grid from '../Grid'

class Index extends React.Component {
  render() {
    return (
      <Layout>
        <div className="wrapper wrapper-content">
          <div className="container">
            <Grid />
          </div>
        </div>
      </Layout>
    )
  }
}

export default Index
