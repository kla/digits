<template>
  <span :class="classes">{{ formattedValue }}</span>
</template>

<script setup>
import { computed } from 'vue'
import numbro from 'numbro'

const props = defineProps({
  value: { type: [ Number, String ], required: true },
  decimals: { type: Number, default: 2 },
  abbreviated: { type: Boolean, default: false },
  colored: { type: Boolean, default: true },
})

const classes = computed(() => {
  const classes = [ 'vue-number' ]
  if (props.value < 0) classes.push('negative')
  if (props.colored) classes.push('colored')
  return classes.join(' ')
})
const formattedValue = computed(() => {
  return numbro(props.value).formatCurrency({ thousandSeparated: true, mantissa: props.decimals, average: props.abbreviated }).toUpperCase()
})
</script>

<style lang="scss" scoped>
.colored {
  &.vue-number {
    color: limegreen;
  }
  &.negative {
    color: indianred;
  }
}
</style>
