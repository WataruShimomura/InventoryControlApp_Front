<template>
  <div>
    <label>{{ label }}</label>
    <input>
    <div>
      <label class="message">{{ message }}</label>
      <div>
        <input v-model="message">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { sampleModule } from '@/store/sample/Sample'

export default Vue.extend({
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    message: {
      get () {
        return sampleModule.param1
      },
      set (value :string) {
        sampleModule.addPost(value)
      }
    }
  }
})
</script>

<style></style>
