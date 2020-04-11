<template lang="html">
  <div class="synth">

    <div class="synth__temp">
      <small>{{ testMsg }}</small>
      <h1>{{ num }}</h1>
      <button @click="decrement"> - </button>
      <button @click="increment"> + </button>
      <ul>
        <li v-for="(i, index) in items" :key="index">
          <input type="text" @input="update(i)" :value="i.val" />
          <span>{{ i.val }}</span>
        </li>
      </ul>
    </div>


    <div v-if="synth" class="synth__body">
      <header class="synth__head">
        <h1 class="synth__title">MonoSynth</h1>
        <button @click="logSynth">Log Synth</button>
      </header>

      <main class="synth__main">
        <oscillator v-model="synth.oscillator" />
        <amp-env v-model="synth" />
        <synth-filter v-model="synth" />
      </main>
      <div class="synth__alt">
        <effects-rack v-model="synth" />
        <div class="synth__temp">
          <h3>Mods</h3>
          <p>LFOs and Envelopes here...</p>
        </div>
      </div>

    </div>
    <div v-else class="synth__body">
      <div class="synth__section">
        <p>No Synth Loaded...</p>
        <button @click="initSynth">Initialize Synth</button>
      </div>
    </div>

    <!-- <piano v-model="synth" /> -->

  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Tone from 'tone'
  // import Piano from './piano.vue'
  import Oscillator from './synth/modules/oscillator.vue'
  import SynthFilter from './synth/modules/filter.vue'
  import EffectsRack from './synth/modules/effectsRack.vue'
  import AmpEnv from './synth/modules/amp.vue'
  export default {
    components: { Oscillator, SynthFilter, EffectsRack, AmpEnv },
    data () {
      return {
        synth: false
      }
    },
    computed: {
      num (){
        return this.$store.state.num
      },
      testMsg (){
        return this.$store.state.testMsg
      },
      items(){
        return this.$store.state.items
      },
      item: {
        get (index){

        },
        set(value){

        }
      }
    },
    methods: {
      initSynth: function(){
        this.synth = new Tone.MonoSynth().toMaster()
      },
      logSynth: function() {
        console.log(this.synth)
      },
      increment: function(){
        this.$store.commit('increment')
      },
      decrement: function(){
        this.$store.commit('decrement')
      },
      ...mapMutations({
        update: 'update'
      })
    },
    mounted: function () {
      // this.initSynth()
    }
  }
</script>


<style lang="sass">
  // Synth
  .synth
    position: relative
    padding-bottom: $blh*5
    &__body
      display: block
      min-height: 100vh
      padding: $blh/2
      margin-bottom: $blh/2
    &__head
      background: #eee
      border: solid 1px #ddd
      padding: $blh/2
      vertical-align: middle
      margin-bottom: $blh/2
    &__title
      display: inline-block
      margin: 0
      font-size: 18px
      margin-right: $blh/2
    &__main
      display: grid
      grid-template-columns: 3fr 3fr 3fr
      grid-gap: $blh/2
      width: 100%
      border: 0
      margin-bottom: $blh/2
    &__alt
      display: grid
      grid-template-columns: 2fr 1fr
      grid-gap: $blh/2
      width: 100%
      border: 0
    &__temp
      display: block
      border: dotted 2px purple
      padding: $blh/2
      margin-bottom: $blh/2

  .module
    border: solid 1px red
    background: #fff
    padding: $blh/2
    h3
      margin-bottom: $blh/2

  .param
    display: block
    margin-bottom: $blh/4

  // Button
  .button
    border-radius: 0
    border: solid 1px #ddd
    &--active
      border: solid 1px blue
</style>
