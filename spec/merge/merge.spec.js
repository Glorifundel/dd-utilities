require('jasmine')
const utilities = require('../../dist/index.js')
const { Merge } = utilities

describe('Merge() ', () => {
  it('simple object', () => {
    const item1 = { hi: 'there' }
    const item2 = { you: 'guys' }
    const toequal = { hi: 'there', you: 'guys' }
    expect(Merge(item1, item2)).toEqual(toequal)
  })

  it('simple array', () => {
    const item1 = [1, 2, 3, 4, 5, 6]
    const item2 = [7, 8, 9]
    const toequal = [7, 8, 9, 4, 5, 6]
    expect(Merge(item1, item2)).toEqual(toequal)
  })

  it('complex object', () => {
    const then = new Date(1981, 2, 28, 0, 0, 0, 0)
    const now = new Date()
    const item1 = {
      id: 'abcdef',
      date: now,
      index: { a: 1, d: 4, f: 7 },
      documents: []
    }
    const item2 = {
      id: 'abcdef',
      date: then,
      index: { b: 5, d: 5, z: 10 },
      documents: []
    }
    const toequal = {
      id: 'abcdef',
      date: then,
      index: { a: 1, b: 5, d: 5, f: 7, z: 10 },
      documents: []
    }
    expect(Merge(item1, item2)).toEqual(toequal)
  })
})
