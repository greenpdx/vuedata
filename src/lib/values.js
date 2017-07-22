const MAX_VAL = (2 ** 30)

export function toPercent (val, total) {
  return val * MAX_VAL / total
}

export function fromPercent (pct, total) {
  return (pct * total / MAX_VAL) / 1000
}
