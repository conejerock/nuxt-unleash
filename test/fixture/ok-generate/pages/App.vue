<template>
  <h1>{{ value }}</h1>
</template>

<script>
export default {
  asyncData (ctx) {
    return {
      value: ctx.app.unleash.exists('new-feature')
        ? 'New Feature Exists'
        : 'New Feature Doesnt Exist'
    }
  }
}
</script>
