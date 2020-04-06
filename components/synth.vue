<template lang="html">
  <div class="synth">
    <div v-if="synth" class="synth__body">
      <header class="synth__head">
        <h1 class="synth__title">MonoSynth</h1>
        <button @click="logSynth">Log Synth</button>
      </header>
      <main class="synth__main">
        <div class="synth__module">
          <label class="synth__label">Oscilator</label>
          <oscillator v-model="synth.oscillator" />
        </div>
        <div class="synth__module">
          <label class="synth__label">Amp Envelope</label>
          <amp-env v-model="synth" />
        </div>
        <div class="synth__module synth__module--last">
          <label class="synth__label">Filter</label>
          <synth-filter v-model="synth" />
        </div>
      </main>
      <div class="synth__alt">
        <effects-rack v-model="synth" />
        <div class="synth__module synth__module--card">
          <label class="synth__label">Mods</label>
          <p>LFOs and Envelopes here...</p>
        </div>
      </div>
    </div>
    <div v-else class="synth__body">
      <div class="synth__section">
        <p>Synth Loading...</p>
      </div>
    </div>
    <piano v-model="synth" />
  </div>
</template>


<script>
  import Tone from 'tone'
  import Piano from './piano.vue'
  import Oscillator from './synth/modules/oscillator.vue'
  import SynthFilter from './synth/modules/filter.vue'
  import EffectsRack from './synth/modules/effectsRack.vue'
  import AmpEnv from './synth/modules/amp.vue'
  export default {
    components: { Piano, Oscillator, SynthFilter, EffectsRack, AmpEnv },
    data () {
      return {
        synth: false
      }
    },
    methods: {
      initSynth: function(){
        this.synth = new Tone.MonoSynth().toMaster()
      },
      logSynth: function() {
        console.log(this.synth)
      }
    },
    mounted: function () {
      this.initSynth()
    }
  }
</script>


<style lang="sass">
  // Synth
  .synth
    &__body
      display: block
      margin-bottom: $blh/2
    &__head
      background: #eee
      border: solid 1px #ddd
      padding: $blh/2
      vertical-align: middle
    &__title
      display: inline-block
      margin: 0
      font-size: 18px
      margin-right: $blh/2
    &__main
      display: grid
      grid-template-columns: 2fr 3fr 3fr
      width: 100%
      border: solid 1px #ddd
      background: #fff
      margin-bottom: $blh/2
    &__module
      border-right: solid 1px #eee
      padding: $blh/2
      &--last
        border: 0
      &--card
        border: solid 1px #eee
        background: #fff
    &__alt
      display: grid
      grid-template-columns: 5fr 3fr
      grid-gap: $blh/2
    &__param
      display: block
      margin-bottom: $blh/4
    &__label
      display: block
      font-weight: 700
      margin: (-$blh/2) (-$blh/2) ($blh/2) (-$blh/2)
      border-bottom: solid 1px #eee
      padding: $blh/2

  // Button
  .button
    border-radius: 0
    border: solid 1px #ddd
    &--active
      border: solid 1px blue
</style>
