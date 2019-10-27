<template>
  <div>
    <label>{{ label }}</label>
    <input>
    <div>
      <label class="message">{{ message }}</label>
      <div>
        <input v-model="message">
      </div>
      <div>
        <button @click="test">
          test
        </button>
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
  },
  methods: {
    async test () {
      alert('loadTest = ' +
        await sampleModule.loadTest().then((obj) => {
          return obj
        }))
    }
  }
})
</script>

<style></style>
