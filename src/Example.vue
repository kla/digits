<template>
  <div class="example">
    <ul>
      <li><Number :value="3.14" /></li>
      <li><Number :value="-3.14" /></li>
    </ul>
  </div>
</template>

<script setup>
import Number from './components/Number.vue'
</script>

<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
}
</style>
