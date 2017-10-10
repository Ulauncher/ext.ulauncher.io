import React from 'react'
import { shallow } from 'enzyme'
import { HelpBlock, FormGroup } from 'react-bootstrap'
import { ScreenshotDropzone } from './ScreenshotDropzone'

const makeProps = () => {
  return {
    uploading: false,
    images: ['a', 'b', 'c'],
    error: null,
    actions: {
      setState: jest.fn(),
      uploadImages: jest.fn(),
      swapLeft: jest.fn(),
      swapRight: jest.fn(),
      removeImage: jest.fn()
    }
  }
}

it('handles error', () => {
  const props = makeProps()
  props.error = 'testError'
  const app = shallow(<ScreenshotDropzone {...props} />)
  expect(app.find(HelpBlock).props().children).toEqual('testError')
  expect(app.find(FormGroup).props().validationState).toEqual('error')
})

it('handles uploadError', () => {
  const props = makeProps()
  props.uploadError = 'testError'
  const app = shallow(<ScreenshotDropzone {...props} />)
  expect(app.find(HelpBlock).props().children).toEqual('testError')
  expect(app.find(FormGroup).props().validationState).toEqual('error')
})

it('renders images', () => {
  const props = makeProps()
  const app = shallow(<ScreenshotDropzone {...props} />)
  const images = app.find('img')
  expect(images.length).toEqual(3)
  expect(images.first().props().src).toEqual('a')
  expect(images.at(1).props().src).toEqual('b')
})

it('renders only swap right for the first image', () => {
  const props = makeProps()
  const app = shallow(<ScreenshotDropzone {...props} />)
  expect(app.find('.controls').first().find('.fa-arrow-circle-left').length).toEqual(0)
  expect(app.find('.controls').first().find('.fa-arrow-circle-right').length).toEqual(1)
})

it('renders swap right & left for second image', () => {
  const props = makeProps()
  const app = shallow(<ScreenshotDropzone {...props} />)
  expect(app.find('.controls').at(1).find('.fa-arrow-circle-left').length).toEqual(1)
  expect(app.find('.controls').at(1).find('.fa-arrow-circle-right').length).toEqual(1)
})

it('renders only swap left for the last image', () => {
  const props = makeProps()
  const app = shallow(<ScreenshotDropzone {...props} />)
  expect(app.find('.controls').last().find('.fa-arrow-circle-left').length).toEqual(1)
  expect(app.find('.controls').last().find('.fa-arrow-circle-right').length).toEqual(0)
})
