require('jasmine')
const utilities = require('../../dist/index.js')
const { Chunk } = utilities

describe('Chunk() ', () => {
  it('chunk - simple', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
    const toequal = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17]
    ]
    expect(Chunk(array, 5)).toEqual(toequal)
  })
})
