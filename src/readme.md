# dd-utilities

This library provides a small set of utility functions that address common issues/manipulates plain old javascript objects (POJO)

# Installation

From a command line with npm installed

```
npm i dd-utilities
```

# Utilities

POJO - Plain old javascript object

- `Chunk<T>(array: T[], size = 100): T[][]`

  Split up an array of values into smaller chunks. It returns an array of arrays which will be of the size specified (the last chunk in the array will be smaller than the specified size in the event of a remainder )

- `Clone<T>(obj: T, options?: CloneOptions): T`

  The `Clone()` function creates unique objects and arrays at depth for any POJO. This allows you to ensure you are dealing with a fully unique object. Intended for use with simple data structures (it does not copy functions or class instances)

  options:

  - `depth` - positive integer - indicates how many logical levels of depth to clone for a given object. This allows you to stop cloning at a certain point, and just pass back the contents as is. By default the Clone() operations depth is set to Infinity.

  - `path` - string[] - allows you to specify a static key path to clone. This can be used if you only need to clone a specific section of an object.

- `Merge<T>(item1: T, item2: T): T`

  Merge two items of the same type together. It follows a replacement strategy where properties of `item2` take precedence over the properties of `item1`

- `Pad(num: number, max: number, value: string, radix?: number): string`

  Pads a number with a value, useful when you have a display string that must be a certain length.

- `Same(object1: any, object2: any): boolean`

  The `Same()` function checks for "approximate" sameness at depth. Base level constructs are checked by identity ie. string, boolean, number. An object will be checked to ensure that it has the same keys, and the values stored at those keys match. Similarly arrays will check to ensure they have the same length, and that the same values are stored at each position.

- `Sequential<T>(sequences: SequenceItem<T>[]): Promise<T[]>`

  Provides a mechanism similar to `Promise.all()` ( which runs an array of promises "in parallel" ), but does so in sequence. This is useful when you require asynchronous requests happen one after another, but the number or type of requests are dynamic so you can't set up a regular promise chain.

# Examples

- Create a copy of an object where the object and sub-objects have different identities, use the same function to verify that although they are different by identity, they are "the same" by content

```
import { Clone, Same } from 'dd-utilities'

let A = {hi: 'there', friends: [{name: 'one'}, {name: 'two'}]}
let B = Clone(A)


A === B
  //   false
A.friends[0] === B.friends[0]
  //   false

Same(A, B)
  //   true
Same(A.friends[0], B.friends[0])
  //   true

A.friends.push({name: 'three'})
Same(A, B)
  //   false
```

- Chunk an array of values into smaller groups

```
import {Chunk} from 'dd-utilities'

const original = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

const chunks = Chunk(original,4)
  // [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15]]
```

- Merge two objects

```
import {Merge} from 'dd-utilities

const item1 = {version: '1', towns: ['Springfield','Medway','Danvers'], players: {}}
const item2 = {version: '2', towns: ['Happy Valley','Hana'], players: {player1: 'bill', player2: 'jill'}}

const merged = Merge(item1, item2)
  // {version: '2', towns: ['Springfield','Medway','Danvers'], players: {player1: 'bill', player2: 'jill'}}
```

- Pad a number

```
{Pad} from 'dd-utilities'

const padded = Pad(20,5,'0')
  // '00020'
```

- Sequentially process some number of asynchronous operations

```
import {Sequential, SequenceItem} from 'dd-utilities'

function AsyncThing(delay: number) {
  return new Promise((resolve,reject) => {
    setTimeout(() => resolve(delay), delay)
  })
}

const sequence: SequenceItem<number>[] = []
const delays = [3000,500,1000,1500,2000]
for(const delay of delays) {
  sequence.push(() => AsyncThing(delay))
}

Sequential(sequence).then(result => {
  // all items were processed in order
  // results === [3000,500,1000,1500,2000]
})

```

# Changelog

## 1.1.0

Documentation updated, previous readme was missing a number of available functions and their purposes.

## 1.0.0

Initial offering.
