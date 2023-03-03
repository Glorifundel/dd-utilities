export type SequenceItem<T> = () => Promise<T>

export function Sequential<T>(sequences: SequenceItem<T>[]): Promise<T[]> {
  sequences = [...sequences]
  const resolved: T[] = []
  const processor = (): Promise<T[]> => {
    const sequence = sequences.shift()
    return typeof sequence === 'function'
      ? sequence()
          .catch(NoOp)
          .then(t => {
            if (t !== undefined) {
              resolved.push(t)
            }
            return processor()
          })
      : Promise.resolve(resolved)
  }
  return processor()
}

function NoOp() {}
