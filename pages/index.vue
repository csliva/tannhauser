<template>
  <div class="app">
    <synth />
  </div>
</template>

<script>
  import Synth from '~/components/Synth.vue'
  export default {
    components: {
      Synth
    }
  }
</script>

<style lang="sass">
  .app
    background: #fff
    color: #666
    min-height: 100vh
</style>
