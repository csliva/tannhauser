<template lang="html">
  <div class="module">

  </div>
</template>

<script>
  export default {
    props: ['value'],
    data () {
      return {

      }
    }
  }
</script>


<style lang="sass">
  .module
    color: #333
    transition: color 0.3
    border: solid 2px #ccc
    padding: $blh/2
    &--disconnected
      color: #666
      border-color: #eee
    h2
      font-size: 18px
      margin-bottom: $blh/4
    &__row
      display: block
      margin-bottom: $blh/4
    &:hover
      border-color: blue
    &--highlight
      border-color: purple
</style>
