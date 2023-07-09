<template>
  <span :class="classes" :title="number.value.toString()">
    <span v-if="value">{{ formatted }}</span>
    <span v-if="number.unitAbbreviation" :class="`fm-abbrev fm-${number.unit}`">{{ number.unitAbbreviation }}</span>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { DEFAULT_OPTIONS, format } from '../format'

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
  const classes = [ 'fm' ]
  if (parseFloat(props.value.toString()) < 0) classes.push('fm-negative')
  if (props.colored) classes.push('fm-colored')
  return classes.join(' ')
})
const number = computed(() => format(props.value, props))
const formatted = computed(() => number.value.formatted.replace(number.value.unitAbbreviation || '', ''))
</script>

<style lang="scss" scoped>
.fm {
  &-trillion { color: var(--fm-trillion, violet) }
  &-billion { color: var(--fm-billion, blueviolet) }
  &-million { color: var(--fm-million, goldenrod) }
  &-thousand { color: var(--fm-thousand, lightskyblue) }
}
.fm-colored {
  color: var(--fm-positive, limegreen);
  &.fm-negative { color: var(--fm-negative, indianred) }
}
</style>
