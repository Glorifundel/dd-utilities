/**
 * Chunk an array into smaller parts
 *
 * @param {Array<any>} array the content to be broken into smaller pieces
 * @param {number} size the size of the chunks
 */
export function Chunk<T>(array: T[], size = 100): T[][] {
  let start = 0,
    chunks: T[][] = []
  while (array.length - start > 0) {
    chunks.push(array.slice(start, start + size))
    start += size
  }
  return chunks
}
