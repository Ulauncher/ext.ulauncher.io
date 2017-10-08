import React from 'react'
import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import { shallow } from 'enzyme'
import { App } from './App'
import Browse from '../extBrowse/Browse'

const makeProps = () => {
  return {
    auth0: { session: {} },
    user: {
      fetched: true,
      isFetching: false,
      data: {
        role: 'Client'
      }
    },
    actions: {
      renewAuth0Session: jest.fn()
    }
  }
}

it('sets correct title', () => {
  const app = shallow(<App {...makeProps()} />)
  expect(app.find(Helmet).props().titleTemplate).toContain('Ulauncher Extensions')
})

it('calls renewAuth0Session if session is not empty', () => {
  const props = makeProps()
  shallow(<App {...props} />)
  expect(props.actions.renewAuth0Session).toHaveBeenCalled()
})

it('does not call renewAuth0Session if session is empty', () => {
  const newProps = { ...makeProps(), auth0: {} }
  shallow(<App {...newProps} />)
  expect(newProps.actions.renewAuth0Session).not.toHaveBeenCalled()
})

it('renders route to /', () => {
  const app = shallow(<App {...makeProps()} />)
  const firstRoute = app.find(Route).first()
  expect(firstRoute.prop('component')).toBe(Browse)
  expect(firstRoute.prop('exact')).toBe(true)
})
