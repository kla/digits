interface Number {
  value: number,
  formatted: string,
  symbol?: string,
  unit?: string,
  unitAbbreviation?: string,
}

const UNITS = {
  'K': 'thousand',
  'M': 'million',
  'B': 'billion',
  'T': 'trillion',
  'Q': 'quadrillion',
}

function abbreviate(num, decimals) {
  const units = Object.getOwnPropertyNames(UNITS)
  const divider = 1000
  let i = units.length - 1

  while (i >= 0) {
    const unit = Math.pow(divider, i + 1)

    if (Math.abs(num) >= unit) {
      return {
        value: (Math.round(num / unit * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals),
        unit: UNITS[units[i]],
        unitAbbreviation: units[i],
      }
    }

    i--
  }
  return num.toFixed(decimals)
}

export function formatNumber(value: string | number, options: object) {
  const opts = { decimals: 2, abbreviated: false, symbol: null, showSymbol: true, ...options }
  const number: Number = {
    value: typeof(value) == 'string' ? parseFloat(value) : value,
    formatted: '',
  }

  if (!value)
    return number

  if (opts.abbreviated && number.value > 0.0) {
    const abbr = abbreviate(number.value, opts.decimals)
    number.formatted = abbr.value
    number.unitAbbreviation = abbr.unitAbbreviation
    number.unit = abbr.unit
  } else
    number.formatted = number.value.toFixed(opts.decimals).toLocaleString()

  if (opts.symbol) {
    number.symbol = opts.symbol
    number.formatted = `${opts.symbol}${number.formatted}`.replace(`${opts.symbol}-`, `-${opts.symbol}`)
  }

  if (!opts.showSymbol && number.symbol)
    number.formatted = number.formatted.replace(number.symbol, '')

  return number
}
