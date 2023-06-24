<template>
  <span :class="classes">
    <span>{{ number.formatted }}</span>
    <span v-if="number.abbreviation" :class="`vn-abbrev vn-${number.unit}`">{{ number.abbreviation }}</span>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { formatNumber } from '../format'

export interface Props {
  value: number | string,
  decimals?: number,
  abbreviated?: boolean,
  colored?: boolean,
  symbol?: string,
}

const props = withDefaults(defineProps<Props>(), {
  decimals: 2,
  abbreviated: false,
  colored: true,
  symbol: '$',
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
