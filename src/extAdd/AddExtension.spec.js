import React from 'react'
import { shallow } from 'enzyme'
import { AddExtension } from './AddExtension'
import Wizard from '../layout/Wizard'

it('renders wizard', () => {
  const comp = shallow(<AddExtension step="2" />)
  const wizard = comp.find(Wizard).first()
  expect(wizard.prop('current')).toBe('2')
})
