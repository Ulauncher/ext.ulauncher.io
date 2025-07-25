import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import IboxContent from '../layout/IboxContent'

export class ExtensionGrid extends React.Component {
  render() {
    const { error, isFetching, items, showLoadMore, currentUser, isLoadingMore } = this.props

    if (isFetching && !isLoadingMore) {
      return (
        <div className="sk-spinner sk-spinner-double-bounce">
          <div className="sk-double-bounce1" />
          <div className="sk-double-bounce2" />
        </div>
      )
    }

    if (error) {
      return (
        <IboxContent title="Error">
          <i className="fa fa-exclamation-triangle" />
          &nbsp;{error}
        </IboxContent>
      )
    }

    const link = item => ({
      pathname: `/-/${item.ID}`,
      state: item
    })

    const editLink = item => ({
      pathname: `/-/${item.ID}/edit`
    })

    return (
      <div>
        <div className="row">
          {items &&
            items.map((item, i) => (
              <div key={item.ID} className="col-md-4">
                <div className="ibox">
                  <div className="ibox-content product-box">
                    <Link to={link(item)} data-umami-event="view-extension" data-umami-event-extid={item.ID}>
                      <div className="product-imitation">
                        <img alt="Screen shot" src={item.Images[0]} />
                      </div>
                    </Link>
                    <div className="product-desc">
                      <div className="ellipsis">
                        {item.User === currentUser && (
                          <Link to={editLink(item)} className="btn btn-xs btn-outline btn-primary product-edit">
                            <i className="fa fa-pencil" />
                          </Link>
                        )}
                        <Link className="product-name" to={link(item)}>
                          {item.Name}
                        </Link>
                      </div>

                      <div className="small ellipsis m-t-xs">by {item.DeveloperName}</div>
                      <div className="m-t ellipsis">{item.Description}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {showLoadMore && (
          <div className="row text-center m-b">
            <button type="button" className="btn btn-primary">
              <i className="fa fa-refresh" /> Load more
            </button>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth0.session && state.auth0.session.user.id
})

export default connect(mapStateToProps)(ExtensionGrid)
