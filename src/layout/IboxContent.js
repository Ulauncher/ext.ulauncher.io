import React from 'react'
import classnames from 'classnames'

export default function IboxContent({ title, fetching, children }) {
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="ibox float-e-margins">
          <div className="ibox-title">
            <h5>{title}</h5>
          </div>
          <div className={classnames('ibox-content', { 'sk-loading': !!fetching })}>
            {fetching && (
              <div className="sk-spinner sk-spinner-double-bounce">
                <div className="sk-double-bounce1" />
                <div className="sk-double-bounce2" />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
