# dd-utilities

This library provides a small set of utility functions that address common issues/manipulates plain old javascript objects (POJO)

# Installation

From a command line with npm installed

```
npm i dd-utilities
```

# Utilities

- Clone( object )

  - added `v1.0.0`
  - object - any javascript value

  The `Clone()` function creates unique objects and arrays at depth for any POJO. This allows you to ensure you are dealing with a fully unique object. Intended for use with simple data structures (it does not copy functions or class instances)

- Same( object1, object2 )

  - added `v1.0.0`
  - object1 - any javascript value
  - object2 - any javascript value

  The `Same()` function checks for "approximate" sameness. A complex object that contains the same

# Examples

Clone: Create a copy of an object where the object and sub-objects have different identities
Same: Check to see if an object is "the same" but not identical.

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

# Changelog

## 1.0.0

Initial offering.
