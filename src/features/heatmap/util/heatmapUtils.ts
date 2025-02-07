export const getInterpolatedColor = (value: number): string => {
  const clampedValue = Math.max(0, Math.min(1, value))

  const red = Math.round(255 * clampedValue)
  const green = Math.round(255 * (1 - clampedValue))
  const blue = 0

  return `rgb(${red}, ${green}, ${blue})`
}
