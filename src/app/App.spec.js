import React from 'react'
import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import { shallow } from 'enzyme'
import App from './App'
import Browse from '../browse/Browse'

it('sets correct title', () => {
  const app = shallow(<App />)
  expect(app.find(Helmet).props().titleTemplate).toContain('Ulauncher Extensions')
})

it('renders route to /', () => {
  const app = shallow(<App />)
  const firstRoute = app.find(Route).first()
  expect(firstRoute.prop('component')).toBe(Browse)
  expect(firstRoute.prop('exact')).toBe(true)
})
