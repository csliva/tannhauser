<template lang="html">
  <div class="range" v-if="props">
    <div class="range__meta">
      <label class="range__label">{{ props.label }}</label>
      <span class="range__percent">{{ percent + '%' }}</span>
      <span class="range__display">
        <span class="range__val">{{ lVal }}</span>
        <span class="range__units">{{ props.units }}</span>
      </span>
    </div>
    <div class="range__main">
      <div class="range__track">
        <input v-model="lVal"
        class="range__input" type="range" :min="lMin" :max="lMax" :step="lStep" />
        <div class="range__progress">
          <div class="range__current" :style="{ width: percent+'%' }"></div>
          <div class="range__total"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['value', 'props'],
    data(){
      return {
        lVal: (Number(this.value) > 0.01) ? Number(this.value).toFixed(this.props.dec) : '0',
        lMin: Number(this.props.min).toFixed(this.props.dec),
        lMax: Number(this.props.max).toFixed(this.props.dec),
        lStep: Number(this.props.step).toFixed(this.props.dec)
      }
    },
    computed: {
      percent () {
        return Number(((this.lVal - this.lMin) * 100 ) / (this.lMax - this.lMin)).toFixed(1)
      }
    },
    mounted: function() {
      // mounted
    },
    methods: {
      // methods
    },
    watch: {
      lVal () {
        this.$emit('input', this.lVal)
      }
    }
  }
</script>

<style lang="sass">
  .range
    display: block
    margin-bottom: $blh/2
    &__meta
      font-size: 0
    &__label,
    &__percent,
    &__display
      font-size: $bfs
      display: inline-block
      vertical-align: bottom
      width: 33.333%
    &__percent
      text-align: center
      color: lighten(clr('indigo'), 45%)
    &__display
      text-align: right
    &__main
      padding-top: $blh/4
    &__track
      display: block
      height: 6px
      position: relative
      z-index: 0
      background: transparent
    &__progress
      border-radius: 2px
      overflow: hidden
      position: absolute
      top: 0
      left: 0
      height: 100%
      width: 100%
    &__total,
    &__current
      position: absolute
      top: 0
      left: 0
      height: 100%
    &__total
      display: block
      z-index: 10
      width: 100%
      background-color: clr('indigo')
      box-shadow: inset 0 0 3px darken(clr('indigo'), 10%)
    &__current
      position: absolute
      z-index: 20
      border-radius: 2px
      background-color: lighten(clr('mint'), 10%)
      background-image: linear-gradient(to left, lighten(clr('mint'), 15%), lighten(clr('blue'), 15%))
      opacity: 0.75
    &__input
      -webkit-appearance: none
      position: relative
      z-index: 100
      display: block
      width: 100%
      height: 100%
      background-color: transparent
      border: 0
      margin: 0
      &::-webkit-slider-thumb
        @include boxShadow()
        -webkit-appearance: none
        width: 18px
        height: 18px
        border-radius: 100%
        background-image: radial-gradient(lighten(clr('indigo'), 35%), lighten(clr('indigo'), 25%))
        border: solid 2px clr('indigo')
        box-shadow: 0 0 6px clr('indigo')
      &::-ms-track
        width: 100%
        cursor: pointer
        background: transparent
        border-color: transparent
        color: transparent
      &:focus
        outline: none
</style>
