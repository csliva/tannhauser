<template>
  <div class="piano">
    <h1 class="piano__title">{{ title }}</h1>
    <div class="piano__synth">
      <!-- Synth (Start) -->
      <div v-if="synth" class="synth">
        <p>
          Volume: <input v-model.number.lazy="synth.volume.value" type="range" min="-12" max="10" step="1" name="synth-volume">
          {{ synth.volume.value }}
        </p>
        <span class="synth__param">
          <label>Oscilator Type:</label>
          <select v-model="synth.oscillator.type" name="synth-osc-type">
            <option v-for="t in synthOpts.oscTypes">{{ t }}</option>
          </select>
        </span>
        <span class="synth__param">
          <label>Amp Envelope</label>
          <div class="#">
            A: <input v-model.number.lazy="synth.envelope.attack" type="range" min="0.01" max="2" step="0.001">
            {{ synth.envelope.attack }}
            <select v-model.lazy="synth.envelope.attackCurve" name="synth-env-attack-curve">
              <option v-for="c in synthOpts.curves">{{ c }}</option>
            </select>
          </div>
          <div class="#">
            D: <input v-model.number.lazy="synth.envelope.decay" type="range" min="0.01" max="1" step="0.001" >
            {{ synth.envelope.decay }}
            <select v-model.lazy="synth.envelope.decayCurve" name="synth-env-attack-curve">
              <option v-for="c in synthOpts.curvesAlt">{{ c }}</option>
            </select>
          </div>
          <div class="#">
            S: <input v-model.number.lazy="synth.envelope.sustain" type="range" min="0" max="1" step="0.001" >
            {{ synth.envelope.sustain }}
          </div>
          <div class="#">
            R: <input v-model.number.lazy="synth.envelope.release" type="range" min="0.1" max="4" step="0.001" >
            {{ synth.envelope.release }}
            <select v-model.lazy="synth.envelope.releaseCurve" name="synth-env-attack-curve">
              <option v-for="c in synthOpts.curves">{{ c }}</option>
            </select>
          </div>
        </span>
        <span class="synth__param">
          <p>
            <label>Filter (Type, Rolloff, Q)</label>
            <select v-model.lazy="synth.filter.type" name="synth-filter-type">
              <option v-for="t in synthOpts.filterTypes">{{ t }}</option>
            </select>
            <select v-model.lazy="synth.filter.rolloff" name="synth-filter-rolloff">
              <option v-for="r in synthOpts.filterRolloffs">{{ r }}</option>
            </select>
            Q: <input v-model.number.lazy="synth.filter.Q.value" type="range" min="0" max="10" step="1" >
            {{ synth.filter.Q.value }}
          </p>
          <div class="#">
            <label>Filter Envelope</label>
            <div class="#">
              A: <input v-model.number.lazy="synth.filterEnvelope.attack" type="range" min="0.01" max="2" step="0.001">
              {{ synth.filterEnvelope.attack }}
              <select v-model.lazy="synth.filterEnvelope.attackCurve">
                <option v-for="c in synthOpts.curves">{{ c }}</option>
              </select>
            </div>
            <div class="#">
              D: <input v-model.number.lazy="synth.filterEnvelope.decay" type="range" min="0.01" max="1" step="0.001" >
              {{ synth.filterEnvelope.decay }}
              <select v-model.lazy="synth.filterEnvelope.decayCurve">
                <option v-for="c in synthOpts.curvesAlt">{{ c }}</option>
              </select>
            </div>
            <div class="#">
              S: <input v-model.number.lazy="synth.filterEnvelope.sustain" type="range" min="0" max="1" step="0.001" >
              {{ synth.filterEnvelope.sustain }}
            </div>
            <div class="#">
              R: <input v-model.number.lazy="synth.filterEnvelope.release" type="range" min="0.1" max="4" step="0.001" >
              {{ synth.filterEnvelope.release }}
              <select v-model.lazy="synth.filterEnvelope.releaseCurve">
                <option v-for="c in synthOpts.curves">{{ c }}</option>
              </select>
            </div>
          </div>
          <br>
          <div class="#">
            Freq: <input v-model.number.lazy="synth.filterEnvelope.baseFrequency" type="range" min="20" max="20000" step="1" >
            {{ synth.filterEnvelope.baseFrequency }}
          </div>
        </span>
        <footer class="synth__foot">
          <button @click="logSynth">Log Synth</button>
          <button @click="initSynth">Init Synth</button>
        </footer>
      </div>
      <div v-else>
        <p>No Synth Loaded...</p>
      </div>
      <!-- Synth (End) -->
    </div>
    <div class="piano__octave">
      <select v-model="octave">
        <option v-for="o in 6">{{ o }}</option>
      </select>
    </div>

    <div class="piano__roll">
      <button v-for="k in keys"
        class="piano__key"
        :class="{'piano__key--black': k.color === 'black'}"
        :key="k.val"
        @click="playnote(k.val + octave, '8n')">
          {{ k.val + octave }}
      </button>
    </div>
  </div>
</template>


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
    &__key
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
      padding: $blh
      margin-bottom: $blh
  // Synth
  .synth
    display: block
    &__param
      display: inline-block
      vertical-align: top
      margin-right: $blh/2
      label
        display: block
        margin-bottom: $blh/4
</style>


<script>
  import Tone from 'tone'
  export default {
    name: 'piano',
    data () {
      return {
        title: "Tone JS Piano (WIP)",
        octave: 4,
        keys: [
          { val: 'C', color: 'white', key: 9},
          { val: 'C#', color: 'black', key: 49},
          { val: 'D', color: 'white', key: 81},
          { val: 'D#', color: 'black', key: 50},
          { val: 'E', color: 'white', key: 87},
          { val: 'F', color: 'white', key: 69},
          { val: 'F#', color: 'black', key: 52},
          { val: 'G', color: 'white', key: 82},
          { val: 'G#', color: 'black', key: 53},
          { val: 'A', color: 'white', key: 84},
          { val: 'A#', color: 'black', key: 54},
          { val: 'B', color: 'white', key: 89},
          { val: 'B#', color: 'black', key: 85}
        ],
        synth: false,
        synthOpts: {
          oscTypes: ['sine', ' square', 'triangle', 'sawtooth'],
          curves: ['linear', 'exponential', 'sine', 'cosine', 'bounce', 'ripple', 'step'],
          curvesAlt: ['linear', 'exponential'],
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
    playnote: function (note, time) {
      this.synth.triggerAttackRelease(note, time)
    },
    handleKey: (e, that) => {
      // console.log(e.keyCode)
      that.keys.map(note => {
        // check if keypress matches a note
        if (note.key === e.keyCode){
          that.synth.triggerAttackRelease(note.val+that.octave, '8n')
        }
      })
    }
  },
  mounted: function () {
    this.initSynth()
    window.addEventListener("keydown", e => {
      e.preventDefault()
      this.handleKey(e, this)
    });
  },
}
</script>
