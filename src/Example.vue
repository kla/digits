<template>
  <div class="example">
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

const numbers = [
  1_000_000_000_000,
  500_000_000_000,
  1_000_000_000,
  500_000_000,
  1_000_000,
  500_000,
  1_000,
  100,
  10,
  1,
]
</script>

<style lang="scss" scoped>
* {
  color: gray;
  font-family: Roboto,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;
  font-size: 14px;
}
ul {
  margin: 0;
  padding: 0;
}
td {
  text-align: right;
}
</style>
