import numbro from 'numbro'

const UNITS = {
  'K': 'thousand',
  'M': 'million',
  'B': 'billion',
  'T': 'trillion',
}

export function formatNumber(value, options) {
  options = { decimals: 2, abbreviated: false, ...options }

  const number = { value: value, string: null, abbreviation: null }

  number.string = number.formatted = numbro(value).formatCurrency({
    thousandSeparated: true,
    mantissa: options.decimals,
    average: options.abbreviated,
  }).toUpperCase()

  if (options.abbreviated) {
    const abbreviation = getAbbreviation(number.string)

    if (abbreviation) {
      number.abbreviation = abbreviation
      number.unit = UNITS[abbreviation] || null
      number.formatted = number.string.slice(0, -1)
    }
  }

  return number
}

function getAbbreviation(s) {
  const last = s.slice(-1)
  return last.charCodeAt(0) >= 65 && last.charCodeAt(0) <= 90 ? last : null
}
