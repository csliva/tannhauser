<template lang="html">
  <button class="btn" :class="btnClass" @click="handleClick">
    <span class="btn__text">{{ text || msg }}</span>
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
      btnClass () {
        let result = this.type ? 'btn--' + this.type : ''
        result += this.size ? ' btn--' + this.size : ''
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

<style lang="sass" scoped>
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

  .btn
    @include transition(background-color, color)
    display: inline-block
    position: relative
    z-index: 10
    appearance: none
    -webkit-appearance: none
    background-color: clr2('indigo', 0.35, 10%)
    border: solid 1px clr2('indigo', 0.35, 10%)
    border-radius: $blh
    padding: 0 $blh/2
    color: transparentize(#fff, 0.35)
    text-align: center
    font-size: 12px
    text-shadow: 0 0 2px clr2('indigo', 0, 10%)
    line-height: $blh
    &__text
      position: relative
      z-index: 100
      display: inline-block
      padding-top: 1px
    &:focus
      outline: 0
    &:before,
    &:after
      @include transition(opacity)
      content: ''
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      border-radius: $blh
    &:before
      opacity: 0
      z-index: 0
      border: solid 1px clr2('blue', 0, -10%)
      background: linear-gradient(-45deg, clr2('blue', 0.25, -5%), clr2('blue', 0, -10%), clr2('blue', 0.25, -20%))
      @include neuMorphOuter(clr2('indigo', 0.25, 10%), clr2('indigo', 0.25, -10%))
    &:after
      opacity: 1
      z-index: 20
      @include neuMorphInner(clr2('indigo', 0.5, 7.5%), clr2('indigo', 0.5, -7.5%))
    &--success
      &:before
        border: solid 1px clr2('mint', 0, -10%)
        background: linear-gradient(-45deg, clr2('mint', 0.25, -5%), clr2('mint', 0, -10%), clr2('mint', 0.25, -20%))
    &--warning
      &:before
        border: solid 1px clr2('orange', 0, -10%)
        background: linear-gradient(-45deg, clr2('orange', 0.25, -5%), clr2('orange', 0, -10%), clr2('orange', 0.25, -20%))
    &--danger
      &:before
        border: solid 1px clr2('pink', 0, -10%)
        background: linear-gradient(-45deg, clr2('pink', 0.25, -5%), clr2('pink', 0, -10%), clr2('pink', 0.25, -20%))
    &:hover,
    &--active
      cursor: pointer
      background-color: transparent
      color: #fff
      &:before
        opacity: 1
      &:after
        opacity: 0

</style>
