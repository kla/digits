import { formatNumber, round } from '../format'

it('does basic formatting', () => {
  expect(formatNumber(1_500_000).formatted).toBe('1,500,000.00')
  expect(formatNumber(1_500_000.00).formatted).toBe('1,500,000.00')
})

it('focus accepts a decimals option and rounds', () => {
  expect(formatNumber(1_500_000.5, { decimals: 2 }).formatted).toBe('1,500,000.50')
  expect(formatNumber(1_500_000, { decimals: 2 }).formatted).toBe('1,500,000.00')
  expect(formatNumber(0.000001586, { decimals: 8 }).formatted).toBe('0.00000159')
})

describe('abbreviated numbers', () => {
  const options = { abbreviated: true }

  it('can abbreviate numbers', () => {
    const number = formatNumber(1_500_000_000_000_000, options)
    expect(number.value).toBe(1_500_000_000_000_000)
    expect(number.formatted).toBe('1.50')
    expect(number.unitAbbreviation).toBe('Q')
    expect(number.unit).toBe('quadrillion')
    expect(number.string).toBe('1.50Q')

    expect(formatNumber(1_500_000_000_000_000, options).string).toBe('1.50Q')
    expect(formatNumber(1_500_000_000_000, options).string).toBe('1.50T')
    expect(formatNumber(1_500_000_000, options).string).toBe('1.50B')
    expect(formatNumber(1_500_000, options).string).toBe('1.50M')
    expect(formatNumber(1_500, options).string).toBe('1.50K')
    expect(formatNumber(150.50, options).string).toBe('150.5')
  })

  it('accepts a decimals option and rounds', () => {
    expect(formatNumber(1_155_000, { ...options, decimals: 2 }).string).toBe('1.16M')
    expect(formatNumber(1_154_000, { ...options, decimals: 2 }).string).toBe('1.15M');
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

  it('handles undefined and null decimals', () => {
    expect(round(1_500_000.00, undefined)).toBe(1_500_000)
    expect(round(1_500_000.00, null)).toBe(1_500_000)
  })
})
