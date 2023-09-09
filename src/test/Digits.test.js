import { mount } from "@vue/test-utils"
import Digits from '../Digits.vue'

const render = (props) => mount(Digits, { props })

describe('Digits', () => {
  it('renders', () => {
    const component = render({ value: 1_500_000 })
    expect(component.text()).toBe('$1,500,000.00')
    expect(component.find('.digits-colored').exists()).toBe(true)
  })

  it('accepts an abbreviation option', () => {
    const component = render({ value: 1_500_000, abbreviated: true })
    expect(component.text()).toBe('$1.50M')
    expect(component.find('.digits-abbrev.digits-million').exists()).toBe(true)
  })

  it('accepts a colored option', () => {
    const component = render({ value: 1_500_000, colored: false })
    expect(component.find('.digits-colored').exists()).toBe(false)
  })

  it('handles negative Digitss', () => {
    const component = render({ value: -1_500 })
    expect(component.text()).toBe('-$1,500.00')
    expect(component.find('.digits-negative').exists()).toBe(true)
  })

  it('accepts a minDecimals option', () => expect(render({ value: 1_500_000.45, minDecimals: 4, maxDecimals: 6, trim: true }).text()).toBe('$1,500,000.4500'))
  it('accepts a maxDecimals option', () => expect(render({ value: 1_500_000.45615, maxDecimals: 4 }).text()).toBe('$1,500,000.4562'))
  it('accepts a symbol option', () => expect(render({ value: 1_500_000, symbol: "BTC" }).text()).toBe('1,500,000.00 BTC'))
  it('accepts a showSymbol option', () => expect(render({ value: 1_500_000, showSymbol: false }).text()).toBe('1,500,000.00'))
  it('accepts a subscriptDecimals option', () => expect(render({ value: 0.000001, maxDecimals: 6, subscriptmaxDecimals: 2 }).text()).toBe('$0.0₅1'))
  it('handles -0.00', () => expect(render({ value: '-0.00' }).text()).toBe('$0.00'))
  it('handles 0', () => expect(render({ value: 0 }).text()).toBe('$0.00'))
  it('handles null value', () => render({ value: null }))
  it('handles undefined value', () => render({ }))
})
