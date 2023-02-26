require('jasmine')
const utilities = require('../../dist/index.js')
const { Clone, Same } = utilities

describe('Clone() ', () => {
  it('object - simple', () => {
    const a = { hi: 'there', friends: [{ name: 'one' }, { name: 'two' }] }
    const b = Clone(a)
    expect(a === b).toBeFalse()
    expect(Same(a, b)).toBeTrue()
  })
})
