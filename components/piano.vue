<template lang="html">
  <div class="piano">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        msg: 'Piano Loaded',
      }
    },
  }
</script>

<style lang="sass">
  .piano
    display: block
</style>
