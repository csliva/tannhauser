<template>
  <div class="app">
    <div class="app__inner">
      <nav v-if="dev" class="app__nav">
        <button @click="active = 'synth'"
        class="app__btn" :class="{'app__btn--active': active === 'synth'}" >
          Synth
        </button>
        <button @click="active = 'sandbox'"
        class="app__btn" :class="{'app__btn--active': active === 'sandbox'}"  >
          Sandbox
        </button>
      </nav>
      <synth v-if="synthActive" />
      <sandbox v-if="sandboxActive" />
    </div>
  </div>
</template>

<script>
  import Synth from '~/components/synth.vue'
  import Sandbox from '~/components/sandbox.vue'
  export default {
    components: {
      Synth,
      Sandbox
    },
    data() {
      return {
        dev: true,
        active: 'sandbox'
      }
    },
    computed: {
      synthActive() {
        return (this.active === 'synth') ? true : false
      },
      sandboxActive() {
        return (this.active === 'sandbox') ? true : false
      }
    }
  }
</script>

<style lang="sass">
  .app
    background-color: clr2('indigo', 0, -3.5%)
    height: 100vh
    overflow: hidden
    position: relative
    z-index: 0
    &:after
      display: none
      content: ''
      position: absolute
      z-index: 10
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-image: url(../assets/img/papyrus-dark.png)
      opacity: 0.25
      pointer-events: none
    &__inner
      position: relative
      z-index: 50
    &__nav
      @include neuMorphInner(clr2('indigo', 0.75, 10%), clr2('indigo', 0.75, -15%))
      position: absolute
      z-index: 1000
      top: 0
      right: 0
      background-color: clr2('indigo', 0, -7.5%)
      border: solid 1px clr2('indigo', 0, -7.5%)
      padding: 0
      margin: 0
      border-bottom-left-radius: 6px
      font-size: 0
    &__btn
      @include transition(background-color, color)
      font-size: 12px
      display: block
      background: transparent
      border: 0
      padding: $blh/4
      color: #fff
      display: inline-block
      margin: 0
      padding: 0 $blh
      border: 0
      color: clr2('indigo', 0, 45%)
      line-height: $blh*1.5
      background-color: transparent
      text-transform: uppercase
      font-weight: 700
      &:hover
        color: clr2('indigo', 0, 55%)
        cursor: pointer
        background-color: clr2('indigo', 0, -8.5%)
      &:focus
        outline: 0
      &--active
        color: clr2('mint', 0.25)
        &:hover
          color: clr2('mint')
      &:first-child
        padding-right: $blh/2
        border-right: solid 1px clr2('indigo', 0, -10%)
      &:last-child
        padding-left: $blh/2



</style>
