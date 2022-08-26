<template>
  <div>Works!</div>
</template>

<script setup lang="ts">
import { useNuxtApp } from "nuxt/app"

const { $unleash } = useNuxtApp()

console.log('maintenance', $unleash.isEnabled('maintenance'))
console.log('debug-logs', $unleash.isAllowUser('debug-logs', '85.58.231.181'))
</script>
