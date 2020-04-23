<template lang="html">
  <div class="sandbox">
    <div class="sandbox__inner">
      <h2>Sandbox</h2>
      <cell>
        <cell cols="3"  v-if="false" >
          <cell cols="4" grid="sm">
            <cell>
              <ctrl-dial v-if="getMaster.volume" v-model="getMaster.volume.value" :props="volProps" />
            </cell>
          </cell>
        </cell>
        <cell cols="3">
          <cell cols="4" grid="sm">
            <ctrl-btn @click="initOsc()" text="Init Osc" />
            <ctrl-btn @click="log(oscs)" text="Log" />
          </cell>
        </cell>
        <cell cols="4" v-if="oscs.length">
          <module-osc v-for="(o, i) in oscs" v-model="oscs[i]" :key="o.mId" />
        </cell>
        <cell cols="3">
          <cell cols="4">
            <ctrl-btn @click="initLfo()" text="Init LFO" />
          </cell>
        </cell>
        <cell cols="4" v-if="lfos.length">
          <module-lfo v-for="(o, i) in lfos" v-model="lfos[i]" :key="o.mId" />
        </cell>
      </cell>
    </div>
  </div>
</template>

<script>
  // Tone JS
  import Tone from 'tone'
  // Interfaces
  import Piano from './piano.vue'
  // Controls
  import CtrlCheck from './controls/check.vue'
  import CtrlSelect from './controls/select.vue'
  import CtrlRange from './controls/range.vue'
  import CtrlBtn from './controls/btn.vue'
  import CtrlDial from './controls/dial.vue'
  // Displays
  import Cell from './displays/cell.vue'

  // Sbox Modules
  import ModuleOsc from './modules/sbox/osc.vue'
  import ModuleLfo from './modules/sbox/lfo.vue'
  // Helpers
  export default {
    components: {
      Piano,
      ModuleOsc, ModuleLfo,
      CtrlCheck, CtrlSelect, CtrlRange, CtrlBtn, CtrlDial,
      Cell
    },
    data() {
      return {
        // OSC
        oscs: [],
        freqProps: {
          label: 'Freq',
          min: '20', max: '6000',
          step: '1', units: 'hz', dec: '0',
          reset: true
        },
        oscProps: {
          value: 'sine',
          label: 'Waveform',
          options: ['sine','triangle','square','sawtooth']
        },
        oscDetuneProps: {
          label: 'Detune',
          min: '-100', max: '100',
          steps: '1', units: 'cents',
          reset: true
        },
        oscPartialProps: {
          label: 'Partials',
          min: '0', max: '32',
          steps: '1', units: '',
          reset: true
        },
        volProps: {
          label: 'Volume',
          min: '-12', max: '12', step: '1',
          units: 'db', dec: '0', type: 'abs', reset: true
        },
        // LFOs
        lfos: [],
        lfoProps: {
          amp: {
            value: false,
            label: 'Amplitude',
            min: '0.00', max: '1.00', step: '0.01',
            units: '', dec: '2', reset: true
          },
          freq: {
            value: false,
            label: 'Frequency',
            min: '0.1', max: '20.0', step: '0.1',
            units: 'hz', dec: '1', reset: true
          }
        },
        // mod props
        oscModProps: {
          options: ['frequency', 'detune', 'volume', 'partialCount'],
          niceOptions: ['Freq', 'Detune', 'Vol', 'Partial Count']
        },
        lfoModProps: {
          options: ['frequency', 'amplitude'],
          niceOptions: ['Freq', 'Amp']
        },
        // utilitities
        meter: false
      }
    },
    computed: {
      getModules () {
        // return all modules
        let modules = []
        modules.push(...this.oscs, ...this.lfos)
        return modules
      },
      cnxTargets () {
        // returns name and ids of modules
        return {
          options: this.getModules.map(t => t.mId),
          niceOptions: this.getModules.map(t => t.title)
        }
      },
      getMaster () {
        return Tone.Master
      }
    },
    watch: {
      // watch
    },
    methods: {
      // dev
      log(data) {
        console.log(data)
      },
      alert(data) {
        alert(data)
      },
      // local
      initOsc(tone) {
        let osc = new Tone.OmniOscillator({
          type: 'sine'
        })
        osc.mId = 'omniOsc#' + (this.oscs.length + 1)
        osc.title = 'Omni Osc #'+ (this.oscs.length + 1)
        osc.category = 'oscillator'
        this.oscs.push(osc)
      },
      initLfo() {
        let lfo = new Tone.LFO()
        lfo.mId = 'lfo#'+ (this.lfos.length + 1)
        lfo.title = 'LFO #'+ (this.lfos.length + 1)
        lfo.category = 'lfo'
        lfo.cnx = {i: [], o: []}
        this.lfos.push(lfo)
      },
      // get modules (id & category)
      getModuleById (id) {
        this.getModules.filter(t => t.mId === id)
      },
      getModuleCat (cat) {
        this.getModules.filter(t => t.catategory === cat)
      },
      // routing
      routeSignal (output, input) {

      },
      unmapParam (output, input, param) {

      },
      mapParam (output, input, param) {
        output.connect(input[param]).toMaster()
        output.cnx.o.push({ title: input.title+' '+param, module: input, param: param })
      }
    },
    mounted () {
      // meter
      let meter = new Tone.Meter()
      Tone.Master.connect(meter)
      this.meter = meter
      // init oscs
      this.initOsc()
      this.initOsc()
      // init lfos
      this.initLfo()
      this.initLfo()
    },
    filters: {
      round (num) {
        return Number(num).toFixed(0)
      }
    }
  }
</script>

<style lang="sass">
  .sandbox
    display: block
    height: 100vh
    overflow-y: auto
    &__inner
      padding: $blh
      min-height: 100vh
    &__list
      padding: 0
      margin: 0 0 $blh/2
    &__item
      display: inline-block

  // hlt = highlight
  .hlt
    color: clr2('blue', 0, 25%)
    display: inline-block
    padding: 0 $blh/8

</style>
