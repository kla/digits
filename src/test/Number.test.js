import { render } from './utils'
import Number from '../components/Number.vue'

describe('Number', () => {
  it('renders', () => {
    const { getByText, container } = render(Number, { props: { value: 1_500_000 } })
    getByText('$1,500,000.00')
    expect(container.firstChild).toHaveClass('fm-colored')
  })

  it('accepts an abbreviation option', () => {
    const { getByText } = render(Number, { props: { value: 1_500_000, abbreviated: true } })
    getByText('$1.50')
    expect(getByText('M')).toHaveClass('fm-abbrev fm-million')
  })

  it('accepts a colored option', () => {
    const { container } = render(Number, { props: { value: 1_500_000, colored: false } })
    expect(container.firstChild).not.toHaveClass('fm-colored')
  })

  it('handles negative numbers', () => {
    const { getByText, container } = render(Number, { props: { value: -1_500 } })
    getByText('-$1,500.00')
    expect(container.firstChild).toHaveClass('fm-negative')
  })

  it('accepts a decimals option', () => render(Number, { props: { value: 1_500_000.45615, decimals: 4 } }).getByText('$1,500,000.4562'))
  it('accepts a symbol option', () => render(Number, { props: { value: 1_500_000, symbol: "BTC" } }).getByText('1,500,000.00 BTC'))
  it('accepts a showSymbol option', () => render(Number, { props: { value: 1_500_000, showSymbol: false } }).getByText('1,500,000.00'))
  it('accepts a subscriptDecimals option', () => render(Number, { props: { value: 0.000001, decimals: 6, subscriptDecimals: 2 } }).getByText('$0.0₅1'))
  it('handles -0.00', () => render(Number, { props: { value: '-0.00' } }).getByText('$0.00'))
})
