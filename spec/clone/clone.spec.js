require('jasmine')
const utilities = require('../../dist/index.js')
const { Clone, Same } = utilities

describe('Clone() ', () => {
  it('object - simple', () => {
    const a = { hi: 'there', friends: [{ name: 'one' }, { name: 'two' }] }
    const b = Clone(a)
    expect(Same(a, b)).toBeTrue()
    expect(a === b).toBeFalse()
    expect(a.friends[0] === b.friends[0]).toBeFalse()
  })

  it('object - depth', () => {
    const a = {
      depth0: { depth1: { depth2: { depth3: { depth5: 'this is the end!' } } } }
    }
    const b = Clone(a, { depth: 2 })
    expect(Same(a, b)).toBeTrue()
    expect(a === b).toBeFalse()
    expect(a.depth0 === b.depth0).toBeFalse()
    expect(a.depth0.depth1 === b.depth0.depth1).toBeFalse()
    expect(a.depth0.depth1.depth2 === b.depth0.depth1.depth2).toBeTrue()
  })

  it('object - path', () => {
    const a = {
      stuff: {
        things: {
          items: ['of worth', 'and value'],
          another: ['other items', 'yet more']
        },
        other: { items: ['another item'] }
      },
      useless: { garbage: { items: ['of no worth'] } }
    }
    const b = Clone(a, { path: ['stuff', 'things'] })
    expect(Same(a, b)).toBeTrue()
    expect(a === b).toBeFalse()
    expect(a.useless === b.useless).toBeTrue()
    expect(Same(a.stuff, b.stuff)).toBeTrue()
    expect(a.stuff === b.stuff).toBeFalse()
    expect(a.stuff.things === b.stuff.things).toBeFalse()
    expect(a.stuff.other === b.stuff.other).toBeTrue()
    expect(a.stuff.things.items === b.stuff.things.items).toBeFalse()
    expect(a.stuff.things.another === b.stuff.things.another).toBeFalse()
  })

  it('object - depth and path', () => {
    const a = {
      stuff: {
        things: {
          items: [{ display: 'of worth' }, { display: 'and value' }],
          another: [{ display: 'other items' }, { display: 'yet more' }]
        },
        other: { items: ['another item'] }
      },
      useless: { garbage: { items: ['of no worth'] } }
    }
    const b = Clone(a, { depth: 2, path: ['stuff', 'things'] })
    expect(Same(a, b)).toBeTrue()
    expect(a === b).toBeFalse()
    expect(a.useless === b.useless).toBeTrue()
    expect(Same(a.stuff, b.stuff)).toBeTrue()
    expect(a.stuff === b.stuff).toBeFalse()
    expect(a.stuff.things === b.stuff.things).toBeFalse()
    expect(a.stuff.other === b.stuff.other).toBeTrue()
    expect(a.stuff.things.items === b.stuff.things.items).toBeTrue()
    expect(a.stuff.things.another === b.stuff.things.another).toBeTrue()
  })
})
