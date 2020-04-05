<template lang="html">
  <div class="piano">
    <h1 class="piano__title">{{ title }}</h1>
    <div class="piano__synth">

      <!-- Synth (Start) -->
      <div v-if="synth" class="synth">
        <main class="synth__main">
          <div class="synth__module">
            <label>Oscilator:</label>
            <synth-select v-model="synth.oscillator.baseType" :options="synthOpts.oscTypes" name="synth-osc-type" />
            <synth-select v-model="synth.oscillator.partialCount" :options="synthOpts.oscPartials" name="synth-osc-partialCount" />
            <synth-select v-model="synth.oscillator.sourceType" :options="synthOpts.oscSrc" name="synth-osc-source" />
            <br><br>
            <div class="#">
              {{ synth.oscillator.type }}
            </div>
            <div class="#">
              Portamento: <input v-model.number="synth.portamento" type="range" min="0" max="4" step="0.1" >
              {{ synth.portamento }}
            </div>
          </div>
          <div class="synth__module">
            <p>
              <label>Filter (Type, Rolloff, Q)</label>
              <synth-select v-model="synth.filter.type" :options="synthOpts.filterTypes" name="synth-filter-type" />
              <synth-select v-model="synth.filter.rolloff" :options="synthOpts.filterRolloffs" name="synth-filter-rolloff" />
              <div class="#">
                Q: <input v-model.number="synth.filter.Q.value" type="range" min="0" max="10" step="1" >
                {{ synth.filter.Q.value }}
              </div>
            </p>
            <div class="#">
              <label>Filter Envelope</label>
              <synth-adsr v-model="synth.filterEnvelope" name="synth-filter-env" />
            </div>
            <br>
            <div class="#">
              Freq: <input v-model.number="synth.filterEnvelope.baseFrequency" type="range" min="20" max="20000" step="1" >
              {{ synth.filterEnvelope.baseFrequency }}
            </div>
            <div class="#">
              Octaves: <input v-model.number="synth.filterEnvelope.octaves" type="range" min="-8" max="8" step="1" >
              {{ synth.filterEnvelope.octaves }}
            </div>
          </div>
          <div class="synth__module">
            <label>Amp Envelope</label>
            <synth-adsr v-model="synth.envelope" name="synth-env" />
            <br>
            <div class="#">
              <label>Effects:</label> <br><br>
              <button @click="toggleFx('chorus')"
              class="button"
              :class="{ 'button--active': effects.chorus.active }">
                Chorus
              </button>
              <button @click="toggleFx('reverb')"
              class="button"
              :class="{ 'button--active': effects.reverb.active }">
                Reverb
              </button>
              <button @click="toggleFx('phaser')"
              class="button"
              :class="{ 'button--active': effects.phaser.active }">
                Phaser
              </button>
              <button @click="toggleFx('distortion')"
              class="button"
              :class="{ 'button--active': effects.distortion.active }">
                Distortion
              </button>
            </div>
          </div>
        </main>
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
        :class="{'piano__key--black': k.color === 'black'}"
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
          distortion: { active: false, settings: {} }
        },
        synthOpts: {
          oscTypes: ['sine', ' square', 'triangle', 'sawtooth'],
          oscSrc: ['', 'am', 'fm', 'fat'],
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
    }
  },
  mounted: function () {
    this.initSynth()
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
    fx.reverb.settings = new Tone.Reverb().toMaster()
    fx.phaser.settings = new Tone.Phaser().toMaster()
    fx.distortion.settings = new Tone.Distortion().toMaster();
  },
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
      &:focus
        z-index: 10
    &__synth
      display: block
      border: solid 1px #ddd
      background: #eee
      padding: $blh/2
      margin-bottom: $blh
  // Synth
  .synth
    display: block
    border: solid 1px #ddd
    background: #fff
    &__main
      font-size: 0
    &__module
      vertical-align: top
      display: inline-block
      font-size: 14px
      padding: $blh/2
    &__foot
      border-top: solid 1px #eee
      padding: $blh/2
  // Button
  .button
    border-radius: 0
    border: solid 1px #ddd
    &--active
      border: solid 1px blue
</style>
