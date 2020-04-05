<template lang="html">
  <div class="wrap">
    <div class="wrap__inner">

      <!-- Synth (Start) -->
      <div v-if="synth" class="synth">
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
          <effects v-model="synth" />
        </section>
        <footer class="synth__foot">
          <button @click="logSynth">Log Synth</button>
        </footer>
      </div>
      <div v-else class="synth">
        <p>No Synth Loaded...</p>
      </div>
      <!-- Synth (End) -->


    </div> <!-- .wrap__inner -->



    <div class="piano__octave">
      <label>Octave:</label>
      <synth-select v-model="octave" :options="octaveRange" name="synth-octave" />
      <label>Note Duration:</label>
      <synth-select v-model="noteDuration" :options="durationRange" name="synth-duration" />
    </div>

    <div class="piano__roll">
      <button v-for="k in keys"
        class="piano__key"
        :class="{'piano__key--active': k.active, 'piano__key--black': k.color === 'black'}"
        :data-key-code="k.key"
        :key="k.val"
        @click="playNote(k.val + octave, noteDuration)" >
          {{ k.val + octave }}
      </button>
    </div>


  </div> <!-- .wrap -->

</template>


<script>
  import Tone from 'tone'
  import SynthSelect from './synth/Select.vue'
  import SynthRange from './synth/Range.vue'
  import SynthAdsr from './synth/Adsr.vue'
  import Oscillator from './synth/modules/oscillator.vue'
  import SynthFilter from './synth/modules/filter.vue'
  import Effects from './synth/modules/effects.vue'
  import AmpEnv from './synth/modules/amp.vue'
  export default {
    components: { SynthSelect, SynthRange, SynthAdsr, Oscillator, SynthFilter, Effects, AmpEnv },
    data () {
      return {
        title: "Tone JS Synthesizer",
        octave: 4,
        octaveRange: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        noteDuration: '8n',
        durationRange: ['1n', '2n', '4n', '8n', '16n'],
        keys: [
          { val: 'C',   color: 'white', key: 9 , active: false },
          { val: 'C#',  color: 'black', key: 49, active: false },
          { val: 'D',   color: 'white', key: 81, active: false },
          { val: 'D#',  color: 'black', key: 50, active: false },
          { val: 'E',   color: 'white', key: 87, active: false },
          { val: 'F',   color: 'white', key: 69, active: false },
          { val: 'F#',  color: 'black', key: 52, active: false },
          { val: 'G',   color: 'white', key: 82, active: false },
          { val: 'G#',  color: 'black', key: 53, active: false },
          { val: 'A',   color: 'white', key: 84, active: false },
          { val: 'A#',  color: 'black', key: 54, active: false },
          { val: 'B',   color: 'white', key: 89, active: false },
          { val: 'B#',  color: 'black', key: 85, active: false }
        ],
        synth: false
      }
    },
    methods: {
    initSynth: function(){
      this.synth = new Tone.MonoSynth().toMaster()
    },
    logSynth: function() {
      console.log(this.synth)
    },
    playNote: function (note, time) {
      this.synth.triggerAttackRelease(note, time)
    },
    handleKey: (e, that) => {
      // console.log(e.keyCode)
      that.keys.map(note => {
        // check if keypress matches a note
        if (note.key === e.keyCode){
          that.synth.triggerAttackRelease(note.val+that.octave, that.noteDuration)
          note.active = true
          setTimeout(function(){
            note.active = false
          }, 250)
        }
      })
    },
    round: function(val){
      return Math.round(val)
    }
  },
  mounted: function () {
    // initialize synth (mono)
    this.initSynth()
    // bind keys to piano
    window.addEventListener("keydown", e => {
      e.preventDefault()
      this.handleKey(e, this)
    });
  },
  filters: {
    round: function(value, decimal){
      return value.toFixed(decimal)
    }
  }
}
</script>


<style lang="sass">
  .piano
    background: #fff
    color: #666
    padding: $blh
    &__octave
      display: block
    &__keyboard
      display: block
    &__title
      margin-bottom: $blh
    &__octave
      display: block
      margin-bottom: $blh/2
    &__roll
      display: block
      font-size: 0
    &__key
      font-size: 11px
      position: relative
      display: inline-block
      appearance: none
      border-radius: 0
      padding: $blh ($blh/4)
      z-index: 0
      &--black
        background-color: #ddd
      &--active
        background-color: #fdff72
      &:focus
        z-index: 10
    &__synth
      display: block
      border: solid 1px #ddd
      background: #fafafa
      padding: $blh/2
      margin-bottom: $blh

  // Wrap
  .wrap
    background: #fff
    color: #666
    padding: $blh
    &__inner
      display: block
      border: solid 1px #ddd
      background: #fafafa
      padding: $blh/2
      margin-bottom: $blh

  // Synth
  .synth
    display: block
    border: solid 1px #ddd
    background: #fff
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
