<template>
  <h1>{{ value }}</h1>
</template>

<script>
export default {
  asyncData (ctx) {
    return {
      value: ctx.app.unleash.exists('disabled-feature') && ctx.app.unleash.isEnabled('disabled-feature')
        ? 'New Feature Exists and Enabled'
        : 'New Feature Exists and Disabled'
    }
  }
}
</script>
