<template lang="html">
  <div class="check" v-if="props">
    <div class="check__meta">
      <label class="check__label">{{ props.label }}</label>
    </div>
    <div class="check__main check__main--col4">
      <button v-for="option in props.options" @click="lVal = option"
      class="check__button" :class="{'check__button--active': lVal === option}">
        {{ option | capitalize }}
      </button>
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
  .check
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
      &--col4
        display: grid
        grid-template-columns: 1fr 1fr 1fr 1fr
        grid-gap: $blh/8
    &__button
      display: block
      border-radius: 0
      border: solid 1px #fff
      color: #fff
      padding: $blh/2 0
      text-align: center
      background: clr('indigo')
      font-size: 12px
      cursor: pointer
      &:hover
        color: lighten(clr('mint'), 10%)
        background-color: darken(clr('indigo'), 5%)
      &:focus
        outline: 0
      &--active
        background-color: darken(clr('mint'), 15%)
        color: #fff
        border-color: #fff
        &:hover
          color: #fff
          background-color: darken(clr('mint'), 25%)

</style>
