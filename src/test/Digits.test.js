import { render } from './utils'
import Digits from '../Digits.vue'

describe('Digits', () => {
  it('renders', () => {
    const { getByText, container } = render(Digits, { props: { value: 1_500_000 } })
    getByText('$1,500,000.00')
    expect(container.firstChild).toHaveClass('fm-colored')
  })

  it('accepts an abbreviation option', () => {
    const { getByText } = render(Digits, { props: { value: 1_500_000, abbreviated: true } })
    getByText('$1.50')
    expect(getByText('M')).toHaveClass('fm-abbrev fm-million')
  })

  it('accepts a colored option', () => {
    const { container } = render(Digits, { props: { value: 1_500_000, colored: false } })
    expect(container.firstChild).not.toHaveClass('fm-colored')
  })

  it('handles negative Digitss', () => {
    const { getByText, container } = render(Digits, { props: { value: -1_500 } })
    getByText('-$1,500.00')
    expect(container.firstChild).toHaveClass('fm-negative')
  })

  it('accepts a maxDecimals option', () => render(Digits, { props: { value: 1_500_000.45615, maxDecimals: 4 } }).getByText('$1,500,000.4562'))
  it('accepts a symbol option', () => render(Digits, { props: { value: 1_500_000, symbol: "BTC" } }).getByText('1,500,000.00 BTC'))
  it('accepts a showSymbol option', () => render(Digits, { props: { value: 1_500_000, showSymbol: false } }).getByText('1,500,000.00'))
  it('accepts a subscriptDecimals option', () => render(Digits, { props: { value: 0.000001, maxDecimals: 6, subscriptmaxDecimals: 2 } }).getByText('$0.0₅1'))
  it('handles -0.00', () => render(Digits, { props: { value: '-0.00' } }).getByText('$0.00'))
  it('handles 0', () => {
    render(Digits, { props: { value: 0 } }).getByText('$0.00')
  })
})
