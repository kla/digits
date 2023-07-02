<template>
  <span :class="classes" :title="number.value.toLocaleString()">
    <span v-if="value">{{ number.formatted }}</span>
    <span v-if="number.unitAbbreviation" :class="`vn-abbrev vn-${number.unit}`">{{ number.unitAbbreviation }}</span>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { formatNumber } from '../format'

export interface Props {
  value?: number | string,
  decimals?: number,
  abbreviated?: boolean,
  colored?: boolean,
  symbol?: string,
  showSymbol?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  decimals: 2,
  abbreviated: false,
  colored: true,
  symbol: '$',
  showSymbol: true,
})

const classes = computed(() => {
  const classes = [ 'vn' ]
  if (parseFloat(props.value.toString()) < 0) classes.push('vn-negative')
  if (props.colored) classes.push('vn-colored')
  return classes.join(' ')
})
const number = computed(() => formatNumber(props.value, props))
</script>

<style lang="scss" scoped>
.vn {
  &-trillion { color: var(--vn-trillion, violet) }
  &-billion { color: var(--vn-billion, blueviolet) }
  &-million { color: var(--vn-million, goldenrod) }
  &-thousand { color: var(--vn-thousand, lightskyblue) }
}
.vn-colored {
  color: var(--vn-positive, limegreen);
  &.vn-negative { color: var(--vn-negative, indianred) }
}
</style>
