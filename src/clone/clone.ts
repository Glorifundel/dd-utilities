type Refs = WeakMap<any, any>

export interface CloneOptions {
  depth?: number
  path?: Array<any>
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
  if (typeof obj === 'object' && obj !== null) {
    if (refs.has(obj)) {
      return refs.get(obj)
    } else if (Array.isArray(obj)) {
      const clone = depth > 0 ? CloneArray(obj, depth - 1, refs) : [...obj]
      refs.set(obj, clone)
      return clone
    } else if (obj instanceof Date) {
      const clone = new Date(obj)
      refs.set(obj, clone)
      return clone
    } else if (obj instanceof Map) {
      const clone = depth > 0 ? CloneMap(obj, depth - 1, refs) : new Map(obj)
      refs.set(obj, clone)
      return clone
    } else if (obj instanceof Set) {
      const clone = depth > 0 ? CloneSet(obj, depth - 1, refs) : new Set(obj)
      refs.set(obj, clone)
      return clone
    } else if (obj instanceof RegExp) {
      return obj
    } else {
      const clone = depth > 0 ? CloneObj(obj, depth - 1, refs) : { ...obj }
      refs.set(obj, clone)
      return clone
    }
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
function ClonePath(obj: any, depth: number, path: Array<any>, refs: Refs): any {
  if (path.length > 0) {
    if (typeof obj === 'object' && obj !== null) {
      if (refs.has(obj)) {
        return refs.get(obj)
      } else if (Array.isArray(obj)) {
        const clone = obj.map((value, index) => {
          if (index === path[0]) {
            return ClonePath(value, depth, path.slice(1), refs)
          }
          return value
        })
        refs.set(obj, clone)
        return clone
      } else if (obj instanceof Date) {
        const clone = new Date(obj)
        refs.set(obj, clone)
        return clone
      } else if (obj instanceof Map) {
        const clone = new Map(obj)
        const key = path[0]
        const value = obj.get(key)
        if (key && value) {
          clone.set(key, ClonePath(value, depth, path.slice(1), refs))
        }
        refs.set(obj, clone)
        return clone
      } else if (obj instanceof Set) {
        const clone = new Set()
        const value = path[0]
        obj.forEach((item: any) => {
          if (value === item) {
            clone.add(ClonePath(item, depth, path.slice(1), refs))
          } else {
            clone.add(item)
          }
        })
        refs.set(obj, clone)
        return clone
      } else if (obj instanceof RegExp) {
        return obj
      } else {
        const clone = { ...obj }
        const key = path[0]
        const value = obj[key]
        if (key && value) {
          clone[key] = ClonePath(value, depth, path.slice(1), refs)
        }
        refs.set(obj, clone)
        return clone
      }
    }
  } else {
    return CloneAll(obj, depth, refs)
  }
  return obj
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
  Object.keys(obj).forEach(key => {
    clone[key] = CloneAll(obj[key], depth, refs)
  })
  return clone
}

function CloneArray(obj: any[], depth: number, refs: Refs): any[] {
  return obj.map(item => {
    return CloneAll(item, depth, refs)
  })
}
