import React from 'react'
import classnames from 'classnames'

/**
 * @param {React.Component} props.steps[].component
 * @param {string} props.steps[].title
 * @param {int} props.current
 */
export default function Wizard({ steps, current, children }) {
  const CurrentStep = steps[current].component
  return (
    <div className="wizard clearfix">
      <div className="steps clearfix">
        <ul>
          {steps.map((item, i) => (
            <li key={i.toString()} className={classnames({ current: current === i, done: current > i })}>
              <span className="item">
                <span className="number">{i + 1}.</span> {item.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="content clearfix">
        <div className="step-content body current">
          <div className="m-t-md">
            <div className="col-lg-12">
              <CurrentStep />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
