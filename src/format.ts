import numbro from 'numbro'

const UNITS = {
  'K': 'thousand',
  'M': 'million',
  'B': 'billion',
  'T': 'trillion',
}

export function formatNumber(value, options) {
  const number = { value: value, string: null, abbreviation: null }

  options = { decimals: 2, abbreviated: false, ...options }
  const string = number.formatted = numbro(value).format({
    thousandSeparated: true,
    mantissa: options.decimals,
    average: options.abbreviated,
  }).toUpperCase()

  if (options.abbreviated) {
    const abbreviation = getAbbreviation(string)

    if (abbreviation) {
      number.abbreviation = abbreviation
      number.unit = UNITS[abbreviation] || null
      number.formatted = string.slice(0, -1)
    }
  }

  if (options.symbol) {
    number.symbol = options.symbol
    number.formatted = `${options.symbol}${number.formatted}`
  }

  return number
}

function getAbbreviation(s) {
  const last = s.slice(-1)
  return last.charCodeAt(0) >= 65 && last.charCodeAt(0) <= 90 ? last : null
}
