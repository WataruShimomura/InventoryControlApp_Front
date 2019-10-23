<template>
  <div>
    <vue-input label="ラベル" />
    <div>
      <nuxt-link to="/">
        to Root
      </nuxt-link>
    </div>
    <div>
      <nuxt-link to="one">
        to One
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import VueInput from '~/components/sample/VueInput.vue'

export default {
  components: {
    VueInput
  }
}
</script>

<style></style>
