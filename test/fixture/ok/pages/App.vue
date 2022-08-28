<template>
  <h1>{{ $unleash.exists("new-feature")
    ? "New Feature Exists"
    : "New Feature Doesnt Exist" }}</h1>
</template>

<script setup lang="ts">
// alternatively, you can also use it here
const { $unleash } = useNuxtApp()
</script>
