type Refs = WeakMap<any, any>

export interface CloneOptions {
  depth?: number
  path?: string[]
}

/**
 * This function performs a deep clone on any object passed in.
 * the result is a new object, with all new object references in
 * the children, but maintaining the exact same content.
 *
 * This function currently accepts:
 * primatives
 * {}
 * []
 * Map
 * Set
 *
 * @param obj any Javascript object/primitive/Map/Set
 * @param options see interface CloneOptions
 *
 * @example
 * const pt1 = {id:'abc',names:[{last:'smith',first:'bill'}]}
 * //  pt2 will contain entirely new references.
 * const pt2 = Clone(pt1)
 * console.log(pt1 === pt2)              // false
 * console.log(pt1.names === pt2.names)  // false
 */
export function Clone<T>(obj: T, options?: CloneOptions): T {
  const depth =
    options && options.depth !== undefined ? options.depth : Infinity
  const path = options && options.path ? options.path : undefined
  const refs: Refs = new WeakMap()
  if (path) {
    return ClonePath(obj, depth, path, refs) as T
  } else {
    return CloneAll(obj, depth, refs) as T
  }
}

function CloneAll(obj: any, depth: number, refs: Refs): any {
  if (depth < 0) {
    return obj
  }
  depth -= 1
  if (refs.has(obj)) {
    return refs.get(obj)
  }
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      const clone = CloneArray(obj, depth, refs)
      refs.set(obj, clone)
      return clone
    }
    if (obj instanceof Date) {
      const clone = new Date(obj)
      refs.set(obj, clone)
      return clone
    }
    if (obj instanceof Map) {
      const clone = CloneMap(obj, depth, refs)
      refs.set(obj, clone)
      return clone
    }
    if (obj instanceof Set) {
      const clone = CloneSet(obj, depth, refs)
      refs.set(obj, clone)
      return clone
    }
    if (obj instanceof RegExp) {
      return obj
    }
    const clone = CloneObj(obj, depth, refs)
    refs.set(obj, clone)
    return clone
  }
  return obj
}

/**
 * This function generates a new object reference, as well as new references for any children
 * directly on the path specified.
 *
 * All objects along the path will be cloned shallowly.  The object
 * at the end of the path will perform a deep clone based on the
 * depth provided, default is infinite depth
 *
 * @param(obj) the root or top level parent object to clone
 * @param(depth) allows for deep cloning to a specific level, default is infinity.
 * @param(path) the key path to the child you want to clone
 */
function ClonePath(obj: any, depth: number, path: string[], refs: Refs): any {
  if (refs.has(obj)) {
    return refs.get(obj)
  }
  const property = path[0]
  if (typeof property !== 'string') {
    return CloneAll(obj, depth, refs)
  }
  path = path.slice(1)
  if (depth < 0) {
    return obj
  }
  if (typeof obj === 'object' && obj !== null) {
    depth -= 1
    if (Array.isArray(obj)) {
      const clone = obj.map((value, index) => {
        if (index.toString() === property) {
          return ClonePath(value, depth, path, refs)
        }
        return value
      })
      refs.set(obj, clone)
      return clone
    }
    if (obj instanceof Date) {
      const clone = new Date(obj)
      refs.set(obj, clone)
      return clone
    }
    if (obj instanceof Map) {
      const clone = new Map(obj)
      const value = obj.get(property)
      if (value) {
        clone.set(property, ClonePath(value, depth, path, refs))
      }
      refs.set(obj, clone)
      return clone
    }
    if (obj instanceof Set) {
      const clone = new Set()
      obj.forEach((item: any) => {
        if (property === item) {
          clone.add(ClonePath(item, depth, path, refs))
        } else {
          clone.add(item)
        }
      })
      refs.set(obj, clone)
      return clone
    }
    if (obj instanceof RegExp) {
      return obj
    }
    const clone = { ...obj }
    const value = obj[property]
    if (value) {
      clone[property] = ClonePath(value, depth, path, refs)
    }
    refs.set(obj, clone)
    return clone
  }
  return CloneAll(obj, depth, refs)
}

function CloneSet(obj: Set<any>, depth: number, refs: Refs): Set<any> {
  const clone: Set<any> = new Set()
  obj.forEach(value => {
    clone.add(CloneAll(value, depth, refs))
  })
  return clone
}

function CloneMap(
  obj: Map<any, any>,
  depth: number,
  refs: Refs
): Map<any, any> {
  const clone: Map<any, any> = new Map(obj)
  obj.forEach((value, key) => {
    clone.set(key, CloneAll(value, depth, refs))
  })
  return clone
}

function CloneObj(obj: any, depth: number, refs: Refs): any {
  const clone: any = {}
  for (const key of Object.keys(obj)) {
    clone[key] = CloneAll(obj[key], depth, refs)
  }
  return clone
}

function CloneArray(obj: any[], depth: number, refs: Refs): any[] {
  return obj.map(item => {
    return CloneAll(item, depth, refs)
  })
}
