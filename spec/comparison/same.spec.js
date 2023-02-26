require('jasmine')
const utilities = require('../../dist/index.js')
const { Same } = utilities

describe('Same() ', () => {
  it('object - simple', () => {
    const a = { hi: 'there' }
    const b = { hi: 'there' }
    expect(Same(a, b)).toBeTrue()
  })

  it('array - simple', () => {
    const a = [1, 2, 3]
    const b = [1, 2, 3]
    expect(Same(a, b)).toBeTrue()
  })

  it('string - simple', () => {
    const a = 'hi'
    const b = 'hi'
    expect(Same(a, b)).toBeTrue()
  })

  it('number - simple', () => {
    const a = 5
    const b = 5
    expect(Same(a, b)).toBeTrue()
  })

  it('number - NaN', () => {
    const a = Number('blip')
    const b = Number('blorp')
    expect(Same(a, b)).toBeTrue()
  })

  it('date - simple', () => {
    const a = new Date('2020', 7, 6, 5, 4, 3, 2)
    const b = new Date('2020', 7, 6, 5, 4, 3, 2)
    expect(Same(a, b)).toBeTrue()
  })

  it('date - invalid date', () => {
    const a = new Date('blip')
    const b = new Date('blorp')
    expect(Same(a, b)).toBeTrue()
  })

  it('regex - simple', () => {
    const a = /h+.{4}/gi
    const b = /h+.{4}/gi
    expect(Same(a, b)).toBeTrue()
  })
})
