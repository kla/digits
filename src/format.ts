interface Number {
  value: number,
  formatted: string,
  string: string,
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

export function round(num : number, decimals : number | undefined | null) {
  if (!decimals) return num
  let multiplier = Math.pow(10, decimals)
  return Math.round(num * multiplier) / multiplier
}

export function abbreviate(num, decimals) {
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

function withAbbreviation(number: Number, decimals: number) {
  if (number.value <= 0.0)
    return

  const abbr = abbreviate(number.value, decimals)
  number.formatted = abbr.value || number.value.toString()
  number.string = (abbr.value ? `${abbr.value}${abbr.unitAbbreviation}` : number.value).toString()
  number.unitAbbreviation = abbr.unitAbbreviation
  number.unit = abbr.unit
}

function withSymbol(number: Number, symbol: string, showSymbol: boolean) {
  number.symbol = symbol

  number.formatted = symbol.length == 1 ? `${symbol}${number.formatted}` : `${number.formatted} ${symbol}`
  number.formatted = number.formatted.replace(`${symbol}-`, `-${symbol}`)
}

function withLocaleString(number: Number, decimals) {
  const value = round(number.value, decimals)
  number.formatted = number.string = value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export function formatNumber(value: string | number, options: object = {}) {
  const opts = { decimals: 2, abbreviated: false, symbol: null, showSymbol: true, ...options }
  const number: Number = {
    value: typeof(value) == 'string' ? parseFloat(value) : value,
    formatted: '',
    string: '',
  }

  if (!value) return number
  if (opts.abbreviated) withAbbreviation(number, opts.decimals)
  if (!number.formatted) withLocaleString(number, opts.decimals)
  if (!number.string) number.string = number.formatted
  if (opts.symbol && opts.showSymbol) withSymbol(number, opts.symbol, opts.showSymbol)

  return number
}
