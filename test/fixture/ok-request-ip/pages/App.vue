<template>
  <h1>{{ $unleash.isAllowIP("new-feature-by-ip")
    ? "New Feature Exists"
    : "New Feature Doesnt Exist" }}</h1>
</template>

<script setup lang="ts">
import { NuxtApp } from "nuxt/app";

const { $unleash }: NuxtApp = useNuxtApp()
</script>
