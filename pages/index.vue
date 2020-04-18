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
    background-color: clr('indigo')
    height: 100vh
    overflow: hidden
</style>
