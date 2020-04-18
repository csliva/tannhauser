<template lang="html">
  <div class="dial" v-if="props">
    <div class="dial__main">
      <div class="dial__track">
        <input v-model="lVal" class="dial__input" type="range" :min="lMin" :max="lMax" :step="lStep" />
      </div>
      <div class="dial__graphic">
        <div class="dial__circle">
          <div class="dial__inner" :style="{ transform: 'rotate('+lVal+'deg)'}">
            <div class="dial__bar" :class="{'dial__bar--alt': props.type == 'alt'}"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="dial__meta">
      <label class="dial__label">{{ props.label }}</label>
      <span class="dial__display">
        <span class="dial__val">{{ lVal }}</span>
        <span class="dial__units">{{ props.units }}</span>
      </span>
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
        return Number(((this.lVal - this.lMin) * 100 ) / (this.lMax - this.lMin)).toFixed(0)
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
  .dial
    display: block
    margin-bottom: $blh/2
    &__meta
      font-size: 0
    &__label,
    &__display
      font-size: $bfs
      display: inline-block
      vertical-align: bottom
      width: 50%
    &__label
      text-align: left
      padding-left: $blh/2
    &__display
      text-align: right
      padding-right: $blh/2
    &__main
      position: relative
      z-index: 0
      margin-bottom: $blh/4
    &__track
      display: block
      height: 40px
      position: relative
      z-index: 0
      background: transparent
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
        visibility: hidden
        opacity: 0
      &::-ms-track
        width: 100%
        cursor: pointer
        background: transparent
        border-color: transparent
        color: transparent
      &:focus
        outline: none
    // Graphic
    &__graphic
      position: absolute
      top: 0
      left: 0
      width: 100%
      display: block
      text-align: center
      height: 40px
      overflow: hidden
      pointer-events: none
    &__circle
      position: relative
      z-index: 0
      display: inline-block
      width: 80px
      height: 80px
      border-radius: 100%
      background-color: clr('indigo')
      overflow: hidden
      box-shadow: inset 0 0 4px darken(clr('indigo'), 10%)
      &:after,
      &:before
        content: ''
        position: absolute
        z-index: 100
        background-color: lighten(clr('indigo'), 5%)
        width: 60px
        height: 60px
        border-radius: 100%
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
      &:before
        z-index: 20
        background-color: transparent
        box-shadow: 0 0 4px darken(clr('indigo'), 10%)
    &__inner
      position: absolute
      top: 0
      left: 0
      z-index: 50
      width: 100%
      height: 100%
      background-color: transparent
    &__bar
      background-image: linear-gradient(to right, darken(clr('mint'), 10%), lighten(clr('blue'), 10%))
      position: absolute
      bottom: 0
      left: 0
      z-index: 60
      width: 100%
      height: 50%
      box-shadow: 0 0 4px darken(clr('indigo'), 10%)
      &--alt
        background-image: linear-gradient(to right, darken(clr('pink'), 10%), lighten(clr('orange'), 10%))
</style>
