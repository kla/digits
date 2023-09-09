<template>
  <span :class="classes" :title="value ? value.toString() : ''">
    <span v-if="value != null && value != undefined">{{ formatted }}</span>
    <span v-if="number.unitAbbreviation" :class="`digits-abbrev digits-${number.unit}`">{{ number.unitAbbreviation }}</span>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { DEFAULT_OPTIONS, format } from './format'

export interface Props {
  value?: number | string,
  minDecimals?: number,
  maxDecimals?: number,
  subscriptDecimals?: number,
  abbreviated?: boolean,
  colored?: boolean,
  symbol?: string,
  showSymbol?: boolean,
  trim?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  minDecimals: DEFAULT_OPTIONS.minDecimals,
  maxDecimals: DEFAULT_OPTIONS.maxDecimals,
  subscriptDecimals: DEFAULT_OPTIONS.subscriptDecimals,
  abbreviated: DEFAULT_OPTIONS.abbreviated,
  colored: true,
  symbol: '$',
  showSymbol: true,
  trim: DEFAULT_OPTIONS.trim,
})

const classes = computed(() => {
  const classes = [ 'digits' ]

  if (props.value && parseFloat(props.value.toString()) < 0) classes.push('digits-negative')
  if (props.colored && number.value.number != '-0.00' && number.value.number != '0.00') classes.push('digits-colored')
  return classes.join(' ')
})
const number = computed(() => format(props.value, props))
const formatted = computed(() => {
  let f = number.value.formatted.replace(number.value.unitAbbreviation || '', '')
  if (number.value.number == '-0.00') f = f.replace('-', '')
  return f
})
</script>

<style scoped>
.digits-quadrillion { color: var(--digits-quadrillion, deeppink) }
.digits-trillion { color: var(--digits-trillion, violet) }
.digits-billion { color: var(--digits-billion, blueviolet) }
.digits-million { color: var(--digits-million, goldenrod) }
.digits-thousand { color: var(--digits-thousand, lightskyblue) }
.digits-colored {
  color: var(--digits-positive, limegreen);
  &.digits-negative { color: var(--digits-negative, indianred) }
}
</style>
