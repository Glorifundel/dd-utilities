require('jasmine')
const utilities = require('../../dist/index.js')
const { Sequential } = utilities

describe('Sequential() ', () => {
  it('sequence - simple', () => {
    const sequence = []
    sequence.push(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(1), 1000)
      })
    })
    sequence.push(() => {
      return Promise.resolve(2)
    })

    return Sequential(sequence).then(results => expect(results).toEqual([1, 2]))
  })
})
