<template lang="html">
<div>
  <div class="metr-wrap">
    <div class="metr" :style="{ width: + lerp + '%' }"></div>
  </div>
</div>
</template>

<script>
  export default {
    props: [ 'value' ],
    computed: {
      lerp: function () {
        let lerp_val = ((parseFloat(this.value) + 24)/48)*100
        if (lerp_val < 0) { return 0 }
        else if (lerp_val > 100) { return 100 }
        else { return lerp_val }
      }
    }
  }
</script>

<style lang="sass">
  .metr-wrap
      display: block
      height: 10px
      width: 100%
      background-color: #1b203d
      box-shadow: inset 0 0 4px #13172b
  .metr    
    background: linear-gradient(to right, #49ac8b, #41c0fa)
    display: block
    height: 100%
</style>
