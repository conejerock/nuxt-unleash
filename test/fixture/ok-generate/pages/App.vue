<template>
  <h1>{{ $unleash.exists("new-feature")
    ? "New Feature Exists"
    : "New Feature Doesnt Exist" }}</h1>
</template>

<script lang="ts" setup>
const { $unleash } = useNuxtApp()
console.error(useNuxtApp());
console.error(useNuxtApp());
console.error(useNuxtApp());
console.error(useNuxtApp());
console.error(useNuxtApp());
</script>
