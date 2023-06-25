<template>
  <div class="example">
    <table width="600">
      <tr>
        <th align="left">Symbol</th>
        <th align="left">Name</th>
        <th align="right">Market Cap</th>
        <th align="right">USD Price</th>
        <th align="right">BTC Price</th>
        <th align="right">Change</th>
      </tr>
      <tr v-for="item in data">
        <td>{{ item.ticker }}</td>
        <td>{{ item.name }}</td>
        <td align="right"><Number :value="item.market_cap" abbreviated /></td>
        <td align="right"><Number :value="item.usd_price" :colored="false" /></td>
        <td align="right"><Number :value="btcPrice(item.usd_price)" :colored="false" /></td>
        <td align="right"><Number :value="item.change" /></td>
      </tr>
    </table>

    <br />
    <table>
      <tr v-for="number in numbers">
        <td><Number :value="number" /></td>
        <td><Number :value="number" abbreviated /></td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts" setup>
import Number from './components/Number.vue'

const data = [
  { ticker: 'AAPL', name: 'Apple', market_cap: 2_936_000_000_000, usd_price: 186.68, change: -0.31 },
  { ticker: 'MSFT', name: 'Microsoft', market_cap: 2_491_000_000_000, usd_price: 335.02, change: -0.46 },
  { ticker: '2222.SR', name: 'Saudi Aramco', market_cap: 2_093_000_000_000, usd_price: 8.6, change: 0.13 },
  { ticker: 'GOOG', name: 'Google', market_cap: 1_557_000_000_000, usd_price: 123.02, change: -0.84 },
  { ticker: 'AMZN', name: 'Amazon', market_cap: 1_326_000_000_000, usd_price: 129.33, change: -0.81 },
  { ticker: 'NVDA', name: 'Nvidia', market_cap: 1_042_000_000_000, usd_price: 422.09, change: -8.01 },
  { ticker: 'TSLA', name: 'Tesla', market_cap: 813_290_000_000, usd_price: 256.6, change: -7.77 },
  { ticker: 'META', name: 'Meta Platforms', market_cap: 747_000_000_000, usd_price: 288.73, change: 3.89 },
  { ticker: 'BRK-B', name: 'Berkshire Hathaway', market_cap: 736_850_000_000, usd_price: 335.25, change: -1.71 },
  { ticker: 'BTC', name: 'Bitcoin', market_cap: 593_136_457_453, usd_price: 30_547.28, change: 121.53 },
  { ticker: 'TSM', name: 'Taiwan Semiconductor', market_cap: 528_540_000_000, usd_price: 101.91, change: -1.84 },
  { ticker: 'ETH', name: 'Ethereum', market_cap: 227_253_347_081, usd_price: 1_890.79, change: 25.3 },
  { ticker: 'DOGE', name: 'Dogecoin', market_cap: 9_365_142_903, usd_price: 0.06694, change: 0.002 },
  { ticker: 'PEPE', name: 'Pepe', market_cap: 625_254_507, usd_price: 0.000001596, change: -0.000000006 },
  { ticker: 'BONK', name: 'Bonk', market_cap: 20_260_524, usd_price: 0.0000003744, change: -0.0000003744 },
  { ticker: 'DOBO', name: 'DogeBonk', market_cap: 2_176_858, usd_price: 0.000000003734, change: 0.000000000004 },
]

function btcPrice(usdPrice: number) {
  return usdPrice / data.find(item => item.ticker === 'BTC').usd_price
}
</script>

<style lang="scss" scoped>
* {
  color: lightgray;
  font-family: Roboto,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;
  font-size: 14px;
}
ul {
  margin: 0;
  padding: 0;
}
td {
}
</style>
