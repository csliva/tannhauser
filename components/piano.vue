<template lang="html">
  <div class="piano">
    <h1 class="piano__title">{{ title }}</h1>
    <div class="piano__synth">

      <!-- Synth (Start) -->
      <div v-if="synth" class="synth">
        <header class="synth__head">
          <h1 class="synth__title">MonoSynth</h1>
        </header>
        <main class="synth__main">
          <div class="synth__module">
            <label class="synth__label">Oscilator</label>
            <div class="synth__param">
              {{ synth.oscillator.type }}
            </div>
            <div class="synth__param">
              <synth-select v-model="synth.oscillator.baseType" :options="synthOpts.oscTypes" name="synth-osc-type" />
              <synth-select v-model="synth.oscillator.sourceType" :options="synthOpts.oscSrc" name="synth-osc-source" />
            </div>
            <div class="synth__param">
              Partials:
              <input v-model.number="synth.oscillator.partialCount" type="range" min="0" max="32" step="1" >
              {{ synth.oscillator.partialCount }}
            </div>
            <div class="synth__param">
              Detune:
              <input v-model.number="synth.oscillator.detune.value" type="range" min="0" max="100" step="1">
              {{ synth.oscillator.detune.value }}
            </div>
            <div class="synth__param">
              Phase:
              <input name="synth-oscillator-phase"
              v-model.number="synth.oscillator.phase"
              type="range" min="0" max="360" step="1" >
              {{ synth.oscillator.phase | round }}
            </div>
          </div>
          <div class="synth__module">
            <label class="synth__label">Filter</label>
            <div class="synth__param">
              <synth-select v-model="synth.filter.type" :options="synthOpts.filterTypes" name="synth-filter-type" />
              <synth-select v-model="synth.filter.rolloff" :options="synthOpts.filterRolloffs" name="synth-filter-rolloff" />
            </div>
            <div class="synth__param">
              <synth-adsr v-model="synth.filterEnvelope" name="synth-filter-env" />
            </div>
            <br>
            <div class="synth__param">
              Freq:
              <input v-model.number="synth.filterEnvelope.baseFrequency" type="range" min="20" max="20000" step="1" >
              {{ synth.filterEnvelope.baseFrequency }}
            </div>
            <div class="synth__param">
              Octaves:
              <input v-model.number="synth.filterEnvelope.octaves" type="range" min="-8" max="8" step="1" >
              {{ synth.filterEnvelope.octaves }}
            </div>
            <div class="synth__param">
              Q:
              <input v-model.number="synth.filter.Q.value" type="range" min="0" max="10" step="1" >
              {{ synth.filter.Q.value }}
            </div>
          </div>
          <div class="synth__module">
            <label class="synth__label">Amp Envelope</label>
            <div class="synth__param">
              Volume:
              <input v-model.number="synth.volume.value" type="range" min="-8" max="8" step="1" >
              {{ synth.volume.value | round }}
            </div>
            <div class="synth__param">
              <synth-adsr v-model="synth.envelope" name="synth-env" />
            </div>
            <div class="synth__param">
              Portamento:
              <input v-model.number="synth.portamento" type="range" min="0" max="4" step="0.1" >
              {{ synth.portamento }}
            </div>
          </div>
        </main>
        <section class="synth__section">
          <button @click="toggleFx('chorus')"
          class="button" :class="{ 'button--active': effects.chorus.active }">
            Chorus
          </button>
          <button @click="toggleFx('reverb')"
          class="button" :class="{ 'button--active': effects.reverb.active }">
            Reverb
          </button>
          <button @click="toggleFx('phaser')"
          class="button" :class="{ 'button--active': effects.phaser.active }">
            Phaser
          </button>
          <button @click="toggleFx('distortion')"
          class="button" :class="{ 'button--active': effects.distortion.active }">
            Distortion
          </button>
          <button @click="toggleFx('bitcrusher')"
          class="button" :class="{ 'button--active': effects.bitcrusher.active }">
            BitCrusher
          </button>
          <button @click="toggleFx('vibrato')"
          class="button" :class="{ 'button--active': effects.vibrato.active }">
            Vibrato
          </button>
          <button @click="toggleFx('freeverb')"
          class="button" :class="{ 'button--active': effects.freeverb.active }">
            Freeverb
          </button>
          <button @click="toggleFx('pingpong')"
          class="button" :class="{ 'button--active': effects.pingpong.active }">
            PingPongDelay
          </button>
        </section>
        <footer class="synth__foot">
          <button @click="logSynth">Log Synth</button>
          <button @click="initSynth">Init Synth</button>
        </footer>
      </div>
      <div v-else class="synth">
        <p>No Synth Loaded...</p>
      </div>
      <!-- Synth (End) -->

    </div>

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
  </div>
</template>


<script>
  import Tone from 'tone'
  import SynthSelect from './synth/Select.vue'
  import SynthRange from './synth/Range.vue'
  import SynthAdsr from './synth/Adsr.vue'
  export default {
    components: { SynthSelect, SynthRange, SynthAdsr },
    data () {
      return {
        title: "Tone JS Piano",
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
        synth: false,
        effects: {
          chorus: { active: false, settings: {} },
          reverb: { active: false, settings: {} },
          phaser: { active: false, settings: {} },
          distortion: { active: false, settings: {} },
          bitcrusher: { active: false, settings: {} },
          vibrato: { active: false, settings: {} },
          freeverb: { active: false, settings: {} },
          pingpong: { active: false, settings: {} }
        },
        synthOpts: {
          oscTypes: ['sine', ' square', 'triangle', 'sawtooth'],
          oscSrc: ['oscillator', 'am', 'fm', 'fat', 'pulse', 'pwm'],
          oscPartials: [],
          filterTypes: ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'notch', 'allpass', 'peaking'],
          filterRolloffs: ['-12', '-24', '-48', '-96']
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
    toggleFx: function(unit) {
      let fx = this.effects, s = this.synth
      if(!fx[unit].active){
        s = s.connect(fx[unit].settings)
        fx[unit].active = true
        console.log(fx[unit].settings)
      } else {
        s = s.disconnect(fx[unit].settings)
        fx[unit].active = false
      }
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
    // populate partials in data
    for(let i = 0; i <= 32; i++){
      this.synthOpts.oscPartials.push(i)
    }
    // populate effects rack
    const fx = this.effects
    fx.chorus.settings = new Tone.Chorus().toMaster()
    fx.phaser.settings = new Tone.Phaser().toMaster()
    fx.distortion.settings = new Tone.Distortion().toMaster()
    fx.bitcrusher.settings = new Tone.BitCrusher().toMaster()
    fx.vibrato.settings = new Tone.Vibrato().toMaster()
    fx.freeverb.settings = new Tone.Freeverb().toMaster()
    fx.pingpong.settings = new Tone.PingPongDelay().toMaster()
    // reverb needs to generate...
    let reverb = new Tone.Reverb().toMaster()
    reverb.generate().then(() => {
			fx.reverb.settings = reverb
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
