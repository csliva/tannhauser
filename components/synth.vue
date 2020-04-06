<template lang="html">
  <div class="synth">
    <div v-if="synth" class="synth__body">
      <header class="synth__head">
        <h1 class="synth__title">MonoSynth</h1>
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
        <div class="synth__module">
          <label class="synth__label">Filter</label>
          <synth-filter v-model="synth" />
        </div>
      </main>
      <section class="synth__section">
        <effects-rack v-model="synth" />
      </section>
      <footer class="synth__foot">
        <button @click="logSynth">Log Synth</button>
        <button @click="initSynth">Init Synth</button>
      </footer>
    </div>
    <div v-else class="synth__body">
      <p>No Synth Loaded...</p>
      <button @click="initSynth">Init Synth</button>
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
      border: solid 1px #ddd
      background: #fff
      margin-bottom: $blh/2
    &__head
      background: #eee
      border-bottom: solid 1px #ddd
      padding: $blh/2
    &__title
      margin: 0
      font-size: 18px
    &__main
      display: grid
      grid-template-columns: 2fr 3fr 3fr
      width: 100%
      border-bottom: solid 1px #ddd
    &__module
      border-right: solid 1px #eee
      padding: $blh/2
      &:last-child
        border: 0
    &__section
      padding: $blh/2
    &__foot
      border-top: solid 1px #eee
      padding: $blh/2
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
