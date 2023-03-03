/**
 * Generate a string with padded values added to the left of the number
 * Not a particularly "safe" function
 *
 * @param num a number you want to transform into a padded string
 * @param max an integer indicating how much padding should be present.
 * @param value the string value used to pad
 */
export function Pad(
  num: number,
  max: number,
  value: string,
  radix?: number
): string {
  value = value !== '' ? value : '0'
  let whole = num.toString(radix)
  while (whole.length < max) {
    whole = value + whole
  }
  return whole
}
