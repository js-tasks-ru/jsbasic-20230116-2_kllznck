function getMinMax(str) {
  result = str.split(' ').filter(Number)
  return {
    min: Math.min(...result),
    max: Math.max(...result)
  }
}
