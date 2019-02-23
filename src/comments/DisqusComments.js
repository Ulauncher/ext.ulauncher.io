import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'

import IboxContent from '../layout/IboxContent'
import './comments.css'

class DisqusComments extends Component {
  renderSubComments(posts) {
    return posts.map(post => (
      <div key={post.id}>
        <div className="social-comment">
          <div className="media-body">
            <div className="social-author">{post.author}</div>
            <small className="text-muted">{post.createdAt}</small>
            <div className="m-t-xs">{ReactHtmlParser(post.message)}</div>
          </div>
        </div>
        <div className="disqus-replies">{this.renderSubComments(post.posts)}</div>
      </div>
    ))
  }

  render() {
    const { githubIssuesUrl, comments } = this.props
    return (
      <IboxContent title="Comments">
        <Alert>
          <p>Comments have been discontinued in favor of Github Issues.</p>
          <p>
            If you have any issues or questions about this extension, please report them{' '}
            <a href={githubIssuesUrl}>here</a>.
          </p>
        </Alert>

        <div className="social-feed-box">
          {comments.map(post => (
            <div key={post.id}>
              <div className="social-avatar">
                <div className="media-body">
                  <div className="social-author">{post.author}</div>
                  <small className="text-muted">{post.createdAt}</small>
                </div>
              </div>
              <div className="social-body">{ReactHtmlParser(post.message)}</div>
              {!!post.posts.length && <div className="social-footer">{this.renderSubComments(post.posts)}</div>}
            </div>
          ))}
        </div>
      </IboxContent>
    )
  }
}

export default DisqusComments

function sortByDateAsc(posts) {
  posts.sort((a, b) => {
    return a.createdAt > b.createdAt
  })
}

function sortPosts(posts) {
  sortByDateAsc(posts)
  posts.forEach(post => {
    sortPosts(post.posts)
  })

  return posts
}
