<template>
  <div class="app">
    <nav v-if="dev" class="app__nav">
      <button @click="active = 'synth'" class="app__btn" >Synth</button>
      <button @click="active = 'sandbox'" class="app__btn" >Sandbox</button>
    </nav>
    <synth v-if="synthActive" />
    <sandbox v-if="sandboxActive" />
  </div>
</template>

<script>
  import Synth from '~/components/Synth.vue'
  import Sandbox from '~/components/sandbox.vue'
  export default {
    components: { Synth, Sandbox },
    data() {
      return {
        dev: true,
        active: 'sandbox'
      }
    },
    computed: {
      synthActive() {
        return (this.active == 'synth') ? true : false
      },
      sandboxActive() {
        return (this.active == 'sandbox') ? true : false
      }
    }
  }
</script>

<style lang="sass">
  .app
    background-color: clr('indigo')
    height: 100vh
    overflow: hidden
    position: relative
    &__nav
      position: absolute
      z-index: 1000
      top: 50%
      right: 0
      background-color: clr2('indigo', 0, 10%)
      border: solid 2px clr2('indigo', 0, 10%)
    &__btn
      font-size: 12px
      padding: $blh/8 $blh/2
      display: block
      background: transparent
      border: 0
      padding: $blh/4
      color: #fff
      &:hover
        cursor: pointer
      &:focus
        outline: 0

</style>
