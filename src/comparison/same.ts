type Obj = { [key: string]: any | undefined }
type Refs = WeakMap<any, boolean>

export function Same(object1: any, object2: any): boolean {
  return SameAny(object1, object2, new WeakMap<any, boolean>())
}

function SameAny(object1: any, object2: any, refs: Refs): boolean {
  if (refs.get(object1)) {
    return true
  }
  if (object1 === object2) {
    return true
  }
  if (typeof object1 !== typeof object2) {
    return false
  }
  if (object1 instanceof Date) {
    return object2 instanceof Date
      ? object1.toString() === object2.toString()
      : false
  }
  if (object1 instanceof RegExp) {
    return object1.toString() === object2.toString()
  }
  if (Array.isArray(object1) && Array.isArray(object2)) {
    refs.set(object1, true)
    return SameArray(object1, object2, refs)
  }
  switch (typeof object1) {
    case 'object':
      refs.set(object1, true)
      return SameObject(object1, object2, refs)

    case 'number':
      return Number.isNaN(object1) && Number.isNaN(object2)

    default:
      return false
  }
}

function SameArray(array1: any[], array2: any[], refs: Refs): boolean {
  if (array1.length !== array2.length) {
    return false
  }
  for (let i = 0; i < array1.length; i++) {
    if (SameAny(array1[i], array2[i], refs) === false) {
      return false
    }
  }
  return true
}

function SameObject(object1: Obj, object2: Obj, refs: Refs): boolean {
  const keys = Object.keys(object1)
  if (SameArray(keys, Object.keys(object2), refs) === false) {
    return false
  }
  for (const key of keys) {
    if (SameAny(object1[key], object2[key], refs) === false) {
      return false
    }
  }
  return true
}
