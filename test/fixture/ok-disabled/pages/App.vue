<template>
  <h1>{{ $unleash.exists("disabled-feature") && $unleash.isEnabled('disabled-feature')
    ? 'New Feature Exists and Enabled'
    : 'New Feature Exists and Disabled' }}</h1>
</template>

<script setup lang="ts">
const { $unleash } = useNuxtApp()
</script>
