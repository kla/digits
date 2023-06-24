import numbro from 'numbro'

interface Number {
  value: number,
  formatted: string,
  symbol?: string,
  unit?: string,
  abbreviation?: string,
}

const UNITS = {
  'K': 'thousand',
  'M': 'million',
  'B': 'billion',
  'T': 'trillion',
}

export function formatNumber(value: string | number, options: object) {
  const opts = { decimals: 2, abbreviated: false, ...options }
  const number: Number = { value: typeof(value) == 'string' ? parseFloat(value) : value, formatted: '' }
  const string = number.formatted = numbro(value).format({
    thousandSeparated: true,
    mantissa: opts.decimals,
    average: opts.abbreviated,
  }).toUpperCase()

  if (opts.abbreviated) {
    const abbreviation = getAbbreviation(string)

    if (abbreviation) {
      number.abbreviation = abbreviation
      number.unit = UNITS[abbreviation] || null
      number.formatted = string.slice(0, -1)
    }
  }

  if (opts.symbol) {
    number.symbol = opts.symbol
    number.formatted = `${opts.symbol}${number.formatted}`
  }

  return number
}

function getAbbreviation(s: string) {
  const last = s.slice(-1)
  return last.charCodeAt(0) >= 65 && last.charCodeAt(0) <= 90 ? last : null
}
