<template lang="html">
  <div class="dial" v-if="props">
    <div class="dial__meta">
      <label class="dial__label">{{ props.label }}</label>
      <span class="dial__units">{{ props.units }}</span>
    </div>
    <div class="dial__main">
      <div class="dial__track">
        <input v-model="lVal" class="dial__input" type="range" :min="lMin" :max="lMax" :step="lStep" />
      </div>
      <div class="dial__graphic">
        <div class="dial__circle">
          <div class="dial__display">
              <span class="dial__val">{{ lVal }}</span>
          </div>
          <div class="dial__inner" :class="{'dial__inner--alt': props.type == 'alt', 'dial__inner--abs': props.type == 'abs'}"
          :style="{ transform: 'rotate('+arcPercent+'deg) scale(1.1, 1.1)'}"></div>
        </div>
      </div>
    </div>
    <footer v-if="props.reset" class="dial__footer">
      <button @click="resetValue()" class="dial__reset">Reset</button>
    </footer>
  </div>
</template>

<script>
  export default {
    props: ['value', 'props'],
    data(){
      return {
        initVal: (Number(this.value) >= 0.01) ? Number(this.value).toFixed(this.props.dec) : '0',
        lVal: (Number(this.value) >= 0.01) ? Number(this.value).toFixed(this.props.dec) : '0',
        lMin: Number(this.props.min).toFixed(this.props.dec),
        lMax: Number(this.props.max).toFixed(this.props.dec),
        lStep: Number(this.props.step).toFixed(this.props.dec)
      }
    },
    computed: {
      percent () {
        return Number(((this.lVal - this.lMin) * 100 ) / (this.lMax - this.lMin)).toFixed(0)
      },
      arcPercent () {
        return Number((this.percent * 180) / 100).toFixed(0)
      }
    },
    mounted: function() {
      // mounted
    },
    methods: {
      resetValue() {
        this.lVal = this.initVal
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
  .dial
    display: block
    &__meta
      font-size: 12px
      display: block
      margin-bottom: $blh/8
      text-align: center
    &__label
      display: inline-block
      text-align: left
    &__units
      display: none
    &__main
      position: relative
      z-index: 0
    &__track
      display: block
      position: relative
      z-index: 0
      width: 100%
      height: 0
      padding-bottom: 50%
      background: transparent
    &__input
      -webkit-appearance: none
      position: absolute
      z-index: 100
      display: block
      width: 100%
      height: 100%
      top: 0
      left: 0
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
    &__footer
      padding-top: $blh/4
    &__reset
      display: block
      width: 100%
      background: transparent
      border: 0
      color: clr2('mint', 0.4)
      font-size: 10px
      text-transform: uppercase
      padding: 0
      &:hover
        color: clr('mint')
        cursor: pointer
      &:focus
        outline: 0
    // Graphic
    &__graphic
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      display: block
      text-align: center
      overflow: hidden
      pointer-events: none
    &__circle
      position: relative
      z-index: 0
      display: inline-block
      width: 100%
      height: 0
      padding-bottom: 100%
      border-radius: 100%
      background-color: clr2('indigo')
      overflow: hidden
      box-shadow: inset 0 0 4px darken(clr('indigo'), 5%)
      &:after,
      &:before
        content: ''
        position: absolute
        z-index: 90
        background-color: clr2('indigo', 0, 2.5%)
        width: 80%
        height: 80%
        border-radius: 100%
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
      &:before
        z-index: 20
        background-color: transparent
        box-shadow: 0 0 4px darken(clr('indigo'), 5%)
    &__display
      position: absolute
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 50%
    &__val
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      font-size: 12px
      text-align: center
      line-height: 12px
    &__inner
      position: absolute
      top: 0
      left: 0
      z-index: 50
      width: 100%
      height: 100%
      background-color: transparent
      &:before,
      &:after
        content: ''
        position: absolute
        left: 0
        z-index: 60
        width: 100%
        height: 50%
        box-shadow: 0 0 4px darken(clr('indigo'), 5%)
      &:before
        background: linear-gradient(to right, darken(clr('mint'), 10%), lighten(clr('blue'), 10%))
        bottom: 0
      &:after
        display: none
        top: 0
      &--alt
        &:before
          background-image: linear-gradient(to right, darken(clr('pink'), 10%), lighten(clr('orange'), 10%))
      &--abs
        &:before,
        &:after
          box-shadow: none
        &:after
          display: block
          background-image: linear-gradient(to right, darken(clr('pink'), 10%), lighten(clr('orange'), 10%))

</style>
