/**
 * Merge item 1 and item 2.  Basic types like strings and numbers are not merged,
 * instead Item 2's value "wins" when conflicts occur.
 *
 * Warning - This function will fail to merge if it encounters self-references
 *
 * @param item1
 * @param item2
 * @returns
 */
export function Merge<T>(item1: T, item2: T): T {
  if (item1 === item2) {
    return item2
  }
  if (item1 === void 0 || item1 === null) {
    return item2
  }
  if (item2 === void 0 || item2 === null) {
    return item1
  }
  if (item1 instanceof Date) {
    return item2
  }
  if (Array.isArray(item1)) {
    const merged = []
    const stop =
      item1.length > (item2 as any[]).length
        ? item1.length
        : (item2 as any[]).length
    for (let i = 0; i < stop; i++) {
      merged.push(Merge(item1[i], (item2 as any[])[i]))
    }
    return merged as T
  }
  if (typeof item1 === 'object') {
    const keys = new Set(Object.keys(item1))
    for (const key of Object.keys(item2)) {
      keys.add(key)
    }
    const newObject: any = {}
    for (const key of keys) {
      newObject[key] = Merge<any>((item1 as any)[key], (item2 as any)[key])
    }
    return newObject
  }

  return item2
}
