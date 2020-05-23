<template lang="html">
<div>
  <div class="meter" :style="{ transform: 'scaleX('+ lerp +')'}">
  </div>
  <p>val: {{ lerp }}</p>
</div>
</template>

<script>
  export default {
    props: [ 'value' ],
    computed: {
      lerp: function () {
        return ((this.value*100)/24)*-1
      }
    }
  }
</script>

<style lang="sass">
  .meter
      display: block
      height: 10px
      &:after
        content: ""
        background-color: red
        height: 100%
        width: 1%
        position: absolute
        right: 50%
</style>
