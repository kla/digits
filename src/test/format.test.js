import { format, formatted, round } from '../format'

it('does basic formatting', () => {
  expect(format(1_500_000).formatted).toBe('1,500,000.00')
  expect(format(1_500_000.00).formatted).toBe('1,500,000.00')
  expect(formatted(1_500_000)).toBe('1,500,000.00')
  expect(formatted(1_500_000.00)).toBe('1,500,000.00')
})

it('accepts a decimals option and rounds', () => {
  expect(format(1_500_000.5, { decimals: 2 }).formatted).toBe('1,500,000.50')
  expect(format(1_500_000, { decimals: 2 }).formatted).toBe('1,500,000.00')
  expect(format(0.0001586, { decimals: 8 }).formatted).toBe('0.00015860')
  expect(format(0.0001586, { decimals: 6 }).formatted).toBe('0.000159')
})

it('accepts symbol options', () => {
  expect(format(1_500_000, { symbol: '$' }).formatted).toBe('$1,500,000.00')
  expect(format(-1_500_000, { symbol: '$' }).formatted).toBe('-$1,500,000.00')
  expect(format(1_500_000, { symbol: '€' }).formatted).toBe('€1,500,000.00')
  expect(format(-1_500_000, { symbol: '€' }).formatted).toBe('-€1,500,000.00')
  expect(format(1_500_000, { symbol: '₿' }).formatted).toBe('₿1,500,000.00')
  expect(format(-1_500_000, { symbol: '₿' }).formatted).toBe('-₿1,500,000.00')
  expect(format(1_500_000, { symbol: '$' }).number).toBe('1,500,000.00')
  expect(format(1_500_000, { symbol: '$' }).symbol).toBe('$')
  expect(format(1_500_000, { symbol: '$', showSymbol: false }).formatted).toBe('1,500,000.00')
  expect(format(1_500_000, { symbol: 'BTC' }).formatted).toBe('1,500,000.00 BTC')
  expect(format(-1_500_000, { symbol: 'BTC' }).formatted).toBe('-1,500,000.00 BTC')
  expect(format(1_500_000, { symbol: 'BTC', showSymbol: false }).formatted).toBe('1,500,000.00')
})

it('accepts a subscriptDecimals option', () => {
  expect(format(0.00037, { symbol: 'BTC', decimals: 8, subscriptDecimals: 3 }).formatted).toBe('0.0₃37000 BTC')
  expect(format(0.00037, { symbol: 'BTC', decimals: 8, subscriptDecimals: 4 }).formatted).toBe('0.00037000 BTC')
  expect(format(0.01, { symbol: 'BTC', decimals: 8, subscriptDecimals: 3 }).formatted).toBe('0.01000000 BTC')
  expect(format(1.00, { symbol: 'BTC', decimals: 2, subscriptDecimals: 2 }).formatted).toBe('1.0₂ BTC')
  expect(format(1.00, { symbol: '$', decimals: 2, subscriptDecimals: 3 }).formatted).toBe('$1.00')
})

it('accepts a trim option', () => {
  expect(format('1000.05000', { decimals: 10, trim: true }).formatted).toBe('1,000.05')
  expect(format('1000.05000', { decimals: 10, trim: true }).formatted).toBe('1,000.05')
  expect(format('1.05000', { decimals: 10, trim: true }).number).toBe('1.05')
  expect(format('1.00', { decimals: 10, trim: true }).formatted).toBe('1')
  expect(format('1.00', { decimals: 10, trim: true }).number).toBe('1')
  expect(format(0.00402720, { decimals: 10, trim: true }).formatted).toBe('0.0040272')
  expect(format(0.00402720, { decimals: 10, trim: true }).number).toBe('0.0040272')
  expect(format(1_500_000, { abbreviated: true, trim: true }).formatted).toBe('1.5M')
  expect(format(1_500_000, { abbreviated: true, trim: true }).number).toBe('1.5')
})

it('formats zero', () => {
  expect(format(0).formatted).toBe('0.00')
})

it('does nothing for null and undefined', () => {
  expect(format(null).formatted).toBe('')
  expect(format(null).number).toBe('')
  expect(format(undefined).formatted).toBe('')
  expect(format(undefined).number).toBe('')
})

describe('abbreviated numbers', () => {
  const options = { abbreviated: true }

  it('abbreviates numbers', () => {
    const number = format(1_500_000_000_000_000, options)
    expect(number.value).toBe(1_500_000_000_000_000)
    expect(number.formatted).toBe('1.50Q')
    expect(number.number).toBe('1.50')
    expect(number.unitAbbreviation).toBe('Q')
    expect(number.unit).toBe('quadrillion')

    expect(format(1_500_000_000_000_000_000, options).formatted).toBe('1500.00Q') // TODO should have a comma
    expect(format(1_500_000_000_000_000, options).formatted).toBe('1.50Q')
    expect(format(1_500_000_000_000, options).formatted).toBe('1.50T')
    expect(format(1_500_000_000, options).formatted).toBe('1.50B')
    expect(format(1_500_000, options).formatted).toBe('1.50M')
    expect(format(1_500, options).formatted).toBe('1.50K')
    expect(format(150.50, options).formatted).toBe('150.50')
  })

  it('abbreviates negative numbers', () => {
    expect(format(-1_500_000, options).formatted).toBe('-1.50M')
    expect(format(-1_500_000, options).number).toBe('-1.50')
  })

  it('accepts a decimals option and rounds', () => {
    expect(format(1_155_000, { ...options, decimals: 2 }).formatted).toBe('1.16M')
    expect(format(1_154_000, { ...options, decimals: 2 }).formatted).toBe('1.15M');
  })

  it('abbreviates numbers with a symbol', () => {
    expect(format(1_500_000, { ...options, symbol: '$' }).formatted).toBe('$1.50M')
    expect(format(-1_500_000, { ...options, symbol: '$' }).formatted).toBe('-$1.50M')
    expect(format(-1_500_000, { ...options, symbol: '$' }).number).toBe('-1.50')
  })

  it('abbreviates numbers with a symbol name', () => {
    expect(format(1_500_000, { ...options, symbol: 'BTC' }).formatted).toBe('1.50M BTC')
  })
})

describe('round', () => {
  it('rounds decimals numbers', () => {
    expect(round(0.000001596, 8)).toBe(0.0000016)
    expect(round(0.000001594, 8)).toBe(0.00000159)
  })

  it('handles integers', () => {
    expect(round(1_500_000, 2)).toBe(1_500_000)
    expect(round(1_500_000.00, 2)).toBe(1_500_000)
  })
})
