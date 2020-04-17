<template lang="html">
  <div class="select" v-if="props">
    <div class="select__meta">
      <label class="select__label">{{ props.label }}</label>
    </div>
    <div class="select__main">
      <span class="select__icon"></span>
      <select v-model="lVal" class="select__input">
        <option v-for="type in props.options" :value="type">{{ type | capitalize }}</option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['value', 'props'],
    data () {
      return {
        lVal: this.value
      }
    },
    filters: {
      capitalize: function(s) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }
    },
    watch: {
      lVal () {
        this.$emit('input', this.lVal)
      }
    }
  }
</script>

<style lang="sass">
  .select
    display: block
    &__meta
      display: block
      margin-bottom: $blh/8
    &__label
      display: block
    &__main
      display: block
      position: relative
      z-index: 0
    &__icon
      position: absolute
      z-index: 20
      top: 0
      right: 0
      width: $blh
      height: 100%
      pointer-events: none
      &:after
        content: ''
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        width: 0
        height: 0
        border-style: solid
        border-width: 5px 5px 0 5px
        border-color: #fff transparent transparent transparent
    &__input
      position: relative
      z-index: 10
      appearance: none
      -webkit-appearance: none
      display: block
      width: 100%
      padding: $blh/8 $blh/2
      font-size: 12px
      line-height: $blh
      border: solid 1px transparentize(#fff, 0.35)
      border-radius: 0
      background-color: clr('indigo')
      color: #fff
      cursor: pointer
      &:focus
        outline: 0
      &:hover
        color: lighten(clr('mint'), 10%)
        background-color: darken(clr('indigo'), 5%)



</style>
