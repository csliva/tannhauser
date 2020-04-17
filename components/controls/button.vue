<template lang="html">
  <button class="button" :class="buttonClass" @click="handleClick">
    <span class="button__text">{{ text || msg }}</span>
  </button>
</template>

<script>
  export default {
    props: ['value', 'text', 'type', 'size'],
    data(){
      return {
        msg: 'No Text'
      }
    },
    computed: {
      buttonClass () {
        let result = this.type ? 'button--' + this.type : ''
        result += this.size ? ' button--' + this.size : ''
        return result
      }
    },
    methods: {
    	handleClick () {
      	this.$emit('click')
      }
    }
  }
</script>

<style lang="sass">
  // Mixins
  @mixin states($c)
    &:hover
      background-color: darken($c, 5%)
      border-color: darken($c, 5%)
    &:focus
      background-color: darken($c, 5%)
      border-color: darken($c, 10%)
      outline: 0
    &:active
      background-color: darken($c, 10%)
      border-color: darken($c, 10%)

  .button
    @include states(clr('blue'))
    background-color: clr('blue')
    border: solid 2px clr('blue')
    position: relative
    z-index: 0
    display: inline-block
    line-height: $blh * 0.8
    font-size: 12px
    padding: 0 $blh/4
    margin-bottom: 0
    font-weight: 700
    &--success
      @include states(clr('mint'))
      background-color: clr('mint')
      border-color: clr('mint')
    &--warning
      @include states(clr('orange'))
      background-color: clr('orange')
      border-color: clr('orange')
    &--danger
      @include states(clr('pink'))
      background-color: clr('pink')
      border-color: clr('pink')
    &--big
      font-size: $bfs
      padding: $blh/4 $blh/2
    &__text
      color: #fff
      position: relative
      z-index: 10

</style>
