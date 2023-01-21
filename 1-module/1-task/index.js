function factorial(n) {
  let total = n;
  if (n >= 1) {
    for(n -= 1; n > 1; n--) {
      total *= n;
  }
  return total;
  } else if (n === 0) {
    return 1
  }
  return 'can\'t calculate factorial';
}
