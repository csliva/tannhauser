<template lang="html">
  <div class="asdr">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
  export default {
    props: ['value', 'synth'],
    data(){
      return {
        msg: 'ASDR Loaded'
      }
    }
  }
</script>

<style lang="sass">
  .asdr
    display: block
</style>
