interface Number {
  value: number,
  number: string,
  formatted: string,
  symbol?: string,
  unit?: string,
  unitAbbreviation?: string,
}

interface Options {
  minDecimals?: number,
  maxDecimals?: number,
  subscriptDecimals?: number,
  abbreviated?: boolean,
  symbol?: string,
  showSymbol?: boolean,
  trim?: boolean,
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
  minDecimals: undefined,
  maxDecimals: 2,
  subscriptDecimals: 4,
  abbreviated: false,
  symbol: undefined,
  showSymbol: true,
  trim: false,
}

export function round(num : number, decimals : number) {
  if (!decimals) return num
  let multiplier = Math.pow(10, decimals)
  return Math.round(num * multiplier) / multiplier
}

export function abbreviate(number: number, decimals: number | undefined): Abbreviation {
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

function withAbbreviation(number: Number, decimals: number | undefined) {
  const abbr = abbreviate(number.value, decimals)

  number.number = abbr.value?.toString()
  number.unitAbbreviation = abbr.unitAbbreviation
  number.unit = abbr.unit
}

function withLocaleString(number: Number, decimals: number | undefined) {
  const value = decimals ? round(number.value, decimals) : number.value
  const options = decimals ? { minimumFractionDigits: decimals, maximumFractionDigits: decimals } : { }
  number.number = value.toLocaleString(undefined, options)
}

function numberToSubscript(number) {
  return String(number).replace(/[0-9]/g, (digit) => SUBSCRIPTS[digit]);
}

function withSubscriptDecimals(number: Number, decimals: number) {
  const regex = new RegExp(`\\${DECIMAL_SEPARATOR}(0+)`)

  number.number = number.number.replace(regex, (n) => {
    const numDecimals = n.length - 1 // -1 because of the decimal separator
    return numDecimals >= decimals ? `${DECIMAL_SEPARATOR}0${numberToSubscript(numDecimals)}` : n
  })
}

function trimZeros(number: Number) {
  if (number.number.indexOf(DECIMAL_SEPARATOR) == -1)
    return

  let [left, right] = number.number.split(DECIMAL_SEPARATOR)
  right = right.replace(/0+$/, '')
  number.number = right ? `${left}${DECIMAL_SEPARATOR}${right}` : left
}

function withMinDecimals(number: Number, decimals: number) {
  if (number.number.indexOf(DECIMAL_SEPARATOR) == -1)
    return

  let [left, right] = number.number.split(DECIMAL_SEPARATOR)

  if (right && right.length < decimals)
    number.number = `${left}${DECIMAL_SEPARATOR}${right.padEnd(decimals, '0')}`
}

function formattedWithSymbol(number: Number) {
  if (!number.symbol) return
  const prepend = number.symbol.length == 1 ? true : false

  if (prepend) {
    const space = number.symbol.length == 1 ? '' : ' '
    number.formatted = `${number.symbol}${space}${number.formatted}`
  } else
    number.formatted += ` ${number.symbol}`

  number.formatted = number.formatted.replace(`${number.symbol}-`, `-${number.symbol}`)
}

function buildFormatted(number: Number) {
  number.formatted = number.number
  if (number.unitAbbreviation) number.formatted += number.unitAbbreviation
  formattedWithSymbol(number)
  return number
}

export function format(value: string | number, options: Options = DEFAULT_OPTIONS) {
  const opts: Options = { ...DEFAULT_OPTIONS, ...options }
  const number: Number = {
    value: typeof(value) == 'string' ? parseFloat(value) : value,
    number: '',
    formatted: '',
  }

  if (value == null || value == undefined) return number

  opts.maxDecimals && opts.abbreviated ?
    withAbbreviation(number, opts.maxDecimals) :
    withLocaleString(number, opts.maxDecimals)

  if (opts.trim) trimZeros(number)
  if (opts.minDecimals) withMinDecimals(number, opts.minDecimals)
  if (opts.subscriptDecimals) withSubscriptDecimals(number, opts.subscriptDecimals)
  if (opts.symbol && opts.showSymbol) number.symbol = opts.symbol

  return buildFormatted(number)
}

export function formatted(value: string | number, options: Options = DEFAULT_OPTIONS) {
  return format(value, options).formatted
}
