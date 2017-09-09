import React from 'react';
import {Link} from 'react-router'
import {connect} from "react-redux"
import classnames from 'classnames';

import {fetchItems} from "../actions/extensions"

class Grid extends React.Component {

  componentWillMount () {
    this.props.dispatch(fetchItems())
  }

  render () {

    let items = this.props.extensions.items;
    let isFetching = this.props.extensions.isFetching;
    let isLoadMore = false;

    return (

      <div>

        {isFetching ?
          <div className="sk-spinner sk-spinner-double-bounce">
            <div className="sk-double-bounce1"></div>
            <div className="sk-double-bounce2"></div>
          </div> : ''
        }

        <div className={classnames('row', {'hidden': isFetching})}>

          {items.map((item, i) =>

            <div key={item.id} className="col-md-4">
              <div className="ibox">
                <div className="ibox-content product-box">

                  <div className="product-imitation">
                    <img src={item.img}/>
                  </div>
                  <div className="product-desc">

                    <Link className="product-name" to={{
                      pathname: '/extension/' + item.id
                    }}>
                      {item.title}
                    </Link>

                    <div className="small m-t-xs">
                      {item.description}
                    </div>

                    <div className="m-t">
                      {item.author}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {isLoadMore ?
          <div className="row text-center m-b">
            <button type="button" className="btn btn-primary">
              <i className="fa fa-refresh"/> Load more
            </button>
          </div>
          : ''
        }

      </div>

    );
  }
}

export default connect((state) => {
  return {
    extensions: state.extensions
  }
})(Grid)