<template>
  <div>
    {{ value }}
  </div>
</template>

<script setup>
const props = defineProps({
  value: { type: [ Number, String ], required: true },
})
</script>

<style lang="scss" scoped>
</style>
