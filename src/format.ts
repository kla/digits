interface Number {
  value: number,
  formatted: string,
  string: string,
  symbol?: string,
  unit?: string,
  unitAbbreviation?: string,
}

interface Options {
  decimals?: number,
  abbreviated?: boolean,
  symbol?: string,
  showSymbol?: boolean,
  subscriptDecimals?: number,
}

interface Abbreviation {
  value: string,
  unit: string,
  unitAbbreviation: string,
}

const DECIMAL_SEPARATOR = 1.1.toLocaleString().substring(1, 2)
const SUBSCRIPTS = [ '₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉' ]
const UNITS = {
  'K': 'thousand',
  'M': 'million',
  'B': 'billion',
  'T': 'trillion',
  'Q': 'quadrillion',
}

export const DEFAULT_OPTIONS: Options = {
  decimals: 2,
  abbreviated: false,
  symbol: undefined,
  showSymbol: true,
  subscriptDecimals: 4,
}

export function round(num : number, decimals : number) {
  if (!decimals) return num
  let multiplier = Math.pow(10, decimals)
  return Math.round(num * multiplier) / multiplier
}

export function abbreviate(number: number, decimals: number): Abbreviation {
  const sign = number < 0 ? -1 : 1
  const n = Math.abs(number)
  const units = Object.getOwnPropertyNames(UNITS)
  const divider = 1000
  let i = units.length - 1

  while (i >= 0) {
    const unit = Math.pow(divider, i + 1)

    if (n >= unit) {
      return {
        value: (sign * (Math.round(n / unit * Math.pow(10, decimals)) / Math.pow(10, decimals))).toFixed(decimals),
        unit: UNITS[units[i]],
        unitAbbreviation: units[i],
      }
    }

    i--
  }

  return { value: number.toFixed(decimals), unit: '', unitAbbreviation: '' }
}

function withAbbreviation(number: Number, decimals: number) {
  const abbr = abbreviate(number.value, decimals)

  number.formatted = (abbr.value ? `${abbr.value}${abbr.unitAbbreviation}` : number.value).toString()
  number.string = abbr.value?.toString()
  number.unitAbbreviation = abbr.unitAbbreviation
  number.unit = abbr.unit
}

function withLocaleString(number: Number, decimals) {
  const value = round(number.value, decimals)
  number.formatted = number.string = value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

function withSymbol(number: Number, symbol: string) {
  const prepend = symbol.length == 1 ? true : false

  if (prepend) {
    const space = symbol.length == 1 ? '' : ' '
    number.formatted = `${symbol}${space}${number.formatted}`
  } else
    number.formatted += ` ${symbol}`

  number.formatted = number.formatted.replace(`${symbol}-`, `-${symbol}`)
  number.symbol = symbol
}

function numberToSubscript(number) {
  return String(number).replace(/[0-9]/g, (digit) => SUBSCRIPTS[digit]);
}

function withSubscriptDecimals(number: Number, decimals: number) {
  const regex = new RegExp(`\\${DECIMAL_SEPARATOR}(0+)`)

  number.formatted = number.formatted.replace(regex, (n) => {
    const numDecimals = n.length - 1 // -1 because of the decimal separator
    return numDecimals >= decimals ? `${DECIMAL_SEPARATOR}0${numberToSubscript(numDecimals)}` : n
  })
}

export function format(value: string | number, options: Options = DEFAULT_OPTIONS) {
  const opts: Options = { ...DEFAULT_OPTIONS, ...options }
  const number: Number = {
    value: typeof(value) == 'string' ? parseFloat(value) : value,
    formatted: '',
    string: '',
  }

  if (!value) return number
  if (opts.decimals && opts.abbreviated) withAbbreviation(number, opts.decimals)
  if (!number.formatted) withLocaleString(number, opts.decimals)
  if (opts.subscriptDecimals) withSubscriptDecimals(number, opts.subscriptDecimals)
  if (opts.symbol && opts.showSymbol) withSymbol(number, opts.symbol)

  return number
}

export function formatToString(value: string | number, options: Options = DEFAULT_OPTIONS) {
  return format(value, options).formatted
}
