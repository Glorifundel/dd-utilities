require('jasmine')
const utilities = require('../../dist/index.js')
const { Pad } = utilities

describe('Pad() ', () => {
  it('simple', () => {
    expect(Pad(1, 4, '0')).toBe('0001')
  })
  it(`invalid pad value: '' `, () => {
    expect(Pad(10, 4, '')).toBe('0010')
  })
})
