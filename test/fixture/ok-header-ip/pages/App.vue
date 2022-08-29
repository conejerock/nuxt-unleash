<template>
  <h1>{{ $unleash.isAllowIP("new-feature-by-ip-variant'")
    ? "New Feature Exists"
    : "New Feature Doesnt Exist" }}</h1>
</template>

<script setup lang="ts">
const { $unleash } = useNuxtApp()
</script>
