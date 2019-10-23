<template>
  <div>{{ propId }}</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    propId: {
      type: Number,
      default () {
        return 3
      }
    }
  }
})
</script>

<style></style>
