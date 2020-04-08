<template lang="html">
  <div class="synth">
    <div v-if="synth" class="synth__body">
      <header class="synth__head">
        <h1 class="synth__title">MonoSynth</h1>
        <button @click="log(synth)">Log Synth</button>
        <button @click="killSynth">Kill Synth</button>
        <button @click="alert()">Alert</button>
      </header>
      <main class="synth__main">
        <div class="synth__col">
          <oscillator v-model="synth.oscillator" />
        </div>
        <div class="synth__col">
          <amp v-model="synth" />
        </div>
        <div class="synth__col">
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
      <header class="synth__head">
        <h1 class="synth__title">No Synth Loaded</h1>
      </header>
      <div class="synth__empty">
        <button @click="initSynth">Init Synth</button>
      </div>
    </div>
    <piano v-model="synth" />
  </div>
</template>


<script>
  // Libraries
  import Tone from 'tone'
  // Utilities
  import General from './synth/utils/general.vue'
  // Controls (piano & sequencer)
  import Piano from './piano.vue'
  // Modules
  import Oscillator from './synth/modules/oscillator.vue'
  import SynthFilter from './synth/modules/filter.vue'
  import Amp from './synth/modules/amp.vue'
  import EffectsRack from './synth/modules/rack.vue'
  // Component
  export default {
    components: { Piano, Oscillator, SynthFilter, Amp, EffectsRack },
    mixins: [ General ],
    data() {
      return {
        synth: false
      }
    },
    methods: {
      initSynth: function() {
        this.synth = new Tone.MonoSynth().toMaster()
      },
      killSynth: function() {
        this.synth = false
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
      margin-bottom: $blh/2
    &__title
      display: inline-block
      margin: 0
      font-size: 18px
      margin-right: $blh/2
    &__main
      display: grid
      grid-template-columns: 2fr 3fr 3fr
      grid-gap: $blh/2
      width: 100%
      margin-bottom: $blh/2
    &__section
      border: solid 1px #eee
      background: #fff
    &__alt
      display: grid
      grid-template-columns: 5fr 3fr
      grid-gap: $blh/2
    &__empty
      border: solid 1px #eee
      background: #fff
      padding: $blh/2
  // Button
  .button
    border-radius: 0
    border: solid 1px #ddd
    &--active
      border: solid 1px blue
</style>
