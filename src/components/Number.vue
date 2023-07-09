<template>
  <span :class="classes" :title="number.value.toString()">
    <span v-if="value">{{ formatted }}</span>
    <span v-if="number.unitAbbreviation" :class="`vn-abbrev vn-${number.unit}`">{{ number.unitAbbreviation }}</span>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { DEFAULT_OPTIONS, formatNumber } from '../format'

export interface Props {
  value?: number | string,
  decimals?: number,
  abbreviated?: boolean,
  colored?: boolean,
  symbol?: string,
  showSymbol?: boolean,
  subscriptDecimals?: number,
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  decimals: DEFAULT_OPTIONS.decimals,
  abbreviated: DEFAULT_OPTIONS.abbreviated,
  colored: true,
  symbol: '$',
  showSymbol: true,
  subscriptDecimals: DEFAULT_OPTIONS.subscriptDecimals,
})

const classes = computed(() => {
  const classes = [ 'vn' ]
  if (parseFloat(props.value.toString()) < 0) classes.push('vn-negative')
  if (props.colored) classes.push('vn-colored')
  return classes.join(' ')
})
const number = computed(() => formatNumber(props.value, props))
const formatted = computed(() => number.value.formatted.replace(number.value.unitAbbreviation || '', ''))
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
