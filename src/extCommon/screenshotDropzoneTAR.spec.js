import { types, reducer } from './screenshotDropzoneTAR'

it('swaps images to left', () => {
  const newState = reducer({ images: ['a', 'b', 'c'] }, { type: types.SWAP_LEFT, index: 1 })
  expect(newState).toMatchObject({
    images: ['b', 'a', 'c']
  })
})

it('swaps images to right', () => {
  const newState = reducer({ images: ['a', 'b', 'c'] }, { type: types.SWAP_RIGHT, index: 0 })
  expect(newState).toMatchObject({
    images: ['b', 'a', 'c']
  })
})
