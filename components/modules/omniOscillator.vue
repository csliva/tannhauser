<template lang="html">
  <div class="module" v-if="settings" :class="{ 'module--hidden' : !active}" >
    <header class="module__header" >
      <h2 class="module__title">{{ settings.moduleId || title }}</h2>
      <small class="module__category">{{ type }} Module</small>
    </header>
    <main class="module__main" >
      <section class="module__section module__section--dual" >
        <div class="module__col">
          <ctrl-check v-if="settings.baseType" v-model="settings.baseType" :props="params.baseType" />
          <ctrl-range v-if="settings.detune" v-model="settings.detune.value" :props="params.detune" />
          <ctrl-range v-if="stringPartials" v-model="settings.partialCount" :props="params.partials" />
          <ctrl-range v-if="stringPhase" v-model="settings.phase" :props="params.phase" />
        </div>
        <cell cols="4">
          <div v-if="settings.frequency">Tone: {{ freqNote }} ({{ freqHz }} hz)</div>
          <div>
            <ctrl-dial v-if="hardFreq.value" v-model="hardFreq.value" :props="hardFreq" />
          </div>
        </cell>
      </section>
      <div v-if="debug" class="module__debug">
        <span class="module__state">Status: {{ settings.state }}</span>
        <span>
          Mute: {{ settings.mute }}
        </span>
      </div>
    </main>
    <footer class="module__footer" >
      <button class="module__toggle module__toggle--success" @click="settings.mute = !settings.mute">
        {{ settings.mute ? 'Un-Mute' : 'Mute' }}
      </button>
      <button class="module__toggle" @click="log(settings)">Log</button>
      <button class="module__toggle module__toggle--warning" @click="debug = !debug">Debug</button>
    </footer>
  </div>
</template>


<script>
  import Tone from 'tone'
  import Module from './_module.vue'
  import CtrlButton from '../controls/button.vue'
  import CtrlRange from '../controls/range.vue'
  import CtrlSelect from '../controls/select.vue'
  import CtrlCheck from '../controls/check.vue'
  import CtrlDial from '../controls/dial.vue'
  // partials
  import Cell from '../displays/cell.vue'
  export default {
    extends: Module,
    components: { CtrlButton, CtrlRange, CtrlSelect, CtrlCheck, CtrlDial, Cell },
    data () {
      return {
        title: 'OmniOscillator',
        type: 'oscillator',
        params: {
          baseType: {
            label: 'Base Type',
            options: ['sine','triangle','square','sawtooth']
          },
          detune: {
            label: 'Detune',
            min: '-100', max: '100', step: '1',
            units: 'cents', dec: '0'
          },
          partials: {
            label: 'Partials',
            min: '0', max: '32', step: '1',
            units: '', dec: '0'
          },
          phase: {
            label: 'Phase',
            min: '0', max: '180', step: '1',
            units: '', dec: '0'
          }
        },
        useSource: 'piano',
        hardFreq: {
          value: '100',
          min: '0', max: '2000', step: '1',
          units: 'hz', dec: '0'
        }
      }
    },
    computed: {
      // $store
      pianoFreq () {
        return this.$store.state.synth.piano.freq
      },
      freqNote () {
        // return Tone.Frequency(1000).toNote()
        return Tone.Frequency(this.pianoFreq).toNote()
      },
      freqHz () {
        return this.pianoFreq.toFixed(0)
      },
      stringPartials () {
        return Number(this.settings.partialCount).toString(10)
      },
      stringPhase () {
        return Number(this.settings.phase).toString(10)
      }
    },
    mounted: function() {
      this.settings = new Tone.OmniOscillator({ frequency: this.pianoFreq })
      this.settings.moduleId = this.title +'#'+this.id
      this.settings.category = this.type
      // freq info
      this.settings.frequency.freqNote = this.freqNote
      this.settings.frequency.freqHz = this.freqHz
    },
    watch: {
      pianoFreq (){
        this.settings.frequency.value = this.pianoFreq
        this.settings.frequency.freqNote = this.freqNote
        this.settings.frequency.freqHz = this.freqHz
      }
    }
  }
</script>
